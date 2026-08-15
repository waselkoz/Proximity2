"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function SoftwareEngineering() {
  const { scrollY } = useScroll();
  
  // 1. Terminal Shatter Transforms (Hero Only)
  const shatterY = useTransform(scrollY, [0, 800], [0, -300]);
  const shatterOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const shatterScale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const shatterBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(20px)"]);

  // Configurator State
  const [selectedType, setSelectedType] = useState<string>("webapp");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  
  const toggleModule = (mod: string) => {
    playMechanicalClick();
    setSelectedModules(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const commandString = `> build_project --type=${selectedType}${selectedModules.length > 0 ? ` --features=${selectedModules.join(',')}` : ''} --status=ready`;

  // Typewriter effect for Hero
  const [typedText, setTypedText] = useState("");
  const fullText = "WE DON'T JUST WRITE CODE. WE ARCHITECT DIGITAL MONOLITHS.";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#90243B] selection:text-white font-sans overflow-x-hidden min-h-screen">
      
      {/* GLOBAL NAVIGATION (Fixed) */}
      <div className="fixed top-10 left-5 sm:left-12 z-[100] flex justify-between w-[calc(100%-40px)] sm:w-[calc(100%-96px)] pointer-events-none">
          <Link href="/" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="pointer-events-auto font-mono text-[10px] tracking-widest uppercase hover:text-[#90243B] transition-colors flex items-center gap-2 group bg-black/80 backdrop-blur-md px-4 py-2 border border-[#1F1F1F]">
            <div className="w-1.5 h-1.5 bg-[#90243B] rounded-full animate-pulse"></div>
            [ Back to Home ]
          </Link>
          <div className="pointer-events-auto font-mono text-[10px] tracking-widest uppercase text-[#90243B] bg-black/80 backdrop-blur-md px-4 py-2 border border-[#1F1F1F] hidden sm:block">
            Service // Software Engineering
          </div>
      </div>

      {/* 1. HERO: THE TERMINAL SHATTER */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center px-5 overflow-hidden bg-[#0A0A0A]">
        
        {/* The Text that Shatters */}
        <motion.div 
          style={{ y: shatterY, opacity: shatterOpacity, scale: shatterScale, filter: shatterBlur }}
          className="max-w-[1200px] text-center relative z-10"
        >
           <h1 className="text-[clamp(2.5rem,6vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
             {typedText}
             <span className="inline-block w-[4vw] h-[7vw] bg-[#90243B] animate-pulse ml-2 align-baseline"></span>
           </h1>
        </motion.div>

        {/* Ambient Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </section>

      {/* 2. BESPOKE DELIVERY: STRUCTURAL INTEGRITY (Reliable Grid Layout) */}
      <section className="relative w-full bg-white text-[#0A0A0A] py-32 px-5 sm:px-12 overflow-hidden border-t-[12px] border-[#90243B]">
         
         <div className="max-w-[1400px] mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                 <div>
                    <div className="font-mono text-[10px] text-[#0A0A0A]/40 uppercase tracking-[0.2em] mb-4">
                        02 // Bespoke Delivery
                    </div>
                    <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                        STRUCTURAL<br/>INTEGRITY.
                    </h2>
                 </div>
                 <p className="max-w-md text-sm sm:text-base font-medium text-[#0A0A0A]/80 leading-relaxed">
                     We do not use templates. We do not use off-the-shelf themes. Every system is architected from scratch to ensure maximum performance, security, and conversion rates.
                 </p>
             </div>

             {/* 4-Step Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Step 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="bg-[#0A0A0A] text-white p-8 sm:p-12 relative overflow-hidden group shadow-2xl"
                >
                   <div className="absolute top-0 right-0 p-8 text-6xl sm:text-8xl font-black text-white/10 group-hover:text-[#90243B]/20 transition-colors duration-500">01</div>
                   <h3 className="font-mono text-[10px] sm:text-sm text-[#90243B] font-bold uppercase tracking-widest mb-4">Audit & Architect</h3>
                   <p className="text-xl sm:text-3xl font-medium leading-tight mb-8">We analyze the operational payload. We draft the blueprint.</p>
                   <div className="w-full h-1 bg-[#1F1F1F] overflow-hidden">
                       <div className="w-0 h-full bg-[#90243B] group-hover:w-full transition-all duration-1000 ease-out"></div>
                   </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  className="bg-[#1F1F1F] text-white p-8 sm:p-12 relative overflow-hidden group shadow-2xl border border-white/5"
                >
                   <div className="absolute top-0 right-0 p-8 text-6xl sm:text-8xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-500">02</div>
                   <h3 className="font-mono text-[10px] sm:text-sm text-white/50 font-bold uppercase tracking-widest mb-4">Precision Build</h3>
                   <p className="text-xl sm:text-3xl font-medium leading-tight mb-8">Zero bloat. Engineered to the exact pixel and processing cycle.</p>
                   <div className="w-full h-1 bg-[#0A0A0A] overflow-hidden">
                       <div className="w-0 h-full bg-white group-hover:w-full transition-all duration-1000 ease-out"></div>
                   </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                  className="bg-[#90243B] text-white p-8 sm:p-12 relative overflow-hidden group shadow-2xl"
                >
                   <div className="absolute top-0 right-0 p-8 text-6xl sm:text-8xl font-black text-black/20 transition-colors duration-500">03</div>
                   <h3 className="font-mono text-[10px] sm:text-sm text-black font-bold uppercase tracking-widest mb-4">Stress Testing</h3>
                   <p className="text-xl sm:text-3xl font-medium leading-tight mb-8 text-black">We break it. We reinforce it. It becomes indestructible.</p>
                   <div className="w-full h-1 bg-black/20 overflow-hidden">
                       <div className="w-0 h-full bg-black group-hover:w-full transition-all duration-1000 ease-out"></div>
                   </div>
                </motion.div>

                {/* Step 4 */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  className="bg-black text-white p-8 sm:p-12 relative overflow-hidden group shadow-2xl border-2 border-white/20"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
                   <div className="absolute top-0 right-0 p-8 text-6xl sm:text-8xl font-black text-white/10 group-hover:text-[#90243B]/40 transition-colors duration-500">04</div>
                   <h3 className="font-mono text-[10px] sm:text-sm text-[#90243B] font-bold uppercase tracking-widest mb-4">Deployment</h3>
                   <p className="text-xl sm:text-3xl font-medium leading-tight mb-8">The monolith goes live. Scalable. Perfect.</p>
                   <div className="w-full h-1 bg-white/10 overflow-hidden">
                       <div className="w-0 h-full bg-[#90243B] group-hover:w-full transition-all duration-1000 ease-out"></div>
                   </div>
                </motion.div>

             </div>
         </div>
      </section>

      {/* 3. THE ARSENAL: PARALLAX MATRIX (Reliable Static Grid version for zero layout bugs) */}
      <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
         
         <div className="max-w-[1400px] mx-auto px-5 sm:px-12 relative z-10">
             <div className="text-center mb-20">
                 <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter leading-none text-white">
                   THE ARSENAL
                 </h2>
                 <p className="font-mono text-[10px] text-[#90243B] uppercase tracking-[0.2em] mt-4">
                   System Specifications
                 </p>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND",
                  "PYTHON", "NODE.JS", "POSTGRESQL", "AWS",
                  "FRAMER", "WEBGL", "THREE.JS", "GSAP"
                ].map((tech, i) => (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: i * 0.05 }}
                     key={i} 
                     onMouseEnter={playHoverTick}
                     className="bg-[#1F1F1F] border border-white/5 aspect-square sm:aspect-auto sm:h-48 flex items-center justify-center p-4 text-center cursor-crosshair group/tech relative overflow-hidden transition-colors duration-500 hover:bg-[#90243B] hover:border-[#90243B]"
                   >
                      <div className="absolute inset-0 bg-[#0A0A0A] opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 sm:p-4">
                         <div className="w-full h-full border border-white/20 p-2 flex flex-col justify-between">
                            <div className="font-mono text-[8px] text-white/50 text-left">SYS.{tech.replace(/[^a-zA-Z]/g, '')}</div>
                            <div className="w-full h-[1px] bg-white/20 relative"><div className="absolute left-0 top-0 h-full bg-white w-1/3 animate-pulse"></div></div>
                         </div>
                      </div>
                      <span className="font-black text-xl sm:text-3xl text-white/30 group-hover/tech:opacity-0 transition-opacity duration-300 break-words w-full">
                        {tech}
                      </span>
                   </motion.div>
                 ))}
             </div>
         </div>
      </section>

      {/* 4. LIVE DEPLOYMENTS: VERTICAL PARALLAX (Replaces buggy horizontal scroll) */}
      <section className="relative w-full bg-white text-[#0A0A0A] py-32 px-5 sm:px-12 border-t-[12px] border-black">
        <div className="max-w-[1400px] mx-auto">
            
            <div className="font-mono text-[10px] text-[#0A0A0A]/40 uppercase tracking-[0.2em] mb-12 flex items-center gap-4 w-full">
               <span>04 // Live Deployments</span>
               <div className="flex-1 h-[1px] bg-[#E5E5E5]"></div>
            </div>

            <div className="flex flex-col gap-24 sm:gap-48">
               
               {/* Project 1 */}
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                 className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center group"
               >
                  <div className="w-full lg:w-3/5 aspect-video bg-[#0A0A0A] border-4 border-[#0A0A0A] relative overflow-hidden shadow-2xl group-hover:shadow-[20px_20px_0px_0px_#90243B] transition-shadow duration-700">
                     <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"></div>
                     <div className="absolute top-4 right-4 bg-[#90243B] text-white font-mono text-[8px] px-2 py-1 uppercase">Operational</div>
                  </div>
                  <div className="w-full lg:w-2/5">
                      <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">Fintech Monolith</h3>
                      <div className="font-mono text-[10px] sm:text-[12px] text-[#0A0A0A]/60 uppercase tracking-widest mb-6 border-l-2 border-[#90243B] pl-4">Next.js // Python // Scale: Massive</div>
                      <p className="text-sm sm:text-base font-medium text-[#0A0A0A]/80 leading-relaxed">
                         Engineered to handle thousands of concurrent transactions with absolute zero latency. The architecture is built on a distributed microservices network.
                      </p>
                  </div>
               </motion.div>

               {/* Project 2 */}
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                 className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-20 items-center group"
               >
                  <div className="w-full lg:w-3/5 aspect-video bg-[#0A0A0A] border-4 border-[#0A0A0A] relative overflow-hidden shadow-2xl group-hover:shadow-[-20px_20px_0px_0px_#1F1F1F] transition-shadow duration-700">
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff10_25%,transparent_25%,transparent_50%,#ffffff10_50%,#ffffff10_75%,transparent_75%,transparent)] bg-[size:32px_32px] opacity-30 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"></div>
                     <div className="absolute top-4 left-4 bg-white text-black font-mono text-[8px] px-2 py-1 uppercase font-bold">Classified</div>
                  </div>
                  <div className="w-full lg:w-2/5 lg:text-right">
                      <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">E-Commerce Engine</h3>
                      <div className="font-mono text-[10px] sm:text-[12px] text-[#0A0A0A]/60 uppercase tracking-widest mb-6 border-r-2 border-[#0A0A0A] pr-4 lg:ml-auto">React // Stripe // Architecture</div>
                      <p className="text-sm sm:text-base font-medium text-[#0A0A0A]/80 leading-relaxed">
                         A hyper-optimized storefront capable of rendering massive inventories instantly. Built for extreme conversion rates and flawless user journeys.
                      </p>
                  </div>
               </motion.div>

            </div>
        </div>
      </section>

      {/* 5. SERVICES: THE COMMAND LINE CONFIGURATOR */}
      <section className="w-full bg-[#030611] text-white py-32 sm:py-48 px-5 sm:px-12 border-t border-[#1F1F1F] relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] bg-[#90243B] blur-[100px] sm:blur-[250px] rounded-full opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
             
             <div className="font-mono text-[10px] text-[#90243B] mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                <TerminalSquare size={14} />
                05 // Start Project
             </div>
             
             <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-black uppercase tracking-tighter leading-[0.8] mb-12 sm:mb-20 text-center">
               CONFIGURE YOUR <br/> <span className="text-[#90243B]">SYSTEM.</span>
             </h2>

             {/* The Terminal UI */}
             <div className="w-full max-w-4xl bg-black border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] font-mono flex flex-col overflow-hidden group/term">
                 
                 {/* Terminal Header */}
                 <div className="w-full bg-white/10 px-4 py-2 flex items-center justify-between border-b border-white/20">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#90243B]"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                     </div>
                     <div className="text-[10px] text-white/50 tracking-widest">PROJECT BUILDER // PROXIMITY</div>
                 </div>

                 {/* Terminal Body */}
                 <div className="p-5 sm:p-12 flex flex-col gap-8 sm:gap-10">
                     
                     {/* Select Type */}
                     <div>
                        <div className="text-[#90243B] text-[10px] sm:text-xs uppercase tracking-widest mb-4">Select Project Type:</div>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                           {["webapp", "ecommerce", "backend", "landing_page"].map((type) => (
                             <button 
                               key={type}
                               onClick={() => { playMechanicalClick(); setSelectedType(type); }}
                               onMouseEnter={playHoverTick}
                               className={`px-3 py-2 sm:px-4 sm:py-2 border transition-colors text-[10px] sm:text-xs uppercase tracking-widest
                                 ${selectedType === type ? 'bg-white text-black border-white font-bold' : 'bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white'}
                               `}
                             >
                               --{type}
                             </button>
                           ))}
                        </div>
                     </div>

                     {/* Select Modules */}
                     <div>
                        <div className="text-[#90243B] text-[10px] sm:text-xs uppercase tracking-widest mb-4">Select Features (Optional):</div>
                        <div className="flex flex-wrap gap-2 sm:gap-4">
                           {["auth", "payments", "ai_llm", "websockets", "cms"].map((mod) => {
                             const isSelected = selectedModules.includes(mod);
                             return (
                               <button 
                                 key={mod}
                                 onClick={() => toggleModule(mod)}
                                 onMouseEnter={playHoverTick}
                                 className={`px-3 py-2 sm:px-4 sm:py-2 border transition-colors text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2
                                   ${isSelected ? 'bg-[#90243B]/20 text-[#90243B] border-[#90243B]' : 'bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white'}
                                 `}
                               >
                                 <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isSelected ? 'bg-[#90243B]' : 'bg-transparent border border-white/50'}`}></div>
                                 {mod}
                               </button>
                             );
                           })}
                        </div>
                     </div>

                     {/* Live Command Output */}
                     <div className="mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-white/10">
                         <div className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Request Summary:</div>
                         <div className="bg-white/5 p-3 sm:p-4 border border-white/10 text-white font-bold text-[10px] sm:text-sm break-all flex items-center gap-2 sm:gap-3 relative overflow-hidden">
                            <span className="text-[#90243B] shrink-0">root@proximity:~#</span> 
                            <span>{commandString}</span>
                            <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-white animate-pulse shrink-0"></span>
                         </div>
                     </div>

                     {/* Execute */}
                     <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:mt-4">
                         <input 
                           type="email" 
                           placeholder="ENTER YOUR EMAIL ADDRESS" 
                           className="flex-1 bg-transparent border-b border-white/20 py-3 sm:py-4 font-mono text-xs sm:text-sm tracking-widest uppercase text-white outline-none focus:border-[#90243B] transition-colors" 
                         />
                         <button 
                           onClick={playMechanicalClick} 
                           className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs hover:bg-[#90243B] hover:text-white transition-colors flex items-center justify-center gap-4 group shrink-0"
                         >
                           SUBMIT REQUEST
                           <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </button>
                     </div>

                 </div>
             </div>
        </div>
      </section>

    </div>
  );
}
