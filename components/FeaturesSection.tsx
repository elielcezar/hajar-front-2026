import { TrendingUp, Building2, MapPin, Home, Info, Camera } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Resultados Mensuráveis",
    description: "Acompanhe o desempenho de seus imóveis com métricas detalhadas.",
  },
  {
    icon: Building2,
    title: "Projetos em Destaque",
    description: "Conheça os melhores empreendimentos da região.",
  },
  {
    icon: MapPin,
    title: "Encontre seu Lugar",
    description: "Busca inteligente por localização e preferências.",
  },
  {
    icon: Home,
    title: "Anuncie Aluguéis",
    description: "Plataforma completa para gestão de locações.",
  },
  {
    icon: Info,
    title: "Orientação Especializada",
    description: "Consultoria profissional em todas as etapas.",
  },
  {
    icon: Camera,
    title: "Liste seu Imóvel",
    description: "Cadastre e divulgue seu imóvel de forma simples.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background" id="features">
      <div className="container mx-auto px-4">
        {/* Título com linha decorativa */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide">NOSSOS RECURSOS</h2>
          <div className="w-32 h-1 bg-primary"></div>
        </div>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group"
              >
                <div className="flex items-start gap-4">
                  {/* Ícone circular com borda */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-lg">
                      <Icon className="h-10 w-10 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Conteúdo do card */}
                  <div className="flex-1 bg-muted/50 p-5 rounded-sm min-h-[100px] flex flex-col justify-center transition-all duration-300 group-hover:bg-muted group-hover:shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-foreground transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

