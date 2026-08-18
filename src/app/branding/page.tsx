"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PenTool, LayoutTemplate, Box } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { submitInquiry } from "../../utils/submitInquiry";

// Audio Fallbacks
const playMechanicalClick = () => {
 if (typeof window !== 'undefined') {
 import('../../utils/audio').then(m => m.playMechanicalClick?.()).catch(e => console.log(e));
 }
};

const playHoverTick = () => {
 if (typeof window !== 'undefined') {
 import('../../utils/audio').then(m => m.playHoverTick?.()).catch(e => console.log(e));
 }
};

const services = [
 {
 title: "Brand Identity",
 description: "We create distinct, memorable logos and complete visual systems that ensure your brand stands out and remains consistent across all platforms.",
 icon: PenTool
 },
 {
 title: "Print & Packaging",
 description: "High-end business cards, editorial layouts, and product packaging designed with a focus on tactile quality and premium materials.",
 icon: Box
 },
 {
 title: "Digital Design",
 description: "Clean, modern social media templates, pitch decks, and digital assets crafted to elevate your online presence.",
 icon: LayoutTemplate
 }
];

export default function GraphicDesignPage() {
 
 // Ensure body scroll is active
 useEffect(() => {
 document.body.style.overflow = 'auto';
 }, []);

 // --- Deep Scale Grid Logic ---
 const containerRef = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ["start start", "end end"]
 });

 // Scale of the center image
 const centerScale = useTransform(scrollYProgress, [0, 0.8], [1, 4]);
 // Movement of outer images
 const moveOutY = useTransform(scrollYProgress, [0, 0.8], ["0vh", "-100vh"]);
 const moveOutYDown = useTransform(scrollYProgress, [0, 0.8], ["0vh", "100vh"]);
 const moveOutXLeft = useTransform(scrollYProgress, [0, 0.8], ["0vw", "-100vw"]);
 const moveOutXRight = useTransform(scrollYProgress, [0, 0.8], ["0vw", "100vw"]);

 // Opacity of the hero text
 const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

 // Form State
 const [formData, setFormData] = useState({ name: "", email: "", details: "" });
 const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

 const handleFormSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!formData.name || !formData.email) return;
     playMechanicalClick();
     setFormStatus("submitting");
     
     try {
         await submitInquiry({ ...formData, service: "Branding & Design" });
         setFormStatus("success");
         setFormData({ name: "", email: "", details: "" });
         setTimeout(() => setFormStatus("idle"), 4000);
     } catch (error) {
         setFormStatus("error");
         setTimeout(() => setFormStatus("idle"), 3000);
     }
 };

 return (
 <div className="w-full min-h-screen bg-[#F4F4F4] text-[#0A0A0A] font-sans selection:bg-[#90243B] selection:text-white pb-20">
 


 {/* The Deep Scale Grid (Apple-style scroll mechanic) */}
 <section id="vision" ref={containerRef} className="relative w-full h-[120vh] sm:h-[180vh] bg-[#111]">
 <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
 
 {/* Hero Text Overlay */}
 <motion.div 
 style={{ opacity: textOpacity }}
 className="absolute z-50 text-center pointer-events-none text-white"
 >
 <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
 Graphic <br/> Design.
 </h1>
 <p className="font-mono tracking-[0.3em] uppercase text-xs">Scroll to dive in</p>
 </motion.div>

 {/* Center Image (Scales up) */}
 <motion.div 
 style={{ scale: centerScale }}
 className="absolute z-10 w-[70vw] sm:w-[28vw] aspect-[3/4] will-change-transform"
 >
 <Image src="/poster_branding.jpeg" alt="Editorial" fill sizes="(max-width: 768px) 70vw, 30vw" className="object-cover shadow-2xl" priority />
 </motion.div>

 {/* Top Row Images */}
 <motion.div style={{ y: moveOutY, x: moveOutXLeft }} className="absolute z-0 w-[40vw] sm:w-[16vw] aspect-[3/4] top-[5vh] left-[-5vw] sm:top-[-5vh] sm:left-[5vw] will-change-transform">
 <Image src="/poster_tokyo.jpeg" alt="Packaging" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-60 shadow-xl" />
 </motion.div>
 <motion.div style={{ y: moveOutY }} className="absolute z-0 w-[35vw] sm:w-[18vw] aspect-[3/4] top-[-10vh] right-[15vw] sm:top-[-15vh] sm:right-[30vw] will-change-transform">
 <Image src="/poster_porsche.jpeg" alt="Poster" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-80 shadow-xl" />
 </motion.div>
 <motion.div style={{ y: moveOutY, x: moveOutXRight }} className="absolute z-0 w-[30vw] sm:w-[15vw] aspect-[3/4] top-[15vh] right-[-10vw] sm:top-[10vh] sm:right-[5vw] will-change-transform">
 <Image src="/poster_blueberry.jpeg" alt="Stationary" fill sizes="(max-width: 768px) 30vw, 20vw" className="object-cover opacity-50 shadow-xl" />
 </motion.div>

 {/* Side Images */}
 <motion.div style={{ x: moveOutXLeft }} className="absolute z-0 w-[35vw] sm:w-[16vw] aspect-[3/4] left-[-10vw] sm:left-[10vw] will-change-transform">
 <Image src="/poster_collage.jpeg" alt="Branding" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-70 shadow-xl" />
 </motion.div>
 <motion.div style={{ x: moveOutXRight }} className="absolute z-0 w-[38vw] sm:w-[20vw] aspect-[3/4] right-[-15vw] sm:right-[5vw] will-change-transform">
 <Image src="/poster_instagram.jpeg" alt="Brutalism" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-60 shadow-xl" />
 </motion.div>

 {/* Bottom Row Images */}
 <motion.div style={{ y: moveOutYDown, x: moveOutXLeft }} className="absolute z-0 w-[40vw] sm:w-[16vw] aspect-[3/4] bottom-[5vh] left-[0vw] sm:bottom-[10vh] sm:left-[15vw] will-change-transform">
 <Image src="/poster_logo.jpeg" alt="Logo" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-80 shadow-xl" />
 </motion.div>
 <motion.div style={{ y: moveOutYDown }} className="absolute z-0 w-[45vw] sm:w-[22vw] aspect-[3/4] bottom-[-5vh] right-[25vw] sm:bottom-[-10vh] sm:right-[35vw] will-change-transform">
 <Image src="/poster_knight.jpeg" alt="Print" fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover opacity-70 shadow-xl" />
 </motion.div>
 <motion.div style={{ y: moveOutYDown, x: moveOutXRight }} className="absolute z-0 w-[35vw] sm:w-[15vw] aspect-[3/4] bottom-[15vh] right-[0vw] sm:bottom-[5vh] sm:right-[10vw] will-change-transform">
 <Image src="/poster_mansory.jpeg" alt="Digital" fill sizes="(max-width: 768px) 40vw, 20vw" className="object-cover opacity-50 shadow-xl" />
 </motion.div>

 </div>
 </section>

 {/* Services Section */}
 <section id="identity" className="relative z-20 w-full px-6 sm:px-12 lg:px-24 py-24 lg:py-32 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
 <div className="font-mono text-xs text-[#90243B] uppercase tracking-widest mb-16 flex items-center gap-4">
 <div className="w-8 h-[1px] bg-[#90243B]"></div>
 Our Services
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
 {services.map((service, index) => (
 <motion.div 
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="flex flex-col gap-6 group"
 >
 <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-300">
 <service.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
 </div>
 <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
 <p className="text-[#0A0A0A]/60 font-medium leading-relaxed">
 {service.description}
 </p>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Inquiry Form */}
 <section id="inquiry" className="w-full px-6 sm:px-12 lg:px-24 py-20 lg:py-32 max-w-5xl mx-auto">
 <div className="bg-[#0A0A0A] text-white p-8 sm:p-16 lg:p-24 flex flex-col gap-12 shadow-2xl relative overflow-hidden">
 <div className="absolute inset-0 opacity-[0.03] pointer-events-none ">
 <Image src="/poster_branding.jpeg" alt="Texture" fill className="object-cover" />
 </div>
 
 <div className="relative z-10">
 <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Start a Project</h2>
 <p className="text-white/60 font-medium max-w-md">Tell us about your brand and what you need designed. We'll get back to you with a proposal.</p>
 </div>

 <form className="flex flex-col gap-6 relative z-10" onSubmit={handleFormSubmit}>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <input 
 type="text" 
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 placeholder="Your Name" 
 className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30"
 />
 <input 
 type="email" 
 value={formData.email}
 onChange={(e) => setFormData({...formData, email: e.target.value})}
 placeholder="Email Address" 
 className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30"
 />
 </div>
 <textarea 
 value={formData.details}
 onChange={(e) => setFormData({...formData, details: e.target.value})}
 placeholder="Project Details (What do you need designed?)" 
 rows={4}
 className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30 resize-none"
 ></textarea>

 <button 
 type="submit"
 onMouseEnter={playHoverTick}
 disabled={formStatus === "submitting" || formStatus === "success"}
 className="mt-8 bg-white text-black py-6 px-10 font-black uppercase tracking-[0.2em] text-sm hover:bg-[#90243B] hover:text-white transition-colors self-start flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {formStatus === "idle" && "Submit Inquiry"}
 {formStatus === "submitting" && "Transmitting..."}
 {formStatus === "success" && "Transmission Success"}
 {formStatus === "error" && "Transmission Failed"}
 {formStatus === "idle" && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
 </button>
 </form>
 </div>
 </section>

 </div>
 );
}
