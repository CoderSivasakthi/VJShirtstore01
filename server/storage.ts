import { type User, type InsertUser, type Product, type InsertProduct, type ProductVariant, type InsertProductVariant, type CartItem, type InsertCartItem, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type Wishlist, type InsertWishlist, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Product operations
  getProducts(filters?: {
    category?: string;
    pattern?: string;
    material?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    search?: string;
  }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Product variant operations
  getProductVariants(productId: string): Promise<ProductVariant[]>;
  getProductVariant(id: string): Promise<ProductVariant | undefined>;
  createProductVariant(variant: InsertProductVariant): Promise<ProductVariant>;
  updateProductVariant(id: string, updates: Partial<ProductVariant>): Promise<ProductVariant | undefined>;

  // Cart operations
  getCartItems(userId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;

  // Order operations
  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;

  // Wishlist operations
  getWishlist(userId: string): Promise<Wishlist[]>;
  addToWishlist(item: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(userId: string, productId: string): Promise<boolean>;

  // Review operations
  getProductReviews(productId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private productVariants: Map<string, ProductVariant>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private wishlist: Map<string, Wishlist>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.productVariants = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.wishlist = new Map();
    this.reviews = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Premium Striped Cotton Shirt",
        description: "High-quality cotton shirt with classic stripes",
        brand: "StyleCraft",
        category: "casual",
        pattern: "striped",
        material: "cotton",
        fit: "regular",
        sleeve: "full",
        price: "1999",
        salePrice: "1399",
        stock: 45,
        colors: ["blue", "white", "navy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"],
        rating: "4.2",
        reviewCount: 124,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Classic Formal White Shirt",
        description: "Professional white dress shirt for formal occasions",
        brand: "EliteWear",
        category: "formal",
        pattern: "plain",
        material: "cotton",
        fit: "slim",
        sleeve: "full",
        price: "1599",
        salePrice: null,
        stock: 23,
        colors: ["white"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"],
        rating: "4.8",
        reviewCount: 89,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Casual Denim Shirt",
        description: "Trendy denim shirt perfect for casual outings",
        brand: "UrbanStyle",
        category: "casual",
        pattern: "plain",
        material: "cotton",
        fit: "regular",
        sleeve: "full",
        price: "1499",
        salePrice: "1124",
        stock: 67,
        colors: ["blue", "dark blue"],
        sizes: ["S", "M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"],
        rating: "4.1",
        reviewCount: 156,
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Tropical Print Summer Shirt",
        description: "Vibrant tropical print shirt for summer",
        brand: "BeachWear",
        category: "casual",
        pattern: "printed",
        material: "cotton",
        fit: "loose",
        sleeve: "half",
        price: "1299",
        salePrice: null,
        stock: 34,
        colors: ["multicolor"],
        sizes: ["S", "M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"],
        rating: "4.0",
        reviewCount: 73,
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      isAdmin: false,
      createdAt: new Date(),
      phone: insertUser.phone || null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Product operations
  async getProducts(filters?: {
    category?: string;
    pattern?: string;
    material?: string;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    sizes?: string[];
    search?: string;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values()).filter(p => p.isActive);

    if (filters) {
      if (filters.category) {
        products = products.filter(p => p.category === filters.category);
      }
      if (filters.pattern) {
        products = products.filter(p => p.pattern === filters.pattern);
      }
      if (filters.material) {
        products = products.filter(p => p.material === filters.material);
      }
      if (filters.minPrice) {
        products = products.filter(p => parseFloat(p.salePrice || p.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        products = products.filter(p => parseFloat(p.salePrice || p.price) <= filters.maxPrice!);
      }
      if (filters.colors && filters.colors.length > 0) {
        products = products.filter(p => filters.colors!.some(color => p.colors.includes(color)));
      }
      if (filters.sizes && filters.sizes.length > 0) {
        products = products.filter(p => filters.sizes!.some(size => p.sizes.includes(size)));
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }
    }

    return products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = {
      ...product,
      id,
      rating: "0",
      reviewCount: 0,
      createdAt: new Date(),
      colors: [...product.colors],
      sizes: [...product.sizes],
      images: [...product.images],
      salePrice: product.salePrice || null,
      stock: product.stock || 0,
      isActive: product.isActive ?? true,
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Product variant operations
  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    return Array.from(this.productVariants.values()).filter(v => v.productId === productId);
  }

  async getProductVariant(id: string): Promise<ProductVariant | undefined> {
    return this.productVariants.get(id);
  }

  async createProductVariant(variant: InsertProductVariant): Promise<ProductVariant> {
    const id = randomUUID();
    const newVariant: ProductVariant = { 
      ...variant, 
      id,
      stock: variant.stock || 0,
    };
    this.productVariants.set(id, newVariant);
    return newVariant;
  }

  async updateProductVariant(id: string, updates: Partial<ProductVariant>): Promise<ProductVariant | undefined> {
    const variant = this.productVariants.get(id);
    if (!variant) return undefined;
    
    const updatedVariant = { ...variant, ...updates };
    this.productVariants.set(id, updatedVariant);
    return updatedVariant;
  }

  // Cart operations
  async getCartItems(userId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { ...item, id, createdAt: new Date() };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: string): Promise<boolean> {
    const userItems = Array.from(this.cartItems.values()).filter(item => item.userId === userId);
    userItems.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  // Order operations
  async getOrders(userId?: string): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    return userId ? orders.filter(order => order.userId === userId) : orders;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order = { ...order, id, createdAt: new Date() };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...item, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Wishlist operations
  async getWishlist(userId: string): Promise<Wishlist[]> {
    return Array.from(this.wishlist.values()).filter(item => item.userId === userId);
  }

  async addToWishlist(item: InsertWishlist): Promise<Wishlist> {
    const id = randomUUID();
    const wishlistItem: Wishlist = { ...item, id, createdAt: new Date() };
    this.wishlist.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
    const item = Array.from(this.wishlist.values()).find(w => w.userId === userId && w.productId === productId);
    return item ? this.wishlist.delete(item.id) : false;
  }

  // Review operations
  async getProductReviews(productId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.productId === productId);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = { 
      ...review, 
      id, 
      createdAt: new Date(),
      comment: review.comment || null,
    };
    this.reviews.set(id, newReview);
    return newReview;
  }
}

export const storage = new MemStorage();
