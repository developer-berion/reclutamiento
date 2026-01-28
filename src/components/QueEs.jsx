import React from 'react';

const QueEs = () => {
    return (
        <section className="py-24" id="que-es">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">¿Por qué Experior?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">La plataforma diseñada para agentes que buscan libertad, propiedad real y mejores ingresos.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-xl border border-divider dark:border-gray-800 hover:border-primary transition-colors">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <span className="material-icons-round text-primary text-3xl">lock_open</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Libertad y Propiedad</h3>
                        <p className="text-gray-500 dark:text-gray-400">Tu negocio es 100% tuyo. Si decides moverte, te llevas tu cartera y tus clientes. No somos cautivos; te quedas por el valor, no por obligación.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-xl border border-divider dark:border-gray-800 hover:border-primary transition-colors">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <span className="material-icons-round text-primary text-3xl">handshake</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Variedad de aseguradoras y productos</h3>
                        <p className="text-gray-500 dark:text-gray-400">Acceso a más de 57 aseguradoras Top-Rated. Ofrece siempre la solución correcta para tu cliente, no el único producto que tiene la agencia.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-xl border border-divider dark:border-gray-800 hover:border-primary transition-colors">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                            <span className="material-icons-round text-primary text-3xl">payments</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">Contratos Competitivos</h3>
                        <p className="text-gray-500 dark:text-gray-400">Comienza al 70%, muy por encima del estándar de la industria (25-30%). Tu crecimiento depende de tu visión: Productor o Constructor de Equipo.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QueEs;
