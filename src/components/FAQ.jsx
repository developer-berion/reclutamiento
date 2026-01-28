import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: "¿Necesito tener licencia para comenzar?",
            answer: "No es obligatorio para empezar. Si aún no la tienes, te guiamos paso a paso para obtenerla. Si ya eres licenciado, el proceso de incorporación es rápido para que empieces a producir."
        },
        {
            question: "¿Tengo que reclutar personas obligatoriamente?",
            answer: "No. En Experior tienes dos caminos claros: Productor (enfocado 100% en tus ventas personales) o Constructor de Equipo (Liderazgo). Tú eliges cómo quieres crecer y ganar."
        },
        {
            question: "¿Ofrecen leads o clientes potenciales?",
            answer: "Sí, tenemos acceso a proveedores externos de leads de alta calidad. Tú controlas tu presupuesto y decides cuánto invertir. Nosotros te entrenamos en cómo convertirlos efectivamente."
        },
        {
            question: "¿Puedo hacer esto si tengo otro trabajo?",
            answer: "Absolutamente. Muchos de nuestros agentes exitosos comenzaron a tiempo parcial (Part-time) y luego hicieron la transición completa cuando sus ingresos de agencia superaron su salario."
        }
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-950" id="faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
                    <p className="text-gray-500">Resolvemos tus dudas sobre cómo funciona el IUL.</p>
                </div>
                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div key={index} className={`accordion-item bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-divider dark:border-gray-800 overflow-hidden ${activeIndex === index ? 'active' : ''}`}>
                            <button
                                className="accordion-toggle w-full p-6 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-bold">{item.question}</span>
                                <span className={`material-icons-round arrow-icon transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            <div className="accordion-content">
                                <div className="p-6 pt-0 text-gray-500 dark:text-gray-400 text-sm">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
