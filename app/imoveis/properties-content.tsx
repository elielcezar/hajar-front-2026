"use client";

import { useState, useEffect } from "react";
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
import { Grid, List, Search, MapPin, ChevronRight } from "lucide-react";
import { getImoveis, type Imovel } from "@/lib/api";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";

export default function PropertiesContent() {
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "price">("recent");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [searchQuery, setSearchQuery] = useState("");

  const generalFeatures = [
    "Ar condicionado",
    "Piscina",
    "Varanda",
    "Garagem",
    "Jardim",
    "Academia",
  ];

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === "price") {
      return a.preco - b.preco;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg">Carregando imóveis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      {/*<div className="bg-muted py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Imóveis</span>
          </div>
        </div>
      </div>*/}

      <Newsletter />

      {/* Detailed Search Bar */}
      {/*<div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar imóveis..." 
                className="pl-9 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="lg" className="px-8 h-12">
              Buscar
            </Button>
          </div>
        </div>
      </div>}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-sm border border-border p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="font-aestetico text-lg font-medium mb-4 border-b-2 border-primary inline-block pb-1">
                  FILTROS
                </h3>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">TIPO DE IMÓVEL</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Todos</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">LOCALIZAÇÃO</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Digite a localização" className="pl-9" />
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">FAIXA DE PREÇO</Label>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">
                    R$ {priceRange[0].toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    R$ {priceRange[1].toLocaleString('pt-BR')}
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000000}
                  min={0}
                  step={50000}
                />
              </div>

              {/* Bedrooms */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">QUARTOS</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Todos</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground">BANHEIROS</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Todos</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">CARACTERÍSTICAS</Label>
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
                Aplicar Filtros
              </Button>
            </div>
          </aside>

          {/* Properties Grid/List */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <div className="font-aestetico text-sm font-medium mb-2 text-muted-foreground tracking-wider">
                IMÓVEIS DISPONÍVEIS
              </div>
              <h1 className="font-aestetico text-4xl font-medium mb-6 border-b-4 border-primary inline-block pb-2">
                ENCONTRE SEU LAR
              </h1>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#2b2b2b] p-4 rounded-sm">
              <div className="text-white font-medium">
                Mostrando {sortedProperties.length} imóveis
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white font-medium">Ordenar:</span>
                <Button
                  variant="ghost"
                  onClick={() => setSortBy("recent")}
                  className={
                    sortBy === "recent"
                      ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }
                >
                  Recentes ▼
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
                  Preço ▼
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
                    className="bg-[#2b2b2b] text-white data-[state=on]:bg-primary"
                  >
                    <Grid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="list"
                    aria-label="List view"
                    className="bg-[#2b2b2b] text-white data-[state=on]:bg-primary"
                  >
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Properties Display */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
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
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
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

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
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
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <GetInTouch />

      <Footer />

      
    </div>
  );
}

