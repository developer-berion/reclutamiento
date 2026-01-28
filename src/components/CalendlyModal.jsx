import React, { useEffect, useRef } from 'react';
import { InlineWidget } from 'react-calendly';
import gsap from 'gsap';

const CalendlyModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Disable scroll when modal is open
            document.body.style.overflow = 'hidden';

            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
                .to(contentRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.2");
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: onClose
        });
        tl.to(contentRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: 'power3.in' })
            .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    };

    if (!isOpen && !modalRef.current) return null;

    return (
        <div ref={modalRef} className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative bg-white w-full max-w-4xl h-[90vh] md:h-[650px] rounded-[32px] overflow-hidden shadow-2xl opacity-0 scale-95 translate-y-10"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-6 z-10 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                    <span className="material-icons-round text-gray-600">close</span>
                </button>

                <div className="w-full h-full pt-12">
                    <InlineWidget
                        url="https://calendly.com/biancafinanzas/zoom-meeting-1?back=1"
                        styles={{ height: '100%', width: '100%' }}
                        pageSettings={{
                            backgroundColor: 'ffffff',
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: 'f6c71e',
                            textColor: '414042'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendlyModal;
