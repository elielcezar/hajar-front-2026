"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Grid, List } from "lucide-react";
import { getImoveis, type Imovel } from "@/lib/api";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";

const bairros = [  
  { id: 1, nome: "Centro" },
  { id: 2, nome: "Jardim das Araucárias" },
  { id: 3, nome: "Nossa Senhora da Conceição" },
  { id: 4, nome: "Papiros" },
  { id: 5, nome: "Regina Vitória" },
  { id: 6, nome: "Rocio I" },
  { id: 7, nome: "Rocio II" },
  { id: 8, nome: "Vila Mayer" },
  { id: 9, nome: "Vila Rosa" },
  { id: 10, nome: "Vila Maria" },
  { id: 11, nome: "Vila Militar" },
];

interface Filtros {
  bairro: string;
  tipoImovel: string;
  faixaPreco: [number, number];
  area: [number, number];
  suites: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  caracteristicas: string;
}


export default function PropertiesContent() {
  const [properties, setProperties] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [filtros, setFiltros] = useState<Filtros>({
    bairro: "",
    tipoImovel: "",
    faixaPreco: [0, 2000000],
    area: [0, 500],
    suites: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    caracteristicas: "",
  });

  const atualizarFiltro = (campo: keyof Filtros, valor: string | [number, number]) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const atualizarFiltroRange = (campo: "faixaPreco" | "area", valor: number[]) => {
    if (valor.length === 2) {
      setFiltros((prev) => ({ ...prev, [campo]: [valor[0], valor[1]] as [number, number] }));
    }
  };

  const formatarPreco = (valor: number) => {
    if (valor >= 1000000) {
      return `R$ ${(valor / 1000000).toFixed(1)}M`;
    }
    return `R$ ${(valor / 1000).toFixed(0)}k`;
  };

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

      {/*<SearchBar />*/}

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
                <h3 className="font-aestetico text-lg font-medium mb-2 border-b-2 border-primary inline-block pb-1">
                  FILTROS
                </h3>
              </div>

              {/* Bairro */}
              <div>                  
                <Select value={filtros.bairro} onValueChange={(valor) => atualizarFiltro("bairro", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    {bairros.map((bairro) => (
                      <SelectItem key={bairro.id} value={bairro.nome}>{bairro.nome}</SelectItem>
                    ))}              
                  </SelectContent>
                </Select>
              </div>


              {/* Property Type */}
              <div>                  
                <Select value={filtros.tipoImovel} onValueChange={(valor) => atualizarFiltro("tipoImovel", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Tipo de Imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              {/* Faixa de Preço */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Faixa de Preço
                </label>
                <Slider
                  value={filtros.faixaPreco}
                  onValueChange={(valor) => atualizarFiltroRange("faixaPreco", valor)}
                  min={0}
                  max={2000000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatarPreco(filtros.faixaPreco[0])}</span>
                  <span>{formatarPreco(filtros.faixaPreco[1])}</span>
                </div>
              </div>

              {/* Área */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Área (m²)
                </label>
                <Slider
                  value={filtros.area}
                  onValueChange={(valor) => atualizarFiltroRange("area", valor)}
                  min={0}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{filtros.area[0]} m²</span>
                  <span>{filtros.area[1]} m²</span>
                </div>
              </div>

              {/* Bedrooms */}
              <div>                  
                  <Select value={filtros.quartos} onValueChange={(valor) => atualizarFiltro("quartos", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Quantidade de Quartos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              {/* Suites */}
              <div>                  
                  <Select value={filtros.suites} onValueChange={(valor) => atualizarFiltro("suites", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Quantidade de Suítes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              {/* Bathrooms */}
              <div>                  
                  <Select value={filtros.banheiros} onValueChange={(valor) => atualizarFiltro("banheiros", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Quantidade de Banheiros" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
              </div>             

              {/* Garagem */}
              <div>                  
                  <Select value={filtros.vagas} onValueChange={(valor) => atualizarFiltro("vagas", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Vagas na Garagem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
              </div>             

              {/* Características */}
              <div>                  
                  <Select value={filtros.caracteristicas} onValueChange={(valor) => atualizarFiltro("caracteristicas", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Características" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geminada">Geminada</SelectItem>
                      <SelectItem value="unica-lote">Única no Lote</SelectItem>
                    </SelectContent>
                  </Select>
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
                  Recentes
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
                  Preço
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

