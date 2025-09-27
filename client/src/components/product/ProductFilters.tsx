import { useState, useEffect } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface Filters {
  category: string[];
  pattern: string[];
  material: string[];
  colors: string[];
  sizes: string[];
  priceRange: string;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  className?: string;
}

const categories = ["casual", "formal", "sports"];
const patterns = ["plain", "striped", "checkered", "printed"];
const materials = ["cotton", "silk", "linen", "polyester"];
const colors = [
  { name: "Red", value: "red", color: "bg-red-500" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Black", value: "black", color: "bg-black" },
  { name: "White", value: "white", color: "bg-white border" },
  { name: "Navy", value: "navy", color: "bg-blue-900" },
];
const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
const priceRanges = [
  { label: "Under ₹1,000", value: "0-1000" },
  { label: "₹1,000 - ₹2,000", value: "1000-2000" },
  { label: "₹2,000 - ₹3,000", value: "2000-3000" },
  { label: "Above ₹3,000", value: "3000-999999" },
];

export default function ProductFilters({ filters, onFiltersChange, className }: ProductFiltersProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleArrayFilterChange = (type: keyof Filters, value: string, checked: boolean) => {
    const currentValues = filters[type] as string[];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFiltersChange({
      ...filters,
      [type]: newValues,
    });
  };

  const handlePriceRangeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      priceRange: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: [],
      pattern: [],
      material: [],
      colors: [],
      sizes: [],
      priceRange: "",
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-category">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={(checked) => 
                  handleArrayFilterChange("category", category, !!checked)
                }
                data-testid={`checkbox-category-${category}`}
              />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color Filter */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-color">Color</h4>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.colors.includes(color.value)
                  ? "border-primary scale-110"
                  : "border-gray-300 hover:border-gray-400"
              } ${color.color}`}
              onClick={() => 
                handleArrayFilterChange("colors", color.value, !filters.colors.includes(color.value))
              }
              title={color.name}
              data-testid={`button-color-${color.value}`}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Size Filter */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-size">Size</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              className="text-center"
              onClick={() => 
                handleArrayFilterChange("sizes", size, !filters.sizes.includes(size))
              }
              data-testid={`button-size-${size}`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Pattern Filter */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-pattern">Pattern</h4>
        <div className="space-y-2">
          {patterns.map((pattern) => (
            <div key={pattern} className="flex items-center space-x-2">
              <Checkbox
                id={`pattern-${pattern}`}
                checked={filters.pattern.includes(pattern)}
                onCheckedChange={(checked) => 
                  handleArrayFilterChange("pattern", pattern, !!checked)
                }
                data-testid={`checkbox-pattern-${pattern}`}
              />
              <Label htmlFor={`pattern-${pattern}`} className="capitalize">
                {pattern}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Material Filter */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-material">Material</h4>
        <div className="space-y-2">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={filters.material.includes(material)}
                onCheckedChange={(checked) => 
                  handleArrayFilterChange("material", material, !!checked)
                }
                data-testid={`checkbox-material-${material}`}
              />
              <Label htmlFor={`material-${material}`} className="capitalize">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3 text-foreground" data-testid="text-filter-price">Price Range</h4>
        <RadioGroup value={filters.priceRange} onValueChange={handlePriceRangeChange}>
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={range.value} 
                id={`price-${range.value}`}
                data-testid={`radio-price-${range.value}`}
              />
              <Label htmlFor={`price-${range.value}`}>
                {range.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <Button 
        variant="destructive" 
        onClick={clearFilters} 
        className="w-full"
        data-testid="button-clear-filters"
      >
        Clear All Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="mb-4" data-testid="button-mobile-filters">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={`w-64 bg-card rounded-lg p-6 h-fit sticky top-24 border border-border ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
      </div>
      <FilterContent />
    </div>
  );
}
