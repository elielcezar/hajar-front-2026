import { useState } from "react";
import { Grid, List, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { PropertyCard } from "./PropertyCard";
import { Badge } from "./ui/badge";

export const PropertiesSection = () => {
  const [filterType, setFilterType] = useState<"all" | "particular" | "state">("all");
  const [sortBy, setSortBy] = useState<"recent" | "price">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = properties.filter(property => {
    if (filterType === "all") return true;
    return property.type === filterType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price") {
      return parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, ""));
    }
    return 0; // recent is default order
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="text-sm font-bold mb-2 text-muted-foreground tracking-wider">
            WHAT WE OFFER--
          </div>
          <h2 className="text-4xl font-bold mb-8 border-b-4 border-primary inline-block pb-2">
            OUR RECENT PROPERTY
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#2b2b2b] p-4 rounded-sm">
          <div className="flex items-center gap-4 text-white">
            <Button 
              variant="ghost" 
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              {properties.length} Ads
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setFilterType("particular")}
              className={filterType === "particular" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Particular
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setFilterType("state")}
              className={filterType === "state" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              State
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Order By:</span>
            <Button 
              variant="ghost" 
              onClick={() => setSortBy("recent")}
              className={sortBy === "recent" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Recent ads ▼
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setSortBy("price")}
              className={sortBy === "price" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Price ▼
            </Button>
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")} className="ml-4">
              <ToggleGroupItem value="grid" aria-label="Grid view" className="data-[state=on]:bg-primary data-[state=on]:text-white">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view" className="data-[state=on]:bg-primary data-[state=on]:text-white">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProperties.map((property, index) => (
              <div 
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProperties.map((property, index) => (
              <div 
                key={property.id}
                className="animate-fade-in bg-card rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                    {property.badge && (
                      <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground rotate-[-10deg] text-xs px-3 py-1">
                        {property.badge}
                      </Badge>
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
      </div>
    </section>
  );
};
