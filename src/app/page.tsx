"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHoverTick, playMechanicalClick } from "../utils/audio";
import { submitInquiry } from "../utils/submitInquiry";

export default function Home() {
 const [mounted, setMounted] = useState(false);
 const [activePillar, setActivePillar] = useState<number | null>(null);
 
 // State for the mechanical background flipper
 const [activeBgIndex, setActiveBgIndex] = useState(0);

 // State and Ref for Scroll-Triggered Mobile Deck
 const deckRef = useRef<HTMLDivElement>(null);
 const [deckExpanded, setDeckExpanded] = useState(false);

 // Form State
 const [formData, setFormData] = useState({ name: "", email: "", details: "" });
 const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

 const handleFormSubmit = async () => {
     if (!formData.name || !formData.email) return;
     playMechanicalClick();
     setFormStatus("submitting");
     try {
         await submitInquiry({ ...formData, service: "General Inquiry" });
         setFormStatus("success");
         setFormData({ name: "", email: "", details: "" });
         setTimeout(() => setFormStatus("idle"), 3000);
     } catch (error) {
         setFormStatus("error");
         setTimeout(() => setFormStatus("idle"), 3000);
     }
 };

 // Scroll-linked Kinetic Background Typography
 const bgText1Ref = useRef<HTMLDivElement>(null);
 const bgText2Ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleScroll = () => {
 if (bgText1Ref.current && bgText2Ref.current) {
 // Hardware-accelerated parallax translation based on scroll
 bgText1Ref.current.style.transform = `translateX(${-window.scrollY * 0.4}px)`;
 bgText2Ref.current.style.transform = `translateX(${window.scrollY * 0.4 - 1500}px)`;
 }
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 if (entries[0].isIntersecting) {
 setDeckExpanded(true);
 } else {
 setDeckExpanded(false);
 }
 },
 { threshold: 0.4 } // Wait until the deck is mostly in view before expanding
 );

 if (deckRef.current) {
 observer.observe(deckRef.current);
 }
 return () => observer.disconnect();
 }, []);

 useEffect(() => {
 setMounted(true);
 
 // Mechanical visual engine: flips background every 3 seconds
 const interval = setInterval(() => {
 setActiveBgIndex((prev) => (prev + 1) % 3);
 }, 3000);
 
 return () => clearInterval(interval);
 }, []);

 return (
 <div className="w-full bg-white text-[#0A0A0A] font-sans selection:bg-[#90243B] selection:text-white overflow-x-hidden relative">
 
 {/* CSS to hide scrollbar for the mobile swipe carousel but keep functionality */}
 <style jsx global>{`
 .no-scrollbar::-webkit-scrollbar {
 display: none;
 }
 .no-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
 }
 `}</style>

 {/* GLOBAL HOMEPAGE ENHANCEMENTS: Structural Grid & Watermark */}
 {/* 1. Architectural Grid Lines */}
 <div className="pointer-events-none fixed inset-0 z-0 flex w-full justify-between px-5 sm:px-12 opacity-[0.03]">
    <div className="h-full w-[1px] bg-black"></div>
    <div className="h-full w-[1px] bg-black"></div>
    <div className="h-full w-[1px] bg-black"></div>
    <div className="h-full w-[1px] bg-black"></div>
 </div>
 
 {/* 2. Typographic Watermark (Translates on scroll) */}
 <motion.div 
    className="pointer-events-none fixed top-[30vh] left-0 w-full z-0 overflow-hidden flex justify-center opacity-[0.02] mix-blend-multiply"
    initial={{ x: "10%" }}
    animate={{ x: "-10%" }}
    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
 >
    <span className="font-black text-[30vw] uppercase tracking-tighter leading-none whitespace-nowrap">
        PRXMTY_V2
    </span>
 </motion.div>

 {/* 1. The Mechanical Shutter (Load Animation) */}
 <div className={`fixed inset-x-0 top-0 h-[50dvh] bg-[#0A0A0A] z-[100] ${mounted ? 'animate-shutter-up' : ''} pointer-events-none`}></div>
 <div className={`fixed inset-x-0 bottom-0 h-[50dvh] bg-[#0A0A0A] z-[100] ${mounted ? 'animate-shutter-down' : ''} pointer-events-none flex items-center justify-center`}>
 <Image src="/Logo_crimson.png" alt="Proximity Logo" width={300} height={100} className={`h-6 sm:h-8 w-auto object-contain brightness-0 invert absolute top-1/2 -translate-y-1/2 transition-opacity duration-500 ${mounted ? 'opacity-0' : 'opacity-100'}`} priority />
 </div>

 <main className="w-full relative z-10 pt-24 sm:pt-0">
 
 {/* Hero Section: The Mechanical Visual Engine */}
 <section className="px-5 sm:px-12 max-w-[1400px] mx-auto flex flex-col items-start min-h-[85dvh] sm:min-h-[100dvh] justify-center relative overflow-hidden sm:overflow-visible">
 
 {/* THE VISUAL ENGINE (Background Flipper) */}
 {/* We use extreme clip-path transitions to simulate a mechanical shutter sliding across the screen when the image flips, avoiding cheap soft fades */}
 
 {/* State 0: Stark White Noise */}
 <div 
 className="fixed inset-0 -z-20 bg-white transition-all duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none"
 style={{ clipPath: activeBgIndex === 0 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
 >
 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
 </div>
 
 {/* State 1: Brutalist Concrete */}
 <div 
 className="fixed inset-0 -z-20 transition-all duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none"
 style={{ clipPath: activeBgIndex === 1 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
 >
 <Image src="/brutalist.jpg" alt="Architecture" fill className="object-cover grayscale contrast-125" priority />
 <div className="absolute inset-0 bg-white/10 "></div>
 </div>
 
 {/* State 2: Cinematic Crimson */}
 <div 
 className="fixed inset-0 -z-20 transition-all duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none"
 style={{ clipPath: activeBgIndex === 2 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
 >
 <Image src="/motion.jpg" alt="Cinematic Motion" fill className="object-cover contrast-150 saturate-200" priority />
 <div className="absolute inset-0 bg-black/40"></div>
 </div>
 
 {/* Static, Massive, High-Contrast Typography */}
 <h1 className="text-[14vw] sm:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-[0.85] sm:leading-[0.85] mb-12 sm:mb-16 max-w-6xl uppercase break-words relative z-10 text-white mix-blend-difference">
 We craft <br className="hidden sm:block"/> 
 architecture <br className="hidden lg:block"/> 
 for brands that value <span className="bg-white text-black px-1 sm:px-2 whitespace-nowrap mt-2 sm:mt-0 inline-block mix-blend-normal">precision.</span>
 </h1>
 
 <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-start relative z-10 text-white mix-blend-difference">
 <Link href="/portfolio" className="group flex items-center gap-4 sm:gap-6 pb-2 sm:pb-3 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] pr-2 sm:pr-4 border-white">
 <span>Explore Work</span>
 <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white group-hover:bg-[#90243B] transition-colors">
 <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black group-hover:text-white transition-transform group-hover:translate-x-[1px]" />
 </div>
 </Link>
 
 <Link href="#contact" className="group flex items-center gap-4 sm:gap-6 pb-2 sm:pb-3 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] pr-2 sm:pr-4 border-white/40 hover:border-white transition-colors text-white/70 hover:text-white">
 <span>Book a Project</span>
 <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border border-white/40 group-hover:border-white transition-colors">
 <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70 group-hover:text-white transition-transform group-hover:translate-x-[1px]" />
 </div>
 </Link>
 </div>
 
 {/* Mechanical Engine Indicator */}
 <div className="absolute bottom-12 left-5 sm:left-12 font-mono text-[8px] tracking-[0.3em] text-white/50 uppercase flex gap-4 pointer-events-none mix-blend-difference">
 <span>Status: Online</span>
 <span>View: 0{activeBgIndex + 1}</span>
 </div>

 </section>

 {/* The Capabilities Statement (Inserted immediately after Hero) */}
 <section id="capabilities" className="w-full bg-white text-[#0A0A0A] border-t border-[#E5E5E5] relative z-10 overflow-hidden">
 
 {/* Tactical Architectural Grid Background */}
 <div className="absolute inset-0 z-0 pointer-events-none" style={{
 backgroundImage: `
 linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
 linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
 `,
 backgroundSize: '4rem 4rem'
 }}>
 {/* Fade out the grid at top and bottom */}
 <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80" />
 
 {/* Massive Structural Crosshairs */}
 <div className="absolute top-[25%] left-[25%] w-[100px] h-[1px] bg-black/10 -translate-x-1/2" />
 <div className="absolute top-[25%] left-[25%] w-[1px] h-[100px] bg-black/10 -translate-y-1/2" />
 
 <div className="absolute bottom-[25%] right-[25%] w-[100px] h-[1px] bg-black/10 translate-x-1/2" />
 <div className="absolute bottom-[25%] right-[25%] w-[1px] h-[100px] bg-black/10 translate-y-1/2" />
 </div>

 <div className="max-w-[1400px] mx-auto relative z-10 px-5 sm:px-12 pt-32 sm:pt-48 pb-20 sm:pb-32">
 <div className="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A]/40 mb-12 sm:mb-20 uppercase tracking-[0.2em] flex gap-4 items-center">
 <span>01 Capabilities</span>
 <div className="flex-1 h-[1px] bg-[#E5E5E5]"></div>
 </div>
 {/* The Refined Manifesto */}
 <div className="w-full max-w-[95vw] md:max-w-6xl mb-24 sm:mb-40 pt-10">
 <h2 className="text-[clamp(1.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] leading-[1.6] sm:leading-[1.5] text-[#0A0A0A]">
 Whether it&apos;s a <br className="hidden lg:block"/>
 <span className="inline-block bg-white text-[#0A0A0A] border-2 sm:border-4 border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_0px_#0A0A0A] px-3 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-3 -rotate-3 transform transition-transform hover:scale-105 hover:rotate-0">Website</span>, 
 a <br className="hidden lg:block"/>
 <span className="inline-block bg-[#0A0A0A] text-white border-2 sm:border-4 border-[#0A0A0A] px-3 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-3 rotate-2 transform transition-transform hover:scale-105 hover:-rotate-2">Brand Identity</span>, 
 <br className="hidden lg:block"/>
 or <span className="inline-block bg-[#90243B] text-white border-2 sm:border-4 border-[#90243B] px-3 sm:px-6 py-1 sm:py-2 mx-1 sm:mx-3 -rotate-1 transform transition-transform hover:scale-105 hover:rotate-2">Video Editing</span>—<br className="hidden lg:block"/>we&apos;ve 
 got it covered.
 </h2>
 </div>
 
 {/* The Universal Interactive Deck */}
 <div className="relative w-full mt-12 md:mt-0">
 
 {/* --- UNIVERSAL DECK (Mobile & Desktop) --- */}
 <div 
 ref={deckRef}
 className="relative w-[60vw] sm:w-[45vw] lg:w-[25vw] aspect-[3/4] mx-auto mt-16 lg:mt-32 mb-40 lg:mb-64 perspective-1000"
 >
 
 {/* Card 1: Brand Identity (Bottom Left) */}
 <div 
 onMouseEnter={playHoverTick}
 onClick={playMechanicalClick}
 className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:-rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-40 rotate-[-10deg] -translate-x-[18vw] lg:-translate-x-[12vw] translate-y-32 lg:translate-y-24 scale-100' : 'z-20 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
 <div className="flex justify-between items-center h-[12%] px-1 pb-1">
 <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Brand Identity</span>
 <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 001 ]</span>
 </div>
 <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
 <div className="relative w-full h-full overflow-hidden">
 <Image src="/cap-logo.jpg" alt="Visual Identity / Logo" fill className="object-cover transition-all duration-700" />
 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
 </div>
 </div>
 </div>

 {/* Card 2: Website (Hero Top) */}
 <div 
 onMouseEnter={playHoverTick}
 onClick={playMechanicalClick}
 className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-16 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-10 rotate-[2deg] -translate-y-24 scale-105' : 'z-30 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
 <div className="flex justify-between items-center h-[12%] px-1 pb-1">
 <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Website</span>
 <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 002 ]</span>
 </div>
 <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
 <div className="relative w-full h-full overflow-hidden">
 <Image src="/cap-website-pc.jpg" alt="Corporate Website Design" fill className="object-cover transition-all duration-700" />
 <div className="absolute inset-0 bg-[#90243B] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
 </div>
 </div>
 </div>

 {/* Card 3: Video (Pushed Right) */}
 <div 
 onMouseEnter={playHoverTick}
 onClick={playMechanicalClick}
 className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-30 rotate-[12deg] translate-x-[30vw] lg:translate-x-[20vw] translate-y-28 lg:translate-y-20 scale-100' : 'z-10 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
 <div className="flex justify-between items-center h-[12%] px-1 pb-1">
 <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Video Editing</span>
 <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 003 ]</span>
 </div>
 <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
 <div className="relative w-full h-full overflow-hidden">
 <Image src="/cap-video-ui.jpg" alt="Cinematic Video Editing" fill className="object-cover transition-all duration-700" />
 <div className="absolute inset-0 bg-[#90243B] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
 </div>
 </div>
 </div>

 </div>
 </div>



 </div>
 </section>


 {/* 4. The Kinetic Pillars (Core Disciplines) */}
 <section id="disciplines" className="w-full bg-[#0A0A0A] text-white overflow-hidden border-t-[6px] sm:border-t-8 border-[#90243B] z-10 relative isolate transform-gpu will-change-transform">
 <div className="px-5 sm:px-12 py-10 sm:py-12">
 <div className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em]">
 02 Core Disciplines
 </div>
 </div>
 
 <div className="flex flex-col lg:flex-row w-full h-[500px] sm:h-[600px] lg:h-[75vh]">
 {[
 { 
 num: "01", 
 title: "Software Engineering", 
 label: "Digital Architecture",
 desc: "We architect high-performance, conversion-optimized digital experiences. Every interaction is calculated. Every millisecond counts.",
 image: "/acc-website.jpg",
 shape: "rectangle",
 link: "/software"
 },
 { 
 num: "02", 
 title: "Graphic Design", 
 label: "Visual Identity",
 desc: "We strip away the noise. We build monolithic brands that command authority through stark contrast and disciplined design systems.",
 image: "/acc-branding-v3.jpg",
 shape: "circle",
 link: "/branding"
 },
 { 
 num: "03", 
 title: "Video Editing", 
 label: "Motion Design",
 desc: "Cinematic precision. We construct motion graphics and video edits with the exactness of an architectural blueprint.",
 image: "/acc-video.jpg",
 shape: "triangle",
 link: "/video"
 }
 ].map((pillar, idx) => {
 const isActive = activePillar === idx;
 const isOtherActive = activePillar !== null && activePillar !== idx;
 
 return (
 <div 
 key={idx}
 onMouseEnter={() => { playHoverTick(); setActivePillar(idx); }}
 onMouseLeave={() => setActivePillar(null)}
 onClick={() => { playMechanicalClick(); setActivePillar(isActive ? null : idx); }}
 className={`group relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1F1F1F] p-6 sm:p-12 cursor-pointer transition-[flex-grow,background-color,opacity] duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden transform-gpu 
  ${isActive 
  ? 'flex-[3.5] lg:flex-[3.5] bg-white text-black' 
  : isOtherActive 
  ? 'flex-[0.7] lg:flex-[0.5] opacity-50 bg-[#0A0A0A]' 
  : 'flex-1 bg-[#0A0A0A]'}
  `}
 >
 {/* Unique Creative Background (Visible only when active, disabled on mobile for performance) */}
 <div className={`hidden lg:block absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
 {pillar.num === "01" && (
 <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#00000015 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
 )}
 {pillar.num === "02" && (
 <div className="w-full h-full" style={{backgroundImage: 'linear-gradient(45deg, #00000005 25%, transparent 25%, transparent 50%, #00000005 50%, #00000005 75%, transparent 75%, transparent)', backgroundSize: '64px 64px'}}></div>
 )}
 {pillar.num === "03" && (
 <div className="w-full h-full" style={{backgroundImage: 'linear-gradient(90deg, #0000000A 1px, transparent 1px), linear-gradient(0deg, #0000000A 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
 )}
 </div>

 {/* Header Section */}
 <div className="relative z-10 flex justify-between w-full items-start">
 <div className={`font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-[#90243B]' : 'text-white/40'}`}>
 {pillar.num} {pillar.label}
 </div>
 
 <div className="flex items-center gap-3">
 {/* Open Indicator */}
 <div className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 ${isActive ? 'opacity-0 hidden' : 'opacity-100 text-white'}`}>
 <ArrowDown size={20} className="animate-bounce" />
 <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">OPEN</span>
 </div>
 
 {/* Tiny Brutalist Shape Icon */}
 <div className={`transition-opacity duration-700 delay-200 ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
 {pillar.shape === 'rectangle' && <div className="w-3 h-3 border-2 border-black"></div>}
 {pillar.shape === 'circle' && <div className="w-3 h-3 rounded-full border-2 border-black"></div>}
 {pillar.shape === 'triangle' && <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black"></div>}
 </div>
 </div>
 </div>
 
 {/* Expanded Content (Images & Words) */}
 {/* Expanded Content (Images & Words) */}
 {isActive && (
 <div className="z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 mt-8 lg:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
 
 {/* Words */}
 <div className="w-full lg:w-full max-w-2xl flex flex-col items-start lg:pr-8">
 <div className="font-sans font-medium text-sm sm:text-base lg:text-lg leading-relaxed tracking-tight text-[#0A0A0A]">
 {pillar.desc}
 </div>
 {/* Brutalist Explore Button / Link */}
 {pillar.link ? (
 <Link href={pillar.link} onClick={(e) => e.stopPropagation()} className="mt-8 px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#90243B] hover:border-[#90243B] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group/btn bg-white w-fit relative z-50 pointer-events-auto">
 Explore Module 
 <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
 </Link>
 ) : (
 <button onClick={(e) => e.stopPropagation()} className="mt-8 px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#90243B] hover:border-[#90243B] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group/btn bg-white w-fit relative z-50 pointer-events-auto">
 Explore Module 
 <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
 </button>
 )}
 </div>

 </div>
 )}
 {/* Footer Section */}
 <div className={`w-full flex justify-start relative z-10 transition-all duration-700 ${isActive ? 'mt-8 lg:mt-auto' : 'mt-auto'}`}>
 <h3 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter origin-left transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
 ${isActive ? 'scale-100 lg:scale-[1.8] translate-y-[-5px] sm:translate-y-[-10px]' : 'scale-90 lg:scale-100'}
 ${isOtherActive ? 'scale-75 lg:scale-75 opacity-50' : ''}
 `}>
 {pillar.title}
 </h3>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 {/* 5. The Monolithic Reveal (Initiate Section) */}
 <motion.section 
 id="contact"
 className="w-full bg-gradient-to-b from-[#90243B] to-[#2D030D] text-white px-5 sm:px-12 py-10 sm:py-20 relative min-h-[100dvh] flex flex-col justify-between overflow-hidden"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.01 }}
 >
 
 {/* Monolithic Pillars Overlay */}
 <div className="absolute inset-0 z-50 pointer-events-none flex">
 {[...Array(6)].map((_, i) => (
 <motion.div 
 key={i}
 className="flex-1 bg-black h-[120%] -translate-y-[10%]"
 initial={{ y: "-10%" }}
 whileInView={{ y: i % 2 === 0 ? "-120%" : "120%" }}
 viewport={{ once: true, amount: "some" }}
 transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 + (i * 0.08) }}
 />
 ))}
 </div>

 {/* Footer Content */}
 <div className="w-full flex justify-between items-start mb-10 sm:mb-20 relative z-10">
 <div className="font-mono text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.2em]">
 03 Contact
 </div>
 <div className="font-mono text-[9px] sm:text-[10px] text-white uppercase tracking-[0.2em] flex items-center gap-3">
 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
 ACCEPTING NEW CLIENTS
 </div>
 </div>

 {/* Typography Header */}
 <div className="w-full flex items-center mb-16 sm:mb-32 relative group cursor-default">
 <h2 className="text-[13vw] sm:text-[9rem] lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] text-white flex items-end gap-3 sm:gap-6 transition-transform duration-1000 group-hover:translate-x-4">
 LET'S BUILD.
 <span className="w-[6vw] h-[10vw] sm:w-[4rem] sm:h-[6.5rem] lg:w-[5rem] lg:h-[8rem] bg-white animate-[pulse_1s_ease-in-out_infinite] inline-block mb-[1vw] sm:mb-[1rem]"></span>
 </h2>
 </div>

 {/* Grid Layout for Contact & Form */}
 <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mt-auto">
 
 {/* Left: Contact info */}
 <div className="lg:col-span-5 flex flex-col justify-end border-t lg:border-t-0 lg:border-r border-white/20 pt-10 lg:pt-0 lg:pr-12 relative z-10">
 <a href="mailto:hello@proximity.agency" className="text-2xl sm:text-4xl text-white hover:text-white/60 transition-colors border-b-[3px] border-white/20 hover:border-white pb-2 self-start font-black tracking-tighter uppercase mb-8">
 hello@proximity.agency
 </a>
 <div className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-[0.2em] flex flex-col gap-2">
 <span>Operating HQ London</span>
 <span>Worldwide Remote Available</span>
 </div>
 </div>

 {/* Right: Stripped Form */}
 <div className="lg:col-span-7 flex flex-col gap-6 w-full lg:pl-12 relative z-10">
 <input 
    type="text" 
    value={formData.name}
    onChange={(e) => setFormData({...formData, name: e.target.value})}
    className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-5 outline-none focus:border-white transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" 
    placeholder="01 NAME / ORGANIZATION" 
 />
 <input 
    type="email" 
    value={formData.email}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-5 outline-none focus:border-white transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" 
    placeholder="02 EMAIL ADDRESS" 
 />
 <input 
    type="text" 
    value={formData.details}
    onChange={(e) => setFormData({...formData, details: e.target.value})}
    className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-5 outline-none focus:border-white transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" 
    placeholder="03 PROJECT DETAILS" 
 />
 
 <button 
    onClick={handleFormSubmit}
    disabled={formStatus === "submitting" || formStatus === "success"}
    className="w-full bg-white text-black py-6 sm:py-8 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#1A233A] hover:text-white transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
 >
    {formStatus === "idle" && "[ SUBMIT INQUIRY ]"}
    {formStatus === "submitting" && "[ TRANSMITTING... ]"}
    {formStatus === "success" && "[ TRANSMISSION SUCCESS ]"}
    {formStatus === "error" && "[ TRANSMISSION FAILED ]"}
 </button>
 </div>

 </div>
 </motion.section>

 </main>
 </div>
 );
}
