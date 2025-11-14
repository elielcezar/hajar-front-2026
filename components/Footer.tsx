"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/public/logo-footer.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";


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
    <footer className="bg-deepOceanic text-white">
      

      {/* Red line with arrow */}      
      <div className="h-1 bg-primary"></div>              
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Contact Us */}
          <div className="w-full landscape:max-w-[30%] flex flex-col">
            <img src={logo.src} alt="Hajar" className="self-start w-[220px] h-auto mb-6" />            

              <div className="flex items-start gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:contato@hajar.com.br" className="hover:text-primary transition-colors">
                  contato@hajar.com.br
                </a>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <a href="tel:55-5698-4589" className="hover:text-primary transition-colors">
                  55-5698-4589
                </a>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. Exemplo, 123 - São Paulo
                </span>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">hajarimoveis</span>
              </div>
          </div>

          {/* Tag Cloud */}
          <div className="w-full landscape:max-w-[30%] flex flex-col">

            <h3 className="text-xl font-bold mt-6 mb-9">Nossos Consultores</h3>
              <ul>
                <li className="mb-3 flex gap-2">
                  <FaWhatsapp className="bg-green-500 rounded-full p-1 w-6 h-6 text-white mt-1 flex-shrink-0 inline-block" /> 
                  <span>
                    <strong className="inline-block min-w-[140px]">Jaudeth hajar</strong> (42) 99925-7363<br/>
                    CRECI 15545
                  </span>
                </li>
                <li className="mb-3 flex gap-2">
                  <FaWhatsapp className="bg-green-500 rounded-full p-1 w-6 h-6 text-white mt-1 flex-shrink-0 inline-block" /> 
                  <span>
                    <strong className="inline-block min-w-[140px]">Zahra Hajar</strong> (42) 99924-8874<br/>
                    CRECI 18590
                  </span>
                </li>
                <li className="mb-3 flex gap-2">
                  <FaWhatsapp className="bg-green-500 rounded-full p-1 w-6 h-6 text-white mt-1 flex-shrink-0 inline-block" /> 
                  <span>
                    <strong className="inline-block min-w-[140px]">Kelly Stanganini</strong> (42) 99141-4779<br/>
                    CRECI 48209
                  </span>
                </li>
                <li className="mb-3 flex gap-2">
                  <FaWhatsapp className="bg-green-500 rounded-full p-1 w-6 h-6 text-white mt-1 flex-shrink-0 inline-block" /> 
                  <span>
                    <strong className="inline-block min-w-[140px]">Yara Agottani</strong> (42) 99953-6810<br/>
                    CRECI 33773
                  </span>
                </li>              
              </ul>
            </div>

          {/* Testimonials */}
          <div className="w-full landscape:max-w-[20%] flex flex-col">

            <h3 className="text-xl font-bold mt-6 mb-9">Cotações do dia</h3>
            <ul>
              <li className="mb-3"><strong>Dólar:</strong> R$ 5,29</li>
              <li className="mb-3"><strong>Milho:</strong> R$ 55,24/sc</li>
              <li className="mb-3"><strong>Soja:</strong> R$ 133,98/sc</li>
              <li className="mb-3"><strong>Atualizado em:</strong> 14/11/2025 10:10</li>
            </ul>
            
          </div>
          <div className="w-full landscape:max-w-[20%] flex flex-col">

            <h3 className="text-xl font-bold mt-6 mb-9">Redes Sociais</h3>            
            <div className="flex items-start gap-4">              
              <FaFacebook className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
              <FaInstagram className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
              <FaLinkedin className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
              
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
              {/*<a href="/privacidade" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Termos de Uso
              </a>*/}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

