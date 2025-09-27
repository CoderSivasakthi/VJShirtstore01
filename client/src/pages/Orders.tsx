import { useState } from "react";
import { Package, Eye, RotateCcw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/store";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: string;
  items: {
    name: string;
    image: string;
    quantity: number;
    price: string;
  }[];
  shippingAddress: string;
  trackingNumber?: string;
}

export default function Orders() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "March 15, 2024",
      status: "delivered",
      total: "₹4,697",
      items: [
        {
          name: "Premium Striped Cotton Shirt",
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
          quantity: 1,
          price: "₹1,399",
        },
        {
          name: "Classic Formal White Shirt",
          image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
          quantity: 2,
          price: "₹1,599",
        },
      ],
      shippingAddress: "123 Main St, City, State 123456",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-2024-002",
      date: "March 20, 2024",
      status: "shipped",
      total: "₹2,199",
      items: [
        {
          name: "Linen Summer Shirt",
          image: "https://images.unsplash.com/photo-1583743814966-8936f37f4fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
          quantity: 1,
          price: "₹2,199",
        },
      ],
      shippingAddress: "123 Main St, City, State 123456",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-2024-003",
      date: "March 22, 2024",
      status: "processing",
      total: "₹2,898",
      items: [
        {
          name: "Blue Checkered Casual Shirt",
          image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
          quantity: 2,
          price: "₹1,299",
        },
      ],
      shippingAddress: "123 Main St, City, State 123456",
    },
  ];

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return "✅";
      case "shipped":
        return "🚚";
      case "processing":
        return "⏳";
      case "pending":
        return "📋";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please log in</h2>
          <p className="text-muted-foreground">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center space-x-4 mb-8">
        <Package className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-bold text-foreground" data-testid="text-orders-title">
          My Orders
        </h2>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" data-testid="tab-all">All Orders</TabsTrigger>
          <TabsTrigger value="pending" data-testid="tab-pending">Pending</TabsTrigger>
          <TabsTrigger value="processing" data-testid="tab-processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped" data-testid="tab-shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered" data-testid="tab-delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled" data-testid="tab-cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2" data-testid="text-no-orders">
                  No orders found
                </h3>
                <p className="text-muted-foreground">
                  {selectedStatus === "all" 
                    ? "You haven't placed any orders yet." 
                    : `No ${selectedStatus} orders found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} data-testid={`order-card-${order.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span data-testid={`order-id-${order.id}`}>Order {order.id}</span>
                          <Badge 
                            className={getStatusColor(order.status)}
                            data-testid={`order-status-${order.id}`}
                          >
                            {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1" data-testid={`order-date-${order.id}`}>
                          Placed on {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold" data-testid={`order-total-${order.id}`}>
                          {order.total}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4" data-testid={`order-item-${order.id}-${index}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity} • Price: {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <h5 className="font-medium mb-1">Shipping Address</h5>
                      <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                    </div>

                    {/* Tracking Information */}
                    {order.trackingNumber && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-600">
                            Tracking Number: {order.trackingNumber}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-testid={`button-view-details-${order.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {order.status === "shipped" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`button-track-order-${order.id}`}
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                      )}
                      
                      {order.status === "delivered" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`button-reorder-${order.id}`}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                      )}
                      
                      {(order.status === "pending" || order.status === "processing") && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          data-testid={`button-cancel-${order.id}`}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
