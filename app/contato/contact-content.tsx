"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const agents = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@hajar.com.br",
    phone: "(11) 98765-4321",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@hajar.com.br",
    phone: "(11) 98765-4322",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@hajar.com.br",
    phone: "(11) 98765-4323",
  },
  {
    id: 4,
    name: "Ana Paula",
    email: "ana@hajar.com.br",
    phone: "(11) 98765-4324",
  },
];

export default function ContactContent() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mensagem Enviada!",
        description: "Entraremos em contato o mais breve possível.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Contato</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] bg-muted relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0977579757647!2d-46.65417768502216!3d-23.56142398468115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Escritório"
        />
      </div>

      {/* Stay Informed Section */}
      <div className="bg-muted py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold italic mb-2">FIQUE INFORMADO</h2>
              <p className="text-muted-foreground">
                Receba as últimas atualizações e ofertas exclusivas de imóveis no seu e-mail.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Seu e-mail..."
                className="min-w-[300px] h-12 bg-background"
                type="email"
              />
              <Button size="lg" className="h-12 px-8">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <div className="text-sm font-bold mb-2 text-muted-foreground tracking-wider">
                ENTRE EM CONTATO
              </div>
              <h2 className="text-4xl font-bold mb-4 border-b-4 border-primary inline-block pb-2">
                FORMULÁRIO DE CONTATO
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold">
                  NOME *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold">
                  E-MAIL *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold">
                  TELEFONE
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-bold">
                  SUA MENSAGEM *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Conte-nos sobre sua consulta..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>

          {/* Info Agents */}
          <div>
            <div className="mb-8">
              <div className="text-sm font-bold mb-2 text-muted-foreground tracking-wider">
                NOSSA EQUIPE
              </div>
              <h2 className="text-4xl font-bold mb-4 border-b-4 border-primary inline-block pb-2">
                CORRETORES
              </h2>
              <p className="text-muted-foreground mt-4">
                Nossos corretores experientes estão aqui para ajudá-lo a encontrar o imóvel dos seus sonhos. 
                Sinta-se à vontade para entrar em contato diretamente com qualquer membro de nossa equipe.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className="bg-card border border-border rounded-sm p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3">{agent.name}</h3>
                      <div className="space-y-2 text-sm">
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="break-all">{agent.email}</span>
                        </a>
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          <span>{agent.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}

