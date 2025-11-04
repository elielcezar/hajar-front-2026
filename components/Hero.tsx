"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";

const heroImages = [
  "/hero-bg.jpg",
  "/hero-bg-2.jpg",
  "/hero-bg-3.jpg",
  "/hero-bg-4.jpg"
];
    
export const Hero = () => {
  const [priceProperty, setPriceProperty] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Animated Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Hero background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Calculator */}
          <div className="bg-[#2b2b2b]/95 backdrop-blur-sm p-6 rounded-sm max-w-md">
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-black/30">
                <TabsTrigger value="calculator" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="buying" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
                  Buying
                </TabsTrigger>
                <TabsTrigger value="selling" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
                  Selling
                </TabsTrigger>
                <TabsTrigger value="renting" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
                  Renting
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="mt-6 space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Calculate Your Propertie</label>
                  <Input 
                    placeholder="Price Propertie" 
                    value={priceProperty}
                    onChange={(e) => setPriceProperty(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Down payment" 
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Interest Rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3%</SelectItem>
                      <SelectItem value="4">4%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="6">6%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 Months</SelectItem>
                      <SelectItem value="24">24 Months</SelectItem>
                      <SelectItem value="36">36 Months</SelectItem>
                      <SelectItem value="48">48 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Calculate</Button>
              </TabsContent>

              <TabsContent value="buying" className="mt-6">
                <p className="text-white text-center py-8">Buying options coming soon...</p>
              </TabsContent>

              <TabsContent value="selling" className="mt-6">
                <p className="text-white text-center py-8">Selling options coming soon...</p>
              </TabsContent>

              <TabsContent value="renting" className="mt-6">
                <p className="text-white text-center py-8">Renting options coming soon...</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Hero Text */}
          <div className="flex items-center justify-center md:justify-end mt-12 md:mt-24">
            <div className="bg-primary/90 backdrop-blur-sm px-12 py-8 rounded-sm animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
                Encontre o imóvel dos seus sonhos
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? "bg-primary w-8" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

