"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
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
  MapPin,
  CheckCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Imovel } from "@/lib/api";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { CarouselProperties } from "@/components/CarouselProperties";
import { GetInTouch } from "@/components/GetInTouch";
import { useToast } from "@/hooks/use-toast";

interface PropertyDetailsContentProps {
  imovel: Imovel;
}

export default function PropertyDetailsContent({ imovel }: PropertyDetailsContentProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Olá, tenho interesse no imóvel ${imovel.titulo} (Cód: ${imovel.codigo}). Gostaria de mais informações.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Form handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erro",
        description: "Por favor, insira um endereço de e-mail válido",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Enviar para a API
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      // Sucesso - mostrar mensagem
      setIsSuccess(true);
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const priceFormatted = imovel.tipo === 'aluguel' 
    ? `R$ ${imovel.preco.toLocaleString('pt-BR')}/mês` 
    : `R$ ${imovel.preco.toLocaleString('pt-BR')}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Bar */}
      <SearchBar />
      
     

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
                <h1 className="font-aestetico text-3xl font-medium mb-4">
                  {imovel.titulo}
                </h1>                
                <p className="text-sm text-muted-foreground mb-6">
                  {imovel.descricao.substring(0, 150)}...
                </p>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Valor:</span>
                    <span className="text-lg font-bold text-primary">{priceFormatted}</span>
                  </div>
                  
                  <Separator />
                  
                  {imovel.codigo && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Código de Referência:</span>
                      <span className="text-sm font-medium">{imovel.codigo}</span>
                    </div>
                  )}
                  
                  {imovel.tipo && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Finalidade:</span>
                      <span className="text-sm font-medium capitalize">{imovel.tipo}</span>
                    </div>
                  )}
                  
                  {imovel.categoria && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tipo:</span>
                      <span className="text-sm font-medium">{imovel.categoria}</span>
                    </div>
                  )}
                  
                  {imovel.bairro && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bairro:</span>
                      <span className="text-sm font-medium">{imovel.bairro}</span>
                    </div>
                  )}
                  
                  {imovel.localizacao && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cidade:</span>
                      <span className="text-sm font-medium">{imovel.localizacao}</span>
                    </div>
                  )}
                  
                  {imovel.area && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Área Construída:</span>
                      <span className="text-sm font-medium">{imovel.area} m²</span>
                    </div>
                  )}

                  {imovel.terrenoM2 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Área do Terreno:</span>
                      <span className="text-sm font-medium">{imovel.terrenoM2} m²</span>
                    </div>
                  )}
                  
                  {imovel.quartos !== undefined && imovel.quartos !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Dormitórios:</span>
                      <span className="text-sm font-medium">{imovel.quartos}</span>
                    </div>
                  )}
                  
                  {imovel.suites !== undefined && imovel.suites !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Suítes:</span>
                      <span className="text-sm font-medium">{imovel.suites}</span>
                    </div>
                  )}
                  
                  {imovel.banheiros !== undefined && imovel.banheiros !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Banheiros:</span>
                      <span className="text-sm font-medium">{imovel.banheiros}</span>
                    </div>
                  )}
                  
                  {imovel.vagas !== undefined && imovel.vagas !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Vagas de Garagem:</span>
                      <span className="text-sm font-medium">{imovel.vagas}</span>
                    </div>
                  )}
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
                    <h3 className="font-aestetico text-2xl font-medium mb-4">Descrição Completa</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {imovel.descricao}
                    </p>
                  </CardContent>
                </Card>

                {/*<Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="font-aestetico text-2xl font-medium">Localização</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {imovel.endereco}{imovel.bairro ? `, ${imovel.bairro}` : ''} - {imovel.localizacao}
                    </p>
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${imovel.endereco}${imovel.bairro ? ', ' + imovel.bairro : ''}, ${imovel.localizacao}`)}`}
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
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${imovel.endereco}${imovel.bairro ? ', ' + imovel.bairro : ''}, ${imovel.localizacao}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Abrir no Google Maps
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>*/}
              </TabsContent>

              <TabsContent value="agent" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Entre em Contato com o Corretor</h3>
                    
                    {isSuccess ? (
                      /* Mensagem de Sucesso */
                      <div className="text-center py-8 animate-fade-in">
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                          </div>
                        </div>
                        <h3 className="font-aestetico text-2xl font-medium mb-4">
                          Mensagem Enviada!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Obrigado por entrar em contato. Nossa equipe responderá o mais breve possível.
                        </p>
                        <Button
                          onClick={() => {
                            setIsSuccess(false);
                            setFormData({
                              name: "",
                              email: "",
                              phone: "",
                              message: `Olá, tenho interesse no imóvel ${imovel.titulo} (Cód: ${imovel.codigo}). Gostaria de mais informações.`,
                            });
                          }}
                          variant="outline"
                          size="lg"
                        >
                          Enviar nova mensagem
                        </Button>
                      </div>
                    ) : (
                      /* Formulário */
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Nome *</Label>
                            <Input 
                              id="name" 
                              name="name"
                              placeholder="Seu nome" 
                              value={formData.name}
                              onChange={handleChange}
                              required
                              maxLength={100}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">E-mail *</Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email" 
                              placeholder="seu@email.com" 
                              value={formData.email}
                              onChange={handleChange}
                              required
                              maxLength={255}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            placeholder="(00) 00000-0000" 
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength={20}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Mensagem *</Label>
                          <Textarea 
                            id="message" 
                            name="message"
                            placeholder="Estou interessado neste imóvel..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            maxLength={1000}
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                        </Button>
                      </form>
                    )}
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

