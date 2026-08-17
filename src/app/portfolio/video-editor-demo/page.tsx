"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Camera, LayoutDashboard, Settings2, Scissors, AudioWaveform } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Audio Fallbacks
const playMechanicalClick = () => {
  if (typeof window !== 'undefined') {
    import('../../../utils/audio').then(m => m.playMechanicalClick?.()).catch(e => console.log(e));
  }
};

const playHoverTick = () => {
  if (typeof window !== 'undefined') {
    import('../../../utils/audio').then(m => m.playHoverTick?.()).catch(e => console.log(e));
  }
};

export default function VideoTerminal() {
  const [activeFrame, setActiveFrame] = useState(0); // 0 to 100
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Scrubbing Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percentage = Math.round((x / rect.width) * 100);
      setActiveFrame(percentage);
      if (percentage % 10 === 0) playHoverTick(); // Haptic feedback on major ticks
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Determine active phase based on frame
  let phase = "PRE-PRODUCTION";
  let content = "Strategy & Planning. Mapping out the creative vision and core message.";
  let Icon = LayoutDashboard;
  
  // Image Filter States
  let filterStyle = "grayscale(100%) blur(10px) contrast(50%)"; // Base: Pre-production
  let scale = 1;

  if (activeFrame > 25) { 
      phase = "PRODUCTION"; 
      content = "Filming & Direction. Capturing high-quality footage on set."; 
      Icon = Camera; 
      filterStyle = "grayscale(50%) blur(2px) contrast(80%)"; // Log footage
      scale = 1.05;
  }
  if (activeFrame > 50) { 
      phase = "POST-PRODUCTION"; 
      content = "Editing & Color. Assembling the story and crafting the visual aesthetic."; 
      Icon = Scissors; 
      filterStyle = "grayscale(0%) blur(0px) contrast(120%) saturate(120%)"; // Graded
      scale = 1.1;
  }
  if (activeFrame > 75) { 
      phase = "AUDIO MASTERING"; 
      content = "Sound Design. Polishing the audio mix for maximum impact."; 
      Icon = AudioWaveform; 
      filterStyle = "grayscale(0%) blur(0px) contrast(150%) saturate(100%) sepia(20%) hue-rotate(-10deg)"; // Audio focus (slight stylistic shift)
      scale = 1.15;
  }

  // Fake Timecode Generation
  const [timecode, setTimecode] = useState("00:00:00:00");
  useEffect(() => {
      const h = "01";
      const m = Math.floor(activeFrame / 2).toString().padStart(2, '0');
      const s = Math.floor((activeFrame * 1.5) % 60).toString().padStart(2, '0');
      const f = Math.floor(Math.random() * 24).toString().padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
  }, [activeFrame]);

  return (
    <div className="w-screen h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans selection:bg-[#90243B] selection:text-white relative">
      
      {/* Background Image baseplate */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <Image src="/software-bg.jpg" alt="Darkroom Background" fill className="object-cover" />
      </div>

      {/* 1. TOP BAR (NLE Menu) */}
      <div className="h-10 border-b border-[#1F1F1F] bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-between px-4 text-[10px] font-mono tracking-widest uppercase text-white/50 z-50 shrink-0">
          <div className="flex items-center gap-6">
              <Link href="/" onClick={playMechanicalClick} onMouseEnter={playHoverTick} className="text-[#90243B] hover:text-white flex items-center gap-2 pointer-events-auto">
                 <div className="w-1.5 h-1.5 bg-[#90243B] rounded-full"></div> PROXIMITY_NLE
              </Link>
              <span className="hidden sm:inline hover:text-white cursor-pointer" onClick={playMechanicalClick}>FILE</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer" onClick={playMechanicalClick}>EDIT</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer" onClick={playMechanicalClick}>WORKSPACE</span>
          </div>
          <div className="flex items-center gap-4">
              <span className="text-white/30 hidden sm:inline">RESOLUTION: 8K RAW</span>
              <span className="text-white/30 hidden sm:inline">FPS: 24.00</span>
              <div className="bg-[#1A1A1A] border border-[#333] px-2 py-1 text-[#90243B] min-w-[80px] text-center">
                  {timecode}
              </div>
          </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 gap-2 z-10">
          
          {/* Left Panel: Asset Browser / Phase Data */}
          <div className="hidden lg:flex w-1/4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#1F1F1F] flex-col overflow-hidden">
              <div className="p-2 border-b border-[#1F1F1F] text-[9px] font-mono tracking-widest uppercase text-white/40 flex items-center gap-2 bg-[#111]">
                 <LayoutDashboard size={10} /> PHASE_INSPECTOR
              </div>
              <div className="p-6 flex flex-col gap-6">
                  <div className="w-12 h-12 border border-[#333] flex items-center justify-center bg-[#111]">
                      <Icon size={20} className="text-[#90243B]" />
                  </div>
                  <div>
                      <div className="text-[10px] font-mono text-[#90243B] tracking-widest mb-2">ACTIVE PHASE</div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">{phase}</h2>
                      <p className="text-sm font-mono text-white/50 leading-relaxed uppercase">{content}</p>
                  </div>

                  <div className="border-t border-[#1F1F1F] mt-4 pt-4">
                      <div className="text-[10px] font-mono text-white/40 tracking-widest mb-3">CURRENT_STATUS</div>
                      {activeFrame <= 25 && <div className="text-xs font-mono text-white/80">&gt; Finalizing storyboards and shot list.</div>}
                      {activeFrame > 25 && activeFrame <= 50 && <div className="text-xs font-mono text-white/80">&gt; Camera and lighting setup complete.</div>}
                      {activeFrame > 50 && activeFrame <= 75 && <div className="text-xs font-mono text-white/80">&gt; Refining color grade and visual flow.</div>}
                      {activeFrame > 75 && <div className="text-xs font-mono text-white/80">&gt; Audio mix optimized for delivery.</div>}
                  </div>
              </div>
          </div>

          {/* Center Panel: The Viewport */}
          <div className="flex-1 bg-[#050505]/90 backdrop-blur-md border border-[#1F1F1F] relative flex flex-col items-center justify-center overflow-hidden">
               {/* Video Frame Simulation */}
               <div className="absolute inset-4 bg-[#000] border border-[#222] overflow-hidden flex items-center justify-center group">
                   
                   {/* Interactive Cinematic Still */}
                   <div className="absolute inset-0 transition-all duration-300 pointer-events-none" style={{ filter: filterStyle, transform: `scale(${scale})` }}>
                       <Image 
                          src="/motion.jpg"
                          alt="Cinematic Footage Preview"
                          fill
                          className="object-cover"
                       />
                   </div>

                   {/* Audio Waveform Overlay (only active in final phase) */}
                   {activeFrame > 75 && (
                       <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#90243B]/40 to-transparent flex items-end justify-center pb-8 opacity-80 mix-blend-screen pointer-events-none">
                           <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjIwIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjciLz48L3N2Zz4=')] bg-repeat-x bg-bottom" style={{ backgroundSize: '8px 100%' }}></div>
                       </div>
                   )}

                   {/* Grid Marks */}
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 pointer-events-none mix-blend-difference"></div>
                   <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 pointer-events-none mix-blend-difference"></div>
                   <div className="w-[80%] h-[80%] border border-white/10 rounded-full absolute pointer-events-none flex items-center justify-center mix-blend-difference">
                       <div className="w-[60%] h-[60%] border border-white/10 rounded-full"></div>
                   </div>

                   {/* Dynamic Content Display (Fades out when actively scrubbing footage) */}
                   <motion.div 
                     key={phase}
                     initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                     animate={{ scale: 1, opacity: isDragging ? 0 : 1, filter: "blur(0px)" }}
                     className="relative z-10 flex flex-col items-center text-center mix-blend-difference"
                   >
                       <h1 className="text-[8vw] sm:text-[6vw] font-black uppercase tracking-tighter leading-none">{phase}</h1>
                       <div className="font-mono text-xs sm:text-sm mt-4 text-[#90243B] tracking-[0.5em]">{activeFrame.toString().padStart(3, '0')} / 100 FRAME</div>
                   </motion.div>

                   {/* Safe Area Overlays */}
                   <div className="absolute top-[10%] left-[10%] w-4 h-4 border-t-2 border-l-2 border-white/30 mix-blend-difference"></div>
                   <div className="absolute top-[10%] right-[10%] w-4 h-4 border-t-2 border-r-2 border-white/30 mix-blend-difference"></div>
                   <div className="absolute bottom-[10%] left-[10%] w-4 h-4 border-b-2 border-l-2 border-white/30 mix-blend-difference"></div>
                   <div className="absolute bottom-[10%] right-[10%] w-4 h-4 border-b-2 border-r-2 border-white/30 mix-blend-difference"></div>

               </div>
          </div>

          {/* Right Panel: Render Settings (Configurator) */}
          <div className="w-full lg:w-1/4 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#1F1F1F] flex flex-col shrink-0 h-1/2 lg:h-auto overflow-y-auto">
              <div className="p-2 border-b border-[#1F1F1F] text-[9px] font-mono tracking-widest uppercase text-white/40 flex items-center gap-2 bg-[#111] sticky top-0 z-10">
                 <Settings2 size={10} /> PROJECT_DETAILS
              </div>
              
              {!isSubmitted ? (
                  <div className="p-5 flex flex-col gap-6">
                      
                      {/* Format Selection */}
                      <div>
                          <div className="text-[9px] font-mono text-white/40 mb-2 uppercase">PROJECT SCOPE</div>
                          <select className="w-full bg-[#111] border border-[#333] text-xs font-mono text-white p-2 outline-none focus:border-[#90243B]">
                              <option>Social Media Campaign</option>
                              <option>Brand Anthem Video</option>
                              <option>Commercial / Broadcast</option>
                          </select>
                      </div>

                      {/* Toggles */}
                      <div>
                          <div className="text-[9px] font-mono text-white/40 mb-2 uppercase">POST_PROCESSING</div>
                          <div className="flex flex-col gap-2">
                              <label className="flex items-center gap-3 cursor-pointer group" onClick={playMechanicalClick}>
                                  <input type="checkbox" className="hidden peer" />
                                  <div className="w-4 h-4 border border-[#333] bg-[#111] peer-checked:bg-[#90243B] peer-checked:border-[#90243B] flex items-center justify-center">
                                     <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                                  </div>
                                  <span className="text-[10px] font-mono uppercase text-white/60 group-hover:text-white transition-colors">Theatrical Color Grade</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group" onClick={playMechanicalClick}>
                                  <input type="checkbox" className="hidden peer" />
                                  <div className="w-4 h-4 border border-[#333] bg-[#111] peer-checked:bg-[#90243B] peer-checked:border-[#90243B] flex items-center justify-center">
                                     <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                                  </div>
                                  <span className="text-[10px] font-mono uppercase text-white/60 group-hover:text-white transition-colors">Original Score & Foley</span>
                              </label>
                          </div>
                      </div>

                      {/* Destination */}
                      <div>
                          <div className="text-[9px] font-mono text-white/40 mb-2 uppercase">CONTACT EMAIL</div>
                          <input type="email" placeholder="YOUR EMAIL ADDRESS" className="w-full bg-[#111] border border-[#333] text-xs font-mono text-white p-2 outline-none focus:border-[#90243B]" />
                      </div>

                      {/* Render Button */}
                      <div className="mt-auto pt-4 border-t border-[#1F1F1F]">
                          <button 
                            onClick={() => { playMechanicalClick(); setIsSubmitted(true); }}
                            className="w-full bg-[#E5E5E5] text-[#0A0A0A] py-3 text-[10px] font-black tracking-widest uppercase hover:bg-[#90243B] hover:text-white transition-colors flex justify-center items-center gap-2 group"
                          >
                             SUBMIT INQUIRY <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                      </div>
                  </div>
              ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 bg-[#90243B] flex items-center justify-center animate-pulse mb-4">
                          <Check size={20} className="text-white" />
                      </div>
                      <div className="text-sm font-black uppercase tracking-tighter mb-2">REQUEST SUBMITTED</div>
                      <div className="text-[9px] font-mono text-white/50 uppercase">Our team will review your project details and contact you shortly.</div>
                  </div>
              )}
          </div>

      </div>

      {/* 3. THE TIMELINE (Bottom Scrubber) */}
      <div className="h-[25vh] lg:h-[20vh] bg-[#0A0A0A]/90 backdrop-blur-md border-t border-[#1F1F1F] flex flex-col shrink-0 p-2 gap-2 relative z-20">
          <div className="flex items-center justify-between px-2 text-[9px] font-mono tracking-widest uppercase text-white/30 shrink-0">
              <span>00:00:00:00</span>
              <span>TIMELINE_SCRUBBER (DRAG TO REVIEW FOOTAGE)</span>
              <span>00:00:04:04</span>
          </div>
          
          {/* Timeline Tracks Area */}
          <div 
             ref={timelineRef}
             className="flex-1 bg-[#111] border border-[#222] relative cursor-ew-resize overflow-hidden group"
             onMouseDown={(e) => {
                 setIsDragging(true);
                 playMechanicalClick();
                 const rect = e.currentTarget.getBoundingClientRect();
                 const percentage = Math.round((Math.max(0, Math.min(e.clientX - rect.left, rect.width)) / rect.width) * 100);
                 setActiveFrame(percentage);
             }}
          >
              {/* Playhead */}
              <div 
                 className="absolute top-0 bottom-0 w-[2px] bg-[#90243B] z-30 shadow-[0_0_10px_#90243B] pointer-events-none"
                 style={{ left: `${activeFrame}%` }}
              >
                  <div className="absolute -top-[1px] -translate-x-1/2 w-3 h-3 bg-[#90243B]"></div>
              </div>

              {/* Tracks Background Patterns */}
              <div className="absolute inset-0 flex flex-col border-b border-[#222]">
                  {/* Video Track 1 */}
                  <div className="flex-1 border-b border-[#222]/50 flex items-center px-1 gap-1">
                      <div className="w-[25%] h-[80%] bg-blue-900/30 rounded-sm border border-blue-500/20 relative overflow-hidden group/clip">
                          <Image src="/acc-video.jpg" alt="Clip" fill className="object-cover opacity-20 group-hover/clip:opacity-60 transition-opacity" />
                      </div>
                      <div className="w-[25%] h-[80%] bg-green-900/30 rounded-sm border border-green-500/20 relative overflow-hidden group/clip">
                          <Image src="/cap-video.jpg" alt="Clip" fill className="object-cover opacity-20 group-hover/clip:opacity-60 transition-opacity" />
                      </div>
                      <div className="w-[50%] h-[80%] bg-red-900/30 rounded-sm border border-red-500/20 relative overflow-hidden group/clip">
                          <Image src="/motion.jpg" alt="Clip" fill className="object-cover opacity-20 group-hover/clip:opacity-60 transition-opacity" />
                      </div>
                  </div>
                  {/* Audio Track 1 */}
                  <div className="flex-1 border-b border-[#222]/50 flex items-center px-1 gap-1">
                      <div className="w-full h-[60%] bg-white/5 rounded-sm border border-white/10 flex items-center overflow-hidden opacity-50">
                          {/* Fake Audio Waveform */}
                          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] bg-repeat-x bg-center" style={{ backgroundSize: '4px 150%' }}></div>
                      </div>
                  </div>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                  {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-[1px] h-full bg-white"></div>
                  ))}
              </div>

          </div>
      </div>

    </div>
  );
}
