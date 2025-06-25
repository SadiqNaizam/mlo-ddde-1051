import React from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TravelPackageCard from '@/components/TravelPackageCard';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// lucide-react icons
import { ListFilter } from 'lucide-react';

// Mock data for travel packages to simulate search results
const travelPackages = [
  {
    packageSlug: 'golden-triangle-delight',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    destination: 'Golden Triangle',
    title: 'Golden Triangle Delight',
    price: 650,
    highlights: ['5-star Hotel Stay', 'Private Guided Tours', 'Daily Breakfast', 'Airport Transfers'],
  },
  {
    packageSlug: 'kerala-backwater-bliss',
    imageUrl: 'https://images.unsplash.com/photo-1593693397640-3459d856795b?q=80&w=1932&auto=format&fit=crop',
    destination: 'Kerala',
    title: 'Kerala Backwater Bliss',
    price: 800,
    highlights: ['Houseboat Stay', 'Spice Plantation Visit', 'Kathakali Show', 'All Meals Included'],
  },
  {
    packageSlug: 'rajasthan-royal-odyssey',
    imageUrl: 'https://images.unsplash.com/photo-1617541183383-26a978013e64?q=80&w=2070&auto=format&fit=crop',
    destination: 'Rajasthan',
    title: 'Rajasthan Royal Odyssey',
    price: 1200,
    highlights: ['Heritage Palace Stays', 'Camel Safari in Jaisalmer', 'Jaipur City Tour', 'Cultural Evenings'],
  },
  {
    packageSlug: 'goan-beach-getaway',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    destination: 'Goa',
    title: 'Goan Beach Getaway',
    price: 550,
    highlights: ['Beachfront Resort', 'Watersports Activities', 'North & South Goa Tours', 'Daily Breakfast'],
  },
  {
    packageSlug: 'himalayan-adventure-rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1597811986164-1e4fb34e12e3?q=80&w=2070&auto=format&fit=crop',
    destination: 'Rishikesh',
    title: 'Himalayan Adventure',
    price: 720,
    highlights: ['River Rafting & Camping', 'Yoga & Meditation Sessions', 'Trek to Waterfall', 'Bonfire Nights'],
  },
  {
    packageSlug: 'spirit-of-mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1562979314-1ace4f2a233b?q=80&w=2070&auto=format&fit=crop',
    destination: 'Mumbai',
    title: 'The Spirit of Mumbai',
    price: 480,
    highlights: ['Gateway of India Visit', 'Bollywood Studio Tour', 'Street Food Exploration', '4-star Hotel Stay'],
  },
];


const PackagesSearchResultsPage = () => {
    console.log('PackagesSearchResultsPage loaded');
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Discover Your Next Adventure</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Explore our curated packages or filter to find the perfect trip for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ListFilter className="h-5 w-5" />
                                    Filter & Sort
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sort-by">Sort by</Label>
                                    <Select>
                                        <SelectTrigger id="sort-by">
                                            <SelectValue placeholder="Recommended" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="recommended">Recommended</SelectItem>
                                            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                            <SelectItem value="duration">Duration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-sm text-gray-800">Package Inclusions</h4>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="filter-flights" />
                                        <Label htmlFor="filter-flights" className="font-normal text-sm text-gray-600">Flights Included</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="filter-hotels" />
                                        <Label htmlFor="filter-hotels" className="font-normal text-sm text-gray-600">5-Star Hotels</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="filter-meals" />
                                        <Label htmlFor="filter-meals" className="font-normal text-sm text-gray-600">All Meals Included</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="filter-tours" />
                                        <Label htmlFor="filter-tours" className="font-normal text-sm text-gray-600">Guided Tours</Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Results Grid */}
                    <section className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {travelPackages.map((pkg) => (
                                <TravelPackageCard key={pkg.packageSlug} {...pkg} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PackagesSearchResultsPage;