"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Film, Scissors, MonitorPlay } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
    title: "Commercial Editing",
    description: "High-end video editing for brand anthems, commercials, and promotional campaigns. We focus on pacing, storytelling, and viewer retention.",
    icon: Scissors
  },
  {
    title: "Color Grading",
    description: "Professional color correction and cinematic grading to ensure your footage looks stunning and aligns with your brand's visual identity.",
    icon: MonitorPlay
  },
  {
    title: "Social Media Shorts",
    description: "Fast-paced, highly engaging vertical videos optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    icon: Film
  }
];

export default function VideoEditingPage() {
  
  // Ensure body scroll is active
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  // --- 2.5D Cinematic Parallax Logic ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });

  // Background layer (Slowest)
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.2]);

  // Midground layers (Medium speed)
  const mgY1 = useTransform(scrollYProgress, [0, 1], ["50vh", "-100vh"]);
  const mgY2 = useTransform(scrollYProgress, [0, 1], ["80vh", "-150vh"]);

  // Foreground layers (Fastest)
  const fgY1 = useTransform(scrollYProgress, [0, 1], ["100vh", "-250vh"]);
  
  // Text fading
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-20vh"]);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-sans selection:bg-[#90243B] selection:text-white pb-20">
      
      {/* Navigation Bar */}
      <nav className="w-full p-6 sm:p-10 flex justify-between items-center fixed top-0 z-50 text-white mix-blend-difference pointer-events-none">
          <Link href="/" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="pointer-events-auto font-mono text-xs tracking-[0.2em] uppercase hover:text-[#90243B] transition-colors flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 bg-[#90243B] group-hover:scale-150 transition-transform"></div>
              Proximity
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-50">
              Video Editing
          </div>
      </nav>

      {/* 2.5D Cinematic Parallax Hero */}
      <section ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">
              
              {/* Background Layer (Slow Parallax + Scale) */}
              <motion.div 
                 style={{ scale: bgScale, opacity: bgOpacity }} 
                 className="absolute inset-0 w-full h-full z-0"
              >
                  <Image 
                      src="/vid_3_nature_1786886535947.jpg" 
                      alt="Nature Drone Shot" 
                      fill 
                      className="object-cover"
                      priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
              </motion.div>

              {/* Hero Text */}
              <motion.div 
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-10 text-center pointer-events-none drop-shadow-2xl"
              >
                  <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                      Video <br/> Editing.
                  </h1>
                  <p className="font-mono tracking-[0.3em] uppercase text-xs opacity-70">Scroll to Explore</p>
              </motion.div>

              {/* Midground Layer 1 */}
              <motion.div 
                 style={{ y: mgY1 }} 
                 className="absolute z-20 left-[-5vw] w-[60vw] sm:w-[40vw] aspect-video shadow-2xl border border-white/10"
              >
                  <Image src="/vid_4_studio_1786886546762.jpg" alt="Film Studio" fill className="object-cover" />
              </motion.div>

              {/* Midground Layer 2 */}
              <motion.div 
                 style={{ y: mgY2 }} 
                 className="absolute z-20 right-[-10vw] w-[70vw] sm:w-[50vw] aspect-video shadow-2xl border border-white/10"
              >
                  <Image src="/vid_2_suite_1786886522419.jpg" alt="Color Grading Suite" fill className="object-cover" />
              </motion.div>

              {/* Foreground Layer (Fast Parallax) */}
              <motion.div 
                 style={{ y: fgY1 }} 
                 className="absolute z-30 bottom-[-20vh] right-[10vw] w-[80vw] sm:w-[60vw] aspect-[21/9] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/20"
              >
                  <Image src="/vid_1_neon_1786886509536.jpg" alt="Neon Cyberpunk" fill className="object-cover" />
              </motion.div>

              <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent z-40"></div>

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
