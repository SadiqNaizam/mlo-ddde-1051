import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Package,
  Hotel,
  Plane,
  Train,
  Calendar as CalendarIcon,
  Search,
} from "lucide-react";

type SearchMode = "packages" | "hotels" | "flights" | "trains";

const MultiModalSearchForm = () => {
  console.log("MultiModalSearchForm loaded");
  const navigate = useNavigate();

  // State for Packages
  const [packageDestination, setPackageDestination] = useState("");
  const [packageDateRange, setPackageDateRange] = useState<Date | undefined>(undefined);

  // State for Hotels
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState<Date | undefined>(undefined);
  const [hotelCheckOut, setHotelCheckOut] = useState<Date | undefined>(undefined);
  const [hotelGuests, setHotelGuests] = useState(2);

  // State for Flights
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightDepart, setFlightDepart] = useState<Date | undefined>(undefined);
  const [flightReturn, setFlightReturn] = useState<Date | undefined>(undefined);
  
  // State for Trains
  const [trainFrom, setTrainFrom] = useState("");
  const [trainTo, setTrainTo] = useState("");
  const [trainDate, setTrainDate] = useState<Date | undefined>(undefined);

  const handleSearch = (e: React.FormEvent, mode: SearchMode) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("mode", mode);
    
    // Add more specific params based on mode
    if (mode === 'packages') {
      params.append('destination', packageDestination);
      if(packageDateRange) params.append('date', packageDateRange.toISOString().split('T')[0]);
    } else if (mode === 'hotels') {
      params.append('location', hotelLocation);
      if(hotelCheckIn) params.append('checkin', hotelCheckIn.toISOString().split('T')[0]);
      if(hotelCheckOut) params.append('checkout', hotelCheckOut.toISOString().split('T')[0]);
      params.append('guests', hotelGuests.toString());
    }

    console.log(`Searching for ${mode} with params:`, params.toString());
    // Navigate to a search results page
    navigate(`/packages-search-results?${params.toString()}`);
  };

  const DatePicker = ({
    date,
    setDate,
    placeholder,
  }: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    placeholder: string;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
            <TabsTrigger value="packages" className="py-2"><Package className="h-4 w-4 mr-2" />Packages</TabsTrigger>
            <TabsTrigger value="hotels" className="py-2"><Hotel className="h-4 w-4 mr-2" />Hotels</TabsTrigger>
            <TabsTrigger value="flights" className="py-2"><Plane className="h-4 w-4 mr-2" />Flights</TabsTrigger>
            <TabsTrigger value="trains" className="py-2"><Train className="h-4 w-4 mr-2" />Trains</TabsTrigger>
          </TabsList>
          
          {/* Packages Tab */}
          <TabsContent value="packages">
            <form onSubmit={(e) => handleSearch(e, "packages")} className="mt-4 p-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <Label htmlFor="package-destination">Destination</Label>
                      <Input id="package-destination" placeholder="e.g., Kerala, Goa, Rajasthan" value={packageDestination} onChange={e => setPackageDestination(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                      <Label htmlFor="package-date">Approx. Travel Date</Label>
                      <DatePicker date={packageDateRange} setDate={setPackageDateRange} placeholder="Pick a date" />
                  </div>
              </div>
              <Button type="submit" className="w-full">
                  <Search className="h-4 w-4 mr-2" /> Search Packages
              </Button>
            </form>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels">
             <form onSubmit={(e) => handleSearch(e, "hotels")} className="mt-4 p-1 space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="hotel-location">Location</Label>
                    <Input id="hotel-location" placeholder="Enter a city or hotel name" value={hotelLocation} onChange={e => setHotelLocation(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="hotel-checkin">Check-in</Label>
                        <DatePicker date={hotelCheckIn} setDate={setHotelCheckIn} placeholder="Check-in date" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="hotel-checkout">Check-out</Label>
                        <DatePicker date={hotelCheckOut} setDate={setHotelCheckOut} placeholder="Check-out date" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="hotel-guests">Guests</Label>
                        <Input id="hotel-guests" type="number" min="1" placeholder="2" value={hotelGuests} onChange={e => setHotelGuests(parseInt(e.target.value, 10))}/>
                    </div>
                </div>
                <Button type="submit" className="w-full"><Search className="h-4 w-4 mr-2" />Search Hotels</Button>
             </form>
          </TabsContent>
          
          {/* Flights Tab */}
          <TabsContent value="flights">
            <div className="mt-4 p-4 text-center text-gray-500 bg-gray-50 rounded-md">
                <p>Flight search functionality is coming soon.</p>
                <p className="text-sm">We are working hard to bring you the best flight deals.</p>
            </div>
          </TabsContent>
          
          {/* Trains Tab */}
          <TabsContent value="trains">
             <div className="mt-4 p-4 text-center text-gray-500 bg-gray-50 rounded-md">
                <p>Train booking will be available shortly.</p>
                <p className="text-sm">Plan your rail journey across India with us soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MultiModalSearchForm;