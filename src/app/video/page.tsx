"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Film, Scissors, MonitorPlay } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
  { title: "Commercial Editing", description: "High-end video editing for brand anthems, commercials, and promotional campaigns. We focus on pacing, storytelling, and viewer retention.", icon: Scissors },
  { title: "Color Grading", description: "Professional color correction and cinematic grading to ensure your footage looks stunning and aligns with your brand's visual identity.", icon: MonitorPlay },
  { title: "Social Media Shorts", description: "Fast-paced, highly engaging vertical videos optimized for TikTok, Instagram Reels, and YouTube Shorts.", icon: Film }
];

// --- Scrollytelling Components ---

// --- Scrollytelling Components ---

function IntroTitle({ scrollYProgress }: { scrollYProgress: any }) {
  const opacity = useTransform(scrollYProgress, (p: number) => {
    if (p < 0.02) return p * 50; 
    if (p < 0.08) return 1;
    if (p < 0.1) return 1 - (p - 0.08) * 50;
    return 0;
  });
  const scale = useTransform(scrollYProgress, (p: number) => 1 + p * 2);
  const display = useTransform(scrollYProgress, (p: number) => p > 0.1 ? "none" : "block");

  return (
    <motion.div style={{ opacity, scale, display }} className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none">
       <div className="relative">
           <h1 className="text-6xl sm:text-[10vw] font-black uppercase tracking-tighter text-white">The Edit.</h1>
           <div className="absolute -bottom-4 right-0 w-1/2 h-[2px] bg-[#90243B]"></div>
       </div>
    </motion.div>
  );
}

