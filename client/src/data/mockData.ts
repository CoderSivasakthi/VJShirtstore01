import { type Product } from "@shared/schema";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Striped Cotton Shirt",
    description: "High-quality cotton shirt with classic stripes, perfect for both casual and semi-formal occasions. Made from breathable cotton fabric with excellent durability.",
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
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.2",
    reviewCount: 124,
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Classic Formal White Shirt",
    description: "Professional white dress shirt perfect for formal occasions. Features a crisp collar and cuffs with a tailored fit that looks great with suits.",
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
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.8",
    reviewCount: 89,
    isActive: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Casual Denim Shirt",
    description: "Trendy denim shirt perfect for casual outings. Made from high-quality denim fabric with a comfortable fit and classic styling.",
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
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.1",
    reviewCount: 156,
    isActive: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    name: "Tropical Print Summer Shirt",
    description: "Vibrant tropical print shirt perfect for summer vacations and beach outings. Lightweight and breathable fabric keeps you cool.",
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
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.0",
    reviewCount: 73,
    isActive: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    name: "Navy Blue Formal Shirt",
    description: "Professional navy blue dress shirt with a modern cut. Wrinkle-resistant fabric makes it perfect for busy professionals.",
    brand: "PremiumWear",
    category: "formal",
    pattern: "plain",
    material: "cotton",
    fit: "slim",
    sleeve: "full",
    price: "1999",
    salePrice: "1599",
    stock: 28,
    colors: ["navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.5",
    reviewCount: 95,
    isActive: true,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "6",
    name: "Checkered Casual Shirt",
    description: "Classic checkered pattern shirt in multiple color combinations. Perfect for weekend outings and casual gatherings.",
    brand: "CasualFit",
    category: "casual",
    pattern: "checkered",
    material: "cotton",
    fit: "regular",
    sleeve: "full",
    price: "1299",
    salePrice: null,
    stock: 41,
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.3",
    reviewCount: 67,
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "7",
    name: "Plain White T-Shirt",
    description: "Basic white cotton t-shirt with a comfortable fit. Essential wardrobe piece that goes with everything.",
    brand: "BasicWear",
    category: "casual",
    pattern: "plain",
    material: "cotton",
    fit: "regular",
    sleeve: "half",
    price: "499",
    salePrice: "424",
    stock: 89,
    colors: ["white"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.1",
    reviewCount: 234,
    isActive: true,
    createdAt: new Date("2023-12-28"),
  },
  {
    id: "8",
    name: "Classic Polo Shirt",
    description: "Timeless polo shirt design with classic collar and button placket. Made from premium cotton pique fabric.",
    brand: "SportWear",
    category: "sports",
    pattern: "plain",
    material: "cotton",
    fit: "regular",
    sleeve: "half",
    price: "899",
    salePrice: null,
    stock: 52,
    colors: ["navy", "white", "red"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.6",
    reviewCount: 143,
    isActive: true,
    createdAt: new Date("2023-12-25"),
  },
  {
    id: "9",
    name: "Floral Print Shirt",
    description: "Trendy floral print shirt perfect for spring and summer. Lightweight fabric with a modern tropical design.",
    brand: "TrendyStyle",
    category: "casual",
    pattern: "printed",
    material: "polyester",
    fit: "loose",
    sleeve: "half",
    price: "1499",
    salePrice: "974",
    stock: 19,
    colors: ["multicolor"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "3.8",
    reviewCount: 52,
    isActive: true,
    createdAt: new Date("2023-12-20"),
  },
  {
    id: "10",
    name: "Black Formal Shirt",
    description: "Elegant black formal shirt for special occasions and evening events. Premium fabric with a sophisticated finish.",
    brand: "EliteWear",
    category: "formal",
    pattern: "plain",
    material: "cotton",
    fit: "slim",
    sleeve: "full",
    price: "1799",
    salePrice: null,
    stock: 15,
    colors: ["black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    ],
    rating: "4.7",
    reviewCount: 118,
    isActive: true,
    createdAt: new Date("2023-12-18"),
  },
];

// Generate additional products to reach 50 total
const generateAdditionalProducts = (): Product[] => {
  const baseProducts = sampleProducts;
  const additionalProducts: Product[] = [];
  
  const variants = [
    { suffix: "V2", namePrefix: "Premium", brandSuffix: "Plus" },
    { suffix: "V3", namePrefix: "Deluxe", brandSuffix: "Pro" },
    { suffix: "V4", namePrefix: "Executive", brandSuffix: "Elite" },
    { suffix: "V5", namePrefix: "Designer", brandSuffix: "Luxury" },
  ];
  
  baseProducts.forEach((product, index) => {
    variants.forEach((variant, variantIndex) => {
      if (additionalProducts.length < 40) { // Add 40 more to make 50 total
        const newProduct: Product = {
          ...product,
          id: `${product.id}${variant.suffix}`,
          name: `${variant.namePrefix} ${product.name}`,
          brand: `${product.brand} ${variant.brandSuffix}`,
          price: (parseFloat(product.price) + (variantIndex + 1) * 200).toString(),
          salePrice: product.salePrice 
            ? (parseFloat(product.salePrice) + (variantIndex + 1) * 150).toString() 
            : null,
          stock: Math.floor(Math.random() * 50) + 10,
          rating: (parseFloat(product.rating || "0") + (Math.random() * 0.5 - 0.25)).toFixed(1),
          reviewCount: Math.floor(Math.random() * 200) + 20,
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
        };
        additionalProducts.push(newProduct);
      }
    });
  });
  
  return additionalProducts;
};

export const allProducts: Product[] = [
  ...sampleProducts,
  ...generateAdditionalProducts(),
];

// Mock user data
export const mockUsers = [
  {
    id: "user-1",
    username: "johndoe",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 9876543210",
    isAdmin: false,
  },
  {
    id: "admin-1",
    username: "admin",
    email: "admin@shirtstore.com",
    firstName: "Admin",
    lastName: "User",
    phone: "+91 9876543211",
    isAdmin: true,
  },
];

// Mock order data
export const mockOrders = [
  {
    id: "ORD-2024-001",
    userId: "user-1",
    status: "delivered",
    totalAmount: "4697",
    items: [
      {
        productId: "1",
        quantity: 1,
        price: "1399",
      },
      {
        productId: "2",
        quantity: 2,
        price: "1599",
      },
    ],
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "ORD-2024-002",
    userId: "user-1",
    status: "shipped",
    totalAmount: "2199",
    items: [
      {
        productId: "4",
        quantity: 1,
        price: "2199",
      },
    ],
    createdAt: new Date("2024-03-20"),
  },
];
