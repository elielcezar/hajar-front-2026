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
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  User,
  Phone,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function PropertyDetails() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const propertyFeatures = [
    { icon: Bed, label: "Quartos", value: "3" },
    { icon: Bath, label: "Banheiros", value: "2" },
    { icon: Maximize, label: "Área", value: "350 m²" },
  ];

  const propertyImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
  ];

  // Listen to carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const generalFeatures = [
    "Ar condicionado",
    "WiFi",
    "Rádio",
    "Garagem",
    "Piscina",
    "Churrasqueira",
    "Jardim",
    "Elevador",
    "Portaria 24h",
    "Área de lazer",
    "Playground",
    "Academia"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Breadcrumb */}
      <div 
        className="relative h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200')" }}
      >
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

      {/* Search Bar */}
      <Newsletter />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 p-4 bg-card rounded-sm shadow-sm">
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
                <span>Publicado: 09/06/2023</span>
              </div>
            </div>

            {/* Image Carousel */}
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {propertyImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video rounded-sm overflow-hidden shadow-lg">
                      <img 
                        src={image} 
                        alt={`Propriedade ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h2 className="text-2xl font-bold text-white mb-2">
                            196 ROYAL BLUFF RD JACKSONVILLE NORTH CAROLINA 50212
                          </h2>
                          <p className="text-xl text-primary font-bold">R$ 500.000</p>
                          <p className="text-white/90 mt-2">
                            Pellentesque habitant morbi tristique senectus et netus et.
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
              {propertyImages.map((image, i) => (
                <div 
                  key={i} 
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={`aspect-video rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-all border-2 ${
                    currentSlide === i ? 'border-primary' : 'border-transparent hover:border-primary'
                  }`}
                >
                  <img 
                    src={image}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Mais Detalhes</TabsTrigger>
                <TabsTrigger value="agent">Contatar Corretor</TabsTrigger>
                <TabsTrigger value="comments">Comentários</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Características Gerais</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {generalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Descrição Completa</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero 
                      sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, 
                      commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, 
                      eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
                    </p>
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

              <TabsContent value="comments" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Comentários</h3>
                    <p className="text-muted-foreground">
                      Nenhum comentário ainda. Seja o primeiro a comentar!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">DESCRIÇÃO GERAL</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Pellentesque habitant morbi tristique senectus et netus et malesuada.
                </p>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preço:</span>
                    <span className="text-lg font-bold text-primary">R$ 500.000</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Localização:</span>
                    <span className="text-sm font-medium">New York</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Área:</span>
                    <span className="text-sm font-medium">350 m²</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Endereço:</span>
                    <span className="text-sm font-medium text-right">New York 33 # 1-39</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Banheiros:</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Quartos:</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Contact Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">João Silva</h4>
                    <p className="text-sm text-muted-foreground">Corretor de Imóveis</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    (11) 98765-4321
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    joao@imobiliaria.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Visualizações:</span>
                    <Badge variant="secondary">1,234</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Favoritos:</span>
                    <Badge variant="secondary">42</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compartilhamentos:</span>
                    <Badge variant="secondary">18</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
