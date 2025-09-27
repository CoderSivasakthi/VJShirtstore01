import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, CreditCard, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { type Product } from "@shared/schema";
import { useCart, useWishlist, useAuth } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem: addToCart } = useCart();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  const { data: similarProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.filter(p => p.id !== id && p.category === product?.category).slice(0, 4),
    enabled: !!product,
  });

  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
          <div>
            <div className="h-96 bg-muted rounded-lg mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded w-1/4" />
            <div className="h-20 bg-muted rounded" />
            <div className="h-40 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button data-testid="button-back-to-products">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.price);
  const discountPercentage = product.salePrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleWishlistToggle = () => {
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

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Please select options",
        description: "Please select color and size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      id: `cart-${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
      userId: "demo-user",
      productId: product.id,
      variantId: `${selectedColor}-${selectedSize}`,
      quantity,
      createdAt: new Date(),
      product,
    };

    addToCart(cartItem);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout would go here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/products">Shirts</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg border border-border cursor-zoom-in"
              data-testid="img-product-main"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`w-full h-20 object-cover rounded border cursor-pointer transition-all ${
                  selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedImageIndex(index)}
                data-testid={`img-product-thumbnail-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-product-name">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4" data-testid="text-product-brand">
            {product.brand}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex star-rating mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(parseFloat(product.rating || "0"))
                      ? "fill-current"
                      : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-foreground" data-testid="text-product-rating">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl font-bold text-foreground" data-testid="text-product-price">
                ₹{currentPrice.toLocaleString()}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through" data-testid="text-product-original-price">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive" className="discount-badge" data-testid="badge-discount">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-green-600">Inclusive of all taxes</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-foreground" data-testid="text-color-selection">
              Color: {selectedColor && <span className="capitalize">{selectedColor}</span>}
            </h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-all capitalize ${
                    selectedColor === color
                      ? "border-primary scale-110"
                      : "border-gray-300 hover:border-primary"
                  }`}
                  style={{ backgroundColor: color === "white" ? "#ffffff" : color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  data-testid={`button-color-${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground" data-testid="text-size-selection">
                Size: {selectedSize && <span>{selectedSize}</span>}
              </h3>
              <Button variant="link" className="text-primary text-sm p-0" data-testid="button-size-guide">
                Size Guide
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="text-center"
                  onClick={() => setSelectedSize(size)}
                  data-testid={`button-size-${size}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-green-600 font-medium" data-testid="text-stock-status">
                In Stock ({product.stock} pieces left)
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-foreground">Quantity</h3>
            <div className="flex items-center border border-border rounded-lg w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-quantity-decrease"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2" data-testid="text-quantity">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-quantity-increase"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              onClick={handleAddToCart}
              className="flex-1 btn-secondary"
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              className="flex-1 btn-primary"
              data-testid="button-buy-now"
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistToggle}
              className={isWishlisted ? "text-red-500" : ""}
              data-testid="button-wishlist"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Quick Info */}
          <Card className="bg-accent">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center" data-testid="info-shipping">
                  <Truck className="h-4 w-4 text-primary mr-2" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center" data-testid="info-returns">
                  <RotateCcw className="h-4 w-4 text-primary mr-2" />
                  <span>7 Days Return</span>
                </div>
                <div className="flex items-center" data-testid="info-warranty">
                  <Shield className="h-4 w-4 text-primary mr-2" />
                  <span>1 Year Warranty</span>
                </div>
                <div className="flex items-center" data-testid="info-cod">
                  <CreditCard className="h-4 w-4 text-primary mr-2" />
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Tabs */}
      <Card className="mb-12">
        <CardContent className="p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
              <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="returns" data-testid="tab-returns">Return Policy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-foreground mb-4">{product.description}</p>
                <ul className="text-foreground space-y-2">
                  <li>• Premium {product.material} fabric</li>
                  <li>• {product.fit} fit for comfortable wear</li>
                  <li>• {product.sleeve} sleeve design</li>
                  <li>• {product.pattern} pattern</li>
                  <li>• Machine washable</li>
                  <li>• Available in multiple colors and sizes</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Material Details</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Fabric:</strong> {product.material}</li>
                    <li><strong>Pattern:</strong> {product.pattern}</li>
                    <li><strong>Fit:</strong> {product.fit}</li>
                    <li><strong>Sleeve:</strong> {product.sleeve}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Machine wash cold</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low</li>
                    <li>• Iron on low heat</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">Be the first to review this product!</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="mt-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Return Policy</h4>
                <p>We want you to be completely satisfied with your purchase. If for any reason you're not happy with your shirt, you can return it within 7 days of delivery.</p>
                <h4 className="font-semibold">Return Conditions:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Item must be unused and in original packaging</li>
                  <li>Tags must be attached</li>
                  <li>No alterations or modifications</li>
                  <li>Item should be in resellable condition</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-8" data-testid="text-similar-products">Similar Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
