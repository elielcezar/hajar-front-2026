"use client";

import { Phone, MessageSquare, Globe, Mail } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import logo from "@/public/logo.png";

export const Header = () => {
  return (
    <>
      {/* Top Bar */}
      {/*<div className="bg-muted border-b-2 border-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-10 text-sm">
            <a href="mailto:escritoriohajar@outlook.com.br" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">escritoriohajar@outlook.com.br</span>
            </a>
            <span className="flex items-center gap-8 font-medium">
              <a href="tel:42999536810" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <span className="text-white bg-primary rounded-lg p-1"><Phone className="h-5 w-5" /></span>
                <span>42 99953 6810</span>
              </a>
              <a href="tel:42999257363" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <span className="text-white bg-primary rounded-lg p-1"><Phone className="h-5 w-5" /></span>
                <span>42 99925 7363</span>
              </a>
            </span>            
          </div>
        </div>
      </div>*/}

      {/* Main Navigation */}
      <nav className="bg-primary text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <img src={logo.src} alt="Hajar" className="w-[150px] h-full" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white hover:text-primary transition-colors font-medium">HOME</Link>
              <Link href="/imoveis" className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white hover:text-primary transition-colors font-medium">IMÓVEIS</Link>
              <Link href="/sobre" className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white hover:text-primary transition-colors font-medium">SOBRE</Link>
              <Link href="https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso" target="_blank" className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white hover:text-primary transition-colors font-medium">SIMULADOR DE FINANCIAMENTO</Link>
              <Link href="/contato" className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white hover:text-primary transition-colors font-medium">CONTATO</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

