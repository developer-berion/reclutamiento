import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = ({ onOpenModal, onOpenCalendly }) => {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-video", {
            scale: 0.9,
            opacity: 0,
            duration: 0.8
        })
            .from(".hero-text", {
                y: 30,
                opacity: 0,
                duration: 0.8
            }, "-=0.4");

    }, { scope: container });

    return (
        <section ref={container} className="bg-[#19272b] text-white py-16 lg:py-24 overflow-hidden relative">
            {/* Background glow effect mimicking the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">



                {/* Video Placeholder */}
                <div
                    className="hero-video w-full max-w-4xl aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer relative mb-12 bg-cover bg-center"
                    style={{ backgroundImage: `url("${import.meta.env.BASE_URL}thumb3.png")` }}
                    onClick={onOpenModal}
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                <span className="material-icons-round text-deep-teal text-3xl ml-1">play_arrow</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-text max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="text-4xl lg:text-7xl font-extrabold leading-tight font-display mb-8">
                        Agenda tu cita hoy
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 max-w-4xl">
                        Únete a la evolución de la industria financiera. Acceso a +57 aseguradoras, contratos competitivos y un plan claro para crecer como Productor o Constructor de Equipo.
                    </p>

                    <button
                        className="bg-primary text-deep-teal px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 mb-8 shadow-xl shadow-primary/20"
                        onClick={onOpenCalendly}
                    >
                        AGENDAR ENTREVISTA
                    </button>

                    <div className="flex items-center justify-center gap-2 text-gray-300">
                        <span className="material-icons-round text-primary text-xl">verified</span>
                        <p className="text-lg font-medium">Atención personalizada en español • Todo USA</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
