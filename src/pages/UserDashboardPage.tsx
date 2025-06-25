import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, LogOut } from 'lucide-react';

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');

  // Placeholder data
  const user = {
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    initials: 'AS',
  };

  const bookingHistory = [
    { id: 'IOB-123', destination: 'Golden Triangle Tour', date: '2023-10-15', status: 'Completed', price: 1200 },
    { id: 'IOB-101', destination: 'Kerala Backwaters', date: '2023-03-20', status: 'Completed', price: 950 },
    { id: 'IOB-089', destination: 'Rajasthan Forts', date: '2022-11-05', status: 'Completed', price: 1500 },
  ];

  const upcomingTrips = [
    { id: 'IOB-145', destination: 'Goa Beach Escape', date: '2024-08-22', status: 'Confirmed', price: 800 },
    { id: 'IOB-152', destination: 'Himalayan Trek', date: '2024-09-10', status: 'Confirmed', price: 1800 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings, trips, and account settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: User Profile */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="ghost" size="sm" className="mt-2 w-full text-red-500 hover:text-red-600 dark:hover:text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Right Column: Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming-trips">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming-trips">Upcoming Trips</TabsTrigger>
                <TabsTrigger value="booking-history">Booking History</TabsTrigger>
                <TabsTrigger value="account-settings">Account Settings</TabsTrigger>
              </TabsList>

              {/* Upcoming Trips Tab */}
              <TabsContent value="upcoming-trips">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Trips</CardTitle>
                    <CardDescription>Here are your confirmed future travels.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Travel Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingTrips.map((trip) => (
                          <TableRow key={trip.id}>
                            <TableCell className="font-medium">{trip.id}</TableCell>
                            <TableCell>{trip.destination}</TableCell>
                            <TableCell>{trip.date}</TableCell>
                            <TableCell>
                              <Badge variant="default">{trip.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">${trip.price.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Booking History Tab */}
              <TabsContent value="booking-history">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                    <CardDescription>A record of all your past adventures with us.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                           <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingHistory.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.destination}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{booking.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">${booking.price.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings Tab */}
              <TabsContent value="account-settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your personal information and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input id="password" type="password" placeholder="Enter new password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;