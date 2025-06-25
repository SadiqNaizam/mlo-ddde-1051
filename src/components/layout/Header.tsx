import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plane, UserCircle, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  console.log('Header loaded');
  const [isLoggedIn] = useState(false); // Mocked auth state

  const navLinks = [
    { to: "/packages-search-results", label: "Packages" },
    { to: "/offers", label: "Offers" }, // Placeholder route
    { to: "/trip-cost-estimator", label: "Trip Cost Estimator" },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">India Odyssey Booking</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/user-dashboard">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User Profile</span>
              </Link>
            </Button>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Login</Button>
              <Button>Register</Button>
            </div>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 p-4">
                  <Link to="/" className="flex items-center gap-2 mb-4">
                     <Plane className="h-6 w-6 text-primary" />
                     <span className="font-bold text-lg">India Odyssey Booking</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>
                  <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                     {isLoggedIn ? (
                        <Link to="/user-dashboard" className="w-full">
                           <Button variant="outline" className="w-full">Profile</Button>
                        </Link>
                     ) : (
                        <>
                           <Button variant="ghost" className="w-full">Login</Button>
                           <Button className="w-full">Register</Button>
                        </>
                     )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;