import React from 'react';

const Beneficios = () => {
    return (
        <section className="py-24" id="beneficios">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold leading-tight mb-8">Todo lo que necesitas para <span className="text-primary underline decoration-primary/30">servir y escalar</span></h2>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-deep-teal dark:bg-primary text-white dark:text-deep-teal rounded-xl flex items-center justify-center">
                                    <span className="material-icons-round">inventory_2</span>
                                </div>
                                <h4 className="font-bold">Portafolio Completo</h4>
                                <p className="text-sm text-gray-500">Vida Término, Permanente, IUL, Gastos Finales y Anualidades Indexadas. Todo en un solo lugar.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-deep-teal dark:bg-primary text-white dark:text-deep-teal rounded-xl flex items-center justify-center">
                                    <span className="material-icons-round">health_and_safety</span>
                                </div>
                                <h4 className="font-bold">Planes de Salud y Medicare</h4>
                                <p className="text-sm text-gray-500">Ofrece ACA/Obamacare. Para Medicare, si no tienes licencia, gana comisiones a través de nuestro programa de referidos.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-deep-teal dark:bg-primary text-white dark:text-deep-teal rounded-xl flex items-center justify-center">
                                    <span className="material-icons-round">gavel</span>
                                </div>
                                <h4 className="font-bold">Deuda y Legal</h4>
                                <p className="text-sm text-gray-500">Ayuda a tus clientes con consolidación de deudas y planificación patrimonial (Testamentos y Fideicomisos).</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-deep-teal dark:bg-primary text-white dark:text-deep-teal rounded-xl flex items-center justify-center">
                                    <span className="material-icons-round">rocket_launch</span>
                                </div>
                                <h4 className="font-bold">Ecosistema de Crecimiento</h4>
                                <p className="text-sm text-gray-500">CRM incluido, entrenamientos diarios, plataforma de marketing, leads y opciones de acciones (Stock Options).</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img alt="Family future" className="rounded-[48px] shadow-2xl object-cover h-[500px] w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdrtun9RT_h7tY1nEz1rhTsBhyocxNtF98dWu3naPisVqyxohfCI0rYbknzpCognusyQdd0cQ8HgfLOTSARSturaeZ8P3FSPo1lGxXwriYtgGirbuzEukyl3OgJ3myhvp97Ov4B8oPXypybecud5hE7uoi8RkDa6awU3nWKSXPsTPjRyOJLfu1U03S09D1C0s6yddIRnlPIOhesBQHadZsVTSpZQjTsKHKixvf3cG7nVsURIh24hgK1klpBwL6WPJc50-owWTxg6-y" />
                        <div className="absolute -top-10 -right-10 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hidden xl:block border border-divider dark:border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <span className="material-icons-round">verified</span>
                                </div>
                                <div>
                                    <p className="font-bold">Aprobación Rápida</p>
                                    <p className="text-xs text-gray-500">Proceso simplificado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Beneficios;
