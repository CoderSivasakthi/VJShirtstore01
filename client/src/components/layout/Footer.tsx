import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">ShirtStore</h3>
            <p className="text-muted-foreground mb-4">
              Your one-stop destination for premium quality shirts. Style meets comfort in every piece.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-products">
                    All Shirts
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=casual">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-casual">
                    Casual
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=formal">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-formal">
                    Formal
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-size-guide">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-shipping">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-returns">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-cookies">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-refund">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground" data-testid="text-copyright">
            &copy; 2024 ShirtStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-muted-foreground">We Accept:</span>
            <div className="flex space-x-2 text-2xl">
              <span className="text-blue-600">💳</span>
              <span className="text-red-500">💳</span>
              <span className="text-blue-500">💳</span>
              <span className="text-green-600">🏦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
