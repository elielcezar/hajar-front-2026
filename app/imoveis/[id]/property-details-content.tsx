"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { 
  Printer, 
  MessageSquare, 
  Mail, 
  Star,
  Bed,
  Bath,
  Maximize,
  Calendar,
  User,
  Phone,
  Send,
  MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Imovel } from "@/lib/api";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { CarouselProperties } from "@/components/CarouselProperties";
import { GetInTouch } from "@/components/GetInTouch";

interface PropertyDetailsContentProps {
  imovel: Imovel;
}

export default function PropertyDetailsContent({ imovel }: PropertyDetailsContentProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const propertyFeatures = [
    { icon: Bed, label: "Quartos", value: String(imovel.quartos) },
    { icon: Bath, label: "Banheiros", value: String(imovel.banheiros) },
    { icon: Maximize, label: "Área", value: `${imovel.area} m²` },
  ];

  // Listen to carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const priceFormatted = imovel.tipo === 'aluguel' 
    ? `R$ ${imovel.preco.toLocaleString('pt-BR')}/mês` 
    : `R$ ${imovel.preco.toLocaleString('pt-BR')}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Bar */}
      <Newsletter />
      
      {/* Hero Section with Breadcrumb */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={imovel.fotos[0] || "/property-1.jpg"}
          alt={imovel.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">DETALHES DO IMÓVEL</h1>
          <div className="flex items-center gap-2 text-white">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary">Detalhes do Imóvel</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons */}
            {/*<div className="flex flex-wrap gap-3 p-4 bg-card rounded-sm shadow-sm">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat ao vivo
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contato
              </Button>
              <Button 
                variant={isFavorite ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Star className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                Favoritos
              </Button>
              <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Publicado: {imovel.dataPublicacao ? new Date(imovel.dataPublicacao).toLocaleDateString('pt-BR') : 'Recente'}</span>
              </div>
            </div>*/}

            {/* Image Carousel */}
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {imovel.fotos.map((foto, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-sm overflow-hidden shadow-lg">
                      <Image 
                        src={foto} 
                        alt={`${imovel.titulo} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h2 className="text-2xl font-bold text-white mb-2">
                            {imovel.titulo}
                          </h2>
                          <p className="text-xl text-primary font-bold">{priceFormatted}</p>
                          <p className="text-white/90 mt-2">
                            {imovel.descricao.substring(0, 100)}...
                          </p>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {imovel.fotos.slice(0, 4).map((foto, i) => (
                <div 
                  key={i} 
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={`relative aspect-video rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-all border-2 ${
                    currentSlide === i ? 'border-primary' : 'border-transparent hover:border-primary'
                  }`}
                >
                  <Image 
                    src={foto}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>            
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">DESCRIÇÃO GERAL</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {imovel.descricao.substring(0, 150)}...
                </p>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preço:</span>
                    <span className="text-lg font-bold text-primary">{priceFormatted}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Localização:</span>
                    <span className="text-sm font-medium">{imovel.localizacao}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Área:</span>
                    <span className="text-sm font-medium">{imovel.area} m²</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Endereço:</span>
                    <span className="text-sm font-medium text-right">{imovel.endereco}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Banheiros:</span>
                    <span className="text-sm font-medium">{imovel.banheiros}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quartos:</span>
                    <span className="text-sm font-medium">{imovel.quartos}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Contact Card */}
            {imovel.corretor && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">{imovel.corretor.nome}</h4>
                      <p className="text-sm text-muted-foreground">Corretor de Imóveis</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${imovel.corretor.telefone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {imovel.corretor.telefone}
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`mailto:${imovel.corretor.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        {imovel.corretor.email}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            {/*<Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Visualizações:</span>
                    <Badge variant="secondary">{imovel.visualizacoes || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Favoritos:</span>
                    <Badge variant="secondary">{imovel.favoritos || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compartilhamentos:</span>
                    <Badge variant="secondary">18</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>*/}
          </div>          
        </div>            

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="w-full mt-12">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Mais Detalhes</TabsTrigger>
                <TabsTrigger value="agent">Contatar Corretor</TabsTrigger>
                {/*<TabsTrigger value="comments">Comentários</TabsTrigger>*/}
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-6">
                {/*<Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Características Gerais</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(imovel.caracteristicas || []).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>*/}

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Descrição Completa</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {imovel.descricao}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold">Localização</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {imovel.endereco}, {imovel.localizacao}
                    </p>
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${imovel.endereco}, ${imovel.localizacao}`)}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização do Imóvel"
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${imovel.endereco}, ${imovel.localizacao}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Abrir no Google Maps
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="agent" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Entre em Contato com o Corretor</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" placeholder="Seu nome" />
                        </div>
                        <div>
                          <Label htmlFor="email">E-mail</Label>
                          <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(00) 00000-0000" />
                      </div>
                      <div>
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Estou interessado neste imóvel..."
                          rows={5}
                        />
                      </div>
                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/*<TabsContent value="comments" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Comentários</h3>
                    <p className="text-muted-foreground">
                      Nenhum comentário ainda. Seja o primeiro a comentar!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>*/}
              
            </Tabs> 

            
      </div>

      <CarouselProperties />

      <GetInTouch />
      <Footer />

    </div>
  );
}

