"use client";

import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  badge?: string;
  id?: string | number;
  type?: string;
}

export const PropertyCard = ({ image, title, location, price, badge, id = "1" }: PropertyCardProps) => {
  return (
    <Link href={`/imoveis/${id}`} className="block">
      <div className="group relative bg-card rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/*badge && (
        <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground rotate-[-10deg] text-xs px-3 py-1 animate-fade-in">
          {badge}
        </Badge>
      )*/}

      <div className="absolute top-0 left-0 z-10">
        <div className="relative w-32 h-32">
          <div className="absolute top-6 -left-9 w-40 bg-primary text-white text-center py-2 transform -rotate-45 shadow-lg">
            <span className="text-sm font-bold">
            {badge}
            </span>
          </div>
        </div>
      </div>

      
      <div className="relative overflow-hidden aspect-square">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">Preço</span>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

