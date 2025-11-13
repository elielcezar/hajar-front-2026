import { useState } from "react";
import { Header } from "@/components/Header";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const agents = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@realestate.com",
    phone: "331-23-45",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "sarah.mitchell@realestate.com",
    phone: "331-23-45",
  },
  {
    id: 3,
    name: "Michael Torres",
    email: "michael.torres@realestate.com",
    phone: "331-23-45",
  },
  {
    id: 4,
    name: "Emma Williams",
    email: "emma.williams@realestate.com",
    phone: "331-23-45",
  },
];

export default function Contact() {
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
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
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
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Contact</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] bg-muted relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894612!2d-74.11976373946229!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        />
      </div>

      {/* Stay Informed Section */}
      <div className="bg-muted py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold italic mb-2">STAY INFORMED</h2>
              <p className="text-muted-foreground">
                Get the latest updates and exclusive property listings delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Your Email..."
                className="min-w-[300px] h-12 bg-background"
                type="email"
              />
              <Button size="lg" className="h-12 px-8">
                Subscribe
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
                GET IN TOUCH
              </div>
              <h2 className="text-4xl font-bold mb-4 border-b-4 border-primary inline-block pb-2">
                CONTACT FORM
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold">
                  NAME *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold">
                  EMAIL *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold">
                  PHONE
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={20}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-bold">
                  YOUR MESSAGE *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your inquiry..."
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
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Info Agents */}
          <div>
            <div className="mb-8">
              <div className="text-sm font-bold mb-2 text-muted-foreground tracking-wider">
                OUR TEAM
              </div>
              <h2 className="text-4xl font-bold mb-4 border-b-4 border-primary inline-block pb-2">
                INFO AGENTS
              </h2>
              <p className="text-muted-foreground mt-4">
                Our experienced real estate agents are here to help you find your dream property. 
                Feel free to reach out to any of our team members directly.
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
