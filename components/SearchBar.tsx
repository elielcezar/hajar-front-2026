"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
  faixaPreco: string;
  area: string;
  suites: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  caracteristicas: string;
}

export const SearchBar = () => {
  const router = useRouter();
  const [filtros, setFiltros] = useState<Filtros>({
    bairro: "",
    tipoImovel: "",
    faixaPreco: "",
    area: "",
    suites: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    caracteristicas: "",
  });

  const atualizarFiltro = (campo: keyof Filtros, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    Object.entries(filtros).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="bg-deepOceanic">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
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
          
          <div>            
            <Select value={filtros.faixaPreco} onValueChange={(valor) => atualizarFiltro("faixaPreco", valor)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-300k">Até R$ 300.000</SelectItem>
                <SelectItem value="300k-500k">R$ 300.000 - R$ 500.000</SelectItem>
                <SelectItem value="500k-800k">R$ 500.000 - R$ 800.000</SelectItem>
                <SelectItem value="800k+">Acima de R$ 800.000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={filtros.area} onValueChange={(valor) => atualizarFiltro("area", valor)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Área (m²)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50">Até 50 m²</SelectItem>
                <SelectItem value="50-100">Até 100 m²</SelectItem>
                <SelectItem value="100-200">Até 200 m²</SelectItem>
                <SelectItem value="200-300">Até 300 m²</SelectItem>
                <SelectItem value="300+">Mais de 300 m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                type="button"
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90 font-semibold border-white"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm mb-4">Filtros Adicionais</h4>
                
                <div>
                  <label className="text-xs text-gray-700 mb-1 block font-medium">Quantidade de Suítes</label>
                  <Select value={filtros.suites} onValueChange={(valor) => atualizarFiltro("suites", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
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

                <div>
                  <label className="text-xs text-gray-700 mb-1 block font-medium">Quantidade de Quartos</label>
                  <Select value={filtros.quartos} onValueChange={(valor) => atualizarFiltro("quartos", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
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

                <div>
                  <label className="text-xs text-gray-700 mb-1 block font-medium">Quantidade de Banheiros</label>
                  <Select value={filtros.banheiros} onValueChange={(valor) => atualizarFiltro("banheiros", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
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

                <div>
                  <label className="text-xs text-gray-700 mb-1 block font-medium">Vagas na Garagem</label>
                  <Select value={filtros.vagas} onValueChange={(valor) => atualizarFiltro("vagas", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
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

                <div>
                  <label className="text-xs text-gray-700 mb-1 block font-medium">Características</label>
                  <Select value={filtros.caracteristicas} onValueChange={(valor) => atualizarFiltro("caracteristicas", valor)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geminada">Geminada</SelectItem>
                      <SelectItem value="unica-lote">Única no Lote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

