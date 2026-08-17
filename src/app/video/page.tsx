"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

// Disciplines with Unsplash images
const disciplines = [
  { 
      id: '01', 
      title: 'CINEMATIC PRODUCTION', 
      image: 'https://images.unsplash.com/photo-1580238053495-b9720401df45?q=80&w=2000&auto=format&fit=crop', 
      text: 'We architect visual stories from the ground up. Utilizing industry-standard cinema cameras (ARRI, RED) and rigorous pre-production planning, we capture raw, uncompromised footage designed for high-end post-production workflows.' 
  },
  { 
      id: '02', 
      title: 'COLOR GRADING', 
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop', 
      text: 'Our color pipelines are strictly node-based and non-destructive. Operating in DaVinci Resolve Studio, we craft bespoke looks, match cameras with surgical precision, and master for Rec.709, HDR10+, and theatrical projection.' 
  },
  { 
      id: '03', 
      title: 'VFX & COMPOSITING', 
      image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=2000&auto=format&fit=crop', 
      text: 'Invisible effects that elevate the narrative. From complex wire removals and architectural set extensions to full 3D integrations using Unreal Engine and Nuke, our compositing team ensures pixel-perfect reality.' 
  },
  { 
      id: '04', 
      title: 'EDITORIAL', 
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop', 
      text: 'The architecture of pacing. We assemble the timeline with a relentless focus on rhythm and emotional resonance. Our offline-to-online workflows handle massive multi-cam arrays and mixed-format media with zero friction.' 
  }
];

