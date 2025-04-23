import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { EventCard } from "@/components/event-card";
import { Loader2 } from "lucide-react";
import { Event, EventType } from "@shared/schema";

export default function EventsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { data: eventTypes = [] } = useQuery<EventType[]>({
    queryKey: ["/api/event-types"],
  });
  
  const { data: events = [], isLoading: isLoadingEvents } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-600 text-transparent bg-clip-text">Nepali Cultural Events</h1>
            <p className="text-neutral max-w-3xl mx-auto">
              Discover and register for authentic Nepali cultural events. Browse through our collection of traditional ceremonies, weddings, and celebrations.
            </p>
          </div>
        </section>
        
        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoadingEvents ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-heading font-bold mb-2">No Events Available</h3>
                <p className="text-neutral mb-6">
                  There are currently no events scheduled. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    eventType={eventTypes.find(type => type.id === event.eventTypeId)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
