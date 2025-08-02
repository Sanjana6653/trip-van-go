import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bookingService } from "@/lib/booking-service";
import { CheckCircle, Calendar, MapPin, User, Clock, Home, FileText } from "lucide-react";

const ConfirmationPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    if (bookingId) {
      const foundBooking = bookingService.getBookingById(bookingId);
      if (foundBooking) {
        setBooking(foundBooking);
        const foundTrip = bookingService.getTripById(foundBooking.tripId);
        setTrip(foundTrip);
      } else {
        navigate("/");
      }
    }
  }, [bookingId, navigate]);

  if (!booking || !trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-semibold mb-2">Loading...</div>
            <div className="text-muted-foreground">Please wait while we load your booking confirmation.</div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBookingDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow animate-bounce-soft">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your adventure is all set. Get ready for an amazing experience!
            </p>
          </div>

          {/* Booking Details */}
          <Card className="bg-gradient-card shadow-strong mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
                    <div className="font-mono text-sm bg-muted/50 px-3 py-2 rounded">
                      {booking.id}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Trip</div>
                    <div className="font-semibold text-lg">{trip.title}</div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.destination}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Traveler</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-semibold">{booking.userName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Travel Date</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{formatDate(booking.selectedDate)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Duration</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{trip.duration}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Paid</span>
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-accent">
                    ${booking.price}
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                <strong>Booked on:</strong> {formatBookingDate(booking.bookedAt)}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-gradient-card shadow-medium mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p>You'll receive a confirmation email with detailed trip information and packing list.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <p>Our team will contact you 24 hours before departure with pickup details and final instructions.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <p>Arrive at the pickup location 15 minutes early and get ready for your adventure!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/")} variant="outline" size="lg">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            <Button onClick={() => navigate("/admin")} variant="secondary" size="lg">
              <FileText className="h-4 w-4" />
              View All Bookings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;