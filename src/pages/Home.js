import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TripCard } from "@/components/ui/trip-card";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { bookingService } from "@/lib/booking-service";
import { MapPin, Star, Users, Calendar } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const trips = bookingService.getTrips();

  const handleBookNow = (trip) => {
    navigate(`/booking/${trip.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
              Your Next Adventure Awaits
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover amazing destinations with our curated trip plans. Book your van and embark on unforgettable journeys.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Premium Destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                <span>5-Star Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                <span>Small Groups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {trips.length}+
              </div>
              <p className="text-muted-foreground">Amazing Destinations</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                5
              </div>
              <p className="text-muted-foreground">Vans Available Daily</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Plans Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From mountain peaks to ocean shores, we have the perfect trip for every adventurer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {trips.map((trip, index) => (
              <div 
                key={trip.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TripCard trip={trip} onBookNow={handleBookNow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl opacity-90">
              Don't wait – our vans fill up quickly! Book your adventure today and create memories that will last a lifetime.
            </p>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90"
            >
              <Calendar className="h-5 w-5" />
              Book Your Trip Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;