"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImoveis, type Imovel } from "@/lib/api";

export const CarouselProperties = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [properties, setProperties] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const data = await getImoveis();
        setProperties(data.slice(0, 8)); // Pega apenas os primeiros 8 imóveis
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImoveis();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Carregando imóveis...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-aestetico text-4xl mb-4 border-b-8 border-primary inline-block pb-2">
            IMÓVEIS EM DESTAQUE
          </h2>
          
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white p-3 transition-all duration-300 -translate-x-1/2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)]"
                >
                  <Link href={`/imoveis/${property.id}`}>
                    <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        {/* Diagonal Badge */}
                        <div className="absolute top-0 left-0 z-10">
                          <div className="relative w-32 h-32">
                            <div className="absolute top-6 -left-8 w-40 bg-primary text-white text-center py-2 transform -rotate-45 shadow-lg">
                              <span className="text-sm font-bold">
                                {property.tipo === 'venda' ? 'À Venda!' : 'Para Alugar!'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Property Image */}
                        <Image
                          src={property.fotos[0] || "/placeholder.svg"}
                          alt={property.titulo}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white text-xl font-bold">
                            {property.titulo}
                          </h3>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-medium">Place</span>
                          <span className="text-sm text-gray-800">{property.localizacao}</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm text-gray-600 font-medium">Price</span>
                          <span className="text-lg font-bold text-primary">
                            {property.tipo === 'aluguel' 
                              ? `R$ ${property.preco}/mês` 
                              : `R$ ${property.preco.toLocaleString('pt-BR')}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white p-3 transition-all duration-300 translate-x-1/2"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
     
    </section>
  );
};

