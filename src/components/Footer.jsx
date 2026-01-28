import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = ({ onOpenModal }) => {
    return (
        <footer className="bg-deep-teal dark:bg-deep-teal-dark text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <img alt="Financie Group Logo" className="h-14 w-auto brightness-0 invert mb-8" src={`${import.meta.env.BASE_URL}logo-financiegroup.png`} />
                        <p className="text-gray-400 max-w-md mb-8">
                            Ayudamos a agentes hispanos en EE.UU. a obtener libertad real, propiedad de su negocio y acceso a las mejores herramientas de la industria.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-deep-teal transition-all"
                                href="https://www.facebook.com/BiancaFinanzas/?ref=_xav_ig_profile_page_web#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="material-icons-round">facebook</span>
                            </a>
                            <a
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-deep-teal transition-all"
                                href="https://www.instagram.com/biancafinanzas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-deep-teal transition-all"
                                href="https://financiegroup.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="material-icons-round text-sm">language</span>
                            </a>
                        </div>
                    </div>
                    <div className="bg-white/5 p-10 rounded-[32px] border border-white/10">
                        <h3 className="text-2xl font-bold mb-4">¿Buscas crecer sin límites?</h3>
                        <p className="text-gray-300 mb-8">El modelo tradicional está roto. Únete a la agencia del futuro y toma el control de tu carrera.</p>
                        <button
                            className="inline-block bg-primary text-deep-teal px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
                            onClick={onOpenModal}
                        >
                            Agendar Entrevista
                        </button>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-12">
                    <div className="grid md:grid-cols-2 gap-8 text-xs text-gray-500">
                        <div>
                            <p>© 2026 Financie Group. Todos los derechos reservados.</p>
                        </div>
                        <div className="md:text-right space-x-6">
                            <a
                                className="hover:text-primary"
                                href="https://financiegroup.com/privacy-policy/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Política de Privacidad
                            </a>
                            <a
                                className="hover:text-primary"
                                href="https://financiegroup.com/terms-and-conditions/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Términos de Servicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
