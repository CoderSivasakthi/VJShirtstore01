import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/ProductCard";
import { type Product } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.slice(0, 4), // Get first 4 products as featured
  });

  const categories = [
    {
      name: "Casual",
      icon: "👔",
      link: "/products?category=casual",
      description: "Comfortable everyday wear",
    },
    {
      name: "Formal",
      icon: "🤵",
      link: "/products?category=formal",
      description: "Professional and elegant",
    },
    {
      name: "Sports",
      icon: "🏃",
      link: "/products?category=sports",
      description: "Active and athletic",
    },
    {
      name: "Premium",
      icon: "✨",
      link: "/products?material=silk",
      description: "Luxury collection",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-hero-title">
                Premium Shirts Collection
              </h2>
              <p className="text-xl mb-8 opacity-90" data-testid="text-hero-description">
                Discover the finest quality shirts with modern designs and comfortable fits
              </p>
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="btn-secondary text-lg px-8 py-3"
                  data-testid="button-shop-now"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Premium shirt collection showcase"
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8" data-testid="text-categories-title">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" data-testid={`card-category-${category.name.toLowerCase()}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-foreground" data-testid="text-featured-title">
              Featured Shirts
            </h3>
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-all">
                View All →
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg border border-border animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-8 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="grid-featured-products">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-shipping">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-lg font-semibold mb-2">Free Shipping</h4>
              <p className="text-muted-foreground">Free delivery on orders above ₹999</p>
            </div>
            <div className="text-center" data-testid="feature-returns">
              <div className="text-4xl mb-4">↩️</div>
              <h4 className="text-lg font-semibold mb-2">Easy Returns</h4>
              <p className="text-muted-foreground">7-day hassle-free return policy</p>
            </div>
            <div className="text-center" data-testid="feature-quality">
              <div className="text-4xl mb-4">✨</div>
              <h4 className="text-lg font-semibold mb-2">Premium Quality</h4>
              <p className="text-muted-foreground">Only the finest materials and craftsmanship</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