export default function EditorialVideoPage() {
    const [activeSection, setActiveSection] = useState('01');
    const { scrollY } = useScroll();
    
    // 1. Typographic Liquid Fill logic
    // Maps scroll position (0 to 800px) to clip-path inset percentage (100% to 0%)
    const clipPathInset = useTransform(scrollY, [0, 800], [100, 0]);
    const fillClipPath = useTransform(clipPathInset, (val) => `inset(${val}% 0 0 0)`);

    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#90243B] selection:text-white">

            {/* Global Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 sm:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
                <Link href="/" className="pointer-events-auto font-mono text-[10px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2 hover:text-[#90243B]">
                    <div className="w-1.5 h-1.5 bg-[#90243B]"></div>
                    PROXIMITY_V2
                </Link>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white">
                    VIDEO PRODUCTION
                </div>
            </nav>

            {/* Hero Section: The Monolith Matrix */}
            <section className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden border-b border-[#1F1F1F]">
                
                {/* Structural Background Geometry (Zero Glows) */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Cinematic Background Image */}
                    <Image 
                        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop"
                        alt="Cinematic Background"
                        fill
                        priority
                        className="object-cover opacity-15 grayscale" 
                    />
                    
                    {/* Massive Solid Crimson Circle Intersecting Top Right */}
                    <div className="absolute -top-[20vw] -right-[10vw] w-[50vw] h-[50vw] bg-[#90243B] rounded-full mix-blend-screen opacity-60"></div>
                    
                    {/* Architectural Hairline Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)] bg-[size:100px_100px] mix-blend-overlay opacity-50"></div>
                    
                    {/* Typographic Liquid Fill (Hollow Base) */}
                    <div className="absolute top-[30%] left-[-5%] text-[20vw] font-black uppercase text-transparent leading-none opacity-20 pointer-events-none select-none tracking-tighter" style={{ WebkitTextStroke: '2px #FFFFFF' }}>
                        CINEMATIC
                    </div>
                    
                    {/* Typographic Liquid Fill (Solid Fill linked to Scroll) */}
                    <motion.div 
                        className="absolute top-[30%] left-[-5%] text-[20vw] font-black uppercase text-white leading-none opacity-20 pointer-events-none select-none tracking-tighter" 
                        style={{ clipPath: fillClipPath }}
                    >
                        CINEMATIC
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mt-32 lg:mt-0 p-6 sm:p-12 lg:p-24 pb-32">
                    
                    <div className="lg:col-span-8">
                        <div className="font-mono text-white text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-8 flex items-center gap-4">
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
                                className="w-12 h-[1px] bg-white origin-left"
                            ></motion.div>
                            The Discipline
                        </div>
                        <h1 className="text-[12vw] md:text-[9vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white">
                            MOTION <span className="font-serif italic text-white/50 lowercase text-[10vw] md:text-[6vw] font-light">&amp;</span><br/> CINEMATIC ARTS
                        </h1>
                        <p className="text-[#A0A0A0] max-w-lg text-sm sm:text-base leading-relaxed font-medium">
                            We architect visual stories from raw light. Fusing deep cinematic theory with avant-garde post-production, we construct atmospheres that demand attention with absolute precision.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start mt-12 relative z-10 mix-blend-difference">
                            <Link href="/portfolio" className="group flex items-center gap-4 pb-2 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] pr-4 border-white text-white">
                                <span>Explore Portfolio</span>
                                <ArrowDown className="w-3 h-3 text-white group-hover:text-[#90243B] transition-colors -rotate-90" />
                            </Link>
                            <Link href="#contact" className="group flex items-center gap-4 pb-2 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] pr-4 border-white/40 text-white/70 hover:text-white hover:border-white transition-colors">
                                <span>Start a Project</span>
                                <ArrowDown className="w-3 h-3 text-white/70 group-hover:text-white transition-colors -rotate-90" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end w-full h-full max-w-xs mx-auto lg:mx-0 pb-8">
                        <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest uppercase text-white/50 mt-8 self-start lg:self-end">
                            <ArrowDown size={14} />
                            Scroll to explore disciplines
                        </div>
                    </div>
                </div>

                {/* The Kinetic Ledger (Scrolling Marquee) */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-white flex items-center overflow-hidden z-20 border-t border-[#1F1F1F]">
                    <motion.div 
                        className="whitespace-nowrap font-black font-mono text-[12px] tracking-[0.5em] uppercase text-black flex gap-12"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
                    >
                        <span>PROXIMITY AGENCY // VIDEO PRODUCTION // PREMIUM QUALITY //</span>
                        <span>PROXIMITY AGENCY // VIDEO PRODUCTION // PREMIUM QUALITY //</span>
                        <span>PROXIMITY AGENCY // VIDEO PRODUCTION // PREMIUM QUALITY //</span>
                        <span>PROXIMITY AGENCY // VIDEO PRODUCTION // PREMIUM QUALITY //</span>
                    </motion.div>
                </div>
            </section>

            {/* Manifesto Section */}
            <section className="relative w-full bg-[#0A0A0A] z-10 py-32 lg:py-48 px-6 sm:px-12 lg:px-24 flex justify-center items-center border-b border-[#1F1F1F] overflow-hidden">
                <Image 
                    src="/abstract-blurry-smooth-image-red-color-generative-ai_169016-30587.avif"
                    alt="Abstract Crimson Background"
                    fill
                    className="object-cover opacity-40 mix-blend-screen pointer-events-none" 
                />
                
                {/* 1px grid overlay to keep it architectural */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F1F1F_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F_1px,transparent_1px)] bg-[size:100px_100px] mix-blend-overlay opacity-50 pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl w-full flex flex-col gap-8">
                    <div className="font-mono text-white text-[10px] tracking-widest uppercase flex items-center gap-4">
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="w-12 h-[1px] bg-[#90243B] origin-left"
                        ></motion.div>
                        The Philosophy
                    </div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="text-2xl sm:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-white/90"
                    >
                        We believe in clean design, seamless performance, and clear communication. Every project is built on solid strategy and executed with <span className="font-black">absolute precision</span> to drive real impact.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 mt-4 relative z-20"
                    >
                        <Link href="/services" className="group bg-white text-black hover:bg-[#90243B] hover:text-white px-8 py-4 flex items-center justify-between gap-8 transition-colors duration-500 w-fit">
                            <span className="font-black uppercase tracking-[0.2em] text-[10px]">View Services</span>
                            <ArrowDown size={14} className="group-hover:translate-x-2 transition-transform duration-500 -rotate-90" />
                        </Link>
                        <Link href="#contact" className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 flex items-center justify-between gap-8 transition-colors duration-500 w-fit">
                            <span className="font-black uppercase tracking-[0.2em] text-[10px]">Start a Project</span>
                            <ArrowDown size={14} className="group-hover:translate-x-2 transition-transform duration-500 -rotate-90" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Editorial Grid Section */}
            <section className="relative w-full bg-[#0A0A0A] z-10 px-6 sm:px-12 lg:px-24 py-24 lg:py-48 flex flex-col lg:flex-row gap-16 lg:gap-32 max-w-[2000px] mx-auto border-l border-r border-[#1F1F1F]">
                
                {/* Left Column: Sticky Index */}
                <div className="w-full lg:w-1/4 shrink-0 relative hidden lg:block">
                    <div className="sticky top-40 flex flex-col gap-12">
                        
                        <div className="font-mono text-white/50 text-[9px] tracking-[0.3em] uppercase border-b border-[#1F1F1F] pb-4 mb-4">
                            INDEX // 01-04
                        </div>
                        
                        <div className="flex flex-col gap-8">
                            {disciplines.map((d) => (
                                <a 
                                   key={d.id} 
                                   href={`#section-${d.id}`}
                                   className={`group flex items-start gap-6 transition-opacity duration-300 ${activeSection === d.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                                >
                                    <div className="font-mono text-[10px] tracking-widest mt-1">
                                        {activeSection === d.id ? (
                                            <span className="text-[#90243B]">[X]</span>
                                        ) : (
                                            <span className="text-white/30">[ ]</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[10px] tracking-widest text-[#90243B] mb-2">SECTION {d.id}</span>
                                        <h3 className="text-xl font-bold uppercase tracking-widest leading-none text-white">{d.title}</h3>
                                    </div>
                                </a>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Right Column: Scrolling Content */}
                <div className="w-full lg:w-3/4 flex flex-col gap-32 lg:gap-48 relative z-10">
                    {/* Background Grid Line for Structural Ledger */}
                    <motion.div 
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="absolute top-0 left-0 w-[1px] h-full bg-[#1F1F1F] hidden lg:block -ml-8 lg:-ml-16 pointer-events-none origin-top"
                    ></motion.div>

                    {disciplines.map((d) => (
                        <DisciplineSection 
                            key={d.id} 
                            data={d} 
                            onInView={() => setActiveSection(d.id)} 
                            isActive={activeSection === d.id}
                        />
                    ))}
                </div>
            </section>
            
            {/* Minimal Footer */}
            <footer className="w-full border-t border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-12 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/50 mt-16 relative z-10">
                <span>PROXIMITY_V2 // 2026</span>
                <div className="flex items-center gap-8">
                    <a href="#" className="hover:text-white transition-colors">START A PROJECT</a>
                    <a href="#top" className="hover:text-white transition-colors">BACK TO TOP</a>
                </div>
            </footer>

        </div>
    );
}

// Subcomponent to handle intersection observation for active index updating
function DisciplineSection({ data, onInView, isActive }: { data: any, onInView: () => void, isActive: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

    return (
        <div id={`section-${data.id}`} ref={ref} className="w-full flex flex-col gap-12 sm:gap-16 scroll-mt-32 border-b border-[#1F1F1F] pb-24 lg:pb-32 last:border-b-0 relative">

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 justify-between items-start">
                
                {/* Text Ledger */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8 order-2 lg:order-1">
                    <div className="font-mono text-white text-[10px] tracking-widest uppercase border-l-2 border-[#90243B] pl-4">
                        {data.id} <br/>
                        <span className="text-[#90243B]">SERVICE</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-tight text-white">
                        {data.title}
                    </h2>
                    
                    <p className="text-[#A0A0A0] leading-relaxed text-sm font-medium">
                        {data.text}
                    </p>
                    
                    <button className="self-start text-[10px] font-mono tracking-widest uppercase text-white hover:text-[#90243B] transition-colors border-b border-[#1F1F1F] hover:border-[#90243B] pb-1 mt-4 flex items-center gap-2">
                        <span className="text-[#90243B]">+</span> EXPLORE PROJECT
                    </button>
                </div>
                
                {/* The Image Wrapper (Strict Brutalism) */}
                <div className="relative w-full lg:w-2/3 aspect-[4/3] bg-[#111] order-1 lg:order-2 group cursor-crosshair">
                    
                    {/* Crimson Geometric Offset Block (Solid Color, No Glow) */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[#90243B] transition-transform duration-500 lg:group-hover:translate-x-4 lg:group-hover:translate-y-4 z-0 hidden lg:block"></div>

                    {/* Image Container */}
                    <div className="relative z-10 w-full h-full border border-[#1F1F1F] bg-[#000] overflow-hidden transition-transform duration-500 lg:group-hover:-translate-x-2 lg:group-hover:-translate-y-2">
                        
                        <Image 
                            src={data.image} 
                            alt={data.title} 
                            fill 
                            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" 
                        />

                        {/* 3. Aggressive Shutter Mask */}
                        <motion.div 
                            initial={{ x: "0%" }} 
                            whileInView={{ x: "100%" }} 
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="absolute inset-0 bg-[#0A0A0A] z-20 origin-left"
                        ></motion.div>
                        
                        {/* 2. Blueprint Grid Rendering (Crosshairs) */}
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "circOut", delay: 0.6 }}
                            className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 mix-blend-difference pointer-events-none group-hover:bg-[#90243B] origin-left z-10"
                        ></motion.div>
                        <motion.div 
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "circOut", delay: 0.8 }}
                            className="absolute top-0 left-1/2 w-[1px] h-full bg-white/20 mix-blend-difference pointer-events-none group-hover:bg-[#90243B] origin-top z-10"
                        ></motion.div>
                        
                        {/* Corner Target Label */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest text-white border border-white/20 bg-black px-3 py-1 pointer-events-none mix-blend-difference group-hover:text-[#90243B] group-hover:border-[#90243B] z-30"
                        >
                            {data.id}
                        </motion.div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
