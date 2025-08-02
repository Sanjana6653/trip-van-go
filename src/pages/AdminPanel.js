import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bookingService } from "@/lib/booking-service";
import { Shield, Users, Calendar, TrendingUp, RefreshCw, FileText } from "lucide-react";

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const allBookings = bookingService.getAllBookings();
      setBookings(allBookings);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getUniqueBookingDates = () => {
    const dates = bookings.map(booking => booking.selectedDate);
    return [...new Set(dates)].sort();
  };

  const getTotalRevenue = () => {
    return bookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((total, booking) => total + booking.price, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-secondary rounded-xl">
                <Shield className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Monitor all trip bookings and manage your business.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{bookings.length}</div>
                    <div className="text-sm text-muted-foreground">Total Bookings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Confirmed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{getUniqueBookingDates().length}</div>
                    <div className="text-sm text-muted-foreground">Booking Days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${getTotalRevenue()}</div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card className="bg-gradient-card shadow-strong">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">All Bookings</CardTitle>
                <Button onClick={loadBookings} variant="outline" size="sm" disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <div className="text-muted-foreground">Loading bookings...</div>
                  </div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg mb-2">No bookings yet</div>
                  <div className="text-sm text-muted-foreground">Bookings will appear here once customers start booking trips.</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Booking ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Trip Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Travel Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Booked On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr 
                          key={booking.id} 
                          className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-mono text-sm text-muted-foreground">
                              {booking.id.split('_')[1]}...
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold">{booking.tripName}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.userName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{formatDate(booking.selectedDate)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={getStatusVariant(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold">${booking.price}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">
                              {formatDateTime(booking.bookedAt)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;