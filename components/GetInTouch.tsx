"use client";
import Link from "next/link";

export const GetInTouch = () => {
    return (
        <div className="bg-oceanic py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-aestetico text-4xl md:text-5xl mb-4 mt-6 text-white">
                    <Link href="/contato" className="hover:text-gray-300 transition-colors">Entre em Contato</Link>
                </h2>
                <p className="text-gray-300 italic text-lg mb-8 max-w-2xl mx-auto">
                    Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal.
                </p>
            </div>
        </div>
    );
};