import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { EventTypeCard } from "@/components/event-type-card";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Loader2 } from "lucide-react";
import { EventType, Event } from "@shared/schema";

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { data: eventTypes = [], isLoading: isLoadingEventTypes } = useQuery<EventType[]>({
    queryKey: ["/api/event-types"],
  });
  
  const { data: events = [], isLoading: isLoadingEvents } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('https://fulltimeexplorer.com/wp-content/uploads/2020/05/Nepali-Wedding-Kusha-Ring.jpg')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Celebrate Nepali Cultural Events</h1>
              <p className="text-lg md:text-xl text-white mb-8">Discover and register for authentic Nepali cultural experiences including weddings, Bratabandha, and Pasni celebrations.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#events">
                  <Button className="w-full sm:w-auto px-6 py-3 bg-primary text-white hover:bg-red-700">
                    Explore Events
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Explore Event Types</h2>
            
            {isLoadingEventTypes ? (
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {eventTypes.map(eventType => (
                  <EventTypeCard key={eventType.id} eventType={eventType} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-heading font-bold">Upcoming Events</h2>
            </div>
            
            {isLoadingEvents ? (
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.slice(0, 6).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                
                {events.length > 6 && (
                  <div className="text-center mt-12">
                    <Link href="/events">
                      <Button variant="outline" className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white">
                        Load More Events
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-4">Why Choose Us</h2>
            <p className="text-center text-neutral max-w-2xl mx-auto mb-12">We specialize in authentic Nepali cultural events with attention to tradition and detail.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-neutral-light inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <i className="fas fa-hand-holding-heart text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Authentic Experience</h3>
                <p className="text-neutral">True-to-tradition Nepali cultural celebrations with proper rituals.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-neutral-light inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <i className="fas fa-users text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Community Connection</h3>
                <p className="text-neutral">Connect with the Nepali community and cultural experts.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-neutral-light inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <i className="fas fa-calendar-check text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Easy Registration</h3>
                <p className="text-neutral">Simple event booking process with secure payment options.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-neutral-light inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                  <i className="fas fa-star text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Quality Assurance</h3>
                <p className="text-neutral">High standards for all events with comprehensive support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-neutral-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">What People Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {/* <img className="w-12 h-12 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Testimonial author" /> */}
                  <div>
                    <h4 className="font-heading font-bold">Tupesh Ghimire</h4>
                    <div className="flex text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-neutral">"Our sister's wedding was beautifully organized with all the traditional elements. The team truly understood Nepali customs and made the day special."</p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {/* <img className="w-12 h-12 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Testimonial author" /> */}
                  <div>
                    <h4 className="font-heading font-bold">Bishal Mishra</h4>
                    <div className="flex text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
                <p className="text-neutral">"The Pasni ceremony for my neiece was perfect. Everything from the venue to the food was authentic and exceeded our expectations."</p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {/* <img className="w-12 h-12 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Testimonial author" /> */}
                  <div>
                    <h4 className="font-heading font-bold">Bimal Diyal</h4>
                    <div className="flex text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-neutral">"My nephew's Bratabandha was organized perfectly. The priests were knowledgeable and the whole ceremony felt authentic and meaningful."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to Celebrate Your Cultural Event?</h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">Create a memorable experience with our authentic cultural event services. Book now or contact us to learn more.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/events">
                <Button className="w-full sm:w-auto px-8 py-3 bg-white text-primary hover:bg-gray-100">
                  Browse Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
