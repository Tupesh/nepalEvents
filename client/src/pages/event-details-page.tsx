import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Calendar, Clock, MapPin, Users, Heart, DollarSign, Share2, ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Event, EventType } from "@shared/schema";

export default function EventDetailsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [, params] = useRoute<{ id: string }>("/events/:id");
  
  const { user } = useAuth();
  const { addToCartMutation } = useCart();
  
  const eventId = params?.id ? parseInt(params.id) : 0;
  
  const { data: event, isLoading: isLoadingEvent } = useQuery<Event>({
    queryKey: [`/api/events/${eventId}`],
    enabled: !!eventId,
  });
  
  const { data: eventTypes = [] } = useQuery<EventType[]>({
    queryKey: ["/api/event-types"],
  });
  
  const [, navigate] = useLocation();
  
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add events to your cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    addToCartMutation.mutate({
      eventId,
      quantity: 1
    }, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: `${event?.title || 'Event'} added to your cart`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to add to cart. Please try again.",
          variant: "destructive",
        });
      }
    });
  };
  
  const handleRegisterNow = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to register for events",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    // API call to register for the event directly
    fetch("/api/register-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId }),
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
      })
      .then(() => {
        setRegistrationSuccess(true);
      })
      .catch(error => {
        toast({
          title: "Registration failed",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      });
  };
  
  // Get event type name
  const getEventTypeName = () => {
    if (!event) return "";
    const eventType = eventTypes.find(type => type.id === event.eventTypeId);
    return eventType ? eventType.name : "";
  };
  
  // Determine badge color based on event type
  const getBadgeColor = () => {
    if (!event) return "bg-primary";
    
    switch (event.eventTypeId) {
      case 1: return "bg-primary"; // Wedding
      case 2: return "bg-green-600"; // Bratabandha
      case 3: return "bg-accent"; // Pasni
      default: return "bg-blue-500";
    }
  };
  
  if (isLoadingEvent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onCartOpen={() => setIsCartOpen(true)} />
        <div className="flex-grow flex justify-center items-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
                <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
                <Link href="/events">
                  <Button className="bg-primary hover:bg-red-700">Browse All Events</Button>
                </Link>
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
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {/* Event Header/Hero */}
        <div 
          className="relative h-[300px] md:h-[400px] bg-cover bg-center" 
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 h-full flex items-end relative z-10">
            <div className="pb-8 w-full">
              <Badge className={`${getBadgeColor()} mb-4`}>{getEventTypeName()}</Badge>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>Rs. {event.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Event Description */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-heading font-bold mb-4">Event Description</h2>
                  <p className="text-neutral mb-6">{event.description}</p>
                  
                  <h3 className="text-xl font-heading font-bold mb-3">What to Expect</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    <li>Traditional Nepali ceremonies with authentic rituals</li>
                    <li>Cultural performances and music</li>
                    <li>Delicious authentic Nepali cuisine</li>
                    <li>Cultural attire and decorations</li>
                    <li>Experienced event coordinators and guides</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Right: Booking Card */}
            <div>
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-heading font-bold text-primary">Rs. {event.price.toLocaleString()}</span>
                    <p className="text-sm text-neutral">per person</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-t border-b">
                      <span className="font-medium">Event Type</span>
                      <span>{getEventTypeName()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={handleAddToCart}
                      disabled={addToCartMutation.isPending}
                    >
                      {addToCartMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    <Button variant="ghost" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Registration Success Dialog */}
      <Dialog open={registrationSuccess} onOpenChange={setRegistrationSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center">
              You have successfully registered for the event.
            </DialogDescription>
          </DialogHeader>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral">Event:</span>
              <span className="font-medium">{event.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral">Type:</span>
              <span className="font-medium">{getEventTypeName()}</span>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-center">
            <Button 
              type="button" 
              className="bg-primary hover:bg-red-700"
              onClick={() => setRegistrationSuccess(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
