import React, { useEffect, useRef, useState } from 'react';
import { InlineWidget } from 'react-calendly';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CalendlyModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const closeBtnRef = useRef(null);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Disable scroll when modal is open
            document.body.style.overflow = 'hidden';
            setShowCloseButton(false); // Reset button state

            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
                .to(contentRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }, "-=0.2");

            // Start 5s timer for the close button
            const timer = setTimeout(() => {
                setShowCloseButton(true);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    // Animated Button Entrance
    useGSAP(() => {
        if (showCloseButton && closeBtnRef.current) {
            gsap.fromTo(closeBtnRef.current,
                { opacity: 0, scale: 0, rotate: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)",
                    boxShadow: "0 0 20px rgba(246, 199, 30, 0.4)"
                }
            );
        }
    }, { dependencies: [showCloseButton] });

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: onClose
        });
        tl.to(contentRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: 'power3.in' })
            .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    };

    // Retrieve prefill data
    // Retrieve prefill data
    const prefill = React.useMemo(() => {
        const savedData = sessionStorage.getItem('leadData');
        if (!savedData) return {};

        try {
            const data = JSON.parse(savedData);
            // Split name into first and last
            const nameParts = data.name.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            return {
                email: data.email,
                firstName: firstName,
                lastName: lastName,
                name: data.name, // Full name fallback
                // Prefill for custom phone field and SMS reminders
                smsReminderNumber: data.phone,
                customAnswers: {
                    a1: data.phone,
                    a2: data.phone,
                    a3: data.phone
                }
            };
        } catch (e) {
            console.error('Error parsing lead data:', e);
            return {};
        }
    }, [isOpen]); // Only re-calc when modal opens to catch fresh data

    return (
        <div
            ref={modalRef}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ visibility: isOpen || modalRef.current ? 'visible' : 'hidden' }}
        >
            {/* Locked Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></div>

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative bg-white w-full max-w-4xl h-[90vh] md:h-[650px] rounded-[32px] overflow-hidden shadow-2xl translate-y-10"
            >
                {/* Premium Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-400 font-medium animate-pulse text-sm uppercase tracking-widest">Preparando tu agenda...</p>
                    </div>
                )}

                {/* Yellow Close Button - Delayed & High Contrast */}
                {showCloseButton && (
                    <button
                        ref={closeBtnRef}
                        onClick={handleClose}
                        className="absolute top-4 right-6 z-20 w-12 h-12 bg-primary text-deep-teal rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Cerrar calendario"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                <div className="w-full h-full pt-6">
                    <InlineWidget
                        url="https://calendly.com/biancafinanzas/zoom-meeting-1?back=1"
                        prefill={prefill}
                        styles={{ height: '100%', width: '100%' }}
                        pageSettings={{
                            backgroundColor: 'ffffff',
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: 'f6c71e',
                            textColor: '414042'
                        }}
                    />
                    {/* Invisible trigger to detect load if possible, though InlineWidget handles itself */}
                    <iframe
                        src="https://calendly.com/biancafinanzas/zoom-meeting-1"
                        className="hidden"
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendlyModal;
