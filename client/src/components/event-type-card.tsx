import { Link } from "wouter";
import { EventType } from "@shared/schema";
import { ArrowRight } from "lucide-react";

interface EventTypeCardProps {
  eventType: EventType;
}

export function EventTypeCard({ eventType }: EventTypeCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img 
          className="w-full h-full object-cover" 
          src={eventType.imageUrl} 
          alt={eventType.name} 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-xl font-heading font-bold text-white">{eventType.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-neutral mb-4">{eventType.description}</p>
        <Link href={`/events?type=${eventType.id}`} className="text-primary font-medium hover:text-red-700 transition-colors flex items-center">
          View Events <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
