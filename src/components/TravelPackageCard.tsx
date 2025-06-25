import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from 'lucide-react';

interface TravelPackageCardProps {
  imageUrl: string;
  destination: string;
  title: string;
  price: number;
  highlights: string[];
  packageSlug: string;
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({
  imageUrl,
  destination,
  title,
  price,
  highlights,
  packageSlug,
}) => {
  console.log(`TravelPackageCard loaded for: ${title}`);

  return (
    <Link to="/booking" aria-label={`View details and book ${title}`}>
      <Card className="relative group w-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
        <div className="h-80">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content container positioned at the bottom */}
        <div className="absolute bottom-0 left-0 p-6 w-full text-white">
          {/* Static content visible by default */}
          <div className="transition-all duration-300 ease-in-out group-hover:-translate-y-20 group-hover:opacity-0">
            <Badge variant="secondary" className="mb-2 uppercase tracking-wider">{destination}</Badge>
            <h3 className="text-2xl font-bold truncate">{title}</h3>
            <p className="text-lg font-semibold">From ${price.toLocaleString()}</p>
          </div>
          
          {/* Highlights that appear on hover */}
          <div className="absolute bottom-6 left-6 right-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out overflow-hidden">
            <h4 className="font-bold text-lg mb-2">Package Inclusions:</h4>
            <ul className="text-sm space-y-1">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TravelPackageCard;