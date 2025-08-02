import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  destination: string;
  maxCapacity: number;
}

interface TripCardProps {
  trip: Trip;
  onBookNow: (trip: Trip) => void;
}

export const TripCard = ({ trip, onBookNow }: TripCardProps) => {
  return (
    <Card className="group bg-gradient-card hover:shadow-strong transition-all duration-300 hover:scale-105 border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {trip.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{trip.destination}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
            ${trip.price}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {trip.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Up to {trip.maxCapacity} people</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onBookNow(trip)}
          className="w-full"
          size="lg"
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};