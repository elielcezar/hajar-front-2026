"use client";

import Image from "next/image";

export const BannerHome = () => {
    return (
        <div className="container mx-auto px-4 relative overflow-hidden mb-16">
            
            <Image 
                src="/banner-home.png" 
                alt="Banner Home" 
                width={1711}
                height={325}
                className="object-cover max-w-full h-auto" />                        
        </div>
    );
};