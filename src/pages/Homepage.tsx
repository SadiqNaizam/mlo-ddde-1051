import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Components
import MultiModalSearchForm from '@/components/MultiModalSearchForm';
import TravelPackageCard from '@/components/TravelPackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Button } from '@/components/ui/button';

// Placeholder data for featured travel packages
const featuredPackages = [
  {
    packageSlug: 'golden-triangle-delight',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    destination: 'North India',
    title: 'Golden Triangle Delight',
    price: 699,
    highlights: ['Visit Taj Mahal at Sunrise', 'Explore Amber Fort in Jaipur', 'Guided tour of Delhi'],
  },
  {
    packageSlug: 'kerala-backwater-bliss',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop',
    destination: 'Kerala',
    title: 'Kerala Backwater Bliss',
    price: 850,
    highlights: ['Houseboat stay in Alleppey', 'Tea plantation visit in Munnar', 'Kathakali dance show'],
  },
  {
    packageSlug: 'royal-rajasthan-odyssey',
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14e7a781a15a?q=80&w=1974&auto=format&fit=crop',
    destination: 'Rajasthan',
    title: 'Royal Rajasthan Odyssey',
    price: 999,
    highlights: ['Explore the blue city of Jodhpur', 'Camel safari in Thar Desert', 'Stay in a heritage hotel'],
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1532375839097-2e6503a4a159?q=80&w=2070&auto=format&fit=crop"
              alt="Beautiful landscape of India"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Plan Your Unforgettable India Odyssey
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
              Discover, plan, and book your entire trip with a single, elegant tool.
            </p>
            <div className="w-full mt-8">
              <MultiModalSearchForm />
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 lg:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Featured Travel Packages</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Handpicked journeys to inspire your next adventure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <TravelPackageCard key={pkg.packageSlug} {...pkg} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/packages-search-results">View All Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <OfferBanner 
              title="Monsoon Travel Bonanza"
              description="Get up to 20% off on selected packages. Embrace the magic of India this season."
              ctaText="Explore Monsoon Deals"
              ctaLink="/packages-search-results?season=monsoon"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;