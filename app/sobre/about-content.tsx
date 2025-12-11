"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GetInTouch } from "@/components/GetInTouch";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import Image from "next/image";

export const AboutContent = () => {
  return (
    <div>
        <>
          <Header />

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <div className="relative h-96 overflow-hidden">
                    <Image 
                        src="/about.jpg" 
                        alt="Sobre" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h1 className="font-aestetico text-4xl font-medium mb-4 border-b-4 border-primary inline-block pb-2">Nossa História</h1>
                    <p className="text-muted-foreground text-lg mb-4">O sonho da Hajar começou na década de 1980, com o lançamento dos loteamentos Jardim Gralha Azul e Jardim Santa Rosa, na Vila Rosa. Esses projetos, idealizados por Mohamad Fathallah Hajar, foram marcos fundamentais no desenvolvimento urbano de Palmeira.</p>
                    <p className="text-muted-foreground text-lg mb-4">Com o passar dos anos, esse propósito de crescimento e progresso tornou-se um legado familiar. Hoje, seus filhos, Jaudeth, Zahra e Omar Hajar, continuam atuando no mercado imobiliário com o mesmo compromisso: impulsionar o desenvolvimento da cidade e promover uma melhor qualidade de vida para todos os seus habitantes</p>                    
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">               
                <div>
                    <h1 className="font-aestetico text-2xl font-medium mb-2">Missão</h1>
                    <p className="text-muted-foreground text-lg mb-4">Trazer para Palmeira investimentos e tecnologias inovadoras que transformem a cidade e atendam às necessidades essenciais de cada pessoa, contribuindo para uma comunidade mais próspera e equilibrada.</p>                    
                    <h1 className="font-aestetico text-2xl font-medium mb-2">Visão</h1>
                    <p className="text-muted-foreground text-lg mb-4">Ser uma empresa referência no desenvolvimento urbano de Palmeira, atuando de forma contínua para garantir moradia digna, oportunidades de trabalho e qualidade de vida para todos.</p>                    
                    <h1 className="font-aestetico text-2xl font-medium mb-2">Valores e Princípios</h1>
                    <p className="text-muted-foreground text-lg mb-4">
                      <strong>Transparência</strong>: agir com clareza e honestidade em todas as relações.<br/>
                      <strong>Iniciativa</strong>: buscar constantemente novas oportunidades de crescimento.<br/>
                      <strong>Ética</strong>: manter o respeito e a integridade em todas as decisões.<br/>
                      <strong>Persistência</strong>: superar desafios com foco e determinação.<br/>
                      <strong>Profissionalismo</strong>: atuar com responsabilidade e excelência em cada projeto.
                    </p>                    
                </div>
                <div className="relative overflow-hidden flex items-center justify-center">
                    <Image 
                        src="/about.jpg" 
                        alt="Sobre" 
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
          </div>

          <FeaturesSection />

          <BrandsCarousel />

          <GetInTouch />

          <Footer />
        </>
      
    </div>
  );
};