function SnappyCard({ title, subtitle, start, end, scrollYProgress }: { title: string, subtitle: string, start: number, end: number, scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, (p: number) => {
    if (p < start) {
       const dist = start - p;
       if (dist > 0.02) return "100vh";
       return `${(dist / 0.02) * 100}vh`;
    }
    if (p > end) {
       const dist = p - end;
       if (dist > 0.02) return "-100vh";
       return `${-(dist / 0.02) * 100}vh`;
    }
    return "0vh";
  });
  
  const scale = useTransform(scrollYProgress, (p: number) => {
     if (p >= start && p <= end) return 1 + ((p - start) / (end - start)) * 0.05;
     return 1;
  });

  return (
    <motion.div style={{ y, scale }} className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none z-20">
      <div 
        className="bg-[#050505] border border-[#1F1F1F] px-10 py-16 sm:px-24 flex flex-col items-start shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-md"
      >
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#1F1F1F] via-[#E5E5E5]/20 to-[#1F1F1F]"></div>
         <div className="w-8 h-[2px] bg-[#90243B] mb-8"></div>
         <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#888] tracking-widest">{start.toFixed(2)} — {end.toFixed(2)}</div>
         
         <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4 z-10 leading-none">{title}</h2>
         <p className="font-mono text-sm text-[#888] uppercase tracking-widest z-10">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function ImpactText({ text, isCrimson = false, start, end, scrollYProgress }: { text: string, isCrimson?: boolean, start: number, end: number, scrollYProgress: any }) {
  const opacity = useTransform(scrollYProgress, (p: number) => {
    if (p < start || p > end) return 0;
    const local = (p - start) / (end - start);
    if (local < 0.1) return local * 10;
    if (local > 0.9) return (1 - local) * 10;
    return 1;
  });
  
  const scale = useTransform(scrollYProgress, (p: number) => {
    if (p < start || p > end) return 0.5;
    const local = (p - start) / (end - start);
    return 0.8 + local * 1.5; 
  });

  return (
    <motion.div style={{ opacity, scale }} className={`absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none z-30 mix-blend-difference ${isCrimson ? 'text-[#90243B]' : 'text-white'}`}>
       <h1 className="text-6xl sm:text-[10vw] font-black uppercase tracking-tighter whitespace-nowrap">{text}</h1>
    </motion.div>
  );
}

function MontageImage({ src, triggerPoint, rotate, x, y, scrollYProgress, index }: { src: string, triggerPoint: number, rotate: number, x: number, y: number, scrollYProgress: any, index: number }) {
  const opacity = useTransform(scrollYProgress, (p: number) => p >= triggerPoint ? 1 : 0);
  
  const scale = useTransform(scrollYProgress, (p: number) => {
     if (p < triggerPoint) return 0.8;
     if (p > triggerPoint + 0.02) return 1;
     return 0.8 + ((p - triggerPoint) / 0.02) * 0.2; // Smooth pop
  });

  return (
    <motion.div 
      style={{ opacity, scale, rotate: `${rotate}deg`, x: `${x}vw`, y: `${y}vh`, zIndex: 40 + index }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[35vw] aspect-video border-[1px] border-[#1F1F1F] shadow-[0_20px_50px_rgba(0,0,0,0.8)] will-change-transform bg-[#050505]"
    >
       <Image src={src} fill alt="montage" className="object-cover opacity-90" sizes="(max-width: 768px) 70vw, 35vw" />
    </motion.div>
  );
}

export default function VideoEditingPage() {
  
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-sans selection:bg-[#90243B] selection:text-white pb-20">
      
      {/* Navigation */}
      <nav className="w-full p-6 sm:p-10 flex justify-between items-center fixed top-0 z-50 text-white mix-blend-difference pointer-events-none">
          <Link href="/" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="pointer-events-auto font-mono text-xs tracking-[0.2em] uppercase hover:text-[#90243B] transition-colors flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 bg-[#90243B] group-hover:scale-150 transition-transform"></div>
              Proximity
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-50">
              Video Editing
          </div>
      </nav>

      {/* Scrollytelling Hero (800vh for slower, smoother pacing) */}
      <section ref={containerRef} className="relative w-full h-[800vh] bg-[#050505]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center bg-[#050505] bg-[url('/brutalist-bg.jpg')] bg-cover bg-center bg-blend-multiply">
              
              {/* Background Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0"></div>

              {/* Intro Title */}
              <IntroTitle scrollYProgress={scrollYProgress} />

              {/* Act 1: How We Work */}
              <SnappyCard title="01 / Audit & Strategy" subtitle="Reviewing the Raw Footage" start={0.08} end={0.16} scrollYProgress={scrollYProgress} />
              <SnappyCard title="02 / Edit & Pacing" subtitle="Building the Narrative Cut" start={0.16} end={0.24} scrollYProgress={scrollYProgress} />
              <SnappyCard title="03 / Color & Sound" subtitle="Cinematic Polish & Foley" start={0.24} end={0.32} scrollYProgress={scrollYProgress} />

              {/* Act 2: The Tech Stack */}
              <ImpactText text="DAVINCI RESOLVE" start={0.35} end={0.45} scrollYProgress={scrollYProgress} />
              <ImpactText text="AFTER EFFECTS" start={0.45} end={0.55} scrollYProgress={scrollYProgress} />
              <ImpactText text="PREMIERE PRO" start={0.55} end={0.65} scrollYProgress={scrollYProgress} />
              
              {/* Act 2.5: The Impact */}
              <ImpactText text="100+ DELIVERIES" start={0.66} end={0.71} scrollYProgress={scrollYProgress} />
              <ImpactText text="FRAME PERFECT" isCrimson start={0.71} end={0.76} scrollYProgress={scrollYProgress} />

              {/* Act 3: The Montage */}
              {/* Using proper offset with absolute positioning in component */}
              <MontageImage src="/acc-video.jpg" triggerPoint={0.78} rotate={-2} x={0} y={0} index={1} scrollYProgress={scrollYProgress} />
              <MontageImage src="/acc-video-v4.jpg" triggerPoint={0.82} rotate={4} x={-5} y={-15} index={2} scrollYProgress={scrollYProgress} />
              <MontageImage src="/cap-video.jpg" triggerPoint={0.86} rotate={-4} x={5} y={20} index={3} scrollYProgress={scrollYProgress} />
              <MontageImage src="/cap-video-ui.jpg" triggerPoint={0.90} rotate={7} x={-20} y={0} index={4} scrollYProgress={scrollYProgress} />
              <MontageImage src="/portfolio_preview.jpg" triggerPoint={0.94} rotate={0} x={0} y={0} index={5} scrollYProgress={scrollYProgress} />

              {/* Crosshairs & Borders for framing */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 border-dashed z-0 pointer-events-none"></div>
              <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-[#90243B]/50 z-50 pointer-events-none"></div>
              <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-[#90243B]/50 z-50 pointer-events-none"></div>
              <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-[#90243B]/50 z-50 pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-[#90243B]/50 z-50 pointer-events-none"></div>
          </div>
      </section>

      {/* Services Section */}
      <section className="relative z-50 w-full px-6 sm:px-12 lg:px-24 py-24 lg:py-32 bg-[#050505] border-t border-[#1F1F1F]">
          <div className="font-mono text-xs text-[#90243B] uppercase tracking-widest mb-16 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#90243B]"></div>
              Our Capabilities
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
                      <div className="w-12 h-12 bg-[#1F1F1F] border border-[#333] flex items-center justify-center group-hover:bg-[#90243B] group-hover:border-[#90243B] transition-colors duration-500">
                          <service.icon size={20} className="text-white group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">{service.title}</h3>
                      <p className="text-white/60 font-medium leading-relaxed">
                          {service.description}
                      </p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Inquiry Form */}
      <section className="w-full px-6 sm:px-12 lg:px-24 py-20 lg:py-32 max-w-5xl mx-auto">
          <div className="border border-[#1F1F1F] bg-[#0A0A0A] p-8 sm:p-16 lg:p-24 flex flex-col gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                  <Image src="/vid_1_neon_1786886509536.jpg" alt="Texture" fill className="object-cover" />
              </div>

              <div className="relative z-10">
                  <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Start a Project</h2>
                  <p className="text-white/60 font-medium max-w-md">Tell us about your video project. Whether it's a single commercial or an ongoing retainer, we're ready to edit.</p>
              </div>

              <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#90243B] transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30"
                      />
                      <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#90243B] transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30"
                      />
                  </div>
                  <textarea 
                      placeholder="Project Details (What kind of video?)" 
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#90243B] transition-colors font-mono text-sm uppercase tracking-wider placeholder:text-white/30 resize-none"
                  ></textarea>

                  <button 
                      onClick={playMechanicalClick}
                      onMouseEnter={playHoverTick}
                      className="mt-8 bg-white text-black py-6 px-10 font-black uppercase tracking-[0.2em] text-sm hover:bg-[#90243B] hover:text-white transition-colors self-start flex items-center gap-4 group"
                  >
                      Submit Inquiry <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
              </form>
          </div>
      </section>

    </div>
  );
}

