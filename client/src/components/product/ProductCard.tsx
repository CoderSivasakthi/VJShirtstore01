import { Link } from "wouter";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@shared/schema";
import { useWishlist, useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const isWishlisted = isInWishlist(product.id);
  
  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.price);
  const discountPercentage = product.salePrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a mock cart item for demo
    const cartItem = {
      id: `cart-${product.id}-${Date.now()}`,
      userId: "demo-user",
      productId: product.id,
      variantId: "default-variant",
      quantity: 1,
      createdAt: new Date(),
      product,
    };
    
    addToCart(cartItem);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden product-card-hover border-border" data-testid={`card-product-${product.id}`}>
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
          {discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 discount-badge text-white"
              data-testid={`badge-discount-${product.id}`}
            >
              -{discountPercentage}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 h-8 w-8 p-0 ${
              isWishlisted ? "text-red-500" : "text-white hover:text-red-300"
            }`}
            onClick={handleWishlistToggle}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-1 line-clamp-1" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h4>
          <p className="text-muted-foreground text-sm mb-2" data-testid={`text-product-brand-${product.id}`}>
            {product.brand}
          </p>
          
          <div className="flex items-center mb-2">
            <div className="flex star-rating mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(parseFloat(product.rating || "0"))
                      ? "fill-current"
                      : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs" data-testid={`text-product-rating-${product.id}`}>
              ({product.reviewCount})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
                ₹{currentPrice.toLocaleString()}
              </span>
              {product.salePrice && (
                <span className="text-muted-foreground line-through ml-2 text-sm" data-testid={`text-product-original-price-${product.id}`}>
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full btn-secondary"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}
