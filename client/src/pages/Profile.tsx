import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please log in</h2>
          <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "January 15, 2024",
      status: "Delivered",
      total: "₹2,798",
      items: ["Premium Striped Shirt", "Classic Formal Shirt"],
    },
    {
      id: "ORD-2024-002",
      date: "January 20, 2024",
      status: "Shipped",
      total: "₹1,599",
      items: ["Linen Summer Shirt"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground" data-testid="text-user-name">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-muted-foreground" data-testid="text-user-email">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                <Button variant="default" className="w-full justify-start" data-testid="nav-profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile Information
                </Button>
                <Button variant="ghost" className="w-full justify-start" data-testid="nav-orders">
                  <Package className="h-4 w-4 mr-2" />
                  My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start" data-testid="nav-wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start" data-testid="nav-addresses">
                  <MapPin className="h-4 w-4 mr-2" />
                  Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start" data-testid="nav-settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive" 
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
              <TabsTrigger value="orders" data-testid="tab-orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-first-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} data-testid="input-last-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-dob" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-gender">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-4">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          data-testid="button-save-profile"
                        >
                          {isLoading ? "Updating..." : "Update Profile"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => form.reset()}
                          data-testid="button-cancel"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4" data-testid={`order-${order.id}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold" data-testid={`order-id-${order.id}`}>Order {order.id}</p>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`} data-testid={`order-status-${order.id}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Items: {order.items.join(", ")}
                            </p>
                            <p className="font-semibold mt-1" data-testid={`order-total-${order.id}`}>
                              Total: {order.total}
                            </p>
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm" data-testid={`button-view-order-${order.id}`}>
                              View Details
                            </Button>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm" data-testid={`button-reorder-${order.id}`}>
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Email Notifications</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked data-testid="checkbox-order-updates" />
                          <span className="text-sm">Order updates</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked data-testid="checkbox-promotions" />
                          <span className="text-sm">Promotional emails</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" data-testid="checkbox-newsletter" />
                          <span className="text-sm">Newsletter</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Privacy Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked data-testid="checkbox-profile-public" />
                          <span className="text-sm">Make profile public</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" data-testid="checkbox-activity-tracking" />
                          <span className="text-sm">Allow activity tracking</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Account Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" data-testid="button-change-password">
                          Change Password
                        </Button>
                        <Button variant="outline" data-testid="button-download-data">
                          Download My Data
                        </Button>
                        <Button variant="destructive" data-testid="button-delete-account">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
