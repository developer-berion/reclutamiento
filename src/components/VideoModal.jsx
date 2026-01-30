import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { supabase } from '../lib/supabase';

const VideoModal = ({ isOpen, onClose }) => {
    // 1. Refs
    const container = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const closeBtnRef = useRef(null);
    const videoIframeRef = useRef(null);

    // 2. ALL State
    const [agentId, setAgentId] = useState(null); // Added agentId state
    const [pageLoaded, setPageLoaded] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [captchaToken, setCaptchaToken] = useState(null);

    // 3. Page Load Effect
    useEffect(() => {
        const handleLoad = () => setPageLoaded(true);
        if (document.readyState === 'complete') {
            setPageLoaded(true);
        } else {
            window.addEventListener('load', handleLoad);
        }
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // 4. Modal Open Effect
    useEffect(() => {
        if (isOpen) {
            const submitted = sessionStorage.getItem('leadSubmitted');
            const savedAgentId = sessionStorage.getItem('agentId');

            if (submitted === 'true') {
                setShowForm(false);
                if (savedAgentId) setAgentId(savedAgentId);
                startCloseTimer();
            } else {
                setShowForm(true);
                setShowCloseButton(false);
            }
        }
    }, [isOpen]);

    // 5. Video Start Effect
    useEffect(() => {
        const trackStart = async () => {
            if (isOpen && !showForm && agentId) {
                const trackedKey = `videoStarted_${agentId}`;
                if (!sessionStorage.getItem(trackedKey)) {
                    await supabase
                        .from('agentes')
                        .update({ video_started_at: new Date() })
                        .eq('id', agentId);
                    sessionStorage.setItem(trackedKey, 'true');
                }
            }
        };
        trackStart();
    }, [isOpen, showForm, agentId]);

    // 6. PlayerJS Effect (The robust one)
    useEffect(() => {
        if (!agentId || !isOpen || showForm || !pageLoaded) return;

        let player;
        const scriptId = 'bunny-player-script';
        let retryCount = 0;

        const initPlayer = () => {
            // 1. Safety Check: Ensure iframe ref exists
            const iframe = videoIframeRef.current;
            if (!iframe) return;

            // 2. Safety Check: Ensure iframe has loaded content
            if (!iframe.contentWindow) {
                if (retryCount < 5) {
                    retryCount++;
                    setTimeout(initPlayer, 500); // Retry every 500ms
                }
                return;
            }

            // Initialize PlayerJS
            if (window.playerjs) {
                try {
                    // 3. Wrap in try-catch to prevent app crash
                    player = new window.playerjs.Player(iframe);

                    player.on('ready', () => {
                        player.on('timeupdate', (data) => {
                            if (data && typeof data.seconds === 'number') {
                                const currentTime = Math.floor(data.seconds);
                                const duration = Math.floor(data.duration || 0);

                                const lastSaved = parseInt(sessionStorage.getItem(`videoMax_${agentId}`) || '0');

                                if (currentTime > lastSaved) {
                                    sessionStorage.setItem(`videoMax_${agentId}`, currentTime.toString());

                                    // Debounced update every 5 seconds
                                    if (currentTime % 5 === 0) {
                                        supabase
                                            .from('agentes')
                                            .update({
                                                video_max_watched_seconds: currentTime,
                                                video_duration_seconds: duration
                                            })
                                            .eq('id', agentId)
                                            .then(({ error }) => {
                                                if (error) console.error('Error updating video progress:', error);
                                            });
                                    }
                                }
                            }
                        });

                        // Try to ensure it plays
                        // player.play();
                    });
                } catch (e) {
                    console.warn('VideoModal: PlayerJS init failed, retrying...', e);
                    if (retryCount < 3) {
                        retryCount++;
                        setTimeout(initPlayer, 1000);
                    }
                }
            }
        };

        // Load the script if not present
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://assets.mediadelivery.net/playerjs/0.1.1/player-0.1.1.min.js';
            script.onload = initPlayer;
            document.body.appendChild(script);
        } else {
            // Small delay to allow iframe ref to settle if just mounted
            setTimeout(initPlayer, 100);
        }

        return () => {
            if (player && player.off) {
                try {
                    player.off('timeupdate');
                    player.off('ready');
                } catch (e) { /* ignore cleanup errors */ }
            }
        };
    }, [agentId, isOpen, showForm, pageLoaded]);

    const startCloseTimer = () => {
        setShowCloseButton(false);
        setTimeout(() => {
            setShowCloseButton(true);
        }, 5000);
    };

    // Form Validation (US Phone)
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';

        if (!formData.email.trim()) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Correo inválido';
        }

        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es obligatorio';
        } else if (phoneDigits.length !== 10) {
            newErrors.phone = 'Ingresa un número válido de 10 dígitos (EE.UU.)';
        }

        if (!captchaToken) {
            newErrors.captcha = 'Por favor, confirma que no eres un robot';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        if (errors.captcha) {
            setErrors(prev => ({ ...prev, captcha: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const { data, error } = await supabase
                    .from('agentes')
                    .insert([
                        {
                            full_name: formData.name,
                            email: formData.email,
                            phone_number: formData.phone
                        }
                    ])
                    .select(); // Return the inserted row to get ID

                if (error) throw error;

                const newId = data[0]?.id;
                setAgentId(newId);

                sessionStorage.setItem('leadSubmitted', 'true');
                sessionStorage.setItem('leadData', JSON.stringify(formData));
                if (newId) sessionStorage.setItem('agentId', newId);

                setShowForm(false);
                startCloseTimer();
            } catch (error) {
                console.error('Error saving lead:', error);
                setErrors(prev => ({ ...prev, submit: 'Error al enviar los datos. Inténtalo de nuevo.' }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Animations
    useGSAP(() => {
        if (!overlayRef.current || !modalRef.current) return;

        if (isOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
            );
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
            gsap.to(modalRef.current, { scale: 0.95, opacity: 0, duration: 0.2 });
        }
    }, { dependencies: [isOpen], scope: container });

    // Notable Button Entrance Animation
    useGSAP(() => {
        if (showCloseButton && closeBtnRef.current) {
            gsap.fromTo(closeBtnRef.current,
                { opacity: 0, scale: 0, rotate: -180 },
                {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    duration: 0.6,
                    padding: '8px',
                    ease: "elastic.out(1, 0.5)",
                    boxShadow: "0 0 20px rgba(246, 199, 30, 0.4)"
                }
            );
        }
    }, { dependencies: [showCloseButton] });

    return (
        <div
            ref={container}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}
        >
            {/* Locked Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0"
            ></div>

            <div
                ref={modalRef}
                className="relative w-full max-w-[90%] md:max-w-[80%] aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 opacity-0 transform-gpu"
            >
                {/* Yellow Close Button - Delayed & High Contrast */}
                {showCloseButton && (
                    <button
                        ref={closeBtnRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-6 right-6 z-40 w-12 h-12 bg-primary text-deep-teal rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Cerrar video"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                {/* Lead Form */}
                {isOpen && showForm && (
                    <div className="absolute inset-0 z-30 bg-gray-900/95 flex items-center justify-center p-4 backdrop-blur-xl">
                        <div className="w-full max-w-lg bg-gray-800 rounded-[30px] shadow-2xl border border-white/5 p-8 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 text-center">
                                ¡Estás a un paso!
                            </h3>
                            <p className="text-gray-400 text-center mb-6 md:mb-8 text-sm md:text-base">
                                Completa tus datos para ver el video exclusivo.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full bg-gray-700/50 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all text-sm md:text-base`}
                                        placeholder="Tu nombre"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 pl-1 font-bold">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full bg-gray-700/50 border-2 ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all text-sm md:text-base`}
                                        placeholder="tucorreo@ejemplo.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 pl-1 font-bold">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs md:text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest pl-1">Teléfono (EE.UU.)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full bg-gray-700/50 border-2 ${errors.phone ? 'border-red-500' : 'border-transparent'} rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all text-sm md:text-base`}
                                        placeholder="(555) 123-4567"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 pl-1 font-bold">{errors.phone}</p>}
                                </div>

                                <div className="flex justify-center my-4 scale-90 md:scale-100 origin-center">
                                    <ReCAPTCHA
                                        sitekey="6LcqZFssAAAAADiffR9uQAmuRttqYMw5azgGO5P6"
                                        onChange={handleCaptchaChange}
                                        theme="dark"
                                    />
                                </div>
                                {errors.captcha && <p className="text-red-500 text-xs text-center font-bold">{errors.captcha}</p>}

                                {errors.submit && <p className="text-red-500 text-xs mt-2 text-center font-bold">{errors.submit}</p>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-primary text-deep-teal font-black text-base md:text-lg py-4 md:py-5 rounded-full shadow-[0_15px_30px_rgba(246,199,30,0.3)] hover:scale-[1.03] transition-all transform active:scale-95 mt-4 md:mt-6 uppercase tracking-wider ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'ENVIANDO...' : 'CONTINUAR'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Video Container with smooth fade-in */}
                <div className="w-full h-full relative bg-black">
                    {pageLoaded && isOpen && (
                        <div className={`w-full h-full transition-opacity duration-1000 ${showForm ? 'opacity-0' : 'opacity-100'}`}>
                            <iframe
                                ref={videoIframeRef}
                                src={`https://player.mediadelivery.net/embed/588303/fc5f8d27-fdf3-4df5-bed8-00c4aa1eb7fb?autoplay=${!showForm ? '1' : '0'}&loop=false&muted=false&preload=true&context=true`}
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
