import { useState } from "react";
import { Link } from "wouter";
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth, useCart, useTheme } from "@/lib/store";
import SearchBar from "@/components/common/SearchBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const cartItemCount = getTotalItems();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-primary-foreground hover:bg-primary/20"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start" data-testid="link-home">
                      Home
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="ghost" className="w-full justify-start" data-testid="link-products">
                      All Shirts
                    </Button>
                  </Link>
                  <Link href="/products?category=casual">
                    <Button variant="ghost" className="w-full justify-start" data-testid="link-casual">
                      Casual
                    </Button>
                  </Link>
                  <Link href="/products?category=formal">
                    <Button variant="ghost" className="w-full justify-start" data-testid="link-formal">
                      Formal
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary-foreground" data-testid="text-logo">
                ShirtStore
              </h1>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-primary-foreground hover:bg-primary/20"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary/20"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary/20 relative"
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                    data-testid="text-cart-count"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary/20"
                  data-testid="button-user-menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" data-testid="link-profile">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" data-testid="link-orders">
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" data-testid="link-admin">
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" data-testid="link-login">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/signup" data-testid="link-signup">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
