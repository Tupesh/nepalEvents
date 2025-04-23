import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Event, EventType } from "@shared/schema";

interface EventCardProps {
  event: Event;
  eventType?: EventType;
}

export function EventCard({ event, eventType }: EventCardProps) {
  const { addToCartMutation } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = () => {
    // Check if user is logged in
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
      eventId: event.id,
      quantity: 1
    }, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: `${event.title} added to your cart`,
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
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add favorites",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${event.title} removed from your favorites` 
        : `${event.title} added to your favorites`,
    });
  };
  
  // Determine badge color based on event type
  const getBadgeColor = (typeId: number) => {
    switch (typeId) {
      case 1: return "bg-primary"; // Wedding
      case 2: return "bg-green-600"; // Bratabandha
      case 3: return "bg-accent"; // Pasni
      default: return "bg-blue-500";
    }
  };
  
  // Get event type name
  const getEventTypeName = () => {
    if (eventType) return eventType.name;
    
    switch (event.eventTypeId) {
      case 1: return "Wedding";
      case 2: return "Bratabandha";
      case 3: return "Pasni";
      default: return "Other";
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          className="w-full h-56 object-cover" 
          src={event.imageUrl} 
          alt={event.title} 
        />
        <div className={`absolute top-4 left-4 ${getBadgeColor(event.eventTypeId)} text-white text-sm font-medium px-3 py-1 rounded-full`}>
          {getEventTypeName()}
        </div>
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-heading font-bold mb-3">{event.title}</h3>
        
        <p className="text-neutral mb-4">
          {event.description.length > 120 
            ? `${event.description.substring(0, 120)}...` 
            : event.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-lg">Rs. {event.price.toLocaleString()}</span>
          <div className="flex space-x-2">
            <Button 
              size="sm"
              variant="outline"
              className="bg-secondary text-white border-secondary hover:bg-orange-700 hover:text-white"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                </>
              )}
            </Button>
            <Link href={`/events/${event.id}`}>
              <Button 
                size="sm"
                className="bg-primary text-white hover:bg-red-700"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
