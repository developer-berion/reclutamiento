import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Header = ({ onOpenModal }) => {
    const headerRef = useRef(null);

    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }, { scope: headerRef });

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: targetId, offsetY: 80 }, // Offset for sticky header
            ease: "power3.inOut"
        });
    };

    return (
        <header ref={headerRef} className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0">
                        <a href="https://financiegroup.com/" target="_blank" rel="noopener noreferrer">
                            <img alt="Financie Group Logo" className="h-12 w-auto object-contain cursor-pointer" src={`${import.meta.env.BASE_URL}logo-financiegroup.png`} />
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <a
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            href="#que-es"
                            onClick={(e) => handleScroll(e, "#que-es")}
                        >
                            ¿Por qué Experior?
                        </a>
                        <a
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            href="#beneficios"
                            onClick={(e) => handleScroll(e, "#beneficios")}
                        >
                            Herramientas
                        </a>
                        <a
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            href="#ejemplos"
                            onClick={(e) => handleScroll(e, "#ejemplos")}
                        >
                            Comparativa
                        </a>
                        <a
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            href="#faq"
                            onClick={(e) => handleScroll(e, "#faq")}
                        >
                            FAQ
                        </a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button
                            className="bg-primary text-deep-teal px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-all transform hover:scale-105"
                            onClick={onOpenModal}
                        >
                            Agendar Llamada
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
