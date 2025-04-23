import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";

export function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <i className="fas fa-om text-primary text-2xl mr-2"></i>
              <span className="font-heading font-bold text-xl text-primary">नेपाली संस्कृति</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium ${location === '/' ? 'text-primary' : 'text-neutral-dark hover:text-primary'} transition-colors`}>
              Home
            </Link>
            <Link href="/events" className={`font-medium ${location === '/events' ? 'text-primary' : 'text-neutral-dark hover:text-primary'} transition-colors`}>
              Events
            </Link>
            <Link href="/about" className={`font-medium ${location === '/about' ? 'text-primary' : 'text-neutral-dark hover:text-primary'} transition-colors`}>
              About
            </Link>
            <Link href="/contact" className={`font-medium ${location === '/contact' ? 'text-primary' : 'text-neutral-dark hover:text-primary'} transition-colors`}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCartOpen}
              className="relative p-2 text-neutral hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Button>
            
            {user ? (
              /* User Menu (Logged in state) */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center focus:outline-none">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-neutral-light text-primary">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 font-medium text-neutral-dark hidden sm:block">
                      {user.fullName}
                    </span>
                    <ChevronDown className="ml-1 text-xs text-neutral-dark h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Login/Signup Buttons (Not logged in state) */
              <div className="flex items-center space-x-2">
                <Link href="/auth">
                  <Button variant="ghost" className="text-neutral-dark hover:text-primary transition-colors">
                    Login
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-primary text-white hover:bg-red-700 transition-colors">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-neutral-dark hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light">
              Home
            </Link>
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light">
              Events
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
