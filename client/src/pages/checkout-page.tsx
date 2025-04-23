import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { KhaltiCheckoutButton } from "@/components/khalti-checkout";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { CartItem } from "@shared/schema";

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { cartItems, calculateTotal, calculateSubtotal, calculateServiceFee, clearCartMutation } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to access the checkout page",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, navigate]);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isSuccess) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add events to proceed with checkout.",
        variant: "destructive",
      });
      navigate("/events");
    }
  }, [cartItems, navigate, isSuccess]);

  const handleStandardCheckout = () => {
    clearCartMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
        setIsSuccess(true);
        // Redirect after a delay
        setTimeout(() => {
          navigate("/events");
        }, 5000);
      },
      onError: (error) => {
        toast({
          title: "Checkout Failed",
          description: error.message || "There was an error during checkout",
          variant: "destructive",
        });
      },
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onCartOpen={() => {}} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  // Show success message after checkout
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onCartOpen={() => {}} />
        <div className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-2">Registration Successful!</CardTitle>
                <p className="text-neutral mb-6">
                  Thank you for registering for our Nepali cultural events. You will receive confirmation details shortly.
                </p>
                <Button 
                  onClick={() => navigate("/events")}
                  className="bg-primary hover:bg-red-700"
                >
                  Browse More Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartOpen={() => {}} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap md:flex-nowrap gap-4">
                        <img 
                          src={item.event?.imageUrl} 
                          alt={item.event?.title} 
                          className="w-full md:w-32 h-24 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold">{item.event?.title}</h3>
                          <div className="text-neutral text-sm">
                            <p>Date: {item.event?.date}</p>
                            <p>Time: {item.event?.time}</p>
                            <p>Location: {item.event?.location}</p>
                          </div>
                        </div>
                        <div className="font-semibold">
                          Rs. {item.event?.price.toLocaleString()}
                        </div>
                      </div>
                      {cartItems.indexOf(item) < cartItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Payment Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rs. {calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>Rs. {calculateServiceFee().toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Rs. {calculateTotal().toLocaleString()}</span>
                    </div>
                    
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      <AlertTitle className="text-blue-700">Payment Options</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Choose your preferred payment method below.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3 pt-4">
                      <KhaltiCheckoutButton 
                        amount={calculateTotal()} 
                        className="w-full"
                        customerInfo={{ name: user.fullName }}
                        buttonText="Pay with Khalti"
                      />
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:bg-red-700"
                        onClick={handleStandardCheckout}
                        disabled={clearCartMutation.isPending}
                      >
                        {clearCartMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Pay on Arrival"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}