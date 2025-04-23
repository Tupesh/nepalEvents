import { createContext, ReactNode, useContext } from "react";
import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@shared/schema";

interface CartItem {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  event?: Event;
}

type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
  addToCartMutation: UseMutationResult<CartItem, Error, { eventId: number, quantity?: number }>;
  removeFromCartMutation: UseMutationResult<void, Error, number>;
  clearCartMutation: UseMutationResult<void, Error, void>;
  calculateTotal: () => number;
  calculateSubtotal: () => number;
  calculateServiceFee: () => number;
  getCartCount: () => number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: cartItems = [],
    error,
    isLoading,
  } = useQuery<CartItem[], Error>({
    queryKey: ["/api/cart"],
    queryFn: async ({ queryKey }) => {
      try {
        const res = await fetch(queryKey[0] as string, {
          credentials: "include",
        });
        if (res.status === 401) {
          return [];
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch cart: ${res.statusText}`);
        }
        return await res.json();
      } catch (error) {
        console.error("Cart fetch error:", error);
        return [];
      }
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ eventId, quantity = 1 }: { eventId: number, quantity?: number }) => {
      const res = await apiRequest("POST", "/api/cart", { eventId, quantity });
      return await res.json();
    },
    onSuccess: (newItem: CartItem) => {
      queryClient.setQueryData(["/api/cart"], (old: CartItem[] = []) => {
        // Check if the item already exists in the cart
        const existingItemIndex = old.findIndex(item => item.eventId === newItem.eventId);
        
        if (existingItemIndex !== -1) {
          // Replace the existing item
          return old.map((item, index) => 
            index === existingItemIndex ? newItem : item
          );
        }
        
        // Add as a new item
        return [...old, newItem];
      });
      
      toast({
        title: "Added to cart",
        description: `${newItem.event?.title} added to your cart`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add to cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: number) => {
      await apiRequest("DELETE", `/api/cart/${cartItemId}`);
    },
    onSuccess: (_data, cartItemId) => {
      queryClient.setQueryData(["/api/cart"], (old: CartItem[] = []) => 
        old.filter(item => item.id !== cartItemId)
      );
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove item",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/cart"], []);
      
      toast({
        title: "Cart cleared",
        description: "All items removed from your cart",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to clear cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.event?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateServiceFee = () => {
    // Simple service fee calculation - 5% of subtotal
    return Math.round(calculateSubtotal() * 0.05);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        addToCartMutation,
        removeFromCartMutation,
        clearCartMutation,
        calculateTotal,
        calculateSubtotal,
        calculateServiceFee,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
