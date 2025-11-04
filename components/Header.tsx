"use client";

import { Phone, MessageSquare, Globe } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:01800034567" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>01800034567</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Live chat</span>
              </a>
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </button>
            </div>
            <Button size="sm" className="h-8">
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#2b2b2b] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <div className="bg-white/10 p-2 rounded">
                <div className="w-6 h-6 border-2 border-white rounded-sm" />
              </div>
              <span className="text-primary">Hajar</span>
              <span>Imóveis</span>
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

