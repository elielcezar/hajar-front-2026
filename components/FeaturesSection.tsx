import { TrendingUp, Building2, MapPin, Home, Info, List } from "lucide-react";

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
    icon: List,
    title: "Liste seu Imóvel",
    description: "Cadastre e divulgue seu imóvel de forma simples.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted" id="features">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">NOSSOS RECURSOS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-background p-6 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
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

