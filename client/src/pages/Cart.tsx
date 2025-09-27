import { Link } from "wouter";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string, productName: string) => {
    removeItem(itemId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 999 ? 0 : 49;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12" data-testid="empty-cart">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any shirts to your cart yet.
          </p>
          <Link href="/products">
            <Button className="btn-primary" data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/products">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h2 className="text-3xl font-bold text-foreground" data-testid="text-cart-title">
          Shopping Cart ({items.length} items)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Cart Items</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearCart}
                  data-testid="button-clear-cart"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4 py-4" data-testid={`cart-item-${item.id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                        data-testid={`img-cart-item-${item.id}`}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground" data-testid={`text-item-name-${item.id}`}>
                          {item.product.name}
                        </h4>
                        <p className="text-muted-foreground text-sm" data-testid={`text-item-variant-${item.id}`}>
                          Brand: {item.product.brand}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="font-semibold text-lg" data-testid={`text-item-price-${item.id}`}>
                            ₹{parseFloat(item.product.salePrice || item.product.price).toLocaleString()}
                          </span>
                          {item.product.salePrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ₹{parseFloat(item.product.price).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-foreground font-medium" data-testid={`text-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.product.name)}
                        className="text-destructive hover:text-destructive"
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {index < items.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-order-summary">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between" data-testid="summary-subtotal">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" data-testid="summary-shipping">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between" data-testid="summary-tax">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">₹{tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold" data-testid="summary-total">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full btn-primary mb-4" data-testid="button-checkout">
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="space-y-2 text-sm text-center">
                <div className="flex items-center justify-center text-green-600" data-testid="info-free-shipping">
                  <span>🚚 Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center justify-center text-blue-600" data-testid="info-secure-payments">
                  <span>🔒 Safe and secure payments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
