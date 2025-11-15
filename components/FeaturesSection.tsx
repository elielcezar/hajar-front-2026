import { TrendingUp, Building2, MapPin, Home, Info, Camera } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Para você morar bem",
    description: "Compre ou alugue com agilidade e segurança, sem burocracia.",
  },
  {
    icon: Building2,
    title: "Quer vender seu imóvel?",
    description: "Conte com nossa equipe para vender seu imóvel de forma eficiente e segura.",
  },
  {
    icon: MapPin,
    title: "Investimento seguro e rentável",
    description: "O mercado imobiliário é um investimento seguro e rentável a longo prazo.",
  },
  {
    icon: Home,
    title: "Mais de 100 opções disponíveis",
    description: "Nossa equipe possui mais de 20 anos de experiência em investimentos imobiliários.",
  },
  {
    icon: Info,
    title: "Alugue sem burocracia",
    description: "Com documentação e assinatura digital. Mais facilidade para você.",
  },
  {
    icon: Camera,
    title: "O imóvel dos sonhos está aqui!",
    description: "São dezenas de opções disponíveis para compra, confira!",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background border-t-[0.25rem] border-primary" id="features">
      <div className="container mx-auto px-4">       

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group"
              >
                <div className="flex flex-col">
                  <h3 className="font-aestetico text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary text-left pl-[1rem] mb-2">
                    {feature.title}
                  </h3>
                  <div className="flex items-center justify-start gap-0">
                    {/* Ícone circular com borda */}
                    <div className="relative flex-shrink-0 mr-[-30px]">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-deepOceanic transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-lg">
                        <Icon className="h-10 w-10 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    
                    {/* Conteúdo do card */}
                    <div className="flex-1 bg-muted/50 py-3 pl-[50px] pr-5 rounded-lg border border-border flex flex-col justify-center transition-all duration-300 group-hover:bg-muted group-hover:shadow-md">                    
                      <p className="text-sm text-muted-foreground leading-relaxed text-zinc-800">
                        {feature.description}
                      </p>
                    </div>
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

