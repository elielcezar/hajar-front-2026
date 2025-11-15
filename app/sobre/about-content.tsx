"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GetInTouch } from "@/components/GetInTouch";
import Image from "next/image";

export const AboutContent = () => {
  return (
    <div>
        <>
          <Header />

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative h-96 overflow-hidden">
                    <Image 
                        src="/about.jpg" 
                        alt="Sobre" 
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h1 className="font-aestetico text-4xl font-medium mb-4 border-b-4 border-primary inline-block pb-2">Sobre</h1>

                    <p className="text-muted-foreground text-lg mb-4">
                    A Hajar Imóveis é uma empresa de investimentos imobiliários que oferece soluções completas para compra, venda e aluguel de imóveis.
                    </p>
                    <p className="text-muted-foreground text-lg mb-4">
                        Entendemos que cada imóvel é único, carregando uma história própria e alinhada aos sonhos de nossos clientes. Por isso, realizamos uma curadoria cuidadosa, selecionando imóveis que atendem às mais altas expectativas em localização, estilo e conforto.
                    </p>
                    <p className="text-muted-foreground text-lg mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum pellentesque imperdiet. Nulla lacinia iaculis nulla non metus. pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut eu risus enim, ut pulvinar lectus. Sed hendrerit nibh.
                    </p>
                </div>
            </div>
          </div>

          <FeaturesSection />

          <GetInTouch />

          <Footer />
        </>
      
    </div>
  );
};