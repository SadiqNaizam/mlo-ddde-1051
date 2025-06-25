import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Mail, Phone, User, Calendar as CalendarIcon, ShieldCheck } from "lucide-react";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), { message: "Please enter a valid 16-digit card number." }),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Use MM/YY format." }),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), { message: "Enter a valid CVC." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage: React.FC = () => {
  console.log("BookingPage loaded");
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log("Booking form submitted:", data);
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to Kerala has been successfully booked. A confirmation has been sent to your email.",
      variant: "default",
      className: "bg-green-100 text-green-800",
    });
    // Redirect to user dashboard after a short delay
    setTimeout(() => {
      navigate("/user-dashboard"); // Navigate to user dashboard as per user journey
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center">Complete Your Booking</h1>
          <p className="text-muted-foreground text-center mb-8">
            You're just one step away from your incredible journey.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><User /> Traveler Information</CardTitle>
                      <CardDescription>Please enter the primary traveler's details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(+91) 123-456-7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><CreditCard /> Payment Details</CardTitle>
                       <CardDescription>All transactions are secure and encrypted.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John M. Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="0000 0000 0000 0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" size="lg" className="w-full">
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Complete Booking & Pay
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </div>

            {/* Summary Section */}
            <aside className="lg:sticky top-24">
              <Card className="shadow-md">
                <CardHeader>
                  <img src="https://images.unsplash.com/photo-1593693397640-032087413d78?q=80&w=1932&auto=format&fit=crop" alt="Kerala Backwaters" className="rounded-lg mb-4" />
                  <CardTitle>Trip Summary</CardTitle>
                  <CardDescription>Kerala Backwaters Escape</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hotel (5 nights)</span>
                    <span>$1000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return Flights</span>
                    <span>$280.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Private Cab (3 days)</span>
                    <span>$120.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Subtotal</span>
                    <span>$1400.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span>$112.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-primary">
                    <span>Total Cost</span>
                    <span>$1512.00</span>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;