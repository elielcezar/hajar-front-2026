"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const testimonials = [
  {
    text: "Lorem ipsum ea cum congue bonorum, pri no natum clita. His ne vide omnis forensibus. Eum cetero imperdiet et.!",
    author: "Jeniffer Martinez - Web Development"
  },
  {
    text: "Excelente serviço! Encontrei meu imóvel dos sonhos rapidamente e com todo suporte necessário durante o processo.",
    author: "Carlos Silva - Cliente Satisfeito"
  },
  {
    text: "Profissionais competentes e atenciosos. Recomendo a todos que buscam qualidade no atendimento imobiliário.",
    author: "Ana Paula - Investidora"
  }
];

export const Footer = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <footer className="bg-[#2b2b2b] text-white">
      {/* Get in Touch Section */}
      <div className="bg-[#3a3a3a] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-gray-300 italic text-lg mb-8 max-w-2xl mx-auto">
            Lorem ipsum ea cum congue bonorum, pri no natum clita. His ne vide
            omnis forensibus. Eum cetero imperdiet et.!
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            Agendar Visita
          </Button>
        </div>
      </div>

      {/* Red line with arrow */}
      <div className="relative">
        <div className="h-1 bg-primary"></div>
        <div className="absolute left-1/2 -translate-x-1/2 -top-3">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-primary"></div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:contato@hajar.com.br" className="hover:text-primary transition-colors">
                  contato@hajar.com.br
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="tel:55-5698-4589" className="hover:text-primary transition-colors">
                  55-5698-4589
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. Exemplo, 123 - São Paulo
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">hajarimoveis</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Links Úteis</h3>
            <ul className="space-y-3">
              <li>
                <a href="/sobre" className="text-gray-300 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/servicos" className="text-gray-300 hover:text-primary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/imoveis" className="text-gray-300 hover:text-primary transition-colors">
                  Imóveis
                </a>
              </li>
              <li>
                <a href="/corretores" className="text-gray-300 hover:text-primary transition-colors">
                  Nossos Corretores
                </a>
              </li>
            </ul>
          </div>

          {/* Tag Cloud */}
          <div>
            <h3 className="text-xl font-bold mb-6">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {["Blog", "Web Design", "News", "Internet", "Audio", "Image", "Blog", "Web Design", "News"].map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#4a4a4a] hover:bg-primary transition-colors px-4 py-2 text-sm cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="bg-[#3a3a3a] p-6">
              <p className="text-gray-300 mb-4 italic leading-relaxed">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-sm font-semibold">
                {testimonials[currentTestimonial].author}
              </p>
              
              {/* Navigation Dots */}
              <div className="flex gap-2 mt-6 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-primary"
                        : "bg-gray-500 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Hajar Imóveis. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="/privacidade" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

