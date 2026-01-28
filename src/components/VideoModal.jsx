import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoModal = ({ isOpen, onClose }) => {
    const container = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // State to track if the page has fully loaded
    const [pageLoaded, setPageLoaded] = useState(false);
    // State to track current playback status for UI toggling
    const [isPlaying, setIsPlaying] = useState(false);

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

    // 2. Handle Modal Play/Pause Logic
    useEffect(() => {
        if (!isOpen) {
            setIsPlaying(false);
        }
    }, [isOpen]);

    // GSAP Animations
    useGSAP(() => {
        if (!overlayRef.current || !modalRef.current) return;

        if (isOpen) {
            // Animate in
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(modalRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.1 }
            );
        } else {
            // Animate out
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
            gsap.to(modalRef.current, { scale: 0.95, opacity: 0, duration: 0.2 });
        }
    }, { dependencies: [isOpen], scope: container });

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

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
                    {/* Render Video only after page load */}
                    {pageLoaded && (
                        <div className="w-full h-full">
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=rOrBHvxoBCc"
                                playing={isPlaying}
                                controls={true}
                                width="100%"
                                height="100%"
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0,
                                            fs: 1,
                                            iv_load_policy: 3,
                                            autohide: 1,
                                            vq: 'hd1080'
                                        }
                                    }
                                }}
                                onPause={() => setIsPlaying(false)}
                                onPlay={() => setIsPlaying(true)}
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>
                    )}

                    {/* Custom Thumbnail & Play Button Overlay */}
                    {/* Exclude this overlay if video is playing */}
                    {!isPlaying && (
                        <div
                            className="absolute inset-0 z-10 bg-cover bg-center cursor-pointer group"
                            style={{ backgroundImage: `url("${import.meta.env.BASE_URL}thumb.png")` }}
                            onClick={handlePlayClick}
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                {/* Play Button Circle */}
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                        <span className="material-icons-round text-deep-teal text-3xl ml-1">play_arrow</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
