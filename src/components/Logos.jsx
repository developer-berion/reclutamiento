import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Logos = () => {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);

    const logos = [
        "seguros/2 (1).png",
        "seguros/Corebridge_financial_1200x392.png",
        "seguros/ETHOS-500X500.png",
        "seguros/Foresters_Financial_Logo.svg.png",
        "seguros/John_Hancock_-1200.png",
        "seguros/NA-650X330.png",
        "seguros/agg.png",
        "seguros/athene.png",
        "seguros/globalatlantic.png",
        "seguros/mutualofomaha700.png",
        "seguros/north-american-logo-white-v2.webp",
        "seguros/prudential-logo-2.png"
    ].map(logo => `${import.meta.env.BASE_URL}${logo}`);

    // Duplicate logos to ensure enough content for smooth loop
    const displayLogos = [...logos, ...logos, ...logos];

    useGSAP(() => {
        // We calculate the width of the original set (1/3 of the container width)
        const totalWidth = scrollRef.current.scrollWidth / 3;

        const loop = gsap.to(scrollRef.current, {
            x: -totalWidth,
            duration: 35,
            ease: "none",
            repeat: -1,
        });

        // Optional: Pause on hover
        containerRef.current.addEventListener('mouseenter', () => loop.pause());
        containerRef.current.addEventListener('mouseleave', () => loop.play());

        return () => {
            loop.kill();
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-12 bg-white border-y border-gray-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Trabajamos con las aseguradoras líderes
                </p>
            </div>

            <div className="relative">
                <div ref={scrollRef} className="flex whitespace-nowrap gap-16 items-center w-max">
                    {displayLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                            <img
                                src={logo}
                                alt="Aseguradora"
                                className="h-8 md:h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient Masks for smooth fade on edges */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Logos;
