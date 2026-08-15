"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, Check } from "lucide-react";
import { SiNextdotjs, SiReact, SiFramer, SiTailwindcss, SiNodedotjs, SiPostgresql, SiRedis, SiPrisma, SiVercel, SiDocker, SiCloudflare } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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

const steps = [
  { num: "01", title: "Audit & Architect", desc: "We analyze the operational payload. We draft the structural blueprint." },
  { num: "02", title: "Precision Build", desc: "Zero bloat. Engineered to the exact pixel and processing cycle." },
  { num: "03", title: "Stress Testing", desc: "We break it. We reinforce it. It becomes indestructible." },
  { num: "04", title: "Deployment", desc: "The platform goes live. Scalable. Perfect." }
];

const techCategories = [
  { id: "frontend", label: "FRONT-END", tools: [{name: "Next.js", icon: SiNextdotjs}, {name: "React", icon: SiReact}, {name: "Framer Motion", icon: SiFramer}, {name: "Tailwind CSS", icon: SiTailwindcss}], reason: "Selected for zero-latency routing and fluid cinematic interactions." },
  { id: "backend", label: "BACK-END", tools: [{name: "Node.js", icon: SiNodedotjs}, {name: "PostgreSQL", icon: SiPostgresql}, {name: "Redis", icon: SiRedis}, {name: "Prisma", icon: SiPrisma}], reason: "Architected for high-throughput data processing and absolute reliability." },
  { id: "infrastructure", label: "INFRA", tools: [{name: "Vercel", icon: SiVercel}, {name: "AWS", icon: FaAws}, {name: "Docker", icon: SiDocker}, {name: "Cloudflare", icon: SiCloudflare}], reason: "Deployed on edge networks for global micro-second delivery." },
];

const projectTypes = [
  { id: "web_app", label: "Web Application", baseTimeline: "6-8 Weeks", basePrice: "$10k+" },
  { id: "ecommerce", label: "E-Commerce System", baseTimeline: "8-12 Weeks", basePrice: "$15k+" },
  { id: "marketing", label: "Marketing Platform", baseTimeline: "4-6 Weeks", basePrice: "$8k+" },
];

const featuresList = [
  { id: "auth", label: "User Authentication" },
  { id: "cms", label: "Custom CMS / Database" },
  { id: "payments", label: "Payment Gateway" },
  { id: "3d", label: "WebGL / Advanced Motion" },
];

