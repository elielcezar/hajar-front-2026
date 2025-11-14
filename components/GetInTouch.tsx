"use client";

import { Button } from "./ui/button";

export const GetInTouch = () => {
  return (
    <div className="bg-oceanic py-16">
        <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Entre em Contato
        </h2>
        <p className="text-gray-300 italic text-lg mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal.
        </p>
        <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
        >
            Agendar Visita
        </Button>
        </div>
    </div>
  );
};