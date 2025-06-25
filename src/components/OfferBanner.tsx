import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferBannerProps {
  title: string;
  description: string;
  ctaText: string;
  /** The destination path for the call-to-action link. Defaults to '/packages-search-results' */
  ctaLink?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Limited Time Offer",
  description = "Book now and get exclusive discounts on our top destinations.",
  ctaText = "Explore Deals",
  ctaLink = '/packages-search-results',
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    // The outer div creates the gradient border and the glow effect via box-shadow.
    <div
      className={cn(
        'relative rounded-xl p-px bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-shadow hover:shadow-xl hover:shadow-sky-500/40',
        className
      )}
    >
      {/* The inner div has the main background color and content, creating the bordered effect. */}
      <div className="relative flex flex-col items-center justify-between gap-6 rounded-lg bg-gray-900 p-8 text-white md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button asChild size="lg" className="bg-white font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;