import { useState } from "react";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List, Search, MapPin, Home, ChevronRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "Central Park Ny",
    location: "Bogotá, Cundinamarca",
    price: "$1,700",
    badge: "For Sale!",
    type: "particular" as const,
  },
  {
    id: 2,
    image: property2,
    title: "Modern Apartment",
    location: "Medellín, Antioquia",
    price: "$2,100",
    badge: "For Rent",
    type: "state" as const,
  },
  {
    id: 3,
    image: property3,
    title: "Luxury Villa",
    location: "Cartagena, Bolívar",
    price: "$3,500",
    badge: "For Sale!",
    type: "particular" as const,
  },
  {
    id: 4,
    image: property4,
    title: "Beach House",
    location: "Santa Marta, Magdalena",
    price: "$2,800",
    badge: "For Rent",
    type: "state" as const,
  },
  {
    id: 5,
    image: property1,
    title: "Downtown Loft",
    location: "Cali, Valle del Cauca",
    price: "$1,900",
    badge: "For Sale!",
    type: "particular" as const,
  },
  {
    id: 6,
    image: property2,
    title: "Garden Apartment",
    location: "Barranquilla, Atlántico",
    price: "$1,600",
    badge: "For Rent",
    type: "state" as const,
  },
];

export default function Properties() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "price">("recent");
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [searchQuery, setSearchQuery] = useState("");

  const generalFeatures = [
    "Ar condicionado",
    "Piscina",
    "Varanda",
    "Garagem",
    "Jardim",
    "Academia",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Properties</span>
          </div>
        </div>
      </div>

      {/* Detailed Search Bar */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search properties..." 
                className="pl-9 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="lg" className="px-8 h-12">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-sm border border-border p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="font-bold text-lg mb-4 border-b-2 border-primary inline-block pb-1">
                  FILTERS
                </h3>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">PROPERTY TYPE</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">LOCATION</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter location" className="pl-9" />
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">PRICE RANGE</Label>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">${priceRange[0]}</span>
                  <span className="text-xs text-muted-foreground">${priceRange[1]}</span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  min={0}
                  step={100}
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">BEDROOMS</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">BATHROOMS</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">FEATURES</Label>
                <div className="space-y-2">
                  {generalFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Checkbox id={feature} />
                      <label
                        htmlFor={feature}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg">
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Properties Grid/List */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <div className="text-sm font-bold mb-2 text-muted-foreground tracking-wider">
                AVAILABLE PROPERTIES
              </div>
              <h1 className="text-4xl font-bold mb-6 border-b-4 border-primary inline-block pb-2">
                FIND YOUR HOME
              </h1>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#2b2b2b] p-4 rounded-sm">
              <div className="text-white font-medium">
                Showing {properties.length} properties
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white font-medium">Sort By:</span>
                <Button
                  variant="ghost"
                  onClick={() => setSortBy("recent")}
                  className={
                    sortBy === "recent"
                      ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }
                >
                  Recent ▼
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSortBy("price")}
                  className={
                    sortBy === "price"
                      ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }
                >
                  Price ▼
                </Button>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
                  className="ml-4"
                >
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    className="data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    <Grid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    className="data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Properties Display */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-in bg-card rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
                  >
                    <div className="flex flex-col md:flex-row gap-4 p-4">
                      <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                        {property.badge && (
                          <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground rotate-[-10deg] text-xs px-3 py-1 rounded-sm font-medium">
                            {property.badge}
                          </div>
                        )}
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4" />
                            <span>{property.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground font-medium">Price</span>
                          <span className="text-2xl font-bold text-primary">{property.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Newsletter />
    </div>
  );
}
