"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activePillar, setActivePillar] = useState<number | null>(null);
  
  // State for the mechanical background flipper
  const [activeBgIndex, setActiveBgIndex] = useState(0);

  // State and Ref for Scroll-Triggered Mobile Deck
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckExpanded, setDeckExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDeckExpanded(true);
        } else {
          setDeckExpanded(false);
        }
      },
      { threshold: 0.4 } // Trigger when 40% of the deck is visible
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

      {/* 1. The Mechanical Shutter (Load Animation) */}
      <div className={`fixed inset-x-0 top-0 h-[50dvh] bg-[#0A0A0A] z-[100] ${mounted ? 'animate-shutter-up' : ''} pointer-events-none`}></div>
      <div className={`fixed inset-x-0 bottom-0 h-[50dvh] bg-[#0A0A0A] z-[100] ${mounted ? 'animate-shutter-down' : ''} pointer-events-none flex items-center justify-center`}>
        <Image src="/Logo_crimson.png" alt="Proximity Logo" width={300} height={100} className={`h-6 sm:h-8 w-auto object-contain brightness-0 invert absolute top-1/2 -translate-y-1/2 transition-opacity duration-500 ${mounted ? 'opacity-0' : 'opacity-100'}`} priority />
      </div>

      {/* Navigation */}
      <nav className="w-full px-5 sm:px-12 py-5 sm:py-8 flex justify-between items-center z-50 fixed top-0 bg-transparent mix-blend-difference border-b border-white/20">
        <div className="flex items-center gap-4">
          <Image src="/Logo_crimson.png" alt="Proximity Logo" width={300} height={100} className="h-4 sm:h-5 w-auto object-contain brightness-0 invert" priority />
        </div>
        
        <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          <span className="hover:text-white cursor-pointer transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Work</span>
          <span className="hover:text-white cursor-pointer transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Disciplines</span>
          <span className="hover:text-white cursor-pointer transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Studio</span>
          <span className="hover:text-white cursor-pointer transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Contact</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-white uppercase tracking-widest">
          <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white"></span>
          </div>
          <span className="opacity-80">System Active</span>
        </div>
      </nav>

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
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          </div>
          
          {/* State 2: Cinematic Crimson */}
          <div 
            className="fixed inset-0 -z-20 transition-all duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none"
            style={{ clipPath: activeBgIndex === 2 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
          >
            <Image src="/motion.jpg" alt="Cinematic Motion" fill className="object-cover contrast-150 saturate-200" priority />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="font-mono text-[9px] sm:text-[10px] mb-8 sm:mb-16 tracking-[0.2em] uppercase py-1.5 border-l-2 pl-3 sm:pl-4 relative z-10 text-white border-white mix-blend-difference">
            [ PROXIMITY — DIGITAL ATELIER ]
          </div>
          
          {/* Static, Massive, High-Contrast Typography */}
          <h1 className="text-[14vw] sm:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-[0.85] sm:leading-[0.85] mb-12 sm:mb-16 max-w-6xl uppercase break-words relative z-10 mix-blend-difference text-white">
            We craft <br className="hidden sm:block"/> 
            architecture <br className="hidden lg:block"/> 
            for brands that value <span className="bg-white text-black px-1 sm:px-2 whitespace-nowrap mt-2 sm:mt-0 inline-block mix-blend-normal">precision.</span>
          </h1>
          
          <button className="group flex items-center gap-4 sm:gap-6 pb-2 sm:pb-3 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] pr-2 sm:pr-4 relative z-10 text-white border-white mix-blend-difference">
            <span>Initiate Sequence</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center bg-white group-hover:bg-[#90243B] transition-colors">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black group-hover:text-white transition-transform group-hover:translate-x-[1px]" />
            </div>
          </button>
          
          {/* Mechanical Engine Indicator */}
          <div className="absolute bottom-12 left-5 sm:left-12 font-mono text-[8px] tracking-[0.3em] text-white/50 mix-blend-difference uppercase flex gap-4 pointer-events-none">
            <span>Engine: ACTIVE</span>
            <span>Index: 0{activeBgIndex + 1}</span>
          </div>

        </section>

        {/* The Capabilities Statement (Inserted immediately after Hero) */}
        <section className="w-full bg-white text-[#0A0A0A] px-5 sm:px-12 py-20 sm:py-32 border-t border-[#E5E5E5] relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A]/40 mb-12 sm:mb-20 uppercase tracking-[0.2em] flex gap-4 items-center">
              <span>01 // Capabilities</span>
              <div className="flex-1 h-[1px] bg-[#E5E5E5]"></div>
            </div>
            {/* The Refined Manifesto */}
            <div className="w-full max-w-[95vw] md:max-w-6xl mb-24 sm:mb-40 pt-10">
              <h2 className="text-[clamp(2.5rem,7vw,7.5rem)] font-black uppercase tracking-[-0.04em] leading-[1.15] text-[#0A0A0A]">
                Whether it&apos;s a <br className="hidden lg:block"/>
                <span className="bg-[#0A0A0A] text-white px-3 md:px-5 pb-1 md:pb-2">Website</span>, a <span className="text-[#90243B] underline decoration-[4px] md:decoration-[8px] underline-offset-[6px] md:underline-offset-[12px]">Brand Identity</span>, <br className="hidden lg:block"/>
                or <span className="text-[#90243B]">Video Editing</span>—we&apos;ve <br className="hidden lg:block"/>
                got it covered.
              </h2>
            </div>
            
            {/* The Innovative Mobile Deck & Desktop Grid */}
            <div className="relative w-full mt-12 md:mt-0">
              
              {/* --- DESKTOP GRID (Hidden on Mobile) --- */}
              <div className="hidden md:grid md:grid-cols-3 gap-10">
                {/* Card 1: Brand Identity */}
                <div className="group flex flex-col gap-4 w-full">
                  <div className="w-full bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-4">
                    <div className="relative w-full overflow-hidden">
                      <Image src="/cap-logo.jpg" alt="Visual Identity / Logo" width={1000} height={1000} className="w-full h-auto object-contain grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <div className="absolute inset-0 bg-black mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#0A0A0A] pt-3">
                    <span className="font-black uppercase text-2xl tracking-tighter">Brand Identity</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 001 ]</span>
                  </div>
                </div>

                {/* Card 2: Website */}
                <div className="group flex flex-col gap-4 w-full">
                  <div className="w-full bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-4">
                    <div className="relative w-full overflow-hidden">
                      <Image src="/cap-website-pc.jpg" alt="Corporate Website Design" width={1000} height={1000} className="w-full h-auto object-contain grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#0A0A0A] pt-3">
                    <span className="font-black uppercase text-2xl tracking-tighter">Website</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 002 ]</span>
                  </div>
                </div>

                {/* Card 3: Video */}
                <div className="group flex flex-col gap-4 w-full">
                  <div className="w-full bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-4">
                    <div className="relative w-full overflow-hidden">
                      <Image src="/cap-video-ui.jpg" alt="Cinematic Video Editing" width={1000} height={1000} className="w-full h-auto object-contain grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#0A0A0A] pt-3">
                    <span className="font-black uppercase text-2xl tracking-tighter">Video Editing</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 003 ]</span>
                  </div>
                </div>
              </div>

              {/* --- INNOVATIVE MOBILE DECK (Hidden on Desktop) --- */}
              <div 
                ref={deckRef}
                className="md:hidden relative w-[60vw] sm:w-[45vw] aspect-[3/4] mx-auto mt-16 mb-32 perspective-1000"
              >
                
                {/* Card 1: Brand Identity (Bottom Left) */}
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:-rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-40 rotate-[-10deg] -translate-x-[18vw] translate-y-16 scale-100' : 'z-20 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Brand Identity</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 001 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-logo.jpg" alt="Visual Identity / Logo" fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-black mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Website (Hero Top) */}
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-16 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-10 rotate-[2deg] -translate-y-8 scale-105' : 'z-30 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Website</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 002 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-website-pc.jpg" alt="Corporate Website Design" fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Video (Pushed Right) */}
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-30 rotate-[12deg] translate-x-[30vw] translate-y-8 scale-100' : 'z-10 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Video Editing</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 003 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-video-ui.jpg" alt="Cinematic Video Editing" fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. The Diagonal Slice Portfolio (Native App Horizontal Snap Carousel) */}
        <section className="py-20 sm:py-32 w-full relative bg-[#FAFAFA] border-t border-[#E5E5E5] z-10">
          <div className="max-w-[1400px] mx-auto px-0 sm:px-12">
            <div className="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A]/40 mb-8 sm:mb-24 uppercase tracking-[0.2em] border-b border-[#E5E5E5] pb-4 sm:pb-6 flex justify-between px-5 sm:px-0">
              <span>01 // Selected Works</span>
              <span className="hidden sm:inline">2024 — 2026</span>
              <span className="sm:hidden text-[#90243B] animate-pulse">SWIPE —&gt;</span>
            </div>

            {/* Horizontal Snap Container for Mobile */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-16 lg:gap-32 items-start px-5 sm:px-0 no-scrollbar pb-8 sm:pb-0 lg:flex-row flex-row">
              
              {/* Card 1 */}
              <div className="w-[85vw] sm:w-full lg:w-[55%] flex-none snap-center group cursor-pointer relative">
                {/* The Slice Container */}
                <div className="w-full aspect-square sm:aspect-[4/3] bg-[#0A0A0A] mb-6 sm:mb-8 relative overflow-hidden flex items-center justify-center border border-[#E5E5E5]">
                   
                   {/* Underlayer Content */}
                   <div className="absolute inset-0 bg-[#90243B] flex items-center justify-center z-0">
                     <span className="font-black text-4xl sm:text-6xl text-white opacity-20 uppercase tracking-tighter">View Project</span>
                   </div>

                   {/* Black Top Left Slice */}
                   <div className="absolute inset-0 bg-[#0A0A0A] z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full group-hover:-translate-y-full flex items-center justify-center" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                   </div>
                   
                   {/* Black Bottom Right Slice */}
                   <div className="absolute inset-0 bg-[#0A0A0A] z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-full group-hover:translate-y-full flex items-center justify-center" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                   </div>

                   <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 group-hover:text-white transition-colors relative z-20 pointer-events-none mix-blend-difference">AETHER_ARCHIVE_DATA</span>
                </div>
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter transition-colors group-hover:text-[#90243B]">Aether</h3>
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#0A0A0A]/60 border border-[#0A0A0A]/10 px-2 py-1 uppercase tracking-[0.2em] bg-[#FAFAFA] group-hover:border-[#90243B] group-hover:text-[#90243B] transition-colors mt-1 sm:mt-0">Digital Exp</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[85vw] sm:w-full lg:w-[45%] flex-none snap-center lg:mt-48 group cursor-pointer relative">
                {/* The Slice Container */}
                <div className="w-full aspect-[4/5] sm:aspect-square bg-[#0A0A0A] mb-6 sm:mb-8 relative overflow-hidden flex items-center justify-center border border-[#E5E5E5]">
                   
                   {/* Underlayer Content */}
                   <div className="absolute inset-0 bg-[#90243B] flex items-center justify-center z-0">
                     <span className="font-black text-3xl sm:text-5xl text-white opacity-20 uppercase tracking-tighter text-center">View Project</span>
                   </div>

                   {/* Black Top Left Slice */}
                   <div className="absolute inset-0 bg-[#0A0A0A] z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full group-hover:-translate-y-full flex items-center justify-center" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}>
                   </div>
                   
                   {/* Black Bottom Right Slice */}
                   <div className="absolute inset-0 bg-[#0A0A0A] z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-full group-hover:translate-y-full flex items-center justify-center" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}>
                   </div>

                   <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 group-hover:text-white transition-colors relative z-20 pointer-events-none mix-blend-difference">VANGUARD_ARCHIVE_DATA</span>
                </div>
                
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter transition-colors group-hover:text-[#90243B]">Vanguard</h3>
                    <span className="font-mono text-[8px] sm:text-[9px] text-[#0A0A0A]/60 border border-[#0A0A0A]/10 px-2 py-1 uppercase tracking-[0.2em] bg-[#FAFAFA] group-hover:border-[#90243B] group-hover:text-[#90243B] transition-colors mt-1 sm:mt-0">Identity</span>
                  </div>
                </div>
              </div>

               {/* Add an empty div for spacing at the end of the mobile scroll */}
              <div className="w-[5vw] flex-none sm:hidden"></div>

            </div>
          </div>
        </section>

        {/* 4. The Kinetic Pillars (Core Disciplines) */}
        <section className="w-full bg-[#0A0A0A] text-white overflow-hidden border-t-[6px] sm:border-t-8 border-[#90243B] z-10 relative">
          <div className="px-5 sm:px-12 py-10 sm:py-12">
             <div className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em]">
                02 // Core Disciplines
             </div>
          </div>
          
          <div className="flex flex-col lg:flex-row w-full min-h-[60vh] lg:h-[75vh]">
            {[
              { num: "01", title: "Websites", label: "Digital Architecture" },
              { num: "02", title: "Branding", label: "Visual Identity" },
              { num: "03", title: "Video", label: "Motion Design" }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActivePillar(idx)}
                onMouseLeave={() => setActivePillar(null)}
                onClick={() => setActivePillar(activePillar === idx ? null : idx)}
                className={`group relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1F1F1F] p-6 sm:p-12 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden min-h-[140px] sm:min-h-[200px]
                  ${activePillar === idx 
                    ? 'flex-[2.5] lg:flex-[2.5] bg-white text-black' 
                    : activePillar !== null 
                      ? 'flex-[0.5] lg:flex-[0.5] opacity-50 bg-[#0A0A0A]' 
                      : 'flex-1 bg-[#0A0A0A]'}
                `}
              >
                <div className={`font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${activePillar === idx ? 'text-[#90243B]' : 'text-white/40'}`}>
                  {pillar.num} // {pillar.label}
                </div>
                
                <div className="w-full flex justify-start">
                  <h3 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter origin-left transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${activePillar === idx ? 'scale-100 lg:scale-[1.8] translate-y-[-5px] sm:translate-y-[-10px]' : 'scale-90 lg:scale-100'}
                    ${activePillar !== null && activePillar !== idx ? 'scale-75 lg:scale-75 opacity-50' : ''}
                  `}>
                    {pillar.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Full-Screen Terminal Takeover (App-like Mobile Footer) */}
        <section className="w-full bg-[#0A0A0A] text-white px-5 sm:px-12 py-20 sm:py-32 border-t border-[#1F1F1F] relative min-h-[100dvh] flex flex-col justify-center z-10">
          
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-16 sm:gap-24 lg:gap-32 w-full">
            
            <div className="lg:w-[45%] flex flex-col">
              <div className="font-mono text-[9px] sm:text-[10px] text-white/30 mb-8 sm:mb-16 uppercase tracking-[0.2em]">
                 03 // Initiate
              </div>
              <h2 className="text-[18vw] sm:text-[14vw] lg:text-[8rem] font-black uppercase tracking-tighter mb-6 sm:mb-12 leading-[0.8]">
                Let's <br/> build.
              </h2>
              <a href="mailto:hello@proximity.agency" className="text-lg sm:text-2xl text-white hover:text-[#90243B] transition-colors mb-12 sm:mb-20 border-b-2 border-white/20 hover:border-[#90243B] pb-2 self-start font-black tracking-tighter uppercase break-all">
                hello@proximity.agency
              </a>
              
              <div className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.2em] flex flex-col gap-2 sm:gap-3 hidden sm:flex">
                <span>Operating Timezone</span>
                <span className="text-white border border-[#1F1F1F] px-3 sm:px-4 py-2 self-start bg-[#0A0A0A]">GMT / LONDON — ACTIVE</span>
              </div>
            </div>

            {/* Sleek Terminal Form */}
            <div className="lg:w-[55%] flex flex-col gap-6 sm:gap-10">
              <div className="flex flex-col gap-2 group">
                <label className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.2em] group-focus-within:text-[#90243B] transition-colors">Name / Organization</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-[#1F1F1F] text-xl sm:text-2xl py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-tighter text-white placeholder:text-white/10 rounded-none" placeholder="ENTER IDENTITY" />
              </div>
              
              <div className="flex flex-col gap-2 group">
                <label className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.2em] group-focus-within:text-[#90243B] transition-colors">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b-2 border-[#1F1F1F] text-xl sm:text-2xl py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-tighter text-white placeholder:text-white/10 rounded-none" placeholder="ENTER COMMS LINK" />
              </div>
              
              <div className="flex flex-col gap-2 group">
                <label className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.2em] group-focus-within:text-[#90243B] transition-colors">Project Brief</label>
                <textarea rows={2} className="w-full bg-transparent border-b-2 border-[#1F1F1F] text-xl sm:text-2xl py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-tighter text-white resize-none placeholder:text-white/10 rounded-none" placeholder="DEFINE DIRECTIVE"></textarea>
              </div>

              <div className="flex justify-between items-end mt-4 sm:mt-12">
                <button className="bg-white text-[#0A0A0A] px-8 sm:px-10 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#90243B] hover:text-white transition-colors flex items-center gap-4 sm:gap-6 group">
                  Submit
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0A0A0A] rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white group-hover:text-[#90243B] transition-transform group-hover:translate-x-[1px]" />
                  </div>
                </button>
              </div>
            </div>
            
          </div>
        </section>

      </main>
    </div>
  );
}
