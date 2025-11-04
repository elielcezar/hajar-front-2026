import { TrendingUp, Building2, MapPin, Home, Info, List } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Metrics results",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
  {
    icon: Building2,
    title: "Featured projects",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
  {
    icon: MapPin,
    title: "Find your Place",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
  {
    icon: Home,
    title: "Advertise rentals",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
  {
    icon: Info,
    title: "Guidance",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
  {
    icon: List,
    title: "List your property",
    description: "Pellentesque habitant morbi tristi senectus et netus et.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">THEME FEATURES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-background p-6 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
