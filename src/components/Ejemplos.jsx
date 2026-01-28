import React from 'react';

const Ejemplos = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-950" id="ejemplos">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">La Diferencia: Agencia Tradicional vs. Experior</h2>
                    <p className="text-gray-500">¿Por qué conformarte con menos cuando puedes tener propiedad y libertad real?</p>
                </div>
                <div className="overflow-x-auto rounded-[32px] shadow-2xl bg-white dark:bg-gray-900">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-deep-teal text-white">
                                <th className="p-6 font-bold">Característica</th>
                                <th className="p-6 font-bold border-l border-white/10">Experior</th>
                                <th className="p-6 font-bold border-l border-white/10 opacity-70">Agencia Tradicional / Cautiva</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-divider dark:divide-gray-800">
                            <tr>
                                <td className="p-6 font-medium">Propiedad del Negocio (Vesting)</td>
                                <td className="p-6 text-green-600 dark:text-green-400 font-bold border-l border-divider dark:border-gray-800">Día 1 (Tú eres dueño)</td>
                                <td className="p-6 text-red-500 border-l border-divider dark:border-gray-800">Retenido 2-5 años o Nunca</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-medium">Comisión Inicial</td>
                                <td className="p-6 text-green-600 dark:text-green-400 font-bold border-l border-divider dark:border-gray-800">70% (Hasta 115%+)</td>
                                <td className="p-6 text-red-500 border-l border-divider dark:border-gray-800">25% - 50%</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-medium">Variedad de Aseguradoras</td>
                                <td className="p-6 text-green-600 dark:text-green-400 font-bold border-l border-divider dark:border-gray-800">+57 Proveedores</td>
                                <td className="p-6 text-red-500 border-l border-divider dark:border-gray-800">1 o Limitadas</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-medium">Venta de Leads</td>
                                <td className="p-6 text-green-600 dark:text-green-400 font-bold border-l border-divider dark:border-gray-800">Proveedor Externo (Sin Conflicto)</td>
                                <td className="p-6 text-gray-500 border-l border-divider dark:border-gray-800">A menudo revenden leads viejos</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-medium">Stock Options (Acciones)</td>
                                <td className="p-6 text-green-600 dark:text-green-400 font-bold border-l border-divider dark:border-gray-800">SÍ (Accesible desde Baja Prod.)</td>
                                <td className="p-6 text-red-500 border-l border-divider dark:border-gray-800">Rara vez / Solo Top 1%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Ejemplos;
