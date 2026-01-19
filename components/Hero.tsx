"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Home, BedDouble, Bath, CarFront } from "lucide-react";
import { getDestaques, type Destaque } from "@/lib/api";

export const Hero = () => {
  const [destaques, setDestaques] = useState<Destaque[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    async function fetchDestaques() {
      try {
        const data = await getDestaques();
        setDestaques(data);
      } catch (error) {
        console.error('Erro ao carregar destaques:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDestaques();
  }, []);

  useEffect(() => {
    if (destaques.length === 0) return;
    
    const interval = setInterval(() => {
      const next = (currentImageIndex + 1) % destaques.length;
      setNextImageIndex(next);
      setIsTransitioning(true);
      setAnimationKey(prev => prev + 1);
      
      setTimeout(() => {
        setCurrentImageIndex(next);
        setIsTransitioning(false);
      }, 1300); // Duração da animação mosaico (último bloco delay 400ms + animação 800ms = 1200ms + margem)
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, destaques.length]);

  if (loading) {
    return (
      <div className="relative min-h-[600px] overflow-hidden bg-zinc-900 flex items-center justify-center">
        <p className="text-white text-lg">Carregando...</p>
      </div>
    );
  }

  if (destaques.length === 0) {
    return null;
  }

  return (
    <div className="relative min-h-[600px] overflow-hidden bg-zinc-900">
      {/* Animated Background Images */}
      {destaques.map((item: Destaque, index: number) => {
        const isCurrentSlide = index === currentImageIndex;
        const isNextSlide = index === nextImageIndex && isTransitioning;
        const shouldShow = isCurrentSlide || isNextSlide;
        
        if (!shouldShow) return null;
        
        const cols = 6;
        const rows = 4;
        const totalBlocks = cols * rows;
        
        return (
          <div
            key={`slide-${index}-${isNextSlide ? animationKey : 'static'}`}
            className={`absolute inset-0 ${
              isNextSlide ? "z-20" : isCurrentSlide ? "z-10" : "z-0"
            }`}
          >
            {/* Imagem completa */}
            {!isNextSlide && (
              <div className={`absolute inset-0 ${
                (isCurrentSlide && isTransitioning) ? "fade-out-smooth" : ""
              }`}>
                <Image
                  src={item.imagem}
                  alt={item.titulo}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
              </div>
            )}

            {/* Efeito Mosaico - Cria grade de blocos por cima */}
            {isNextSlide && (
              <>
                {/* Imagem completa que aparece quando mosaico suma */}
                <div className="absolute inset-0 fade-in-from-mosaic">
                  <Image
                    src={item.imagem}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>
                
                <div className="mosaic-container">
                  {Array.from({ length: totalBlocks }).map((_, blockIndex) => {
                    const col = blockIndex % cols;
                    const row = Math.floor(blockIndex / cols);
                    
                    return (
                      <div
                        key={blockIndex}
                        className="mosaic-block"
                      >
                        <div 
                          className="absolute inset-0"
                          style={{
                            width: `${cols * 100}%`,
                            height: `${rows * 100}%`,
                            left: `${-col * 100}%`,
                            top: `${-row * 100}%`,
                          }}
                        >
                          <Image
                            src={item.imagem}
                            alt=""
                            fill
                            className="object-cover"
                            quality={90}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Overlay no mosaico e na imagem que vai aparecer */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-[21]" />
              </>
            )}

            {/* Overlay na imagem completa (apenas quando não é nextSlide) */}
            {!isNextSlide && (
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            )}
      
            {isCurrentSlide && (
              <div className="relative container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col align-end max-w-3xl ml-auto justify-end">
                  {/* Título Principal */}
                  <div className={`w-[91%] relative bg-primary/90 px-8 py-4 mb-3 ml-[9%] inline-block hero-arrow-title ${
                    !isTransitioning ? 'content-fade-in-title' : 'opacity-0'
                  }`}>
                    <h1 className="font-aestetico relative text-3xl md:text-4xl font-medium text-white leading-6 text-right">
                      {item.titulo}
                    </h1>
                  </div>

                  {/* Card de Destaque do Imóvel */}
                  <div className={`text-right space-y-4 ${
                    !isTransitioning ? 'content-fade-in-content' : 'opacity-0'
                  }`}>
                  <p className="text-white text-right text-lg leading-relaxed bg-deepOceanic/80 backdrop-blur-sm p-6 md:p-8 rounded-sm">
                    {item.descricao}
                  </p>
                  
                  {/* Ícones de Características */}
                  <div className="flex flex-wrap gap-4 py-4 justify-end">
                    {item.area !== null && (
                      <div className="flex items-center gap-2 bg-deepOceanic/80 px-4 py-2 rounded">
                        <Home className="w-6 h-6 text-white" />
                        <span className="text-white text-xl font-semibold">{item.area}m²</span>
                      </div>
                    )}
                    
                    {item.quartos !== null && (
                      <div className="flex items-center gap-2 bg-deepOceanic/80 px-4 py-2 rounded">
                        <BedDouble className="w-6 h-6 text-white" />
                        <span className="text-white text-xl font-semibold">{item.quartos}</span>
                      </div>
                    )}
                    
                    {item.banheiros !== null && (
                      <div className="flex items-center gap-2 bg-deepOceanic/80 px-4 py-2 rounded">
                        <Bath className="w-6 h-6 text-white" />
                        <span className="text-white text-xl font-semibold">{item.banheiros}</span>
                      </div>
                    )}
                    
                    {item.garagem !== null && (
                      <div className="flex items-center gap-2 bg-deepOceanic/80 px-4 py-2 rounded">
                        <CarFront className="w-6 h-6 text-white" />
                        <span className="text-white text-xl font-semibold">{item.garagem}</span>
                      </div>
                    )}
                    
                    {item.valor !== null && (
                      <div className="flex items-center gap-2 bg-primary/90 px-6 py-2 rounded">                      
                        <span className="text-white text-2xl font-bold">
                          R$ {parseFloat(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Botão CTA */}
                  <div className="pt-0">
                    <Link href={item.link}>
                      <Button 
                        size="lg" 
                        className="bg-primary/90 hover:bg-primary text-white font-semibold px-8 py-6 text-lg"
                      >
                        {item.textoBotao}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>        
            </div>
            )}
        </div>
        );
      })}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {destaques.map((destaque, index) => (
          <button
            key={destaque.id}
            onClick={() => {
              if (!isTransitioning && index !== currentImageIndex) {
                setNextImageIndex(index);
                setIsTransitioning(true);
                setAnimationKey(prev => prev + 1);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsTransitioning(false);
                }, 1300);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? "bg-primary w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir para ${destaque.titulo}`}
          />
        ))}
      </div>
      
      
    </div>
  );
};

