import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import KhaltiCheckout from 'khalti-checkout-web';

// Khalti configuration
const config = {
  // Replace with your actual public key
  publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
  productIdentity: "nepali-cultural-events",
  productName: "Nepali Cultural Events",
  productUrl: "https://nepaliculturalevents.com",
  eventHandler: {
    onSuccess(payload: any) {
      // Hit your API endpoint here with the payment details
      console.log(payload);
      toast({
        title: "Payment Successful",
        description: "Your payment was successful and registration is complete.",
      });
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    },
    onClose() {
      console.log("Widget is closing");
    }
  }
};

interface KhaltiCheckoutProps {
  amount: number ; // Amount in paisa (100 paisa = 1 NPR)
  customerInfo?: {
    name: string;
    email?: string;
    phone?: string;
  };
  buttonText?: string;
  className?: string;
}

export function KhaltiCheckoutButton({ 
  amount, 
  customerInfo, 
  buttonText = "Pay with Khalti",
  className = ""
}: KhaltiCheckoutProps) {
  const { user } = useAuth();
  const { clearCartMutation } = useCart();
  const checkoutRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Khalti Checkout
    if (!checkoutRef.current) {
      // Add customer info if available
      const khaltiConfig = {
        ...config,
        amount: Math.round(amount*100), // Convert to paisa
      };

      if (customerInfo) {
        khaltiConfig.customerInfo = {
          name: customerInfo.name,
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
        };
      }

      checkoutRef.current = new KhaltiCheckout(khaltiConfig);
    }

    // Clean up on unmount
    return () => {
      checkoutRef.current = null;
    };
  }, [amount, customerInfo]);

  const handlePayWithKhalti = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to make a payment",
        variant: "destructive",
      });
      return;
    }

    // Open Khalti widget
    if (checkoutRef.current) {
      checkoutRef.current.show({ amount });
    }

 
  };

  return (
    <button
      className={`khalti-button bg-[#5C2D91] hover:bg-[#4A2175] text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={handlePayWithKhalti}
    >
      {buttonText}
    </button>
  );
}