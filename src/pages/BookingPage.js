import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/lib/booking-service";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, Users, AlertCircle, CheckCircle, CreditCard } from "lucide-react";

const BookingPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [trip, setTrip] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [userName, setUserName] = useState("");
  const [availability, setAvailability] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (tripId) {
      const foundTrip = bookingService.getTripById(tripId);
      if (foundTrip) {
        setTrip(foundTrip);
      } else {
        toast({
          title: "Trip not found",
          description: "The requested trip could not be found.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [tripId, navigate, toast]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setIsCheckingAvailability(true);
      // Simulate API call delay
      setTimeout(() => {
        const result = bookingService.checkAvailability(date);
        setAvailability(result);
        setIsCheckingAvailability(false);
      }, 500);
    } else {
      setAvailability(null);
    }
  };

  const handleBooking = () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to proceed with booking.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Date required",
        description: "Please select a date for your trip.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const result = bookingService.createBooking(tripId, userName, selectedDate);
      
      if (result.success) {
        toast({
          title: "Booking Confirmed!",
          description: result.message,
        });
        navigate(`/confirmation/${result.booking.id}`);
      } else {
        toast({
          title: "Booking Failed",
          description: result.message,
          variant: "destructive",
        });
        // Refresh availability
        handleDateChange(selectedDate);
      }
      setIsBooking(false);
    }, 2000);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-2">Loading...</div>
            <div className="text-muted-foreground">Please wait while we load your trip details.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Trip Details */}
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  {trip.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{trip.destination}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {trip.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Duration</div>
                      <div className="text-sm text-muted-foreground">{trip.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Capacity</div>
                      <div className="text-sm text-muted-foreground">Up to {trip.maxCapacity} people</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Price</span>
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-accent">
                      ${trip.price}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Your Trip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Input
                    id="date"
                    type="date"
                    min={getTomorrowDate()}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Availability Status */}
                {selectedDate && (
                  <div className="p-4 rounded-lg border">
                    {isCheckingAvailability ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Checking availability...</span>
                      </div>
                    ) : availability ? (
                      availability.available ? (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">
                            Available! {availability.vansLeft} van{availability.vansLeft !== 1 ? 's' : ''} left
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-destructive">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-semibold">
                            Sorry, no vans available for this date
                          </span>
                        </div>
                      )
                    ) : null}
                  </div>
                )}

                {/* Payment Simulation */}
                {availability && availability.available && userName && selectedDate && (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span>Secure payment processing (Demo)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      This is a demo application. No real payment will be processed.
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleBooking}
                  disabled={!availability || !availability.available || !userName || !selectedDate || isBooking}
                  className="w-full"
                  size="lg"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Confirm Booking - ${trip.price}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;