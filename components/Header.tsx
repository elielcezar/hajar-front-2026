"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import logo from "@/public/logo.png";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/imoveis", label: "IMÓVEIS" },
  { href: "/sobre", label: "SOBRE" },
  { href: "/blog", label: "BLOG" },
  { href: "https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso", label: "SIMULADOR DE FINANCIAMENTO", external: true },
  { href: "/contato", label: "CONTATO" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Main Navigation - z-[60] para ficar acima do drawer (z-50) e do overlay (z-40) */}
      <nav className="bg-primary text-white sticky top-0 z-[60]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <img src={logo.src} alt="Hajar" className="w-[150px] h-full" />
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white px-2 py-1 rounded-md hover:text-primary hover:bg-white transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile: botão sanduíche / X (mesmo botão abre e fecha) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay - Mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden
        />
      )}

      {/* Drawer - Mobile: desliza da esquerda (90% da largura) */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-primary z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center h-16 px-4 border-b border-white/20">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <img src={logo.src} alt="Hajar" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex flex-col py-4">
          {navLinks.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Redes Sociais - mesmo bloco do Footer */}
          <div className="mt-6 pt-6 px-6 border-t border-white/20">
            <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider mb-4">
              Redes Sociais
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/hajarimoveis"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-7 h-7" />
              </a>
              <a
                href="https://www.instagram.com/hajarimoveis"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

