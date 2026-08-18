"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import { submitInquiry } from "../../utils/submitInquiry";

// Disciplines with Unsplash images
const disciplines = [
 { 
 id: '01', 
 title: 'ORGANIZE MEDIA', 
 image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000&auto=format&fit=crop', 
 text: 'The foundation of every great edit. We meticulously ingest, log, and organize all raw footage, audio, and assets to ensure a seamless and highly efficient post-production workflow.' 
 },
 { 
 id: '02', 
 title: 'BUILD ROUGH CUT', 
 image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop', 
 text: 'Assembling the narrative spine. We create an initial sequence that establishes the core storyline, pacing, and emotional arc before refining the granular details.' 
 },
 { 
 id: '03', 
 title: 'TRIM & CUT', 
 image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2000&auto=format&fit=crop', 
 text: 'Surgical precision. We refine the rough cut, eliminating excess frames and tightening the pacing to ensure maximum impact and a flawless, engaging rhythm.' 
 },
 { 
 id: '04', 
 title: 'VFX & SFX', 
 image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=2000&auto=format&fit=crop', 
 text: 'Elevating the experience. We seamlessly integrate visual effects, motion graphics, and immersive sound design to add depth, realism, and cinematic polish.' 
 },
 { 
 id: '05', 
 title: 'COLOR GRADING', 
 image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop', 
 text: 'Setting the mood. Our colorists balance exposure, match shots, and apply bespoke color grades to establish the exact visual atmosphere required for the project.' 
 },
 { 
 id: '06', 
 title: 'EXPORT & DELIVERY', 
 image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop', 
 text: 'The final render. We master the project to the highest technical specifications, delivering optimized files ready for broadcast, cinema, or social media distribution.' 
 }
];

