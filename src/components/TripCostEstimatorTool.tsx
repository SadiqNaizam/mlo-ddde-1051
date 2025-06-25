import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/components/ui/use-toast';
import { Bus, Car, Hotel, Plane, Train } from 'lucide-react';

const COST_CONFIG = {
  hotel: { '3': 50, '4': 100, '5': 200 }, // Cost per night per star rating
  flight: { 'one-way': 150, 'return': 280 }, // Cost per person
  transport: { cab: 40, bus: 15, train: 20 }, // Cost per day
};

const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for user selections
  const [hotelStars, setHotelStars] = useState('4');
  const [nights, setNights] = useState([5]);
  const [flights, setFlights] = useState('return');
  const [transport, setTransport] = useState('cab');
  const [transportDays, setTransportDays] = useState([3]);

  // State for cost calculation
  const [totalCost, setTotalCost] = useState(0);
  const [animatedCost, setAnimatedCost] = useState(0);

  const calculateCost = useCallback(() => {
    const hotelCost = COST_CONFIG.hotel[hotelStars] * nights[0];
    const flightCost = flights !== 'none' ? COST_CONFIG.flight[flights] : 0;
    const transportCost = transport !== 'none' ? COST_CONFIG.transport[transport] * transportDays[0] : 0;

    return hotelCost + flightCost + transportCost;
  }, [hotelStars, nights, flights, transport, transportDays]);

  // Effect to update total cost when selections change
  useEffect(() => {
    const newTotalCost = calculateCost();
    setTotalCost(newTotalCost);
  }, [calculateCost]);

  // Effect to animate the cost when it changes
  useEffect(() => {
    const animation = setInterval(() => {
      setAnimatedCost((prev) => {
        const diff = totalCost - prev;
        if (Math.abs(diff) < 1) {
          clearInterval(animation);
          return totalCost;
        }
        const step = diff / 10;
        return Math.ceil(prev + step);
      });
    }, 25);
    return () => clearInterval(animation);
  }, [totalCost]);

  const handleBooking = () => {
    toast({
      title: 'Booking details prepared!',
      description: `Your custom trip with an estimated cost of $${totalCost.toFixed(2)} is ready for booking.`,
    });
    // In a real app, you would pass state via route state or a global state manager
    navigate('/booking');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hotel Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Hotel className="w-6 h-6 text-primary" /> Accommodation</CardTitle>
              <CardDescription>Select your preferred hotel and duration of stay.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="hotel-stars">Hotel Star Rating</Label>
                <Select value={hotelStars} onValueChange={setHotelStars}>
                  <SelectTrigger id="hotel-stars"><SelectValue placeholder="Select rating" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">★★★ (Standard)</SelectItem>
                    <SelectItem value="4">★★★★ (Comfort)</SelectItem>
                    <SelectItem value="5">★★★★★ (Luxury)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nights">Number of Nights: {nights[0]}</Label>
                <Slider id="nights" min={1} max={30} step={1} value={nights} onValueChange={setNights} />
              </div>
            </CardContent>
          </Card>

          {/* Travel Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Plane className="w-6 h-6 text-primary" /> Flights & Transport</CardTitle>
              <CardDescription>Choose your flight options and local transportation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Flights</Label>
                <ToggleGroup type="single" value={flights} onValueChange={(val) => val && setFlights(val)} className="w-full justify-start">
                  <ToggleGroupItem value="none">None</ToggleGroupItem>
                  <ToggleGroupItem value="one-way">One-way</ToggleGroupItem>
                  <ToggleGroupItem value="return">Return</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <Label className="mb-2 block">Local Transport</Label>
                <ToggleGroup type="single" value={transport} onValueChange={(val) => val && setTransport(val)} className="w-full justify-start">
                  <ToggleGroupItem value="none">None</ToggleGroupItem>
                  <ToggleGroupItem value="cab"><Car className="h-4 w-4 mr-2" />Cab</ToggleGroupItem>
                  <ToggleGroupItem value="bus"><Bus className="h-4 w-4 mr-2" />Bus</ToggleGroupItem>
                  <ToggleGroupItem value="train"><Train className="h-4 w-4 mr-2" />Train</ToggleGroupItem>
                </ToggleGroup>
              </div>
              {transport !== 'none' && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="transport-days">Days with Local Transport: {transportDays[0]}</Label>
                  <Slider id="transport-days" min={1} max={nights[0]} step={1} value={transportDays} onValueChange={setTransportDays} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Column */}
        <div className="lg:sticky top-24">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Estimated Trip Cost</CardTitle>
              <CardDescription>This is a real-time estimate based on your selections.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-center text-primary tracking-tight">
                ${animatedCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handleBooking}>
                Proceed to Book
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripCostEstimatorTool;