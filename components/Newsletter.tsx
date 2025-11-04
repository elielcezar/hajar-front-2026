"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const Newsletter = () => {
  return (
    <div className="bg-primary/90 border-y border-primary">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div>
            <label className="text-xs text-white/90 mb-1 block font-medium">Cidade</label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sao-paulo">São Paulo</SelectItem>
                <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                <SelectItem value="brasilia">Brasília</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-white/90 mb-1 block font-medium">Tipo de Imóvel</label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione..." />
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
            <label className="text-xs text-white/90 mb-1 block font-medium">Faixa de Preço</label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione..." />
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
            <label className="text-xs text-white/90 mb-1 block font-medium">Área (m²)</label>
            <Input 
              type="number" 
              placeholder="Ex: 80" 
              className="bg-white"
            />
          </div>
          
          <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