export default function EditorialVideoPage() {
 const { scrollY } = useScroll();
 
 // Horizontal Scroll Rig
 const targetRef = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: targetRef,
 offset: ["start start", "end end"]
 });
 
 // Calculate the total horizontal translation based on 6 cards. 
 // -85% is a good rough estimate to stop at the last card.
 const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
 
 // 1. Typographic Liquid Fill logic
 // Maps scroll position (0 to 800px) to clip-path inset percentage (100% to 0%)
 const clipPathInset = useTransform(scrollY, [0, 800], [100, 0]);
 const fillClipPath = useTransform(clipPathInset, (val) => `inset(${val}% 0 0 0)`);

 useEffect(() => {
 document.body.style.overflow = 'auto';
 }, []);

 return (
 <div className="w-full min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#90243B] selection:text-white">


 {/* Hero Section: The Monolith Matrix */}
 <section id="discipline" className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden border-b border-[#1F1F1F]">
 
 {/* Structural Background Geometry (Zero Glows) */}
 <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
 {/* Cinematic Background Image */}
 <Image 
 src="/images (2).jpeg"
 alt="Cinematic Background"
 fill
 priority
 className="object-cover opacity-15 grayscale" 
 />
 
 {/* Massive Solid Crimson Circle Intersecting Top Right */}
 <div className="absolute -top-[20vw] -right-[10vw] w-[50vw] h-[50vw] bg-[#90243B] rounded-full opacity-60"></div>
 
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
 <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start mt-12 relative z-10 ">
 <Link href="#section-01" className="group flex items-center gap-4 pb-2 border-b-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] pr-4 border-white text-white">
 <span>View Steps</span>
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
 Scroll to explore our process
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
 <section id="philosophy" className="relative w-full bg-[#0A0A0A] z-10 py-32 lg:py-48 px-6 sm:px-12 lg:px-24 flex justify-center items-center border-b border-[#1F1F1F] overflow-hidden">
 <Image 
 src="/images (3).jpeg"
 alt="Abstract Background"
 fill
 className="object-cover opacity-20 pointer-events-none" 
 />
 
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
 Every piece of media we produce is built on the client's exact vision. We take each step into careful consideration until we <span className="font-black">perfect</span> the final product.
 </motion.h2>
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="flex flex-col sm:flex-row gap-6 mt-4 relative z-20"
 >
 <Link href="#section-01" className="group bg-white text-black hover:bg-[#90243B] hover:text-white px-8 py-4 flex items-center justify-between gap-8 transition-colors duration-500 w-fit">
 <span className="font-black uppercase tracking-[0.2em] text-[10px]">View Steps</span>
 <ArrowDown size={14} className="group-hover:translate-x-2 transition-transform duration-500 -rotate-90" />
 </Link>
 <Link href="#contact" className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 flex items-center justify-between gap-8 transition-colors duration-500 w-fit">
 <span className="font-black uppercase tracking-[0.2em] text-[10px]">Start a Project</span>
 <ArrowDown size={14} className="group-hover:translate-x-2 transition-transform duration-500 -rotate-90" />
 </Link>
 </motion.div>
 </div>
 </section>

 {/* Horizontal Scroll Section */}
 <section id="process" ref={targetRef} className="relative w-full h-[400vh] bg-[#0A0A0A] z-10 border-t border-[#1F1F1F]">
 
 {/* The Sticky Viewport */}
 <div className="sticky top-0 h-screen flex items-center overflow-hidden z-10">
 
 {/* Background Image Layer inside the sticky track */}
 <div className="absolute inset-0 z-0 pointer-events-none">
 <Image 
 src="/images (4).jpeg" 
 alt="Cinematic Abstract Waves" 
 fill 
 className="object-cover opacity-15 grayscale" 
 />
 </div>
 
 {/* Horizontal Scrolling Track */}
 <motion.div style={{ x, willChange: 'transform' }} className="flex h-full items-center px-6 sm:px-12 lg:pl-[10vw] pr-[50vw]">
 {disciplines.map((d) => (
 <CarouselCard 
 key={d.id} 
 data={d} 
 />
 ))}
 </motion.div>
 </div>
 </section>

 {/* Split Section: Tools & Portfolio */}
 <section className="w-full flex flex-col lg:flex-row border-t border-[#1F1F1F] bg-[#0A0A0A] relative z-20">
 
 {/* Left Column: The Tools */}
 <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#1F1F1F] flex flex-col justify-center bg-white relative overflow-hidden">
 


 <div className="font-mono text-black/50 text-[10px] tracking-widest uppercase mb-12 flex items-center gap-4 relative z-10">
 <div className="w-8 h-[1px] bg-[#90243B]"></div>
 Tools
 </div>
 
 <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black mb-16 leading-none relative z-10">
 Engineered with <br/> Industry Standards
 </h2>

 <div className="flex flex-col gap-6 relative z-10">
 {['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve Studio'].map((tool, i) => (
 <div key={i} className="group flex items-center gap-6 cursor-crosshair border-b border-black/10 pb-4 hover:border-[#90243B] transition-colors duration-500">
 <span className="font-mono text-[10px] text-[#90243B]">0{i + 1}</span>
 <span className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors duration-500">{tool}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Right Column: View Portfolio CTA */}
 <Link href="/portfolio" className="group w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto overflow-hidden bg-[#111] cursor-crosshair flex flex-col items-center justify-center p-12 lg:p-24">
 
 {/* Cinematic Background Image */}
 <Image 
 src="/video_portfolio_bg.jpg" 
 alt="Portfolio Preview" 
 fill 
 quality={100}
 unoptimized
 sizes="(max-width: 1024px) 100vw, 50vw"
 className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 ease-out" 
 />
 

 
 {/* Foreground CTA Text */}
 <div className="relative z-10 flex flex-col items-center gap-6 text-center">
 <span className="font-mono text-[10px] tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-500">
 Discover Our Work
 </span>
 <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
 View<br/>Portfolio
 </h2>
 
 {/* Animated Arrow */}
 <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mt-4 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110">
 <ArrowDown size={16} className="-rotate-90 group-hover:translate-x-1 transition-transform duration-500" />
 </div>
 </div>
 </Link>
 </section>

  {/* Contact Section: Project Inquiry */}
  <section id="contact" className="w-full bg-[#0A0A0A] text-white px-5 sm:px-12 py-20 lg:py-32 border-t border-[#1F1F1F] relative z-10 overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
            src="/video_form_bg.jpg" 
            alt="Abstract Geometric Background"
            fill
            quality={100}
            className="object-cover opacity-80 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-[#0A0A0A]"></div>
    </div>
    
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 relative z-10">
       {/* Left Side: Typography */}
       <div className="w-full lg:w-5/12 flex flex-col justify-between">
           <div>
               <div className="font-mono text-[9px] sm:text-[10px] text-[#90243B] uppercase tracking-[0.2em] mb-8">
                   [ Project Inquiry ]
               </div>
               <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                   START A <br /> PROJECT.
               </h2>
               <p className="font-sans font-medium text-sm sm:text-base text-white/60 max-w-sm leading-relaxed mt-6">
                   Provide a link to a video reference that matches your visual direction, along with your project brief. We will review your requirements and get back to you with next steps.
               </p>
           </div>
           
           <div className="mt-16 lg:mt-24">
               <a href="mailto:hello@proximity.agency" className="text-2xl font-black tracking-tighter uppercase border-b-2 border-white/20 pb-1 w-fit hover:border-white transition-colors">
                   hello@proximity.agency
               </a>
               <div className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.2em] mt-6 flex flex-col gap-2">
                   <span>Operating HQ London</span>
                   <span>Worldwide Remote Available</span>
               </div>
           </div>
       </div>

       {/* Right Side: Brutalist Configurator */}
       <div className="w-full lg:w-7/12 flex flex-col gap-6 lg:pl-12">
           <VideoConfiguratorForm />
       </div>
    </div>
  </section>
 
 {/* Minimal Footer */}
 <footer className="w-full border-t border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-12 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-white/50 relative z-10">
 <span>PROXIMITY_V2 // 2026</span>
 <div className="flex items-center gap-8">
 <a href="#" className="hover:text-white transition-colors">START A PROJECT</a>
 <a href="#top" className="hover:text-white transition-colors">BACK TO TOP</a>
 </div>
 </footer>

 </div>
 );
}

// Subcomponent for the horizontal cards
function CarouselCard({ data }: { data: any }) {
 return (
 <div id={`section-${data.id}`} className="w-[85vw] lg:w-[45vw] shrink-0 flex flex-col gap-8 justify-center relative group border-l border-[#1F1F1F] pl-8 lg:pl-16 h-[50vh] pr-8 lg:pr-16 bg-black/80 lg:bg-black/40 lg: overflow-hidden hover:border-[#90243B]/50 transition-colors duration-500">
 
 {/* Abstract Brutalist Geometry (Hidden on Mobile for Performance) */}
 <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-[#90243B]/30 opacity-20 lg:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden lg:block"></div>
 
 {/* Proximity Logo replacing the box */}
 <div className="absolute bottom-8 right-8 w-12 h-12 lg:w-16 lg:h-16 opacity-30 pointer-events-none ">
 <Image src="/Logo_crimson.png" alt="Proximity Mark" fill className="object-contain" />
 </div>
 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 lg:group-hover:bg-[#90243B]/20 transition-colors duration-500 pointer-events-none hidden lg:block"></div>
 <div className="absolute left-0 top-0 w-1 h-0 bg-[#90243B] lg:group-hover:h-full transition-all duration-700 ease-out hidden lg:block"></div>

 <div className="font-mono text-white text-[10px] tracking-widest uppercase text-[#90243B] relative z-10">
 STEP {data.id}
 </div>
 
 <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-white">
 {data.title}
 </h2>
 
 <p className="text-[#A0A0A0] leading-relaxed text-sm font-medium max-w-md mt-4">
 {data.text}
 </p>
 </div>
 );
}

function VideoConfiguratorForm() {
    const [projectType, setProjectType] = useState<string | null>(null);
    const [footageStatus, setFootageStatus] = useState<string | null>(null);
    
    // Text Inputs State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [refLink, setRefLink] = useState('');
    const [brief, setBrief] = useState('');
    
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async () => {
        if (!name || !email) return;
        setFormStatus("submitting");
        
        try {
            await submitInquiry({ 
                name, 
                email, 
                details: `Ref Link: ${refLink}\nBrief: ${brief}\nFootage: ${footageStatus || 'Not selected'}`,
                service: `Video Editing: ${projectType || 'Not selected'}` 
            });
            setFormStatus("success");
            setName(""); setEmail(""); setRefLink(""); setBrief(""); setProjectType(null); setFootageStatus(null);
            setTimeout(() => setFormStatus("idle"), 3000);
        } catch (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 3000);
        }
    };

    const projectTypes = [
        {
            title: 'Commercial & Promotional',
            desc: 'Cutting short, high-impact advertisements or product promos designed to capture attention quickly and drive marketing goals.'
        },
        {
            title: 'Corporate & Event',
            desc: 'Producing internal business communications, training modules, conference highlights, or live event recordings.'
        },
        {
            title: 'Music Videos',
            desc: 'Synchronizing visual cuts tightly with music beats, rhythms, and artistic or performance-based themes.'
        },
        {
            title: 'Social Media & Online',
            desc: 'Creating fast-paced content for YouTube, TikTok, or Reels relying on sound effects and high retention tactics.'
        }
    ];
    const footageStatuses = ['We will provide the raw assets', 'Proximity will source the assets', 'Hybrid (Mix of both)'];

    return (
        <div className="w-full lg:pl-12 relative min-h-[500px]">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full flex flex-col gap-10"
                    >
                        {/* Standard Inputs */}
            <div className="flex flex-col gap-6">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" placeholder="01 NAME / BRAND" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" placeholder="02 EMAIL ADDRESS" />
            </div>

            {/* Configurator Toggles */}
            <div className="flex flex-col gap-10 mt-4">
                {/* Project Type */}
                <div>
                    <div className="font-mono text-[10px] text-[#90243B] uppercase tracking-widest mb-4">03 PROJECT TYPE</div>
                    <div className="flex flex-col gap-3">
                        {projectTypes.map(type => (
                            <button 
                                key={type.title} 
                                onClick={() => setProjectType(type.title)}
                                className={`p-5 text-left border transition-colors flex flex-col gap-2 group ${projectType === type.title ? 'bg-[#90243B] border-[#90243B] text-white' : 'border-white/20 hover:border-white bg-black/50'}`}
                            >
                                <span className={`text-xs font-bold uppercase tracking-widest ${projectType === type.title ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{type.title}</span>
                                <span className={`font-sans text-xs leading-relaxed ${projectType === type.title ? 'text-white/90' : 'text-white/40 group-hover:text-white/60'}`}>{type.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footage Status */}
                <div>
                    <div className="font-mono text-[10px] text-[#90243B] uppercase tracking-widest mb-4">04 RAW FOOTAGE STATUS</div>
                    <div className="flex flex-col gap-3">
                        {footageStatuses.map(status => (
                            <button 
                                key={status} 
                                onClick={() => setFootageStatus(status)}
                                className={`py-4 px-4 text-xs font-bold uppercase tracking-widest border transition-colors text-left ${footageStatus === status ? 'bg-white border-white text-black' : 'border-white/20 text-white/60 hover:border-white hover:text-white bg-black/50'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Final Inputs */}
            <div className="flex flex-col gap-6 mt-4">
                <input type="url" value={refLink} onChange={(e) => setRefLink(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none" placeholder="05 REFERENCE VIDEO LINK (URL)" />
                <textarea value={brief} onChange={(e) => setBrief(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-sm sm:text-lg py-3 outline-none focus:border-[#90243B] transition-colors font-black uppercase tracking-[0.1em] text-white placeholder:text-white/40 rounded-none resize-none min-h-[80px]" placeholder="06 PROJECT BRIEF & TIMELINE"></textarea>
            </div>

            <button 
                onClick={handleSubmit}
                disabled={formStatus === "submitting" || formStatus === "success"}
                className="w-full bg-white text-black py-6 sm:py-8 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#90243B] hover:text-white transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {formStatus === "idle" && "[ SUBMIT REQUEST ]"}
                {formStatus === "submitting" && "[ TRANSMITTING... ]"}
                {formStatus === "success" && "[ TRANSMISSION SUCCESS ]"}
                {formStatus === "error" && "[ TRANSMISSION FAILED ]"}
            </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, rotateX: 90 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        exit={{ opacity: 0, rotateX: -90 }}
                        transition={{ duration: 0.6, ease: "backOut" }}
                        className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-white border border-[#1F1F1F] text-[#0A0A0A] p-12 text-center"
                    >
                        <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center mb-6">
                            <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Request Received</h3>
                        <p className="font-mono text-xs text-black/60 uppercase tracking-widest max-w-sm mx-auto">
                            Our team is reviewing your project parameters. You will receive an encrypted transmission shortly.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
