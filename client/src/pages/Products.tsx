import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { type Product } from "@shared/schema";

interface Filters {
  category: string[];
  pattern: string[];
  material: string[];
  colors: string[];
  sizes: string[];
  priceRange: string;
}

export default function Products() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    pattern: [],
    material: [],
    colors: [],
    sizes: [],
    priceRange: "",
  });

  // Parse URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newFilters: Filters = {
      category: params.get("category")?.split(",").filter(Boolean) || [],
      pattern: params.get("pattern")?.split(",").filter(Boolean) || [],
      material: params.get("material")?.split(",").filter(Boolean) || [],
      colors: params.get("colors")?.split(",").filter(Boolean) || [],
      sizes: params.get("sizes")?.split(",").filter(Boolean) || [],
      priceRange: params.get("priceRange") || "",
    };
    setFilters(newFilters);
    setSortBy(params.get("sort") || "relevance");
  }, [searchParams]);

  const buildQueryString = (newFilters: Filters, newSort?: string) => {
    const params = new URLSearchParams();
    
    if (newFilters.category.length) params.set("category", newFilters.category.join(","));
    if (newFilters.pattern.length) params.set("pattern", newFilters.pattern.join(","));
    if (newFilters.material.length) params.set("material", newFilters.material.join(","));
    if (newFilters.colors.length) params.set("colors", newFilters.colors.join(","));
    if (newFilters.sizes.length) params.set("sizes", newFilters.sizes.join(","));
    if (newFilters.priceRange) params.set("priceRange", newFilters.priceRange);
    if (newSort && newSort !== "relevance") params.set("sort", newSort);
    
    // Preserve search query if it exists
    const currentParams = new URLSearchParams(searchParams);
    const search = currentParams.get("search");
    if (search) params.set("search", search);
    
    return params.toString();
  };

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", filters, sortBy, searchParams],
    select: (data) => {
      let filtered = [...data];
      
      // Apply client-side filtering (in real app, this would be done server-side)
      if (filters.category.length) {
        filtered = filtered.filter(p => filters.category.includes(p.category));
      }
      if (filters.pattern.length) {
        filtered = filtered.filter(p => filters.pattern.includes(p.pattern));
      }
      if (filters.material.length) {
        filtered = filtered.filter(p => filters.material.includes(p.material));
      }
      if (filters.colors.length) {
        filtered = filtered.filter(p => 
          filters.colors.some(color => p.colors.includes(color))
        );
      }
      if (filters.sizes.length) {
        filtered = filtered.filter(p => 
          filters.sizes.some(size => p.sizes.includes(size))
        );
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        filtered = filtered.filter(p => {
          const price = parseFloat(p.salePrice || p.price);
          return price >= min && price <= max;
        });
      }
      
      // Apply search filter
      const currentParams = new URLSearchParams(searchParams);
      const search = currentParams.get("search");
      if (search) {
        const searchTerm = search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => parseFloat(a.salePrice || a.price) - parseFloat(b.salePrice || b.price));
          break;
        case "price-high":
          filtered.sort((a, b) => parseFloat(b.salePrice || b.price) - parseFloat(a.salePrice || a.price));
          break;
        case "rating":
          filtered.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
          break;
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          break;
        default:
          // Keep original order for relevance
          break;
      }
      
      return filtered;
    },
  });

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    const queryString = buildQueryString(newFilters, sortBy);
    setLocation(`/products${queryString ? `?${queryString}` : ""}`);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const queryString = buildQueryString(filters, newSort);
    setLocation(`/products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>Shirts</span>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="hidden lg:block">
          <ProductFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort & Filter Header */}
          <div className="flex justify-between items-center mb-6 bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold" data-testid="text-products-count">
                Shirts ({products.length} items)
              </h2>
              <div className="lg:hidden">
                <ProductFilters 
                  filters={filters} 
                  onFiltersChange={handleFiltersChange} 
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} isLoading={isLoading} />

          {/* Pagination - Static for demo */}
          {products.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-8" data-testid="pagination">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
