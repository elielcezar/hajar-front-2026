"use client";

import { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { PropertyCard } from "./PropertyCard";
import { getImoveis, type Imovel } from "@/lib/api";

export const PropertiesSection = () => {
  const [properties, setProperties] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const data = await getImoveis();
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImoveis();
  }, []);
  const [filterType, setFilterType] = useState<"all" | "venda" | "aluguel">("all");
  const [sortBy, setSortBy] = useState<"recent" | "price">("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = properties.filter(property => {
    if (filterType === "all") return true;
    return property.tipo === filterType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price") {
      return a.preco - b.preco;
    }
    return 0; // recent is default order
  });

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Carregando imóveis...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-aestetico text-4xl mb-4 border-b-8 border-primary inline-block pb-2">
            IMÓVEIS RECENTES
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-oceanic p-0 rounded-sm">
          <div className="flex items-center gap-4 text-white">
            <Button
              variant="ghost"
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-primary text-white hover:bg-primary/90 hover:text-white p-7" : "text-white hover:bg-white/10 hover:text-white p-7"}
            >
              Todos
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilterType("venda")}
              className={filterType === "venda" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Venda
            </Button>
            <Button
              variant="ghost"
              onClick={() => setFilterType("aluguel")}
              className={filterType === "aluguel" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Aluguel
            </Button>
          </div>

          <div className="flex items-center gap-4 px-2">
            <span className="text-white font-medium">Ordenar por:</span>
            <Button
              variant="ghost"
              onClick={() => setSortBy("recent")}
              className={sortBy === "recent" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Recentes
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSortBy("price")}
              className={sortBy === "price" ? "bg-primary text-white hover:bg-primary/90 hover:text-white" : "text-white hover:bg-white/10 hover:text-white"}
            >
              Preço
            </Button>
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")} className="ml-4">
              <ToggleGroupItem value="grid" aria-label="Grid view" className="bg-oceanic text-white data-[state=on]:bg-primary">
                <Grid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view" className="bg-oceanic text-white data-[state=on]:bg-primary">
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
                <PropertyCard
                  id={property.id}
                  image={property.fotos[0]}
                  title={property.titulo}
                  location={property.localizacao}
                  price={property.tipo === 'aluguel' ? `R$ ${property.preco}/mês` : `R$ ${property.preco.toLocaleString('pt-BR')}`}
                  badge={property.tipo === 'venda' ? 'À Venda!' : 'Para Alugar!'}
                  type={property.tipo}
                />
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
                <PropertyCard
                  id={property.id}
                  image={property.fotos[0]}
                  title={property.titulo}
                  location={property.localizacao}
                  price={property.tipo === 'aluguel' ? `R$ ${property.preco}/mês` : `R$ ${property.preco.toLocaleString('pt-BR')}`}
                  badge={property.tipo === 'venda' ? 'À Venda!' : 'Para Alugar!'}
                  type={property.tipo}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

