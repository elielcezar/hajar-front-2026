"use client";

import { Phone, MessageSquare, Globe, Mail } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import logo from "@/public/logo.png";

export const Header = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between h-10 text-sm">
              <a href="mailto:escritoriohajar@outlook.com.br" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>escritoriohajar@outlook.com.br</span>
              </a>
              <a href="tel:42999536810" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>42 99953 6810</span>
              </a>
              <a href="tel:42999257363" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>42 99925 7363</span>
              </a>
              {/*<a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Live chat</span>
              </a>
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </button>*/}            
              {/*<Button size="sm" className="h-8">
                Login
              </Button>*/}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#2b2b2b] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">              
              <img src={logo.src} alt="Hajar" className="w-[150px] h-full" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white hover:text-primary transition-colors font-medium">HOME</Link>
              <Link href="#sobre" className="text-white/80 hover:text-primary transition-colors">SOBRE</Link>
              <Link href="#features" className="text-white/80 hover:text-primary transition-colors">RECURSOS</Link>
              <Link href="/imoveis" className="text-white/80 hover:text-primary transition-colors">IMÓVEIS</Link>
              <Link href="#blog" className="text-white/80 hover:text-primary transition-colors">BLOG</Link>
              <Link href="/contato" className="text-white/80 hover:text-primary transition-colors">CONTATO</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

