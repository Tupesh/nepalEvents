import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cartItems, 
    isLoading, 
    removeFromCartMutation, 
    calculateSubtotal,
    calculateServiceFee,
    calculateTotal
  } = useCart();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Add no-scroll class to body when cart is open
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRemoveItem = (cartItemId: number) => {
    removeFromCartMutation.mutate(cartItemId);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div 
        className={`absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl">
              Your Cart <span className="text-primary">({cartItems.length})</span>
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-neutral hover:text-primary">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="bg-neutral-light rounded-full p-4 mb-4">
                  <ShoppingCart className="h-8 w-8 text-neutral" />
                </div>
                <p className="text-neutral font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-neutral">Browse events and add them to your cart</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  {item.event?.imageUrl && (
                    <img 
                      className="w-16 h-16 object-cover rounded-md" 
                      src={item.event.imageUrl} 
                      alt={item.event.title} 
                    />
                  )}
                  <div className="ml-4 flex-grow">
                    <h4 className="font-heading font-bold">{item.event?.title}</h4>
                    <p className="text-sm text-neutral">
                      {item.event?.date} • {item.event?.location.split(',')[0]}
                    </p>
                    <p className="text-primary font-medium">
                      Rs. {item.event?.price.toLocaleString()}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-neutral hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          
          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-heading font-bold">Rs. {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Services Fee</span>
                <span className="font-heading font-bold">Rs. {calculateServiceFee().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-lg">
                <span className="font-heading font-bold">Total</span>
                <span className="font-heading font-bold text-primary">Rs. {calculateTotal().toLocaleString()}</span>
              </div>
              <Button 
                className="w-full mb-2 bg-primary hover:bg-red-700"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full border border-neutral-light text-neutral-dark hover:bg-neutral-light"
                onClick={onClose}
              >
                Continue Browsing
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
