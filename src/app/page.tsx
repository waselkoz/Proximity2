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
        <section className="w-full bg-white text-[#0A0A0A] border-t border-[#E5E5E5] relative z-10 overflow-hidden">
          
          {/* Scroll-Linked Kinetic Typography Background */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
            <div ref={bgText1Ref} className="text-[20vw] font-black uppercase whitespace-nowrap tracking-tighter leading-none will-change-transform">
              PROXIMITY DIGITAL ATELIER PROXIMITY DIGITAL ATELIER PROXIMITY
            </div>
            <div ref={bgText2Ref} className="text-[20vw] font-black uppercase whitespace-nowrap tracking-tighter leading-none will-change-transform -translate-x-[1500px]">
              DIGITAL ATELIER PROXIMITY DIGITAL ATELIER PROXIMITY DIGITAL
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10 px-5 sm:px-12 py-20 sm:py-32">
            <div className="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A]/40 mb-12 sm:mb-20 uppercase tracking-[0.2em] flex gap-4 items-center">
              <span>01 // Capabilities</span>
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
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:-rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-40 rotate-[-10deg] -translate-x-[18vw] lg:-translate-x-[12vw] translate-y-32 lg:translate-y-24 scale-100' : 'z-20 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Brand Identity</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 001 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-logo.jpg" alt="Visual Identity / Logo" fill className="object-cover transition-all duration-700" />
                      <div className="absolute inset-0 bg-black mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Website (Hero Top) */}
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-16 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-10 rotate-[2deg] -translate-y-24 scale-105' : 'z-30 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Website</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 002 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-website-pc.jpg" alt="Corporate Website Design" fill className="object-cover transition-all duration-700" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Video (Pushed Right) */}
                <div className={`group absolute inset-0 w-full h-full bg-white border border-[#E5E5E5] p-2 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-50 hover:-translate-y-12 hover:rotate-6 hover:scale-110 cursor-pointer ${deckExpanded ? 'z-30 rotate-[12deg] translate-x-[30vw] lg:translate-x-[20vw] translate-y-28 lg:translate-y-20 scale-100' : 'z-10 rotate-0 translate-x-0 translate-y-0 scale-90'}`}>
                  <div className="flex justify-between items-center h-[12%] px-1 pb-1">
                    <span className="font-black uppercase text-[1rem] leading-none tracking-tighter text-[#0A0A0A]">Video Editing</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A]/40">[ 003 ]</span>
                  </div>
                  <div className="w-full h-[88%] bg-[#0A0A0A] relative overflow-hidden border border-[#E5E5E5] p-1">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image src="/cap-video-ui.jpg" alt="Cinematic Video Editing" fill className="object-cover transition-all duration-700" />
                      <div className="absolute inset-0 bg-[#90243B] mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

              </div>
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
              { 
                num: "01", 
                title: "Websites", 
                label: "Digital Architecture",
                desc: "We architect high-performance, conversion-optimized digital experiences. Every interaction is calculated. Every millisecond counts.",
                image: "/acc-website.jpg",
                shape: "rectangle",
                bgStyle: {
                  backgroundImage: 'linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }
              },
              { 
                num: "02", 
                title: "Branding", 
                label: "Visual Identity",
                desc: "We strip away the noise. We build monolithic brands that command authority through stark contrast and disciplined design systems.",
                image: "/acc-branding.jpg",
                shape: "circle",
                bgStyle: {
                  backgroundImage: 'radial-gradient(#00000010 2px, transparent 2px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }
              },
              { 
                num: "03", 
                title: "Video", 
                label: "Motion Design",
                desc: "Cinematic precision. We construct motion graphics and video edits with the exactness of an architectural blueprint.",
                image: "/acc-video.jpg",
                shape: "triangle",
                bgStyle: {
                  backgroundImage: 'repeating-linear-gradient(45deg, #00000005 0px, #00000005 1px, transparent 1px, transparent 4px)',
                  backgroundSize: '100% 100%'
                }
              }
            ].map((pillar, idx) => {
              const isActive = activePillar === idx;
              const isOtherActive = activePillar !== null && activePillar !== idx;
              
              return (
              <div 
                key={idx}
                onMouseEnter={() => setActivePillar(idx)}
                onMouseLeave={() => setActivePillar(null)}
                onClick={() => setActivePillar(isActive ? null : idx)}
                className={`group relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1F1F1F] p-6 sm:p-12 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden min-h-[140px] sm:min-h-[200px]
                  ${isActive 
                    ? 'flex-[3.5] lg:flex-[3.5] bg-white text-black' 
                    : isOtherActive 
                      ? 'flex-[0.5] lg:flex-[0.5] opacity-50 bg-[#0A0A0A]' 
                      : 'flex-1 bg-[#0A0A0A]'}
                `}
              >
                {/* Unique Creative Background (Visible only when active) */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={pillar.bgStyle}
                ></div>

                {/* Header Section */}
                <div className="relative z-10 flex justify-between w-full items-start">
                   <div className={`font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-[#90243B]' : 'text-white/40'}`}>
                     {pillar.num} // {pillar.label}
                   </div>
                   
                   {/* Tiny Brutalist Shape Icon */}
                   <div className={`transition-opacity duration-700 delay-200 ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      {pillar.shape === 'rectangle' && <div className="w-3 h-3 border-2 border-black"></div>}
                      {pillar.shape === 'circle' && <div className="w-3 h-3 rounded-full border-2 border-black"></div>}
                      {pillar.shape === 'triangle' && <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black"></div>}
                   </div>
                </div>
                
                {/* Expanded Content (Images & Words) */}
                <div className={`z-10 flex-1 flex flex-col lg:flex-row justify-center lg:items-center gap-6 lg:gap-12 mt-8 lg:mt-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isActive ? 'relative opacity-100 translate-y-0' : 'absolute opacity-0 translate-y-8 pointer-events-none invisible'}`}>
                    <div className="w-full lg:w-1/2 flex flex-col items-start lg:pr-8">
                        <div className="font-sans font-medium text-sm sm:text-base leading-relaxed tracking-tight max-w-sm">
                             {pillar.desc}
                        </div>
                        {/* Brutalist Explore Button */}
                        <button className="mt-8 px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#90243B] hover:border-[#90243B] hover:text-white transition-all duration-300 flex items-center gap-3 group/btn">
                          Explore Module 
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </div>
                    
                    <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] relative overflow-hidden border border-[#E5E5E5] p-2 bg-white shadow-xl transform transition-transform duration-700 hover:scale-[1.02]">
                         <div className="w-full h-full relative overflow-hidden bg-[#0A0A0A]">
                            <Image src={pillar.image} alt={pillar.title} fill className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                            {/* Scanning line animation over image */}
                            <div className="absolute inset-0 w-full h-[2px] bg-[#90243B]/50 animate-[scan_3s_ease-in-out_infinite]"></div>
                         </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className={`w-full flex justify-start relative z-10 transition-all duration-700 ${isActive ? 'mt-8 lg:mt-auto' : 'mt-auto'}`}>
                  <h3 className={`text-4xl sm:text-6xl font-black uppercase tracking-tighter origin-left transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${isActive ? 'scale-100 lg:scale-[1.8] translate-y-[-5px] sm:translate-y-[-10px]' : 'scale-90 lg:scale-100'}
                    ${isOtherActive ? 'scale-75 lg:scale-75 opacity-50' : ''}
                  `}>
                    {pillar.title}
                  </h3>
                </div>
                
                {/* Background Brutalist Shape Watermark */}
                <div className={`absolute -right-10 -bottom-10 lg:-right-20 lg:-bottom-20 opacity-[0.03] pointer-events-none transition-all duration-1000 ${isActive ? 'scale-100 rotate-12' : 'scale-50 rotate-0'}`}>
                   {pillar.shape === 'rectangle' && <div className="w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] border-[40px] border-black"></div>}
                   {pillar.shape === 'circle' && <div className="w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-black"></div>}
                   {pillar.shape === 'triangle' && <div className="w-0 h-0 border-l-[150px] lg:border-l-[250px] border-l-transparent border-r-[150px] lg:border-r-[250px] border-b-[260px] lg:border-b-[433px] border-b-black"></div>}
                </div>
              </div>
              );
            })}
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
