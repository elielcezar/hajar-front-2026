"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";
import { getImoveis, type Imovel } from "@/lib/api";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import { Input } from "@/components/ui/input";

interface Filtros {
  bairro: string;
  finalidade: string;
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Imovel[]>([]);
  // Se não tem params, assume que estamos verificando o storage para evitar flash de conteúdo
  const [checkingStorage, setCheckingStorage] = useState(() => Array.from(searchParams.keys()).length === 0);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  
  const [filtros, setFiltros] = useState<Filtros>({
    bairro: searchParams.get("bairro") || "",
    finalidade: searchParams.get("finalidade") || "",
    tipoImovel: searchParams.get("tipoImovel") || "",
    faixaPreco: [0, 2000000],
    area: [0, 500],
    suites: searchParams.get("suites") || "",
    quartos: searchParams.get("quartos") || "",
    banheiros: searchParams.get("banheiros") || "",
    vagas: searchParams.get("vagas") || "",
    caracteristicas: searchParams.get("caracteristicas") || "",
  });

  // Se os searchParams mudarem e tiverem chaves, paramos de verificar o storage
  useEffect(() => {
    if (Array.from(searchParams.keys()).length > 0) {
      setCheckingStorage(false);
    }
  }, [searchParams]);

  // Bloquear scroll do body quando o drawer está aberto no mobile
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterDrawerOpen]);

  // Efeito para carregar filtros do localStorage ao montar o componente (se a URL estiver vazia)
  useEffect(() => {
    // Se não houver params na URL, tentamos recuperar do localStorage
    if (Array.from(searchParams.keys()).length === 0) {
      const savedFilters = localStorage.getItem("hajar_imoveis_filtros");
      let restored = false;

      if (savedFilters) {
        try {
          const parsedFilters = JSON.parse(savedFilters);
          
          // Reconstruir a URL com base nos filtros salvos
          const params = new URLSearchParams();
          if (parsedFilters.bairro) params.set("bairro", parsedFilters.bairro);
          if (parsedFilters.finalidade) params.set("finalidade", parsedFilters.finalidade);
          if (parsedFilters.tipoImovel) params.set("tipoImovel", parsedFilters.tipoImovel);
          if (parsedFilters.quartos) params.set("quartos", parsedFilters.quartos);
          if (parsedFilters.suites) params.set("suites", parsedFilters.suites);
          if (parsedFilters.banheiros) params.set("banheiros", parsedFilters.banheiros);
          if (parsedFilters.vagas) params.set("vagas", parsedFilters.vagas);
          if (parsedFilters.caracteristicas) params.set("caracteristicas", parsedFilters.caracteristicas);
          
          if (parsedFilters.faixaPreco && (parsedFilters.faixaPreco[0] > 0 || parsedFilters.faixaPreco[1] < 2000000)) {
            params.set("faixaPreco", `${parsedFilters.faixaPreco[0]}-${parsedFilters.faixaPreco[1]}`);
          }
          
          if (parsedFilters.area && (parsedFilters.area[0] > 0 || parsedFilters.area[1] < 500)) {
            params.set("area", `${parsedFilters.area[0]}-${parsedFilters.area[1]}`);
          }

          // Se conseguiu reconstruir params, redireciona
          if (params.toString()) {
            restored = true;
            router.replace(`/imoveis?${params.toString()}`);
            // Não setamos checkingStorage(false) aqui pois o redirect vai desmontar/remontar ou atualizar a página
            return; 
          }
        } catch (e) {
          console.error("Erro ao recuperar filtros", e);
        }
      }
      
      // Se não restaurou nada (não tinha filtros ou erro), liberamos o loading
      if (!restored) {
        setCheckingStorage(false);
      }
    } else {
      // Se já tem params, não precisamos checar storage
      setCheckingStorage(false);
    }
  }, []);

  // Atualizar filtros quando os searchParams mudarem E salvar no localStorage
  useEffect(() => {
    const getParam = (key: string) => {
      const value = searchParams.get(key);
      // Se o valor for "__all__" (valor especial), retorna vazio
      return value && value !== '__all__' ? value : "";
    };

    const novosFiltros = {
      bairro: getParam("bairro"),
      finalidade: getParam("finalidade"),
      tipoImovel: getParam("tipoImovel"),
      faixaPreco: [0, 2000000] as [number, number],
      area: [0, 500] as [number, number],
      suites: getParam("suites"),
      quartos: getParam("quartos"),
      banheiros: getParam("banheiros"),
      vagas: getParam("vagas"),
      caracteristicas: getParam("caracteristicas"),
    };

    // Parse manual para ranges (preço e área) vindos da URL
    const precoParam = searchParams.get("faixaPreco");
    if (precoParam && precoParam.includes('-')) {
      const [min, max] = precoParam.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) novosFiltros.faixaPreco = [min, max];
    } else if (precoParam && precoParam.includes('+')) {
       // Tratamento básico para 800k+ se vier do SearchBar antigo
       const min = parseInt(precoParam.replace(/\D/g, '')) * (precoParam.includes('k') ? 1000 : 1);
       novosFiltros.faixaPreco = [min, 2000000];
    }

    const areaParam = searchParams.get("area");
    if (areaParam && areaParam.includes('-')) {
      const [min, max] = areaParam.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) novosFiltros.area = [min, max];
    }

    setFiltros(novosFiltros);

    // Salvar no localStorage APENAS se houver parâmetros relevantes na URL
    // Isso evita salvar um estado "vazio" logo antes de restaurar o backup
    if (Array.from(searchParams.keys()).length > 0) {
      localStorage.setItem("hajar_imoveis_filtros", JSON.stringify(novosFiltros));
    }

  }, [searchParams]);

  const aplicarFiltros = () => {
    const params = new URLSearchParams();
    if (filtros.bairro && filtros.bairro !== '__all__') params.set("bairro", filtros.bairro);
    if (filtros.finalidade && filtros.finalidade !== '__all__') params.set("finalidade", filtros.finalidade);
    if (filtros.tipoImovel && filtros.tipoImovel !== '__all__') params.set("tipoImovel", filtros.tipoImovel);
    if (filtros.quartos && filtros.quartos !== '__all__') params.set("quartos", filtros.quartos);
    if (filtros.suites && filtros.suites !== '__all__') params.set("suites", filtros.suites);
    if (filtros.banheiros && filtros.banheiros !== '__all__') params.set("banheiros", filtros.banheiros);
    if (filtros.vagas && filtros.vagas !== '__all__') params.set("vagas", filtros.vagas);
    if (filtros.caracteristicas && filtros.caracteristicas !== '__all__') params.set("caracteristicas", filtros.caracteristicas);
    
    // Adicionar faixa de preço se não for o padrão
    if (filtros.faixaPreco[0] > 0 || filtros.faixaPreco[1] < 2000000) {
      params.set("faixaPreco", `${filtros.faixaPreco[0]}-${filtros.faixaPreco[1]}`);
    }
    
    // Adicionar área se não for o padrão
    if (filtros.area[0] > 0 || filtros.area[1] < 500) {
      params.set("area", `${filtros.area[0]}-${filtros.area[1]}`);
    }

    // Fechar o drawer no mobile após aplicar filtros
    setIsFilterDrawerOpen(false);
    
    router.push(`/imoveis?${params.toString()}`);
  };

  const atualizarFiltro = (campo: keyof Filtros, valor: string | [number, number]) => {
    // Se o valor for "__all__" (valor especial para limpar), limpa o filtro
    if (typeof valor === 'string' && valor === '__all__') {
      setFiltros((prev) => ({ ...prev, [campo]: '' }));
    } else {
      setFiltros((prev) => ({ ...prev, [campo]: valor }));
    }
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
      setLoading(true);
      try {
        const filters: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          filters[key] = value;
        });
        
        const data = await getImoveis(filters);
        setProperties(data);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImoveis();
  }, [searchParams]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "price">("recent");
  
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === "price") {
      return a.preco - b.preco;
    }
    return 0;
  });

  if (loading || checkingStorage) {
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
        {/* Botão Filtros - Mobile Only */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="w-full bg-primary text-white"
            size="lg"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Overlay - Mobile Only */}
          {isFilterDrawerOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsFilterDrawerOpen(false)}
            />
          )}

          {/* Sidebar Filters */}
          <aside className={`
            lg:col-span-1
            fixed lg:relative
            top-0 left-0 
            h-full lg:h-auto
            w-[85%] max-w-sm lg:w-full lg:max-w-none
            bg-background lg:bg-transparent
            z-50 lg:z-auto
            transform transition-transform duration-300 ease-in-out
            ${isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto lg:overflow-visible
          `}>
            <div className="bg-card rounded-sm border border-border p-6 space-y-3 lg:sticky lg:top-24 h-full lg:h-auto">
              {/* Botão Fechar - Mobile Only */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="font-aestetico text-lg font-medium border-b-2 border-primary inline-block pb-1">
                  FILTROS
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Título - Desktop Only */}
              <div className="hidden lg:block">
                <h3 className="font-aestetico text-lg font-medium mb-2 border-b-2 border-primary inline-block pb-1">
                  FILTROS
                </h3>
              </div>

              {/* Bairro */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Bairro
                </label>
                <Input 
                  type="text"
                  placeholder="Digite o bairro"
                  value={filtros.bairro}
                  onChange={(e) => atualizarFiltro("bairro", e.target.value)}
                  className="bg-white"
                />
              </div>

              {/* Finalidade */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Finalidade
                </label>
                <Select value={filtros.finalidade && filtros.finalidade !== '__all__' ? filtros.finalidade : undefined} onValueChange={(valor) => atualizarFiltro("finalidade", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Selecione</SelectItem>
                    <SelectItem value="venda">Comprar</SelectItem>
                    <SelectItem value="aluguel">Alugar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Tipo de Imóvel
                </label>
                <Select value={filtros.tipoImovel && filtros.tipoImovel !== '__all__' ? filtros.tipoImovel : undefined} onValueChange={(valor) => atualizarFiltro("tipoImovel", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todos os tipos</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              {/* Faixa de Preço */}
              <div className="space-y-1">
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
              <div className="space-y-1">
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
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Quartos
                </label>
                <Select value={filtros.quartos && filtros.quartos !== '__all__' ? filtros.quartos : undefined} onValueChange={(valor) => atualizarFiltro("quartos", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Qualquer quantidade</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Suites */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Suítes
                </label>
                <Select value={filtros.suites && filtros.suites !== '__all__' ? filtros.suites : undefined} onValueChange={(valor) => atualizarFiltro("suites", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Qualquer quantidade</SelectItem>
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
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Banheiros
                </label>
                <Select value={filtros.banheiros && filtros.banheiros !== '__all__' ? filtros.banheiros : undefined} onValueChange={(valor) => atualizarFiltro("banheiros", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Qualquer quantidade</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>             

              {/* Garagem */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Vagas na Garagem
                </label>
                <Select value={filtros.vagas && filtros.vagas !== '__all__' ? filtros.vagas : undefined} onValueChange={(valor) => atualizarFiltro("vagas", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Qualquer quantidade</SelectItem>
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
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">
                  Características
                </label>
                <Select value={filtros.caracteristicas && filtros.caracteristicas !== '__all__' ? filtros.caracteristicas : undefined} onValueChange={(valor) => atualizarFiltro("caracteristicas", valor)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">Todas</SelectItem>
                    <SelectItem value="geminada">Geminada</SelectItem>
                    <SelectItem value="unica-lote">Única no Lote</SelectItem>
                  </SelectContent>
                </Select>
              </div>             

              <Button className="w-full" size="lg" onClick={aplicarFiltros}>
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
                {/*<ToggleGroup
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
                </ToggleGroup>*/}
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
                      location={property.bairro ? `${property.bairro} - ${property.localizacao}` : property.localizacao}
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
                      location={property.bairro ? `${property.bairro} - ${property.localizacao}` : property.localizacao}
                      price={property.tipo === 'aluguel' ? `R$ ${property.preco}/mês` : `R$ ${property.preco.toLocaleString('pt-BR')}`}
                      badge={property.tipo === 'venda' ? 'À Venda!' : 'Para Alugar!'}
                      type={property.tipo}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {/*<div className="mt-8 flex justify-center gap-2">
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
            </div>*/}
          </div>
        </div>
      </div>

      <GetInTouch />

      <Footer />

      
    </div>
  );
}