export default function SoftwareEngineering() {
  // Hero Scroll Animation (The Spacer)
  const spacerRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"]
  });
  
  // The split calculation: starts at 0, completely opens by 0.7
  const splitTop = useTransform(heroScroll, [0, 0.7], ["0%", "-100%"]);
  const splitBottom = useTransform(heroScroll, [0, 0.7], ["0%", "100%"]);
  const monolithTextOpacity = useTransform(heroScroll, [0, 0.3], [1, 0]);
  const monolithTextScale = useTransform(heroScroll, [0, 0.5], [1, 1.1]);

  // Assembly Line State (Mobile Accordion)
  const [activeStep, setActiveStep] = useState(0);

  // Chat Section Parallax
  const chatRef = useRef(null);
  const { scrollYProgress: chatScroll } = useScroll({
    target: chatRef,
    offset: ["start end", "end start"]
  });
  const chatBgY = useTransform(chatScroll, [0, 1], ["-15%", "15%"]);
  const chatBgScale = useTransform(chatScroll, [0, 1], [1.1, 1]);

  // Arsenal State
  const [activeTech, setActiveTech] = useState(techCategories[0]);

  // Configurator State
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock fixed height on mount to prevent mobile address-bar jump
  const [fixedHeight, setFixedHeight] = useState("100vh");
  useEffect(() => {
      setFixedHeight(`${window.innerHeight}px`);
  }, []);

  // Spacer ref for accurate scroll tracking
  const spacerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: spacerRef,
      offset: ["start start", "end start"]
  });

  // Scroll animations for the Monolith Curtain
  const splitTop = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const splitBottom = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const monolithTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const monolithTextScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const toggleFeature = (id: string) => {
    playMechanicalClick();
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    playMechanicalClick();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#90243B] selection:text-white font-sans overflow-x-hidden min-h-screen">
      
      {/* GLOBAL NAVIGATION (Fixed) */}
      <div className="fixed top-10 left-5 sm:left-12 z-[100] flex justify-between w-[calc(100%-40px)] sm:w-[calc(100%-96px)] pointer-events-none">
          <Link href="/" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="pointer-events-auto font-mono text-[10px] tracking-widest uppercase hover:text-[#90243B] transition-colors flex items-center gap-2 group bg-black/80 backdrop-blur-md px-4 py-2 border border-[#1F1F1F]">
              <div className="w-1.5 h-1.5 bg-[#90243B] group-hover:scale-150 transition-transform"></div>
              Proximity Studio
          </Link>
          <Link href="/contact" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="pointer-events-auto font-mono text-[10px] tracking-widest uppercase hover:text-white hover:bg-[#90243B] transition-colors bg-white text-black px-6 py-2 border border-white">
              START PROJECT
          </Link>
      </div>

      {/* 1. HERO: THE MONOLITH CURTAIN (Fixed Overlay) */}
      <div className="fixed top-0 left-0 w-full z-[90] pointer-events-none" style={{ height: fixedHeight }}>
          
          {/* Top Half of Monolith */}
          <motion.div 
             style={{ y: splitTop }} 
             className="absolute top-0 left-0 w-full h-[50%] overflow-hidden border-b border-[#1F1F1F] will-change-transform z-10 bg-[#0A0A0A]"
          >
             {/* Desktop Image (Inline Style to bypass Tailwind Compiler & Cache Bugs) */}
             <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none opacity-80" style={{ backgroundImage: "url('/monolith-desktop-final.jpg')", backgroundSize: "100% 200%", backgroundPosition: "top center" }}></div>
             
             {/* Mobile Image (Inline Style) */}
             <div className="block sm:hidden absolute inset-0 z-0 pointer-events-none opacity-80" style={{ backgroundImage: "url('/monolith-mobile-final.jpg')", backgroundSize: "100% 200%", backgroundPosition: "top center" }}></div>
             
             <motion.h1 style={{ opacity: monolithTextOpacity, scale: monolithTextScale }} className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] text-[10vw] font-black uppercase text-white leading-none tracking-tighter whitespace-nowrap will-change-transform">
               DIGITAL MONOLITH
             </motion.h1>
             {/* Raw Structural Edge */}
             <div className="absolute z-10 bottom-0 left-0 w-full h-[1px] bg-[#90243B]"></div>
          </motion.div>

          {/* Bottom Half of Monolith */}
          <motion.div 
             style={{ y: splitBottom }} 
             className="absolute bottom-0 left-0 w-full h-[50%] overflow-hidden border-t border-[#1F1F1F] will-change-transform z-10 bg-[#0A0A0A]"
          >
             {/* Desktop Image (Inline Style to bypass Tailwind Compiler & Cache Bugs) */}
             <div className="hidden sm:block absolute inset-0 z-0 pointer-events-none opacity-80" style={{ backgroundImage: "url('/monolith-desktop-final.jpg')", backgroundSize: "100% 200%", backgroundPosition: "bottom center" }}></div>
             
             {/* Mobile Image (Inline Style) */}
             <div className="block sm:hidden absolute inset-0 z-0 pointer-events-none opacity-80" style={{ backgroundImage: "url('/monolith-mobile-final.jpg')", backgroundSize: "100% 200%", backgroundPosition: "bottom center" }}></div>

             {/* Raw Structural Edge */}
             <div className="absolute z-10 top-0 left-0 w-full h-[1px] bg-[#90243B]"></div>
             <motion.h1 style={{ opacity: monolithTextOpacity, scale: monolithTextScale }} className="absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] text-[10vw] font-black uppercase text-white leading-none tracking-tighter whitespace-nowrap will-change-transform">
               DIGITAL MONOLITH
             </motion.h1>
          </motion.div>

          {/* Scroll Indicator (Fixed outside doors so it doesn't drop off screen) */}
          <motion.div style={{ opacity: monolithTextOpacity }} className="absolute z-20 bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] flex flex-col items-center gap-4 text-white/50">
              <span>Scroll to Open</span>
              <div className="w-[1px] h-12 bg-[#90243B]"></div>
          </motion.div>
      </div>

      {/* SPACER (Absorbs the scroll to open the curtain) */}
      <div ref={spacerRef} className="w-full h-[120vh]"></div>

      {/* 2. BESPOKE DELIVERY: THE STICKY ASSEMBLY LINE */}
      <section className="relative w-full bg-[#0A0A0A] border-t-[1px] border-white/10">
         <div className="max-w-[1400px] mx-auto px-5 sm:px-12 py-24 sm:py-40">
             
             <div className="mb-20 sm:mb-32">
                 <div className="font-mono text-[10px] text-[#90243B] uppercase tracking-[0.2em] mb-4">
                     02 &mdash; Bespoke Delivery
                 </div>
                 <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                     STRUCTURAL<br/>INTEGRITY.
                 </h2>
             </div>

             {/* Desktop: Sticky Scrolling, Mobile: Accordion */}
             <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
                 
                 {/* Desktop Sticky Number */}
                 <div className="hidden lg:flex w-1/3 sticky top-40 h-[60vh] flex-col justify-start">
                     <AnimatePresence mode="wait">
                         <motion.div
                           key={activeStep}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.3 }}
                           className="text-[18rem] font-black text-white/10 leading-none tracking-tighter select-none"
                         >
                           {steps[activeStep].num}
                         </motion.div>
                     </AnimatePresence>
                 </div>

                 {/* The Steps Content */}
                 <div className="w-full lg:w-2/3 flex flex-col border-t border-white/10">
                     {steps.map((step, index) => (
                         <div 
                           key={step.num}
                           className="border-b border-white/10 py-8 sm:py-16 group"
                           onMouseEnter={() => {
                               if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                                   setActiveStep(index);
                                   playHoverTick();
                               }
                           }}
                         >
                             <div 
                               className="flex items-center justify-between cursor-pointer lg:cursor-default"
                               onClick={() => {
                                   if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                                       playMechanicalClick();
                                       setActiveStep(activeStep === index ? -1 : index);
                                   }
                               }}
                             >
                                 <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter group-hover:text-[#90243B] transition-colors duration-300">
                                     <span className="text-[#90243B] mr-4 lg:hidden">{step.num} &mdash;</span>
                                     {step.title}
                                 </h3>
                                 {/* Mobile Toggle Icon */}
                                 <div className="lg:hidden text-white/50 group-hover:text-white transition-colors">
                                     {activeStep === index ? <Minus size={24} /> : <Plus size={24} />}
                                 </div>
                             </div>
                             
                             {/* Content Panel */}
                             <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeStep === index ? 'max-h-[500px] opacity-100 mt-6 sm:mt-8' : 'max-h-0 opacity-0'}`}>
                                 <p className="text-lg sm:text-2xl font-medium text-white/70 max-w-2xl leading-relaxed">
                                     {step.desc}
                                 </p>
                                 <div className="w-full h-[1px] bg-white/10 mt-8 relative overflow-hidden hidden lg:block">
                                     <div className={`absolute top-0 left-0 h-full bg-[#90243B] transition-all duration-1000 ease-out ${activeStep === index ? 'w-full' : 'w-0'}`}></div>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>

             </div>
         </div>
      </section>

      {/* 2.5. LIVE CHAT BOX (Precision Tailoring) */}
      <section ref={chatRef} className="relative w-full py-32 sm:py-48 bg-[#0A0A0A] text-white overflow-hidden border-t border-[#1F1F1F]">
         
         {/* Extraordinary Background: Cinematic Brutalist Parallax */}
         <motion.div 
            style={{ y: chatBgY, scale: chatBgScale }}
            className="absolute inset-0 z-0 w-full h-[130%]"
         >
             <Image
                 src="/software-bg.jpg"
                 alt="Software Engineering Architecture"
                 fill
                 className="object-cover object-center opacity-50 grayscale mix-blend-luminosity"
                 priority
             />
             {/* Vignette Overlay for Text Legibility */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
         </motion.div>

         <div className="max-w-[1400px] mx-auto px-5 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
             
             {/* Left Column: Typography */}
             <div className="flex flex-col gap-6">
                 <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#90243B]">
                     02.5 &mdash; Precision Tailoring
                 </div>
                 <h2 className="text-[clamp(3rem,6vw,7rem)] font-black uppercase tracking-tighter leading-[0.85] text-white">
                     WE DELIVER THE PRODUCT <br/>
                     EXACTLY HOW <span className="text-[#90243B]">YOU</span> LIKE IT.
                 </h2>
                 <p className="font-mono text-xs sm:text-sm uppercase tracking-wider opacity-60 max-w-md mt-4 text-[#E5E5E5]">
                     No restrictive templates. No agency pushback. You define the exact vision, and we build it precisely to your specifications.
                 </p>
             </div>

             {/* Right Column: The Live Chat Box */}
             <div className="w-full flex justify-center lg:justify-end">
                 <div className="w-full max-w-md relative group">
                     
                     {/* Brutalist Solid Offset Shadow (Highlights the crack) */}
                     <div className="absolute inset-0 bg-[#90243B] translate-x-4 translate-y-4"></div>

                     {/* The Shattered Chat Panel */}
                     <div 
                        className="relative w-full bg-white p-6 sm:p-10 flex flex-col gap-8 z-10"
                        style={{
                           // A harsh, aggressive shattered polygon cut
                           clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 88% 68%, 100% 76%, 100% 100%, 10% 100%, 0% 90%)'
                        }}
                     >
                         
                         {/* Chat Header */}
                         <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 mb-2">
                             <div className="flex items-center gap-3">
                                 <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                                 <span className="font-mono text-[10px] uppercase text-[#0A0A0A] tracking-widest font-bold">Proximity Direct</span>
                             </div>
                             <span className="font-mono text-[10px] text-[#0A0A0A]/40 uppercase">Connected</span>
                         </div>

                         {/* Chat Sequence */}
                         
                         {/* Client Message 1 */}
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="self-start bg-[#F5F5F5] text-[#0A0A0A] p-4 max-w-[85%] border-l-4 border-[#0A0A0A] relative z-10"
                         >
                             <div className="font-mono text-[9px] text-[#0A0A0A]/40 mb-2 uppercase tracking-wider">Client &mdash; 09:41 AM</div>
                             <p className="text-sm font-bold leading-relaxed">The hero section looks great, but could we try a darker, more premium aesthetic?</p>
                         </motion.div>

                         {/* Proximity Message 1 */}
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: 1.4 }}
                            className="self-end bg-[#0A0A0A] text-white p-4 max-w-[85%] border-r-4 border-[#90243B] relative z-10"
                         >
                             <div className="font-mono text-[9px] text-white/50 mb-2 uppercase tracking-wider text-right">Proximity &mdash; 09:42 AM</div>
                             <p className="text-sm font-medium leading-relaxed">Absolutely. We have updated the background to pure black and increased the font weight. Check the staging link.</p>
                         </motion.div>

                         {/* Client Message 2 */}
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: 3.0 }}
                            className="self-start bg-[#F5F5F5] text-[#0A0A0A] p-4 max-w-[85%] border-l-4 border-[#0A0A0A] relative z-10"
                         >
                             <div className="font-mono text-[9px] text-[#0A0A0A]/40 mb-2 uppercase tracking-wider">Client &mdash; 09:45 AM</div>
                             <p className="text-sm font-bold leading-relaxed">Perfect. One more thing, can we add a smooth transition when scrolling down?</p>
                         </motion.div>
                         
                         {/* Proximity Message 2 */}
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: 4.4 }}
                            className="self-end bg-[#0A0A0A] text-white p-4 max-w-[85%] border-r-4 border-[#90243B] relative z-10"
                         >
                             <div className="font-mono text-[9px] text-white/50 mb-2 uppercase tracking-wider text-right">Proximity &mdash; 09:46 AM</div>
                             <p className="text-sm font-medium leading-relaxed">Just added a seamless curtain reveal effect. It is completely optimized for mobile as well. Let us know what you think.</p>
                         </motion.div>

                     </div>
                 </div>
             </div>
             
         </div>
      </section>



      {/* 3. TECHNOLOGIES USED (Extreme Color-Blocked Marquees) */}
      <section className="relative w-full border-t border-[#1F1F1F]">
         
         <div className="bg-[#0A0A0A] py-12 sm:py-16 px-5 sm:px-12 relative z-10 border-b border-[#1F1F1F]">
             <div className="max-w-[1400px] mx-auto">
                 <div className="font-mono text-[10px] text-[#90243B] uppercase tracking-[0.2em] mb-4">
                     03 &mdash; System Architecture
                 </div>
                 <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter leading-none text-white">
                   TECHNOLOGIES USED
                 </h2>
             </div>
         </div>

         {/* The Marquees (Extreme Color Blocking) */}
         <div className="flex flex-col relative w-full overflow-hidden">
             {techCategories.map((cat, i) => {
                 // Extreme Color Blocking Logic
                 let bgClass = "bg-[#0A0A0A]";
                 let textClass = "text-white/20 group-hover:text-white";
                 let hoverBorder = "group-hover:border-[#90243B]";
                 let labelColor = "text-[#90243B]";
                 let overlayBg = "bg-[#0A0A0A]/95";
                 let reasonText = "text-white/90";
                 
                 // Row 2: Pure White
                 if (i === 1) {
                     bgClass = "bg-white";
                     textClass = "text-[#0A0A0A]/20 group-hover:text-[#0A0A0A]";
                     hoverBorder = "group-hover:border-[#90243B]";
                     labelColor = "text-[#90243B]";
                     overlayBg = "bg-white/95";
                     reasonText = "text-[#0A0A0A]/90";
                 } 
                 // Row 3: Crimson Red
                 else if (i === 2) {
                     bgClass = "bg-[#90243B]";
                     textClass = "text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]";
                     hoverBorder = "group-hover:border-[#0A0A0A]";
                     labelColor = "text-white";
                     overlayBg = "bg-[#90243B]/95";
                     reasonText = "text-white";
                 }

                 return (
                 <div key={cat.id} className={`relative flex items-center group overflow-hidden cursor-crosshair py-5 sm:py-8 transition-colors duration-700 ${bgClass}`}>
                     
                     {/* The Infinite Scrolling Text */}
                     <motion.div
                         animate={{ x: i % 2 === 0 ? ["0%", "-25%"] : ["-25%", "0%"] }}
                         transition={{ ease: "linear", duration: 30 + (i * 5), repeat: Infinity }}
                         className={`flex w-max whitespace-nowrap items-center font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter leading-none transition-colors duration-500 ${textClass}`}
                     >
                         {/* Content repeated 4 times to ensure it covers ultra-wide screens */}
                         {[...Array(4)].map((_, idx) => (
                             <div key={idx} className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                                 <span className={labelColor}>{cat.label}</span>
                                 {cat.tools.map(tool => (
                                     <span key={`${tool.name}-${idx}`} className="flex items-center gap-3 sm:gap-4">
                                         <tool.icon className={`w-8 h-8 lg:w-10 lg:h-10 ${i === 2 ? 'text-[#0A0A0A]/50 group-hover:text-[#0A0A0A]' : 'opacity-50 group-hover:opacity-100'} transition-opacity`} strokeWidth={2.5} />
                                         {tool.name}
                                     </span>
                                 ))}
                                 <span className="opacity-20">&mdash;</span>
                             </div>
                         ))}
                     </motion.div>

                     {/* Hover Overlay Panel (Sleek Inline Structural Banner) */}
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center px-5 sm:px-12 z-20 border-y border-transparent backdrop-blur-md ${hoverBorder} ${overlayBg}`}>
                         <div className="max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-8">
                             <div className={`font-mono text-[10px] uppercase tracking-widest shrink-0 ${labelColor}`}>
                                 [ {cat.label} Specifications ]
                             </div>
                             <p className={`text-xs sm:text-sm font-bold leading-relaxed tracking-wide max-w-3xl sm:text-right ${reasonText}`}>
                                 {cat.reason}
                             </p>
                         </div>
                     </div>
                     
                 </div>
                 );
             })}
         </div>
      </section>

      {/* 4. ACCESS ARCHIVES (Portfolio CTA) */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] border-t border-[#1F1F1F] flex items-center justify-center overflow-hidden group bg-[#0A0A0A]">
          {/* Background Image Reveal */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none">
              <Image 
                  src="/portfolio_preview.jpg" 
                  alt="Portfolio Preview" 
                  fill 
                  className="object-cover object-center grayscale scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
          </div>
          
          {/* Massive Typographic Link */}
          <Link href="/portfolio" onClick={playMechanicalClick} className="relative z-10 text-center w-full block">
              <div className="font-mono text-[10px] sm:text-xs text-[#90243B] uppercase tracking-[0.5em] mb-4 sm:mb-8 transition-colors group-hover:text-white">
                  Execute Review Protocol
              </div>
              <h2 className="text-[12vw] sm:text-[10vw] font-black uppercase tracking-tighter leading-none text-white transition-all duration-700 mix-blend-difference group-hover:tracking-normal group-hover:scale-105">
                  ACCESS ARCHIVES
              </h2>
          </Link>
      </section>

      {/* 5. CONFIGURATOR (Submit Brief) */}
      <section className="relative w-full py-24 sm:py-40 bg-[#0A0A0A] overflow-hidden border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
             
             {/* Left: Configuration Form */}
             <div className="w-full lg:w-1/2">
                 <div className="font-mono text-[10px] text-[#90243B] mb-8 uppercase tracking-[0.2em]">
                    04 &mdash; Submit Brief
                 </div>
                 
                 <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tighter leading-[0.85] mb-16">
                   DEFINE THE <br/> <span className="text-[#90243B]">SCOPE.</span>
                 </h2>

                 {/* Project Type */}
                 <div className="mb-12">
                     <h3 className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mb-6">Select Architecture Type</h3>
                     <div className="flex flex-col gap-3">
                         {projectTypes.map(type => (
                             <button
                               key={type.id}
                               onClick={() => { playMechanicalClick(); setSelectedType(type); }}
                               onMouseEnter={playHoverTick}
                               className={`w-full text-left p-5 border flex justify-between items-center transition-all ${selectedType.id === type.id ? 'border-white bg-white text-black' : 'border-white/20 bg-transparent hover:border-white/50 text-white'}`}
                             >
                                 <span className="font-black uppercase tracking-widest text-sm sm:text-base">{type.label}</span>
                                 <span className={`font-mono text-[10px] ${selectedType.id === type.id ? 'text-black/60' : 'text-white/40'}`}>[ SELECT ]</span>
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* Features */}
                 <div className="mb-12">
                     <h3 className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mb-6">Select Features (Optional)</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {featuresList.map(feature => {
                             const isSelected = selectedFeatures.includes(feature.id);
                             return (
                                 <button
                                   key={feature.id}
                                   onClick={() => toggleFeature(feature.id)}
                                   onMouseEnter={playHoverTick}
                                   className={`p-4 border text-left flex items-center gap-4 transition-all ${isSelected ? 'border-[#90243B] bg-[#90243B]/10 text-white' : 'border-white/10 hover:border-white/30 text-white/70'}`}
                                 >
                                     <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#90243B] bg-[#90243B]' : 'border-white/30'}`}>
                                         {isSelected && <Check size={12} className="text-white" />}
                                     </div>
                                     <span className="font-mono text-[10px] uppercase tracking-widest">{feature.label}</span>
                                 </button>
                             );
                         })}
                     </div>
                 </div>
                 
                 {/* Email & Submit */}
                 <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10">
                     <input 
                       type="email" 
                       placeholder="ENTER YOUR EMAIL ADDRESS" 
                       className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm tracking-widest uppercase text-white outline-none focus:border-white transition-colors" 
                     />
                     <button 
                       onClick={handleSubmit} 
                       disabled={isSubmitted}
                       className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-xs hover:bg-[#90243B] hover:text-white transition-colors flex items-center justify-center gap-4 group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isSubmitted ? "PROCESSING..." : "SUBMIT REQUEST"}
                       {!isSubmitted && <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />}
                     </button>
                 </div>
             </div>

             {/* Right: The Editorial Receipt */}
             <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative min-h-[500px]" style={{ perspective: "1000px" }}>
                 <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div 
                            key="receipt"
                            exit={{ rotateX: 90, opacity: 0, y: -50 }}
                            style={{ transformOrigin: "top" }}
                            transition={{ duration: 0.4, ease: "easeIn" }}
                            className="w-full max-w-md bg-[#F4F4F4] text-[#0A0A0A] p-8 sm:p-12 shadow-2xl relative rotate-1"
                        >
                            {/* Receipt Header */}
                            <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6 text-center">
                                <div className="font-black text-2xl uppercase tracking-tighter mb-2">Proximity Studio</div>
                                <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">Project Scope Estimate</div>
                                <div className="font-mono text-[10px] mt-4 opacity-40">DATE: ACTIVE SESSION</div>
                            </div>
                            
                            {/* Receipt Body */}
                            <div className="font-mono text-xs uppercase tracking-widest flex flex-col gap-6 mb-12">
                                <div>
                                    <div className="opacity-50 mb-1">Architecture</div>
                                    <div className="flex justify-between font-bold border-b border-dashed border-[#0A0A0A]/20 pb-1">
                                        <span>{selectedType.label}</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="opacity-50 mb-1">Features</div>
                                    {selectedFeatures.length === 0 ? (
                                        <div className="opacity-50 italic">None Selected</div>
                                    ) : (
                                        selectedFeatures.map(fId => {
                                            const feature = featuresList.find(f => f.id === fId);
                                            return (
                                                <div key={fId} className="flex justify-between border-b border-dashed border-[#0A0A0A]/20 pb-1 mb-2">
                                                    <span>+ {feature?.label}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            
                            {/* Receipt Footer */}
                            <div className="border-t-2 border-[#0A0A0A] pt-6 flex flex-col gap-2">
                                <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest opacity-60">
                                    <span>Est. Timeline</span>
                                    <span>{selectedType.baseTimeline}</span>
                                </div>
                                <div className="flex justify-between items-end font-black uppercase mt-4">
                                    <span className="text-sm">Base Value</span>
                                    <span className="text-2xl">{selectedType.basePrice}</span>
                                </div>
                                <div className="text-[8px] font-mono uppercase text-center mt-8 opacity-40">
                                    Final scope pending audit.<br/>Thank you for your business.
                                </div>
                            </div>

                            {/* Jagged Bottom Edge (CSS trick) */}
                            <div className="absolute -bottom-2 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDUsMCAxMCwxMCIgZmlsbD0iI0Y0RjRGNCIvPjwvc3ZnPg==')] bg-repeat-x"></div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ rotateX: -90, opacity: 0, y: -50 }}
                            animate={{ rotateX: 0, opacity: 1, y: 0 }}
                            style={{ transformOrigin: "top" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full max-w-md flex flex-col items-center justify-center border border-white/20 bg-white/5 p-12 text-center relative z-10 backdrop-blur-md"
                        >
                            <div className="w-16 h-16 bg-[#90243B] mb-8 flex items-center justify-center">
                                <Check size={32} className="text-white" />
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">REQUEST<br/>SECURED.</h3>
                            <div className="w-full h-[1px] bg-[#90243B] mb-4"></div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 leading-relaxed">
                                OUR SYSTEMS ARE PROCESSING YOUR BRIEF.<br/>A REPRESENTATIVE WILL CONTACT YOU.
                            </p>
                        </motion.div>
                    )}
                 </AnimatePresence>
             </div>

        </div>
      </section>

    </div>
  );
}
