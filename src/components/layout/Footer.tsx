import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground">India Odyssey Booking</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              Your one-stop platform for planning and booking unforgettable journeys across India.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-medium text-foreground">Company</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
                <li><Link to="/press" className="hover:text-primary">Press</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Support</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Legal</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-muted-foreground/20 pt-8 text-center text-sm">
          <p>&copy; {currentYear} India Odyssey Booking. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;