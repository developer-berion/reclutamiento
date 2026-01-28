import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoModal = ({ isOpen, onClose }) => {
    const container = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // State to track if the page has fully loaded
    const [pageLoaded, setPageLoaded] = useState(false);

    // 1. Wait for page load before allowing video to be in DOM
    useEffect(() => {
        const handleLoad = () => setPageLoaded(true);

        // Check if page is already loaded (document.readyState === 'complete')
        if (document.readyState === 'complete') {
            setPageLoaded(true);
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // 2. Handle Modal logic
    useEffect(() => {
        // No extra logic needed for now, but keeping for future enhancements
    }, [isOpen]);

    // GSAP Animations
    useGSAP(() => {
        if (!overlayRef.current || !modalRef.current) return;

        if (isOpen) {
            // Animate in
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(modalRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
        } else {
            // Animate out
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
            gsap.to(modalRef.current, { scale: 0.95, opacity: 0, duration: 0.2 });
        }
    }, { dependencies: [isOpen], scope: container });



    return (
        <div
            ref={container}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}
        >
            {/* Dark Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative w-full max-w-[90%] md:max-w-[80%] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-0 transform-gpu"
            >
                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white group"
                    aria-label="Cerrar video"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Video Player Container */}
                <div className="w-full h-full relative bg-black">
                    {/* Render Video only after page load and when modal is open */}
                    {pageLoaded && isOpen && (
                        <div className="w-full h-full">
                            <iframe
                                src="https://iframe.mediadelivery.net/embed/588303/1e79e76e-1ba4-4572-b7c1-cf5ea20be16c?autoplay=1&loop=false&muted=false&preload=true"
                                style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowFullScreen={true}
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
