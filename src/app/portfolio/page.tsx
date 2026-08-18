"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playMechanicalClick, playHoverTick } from "../../utils/audio";

type ProjectCategory = "All" | "Software" | "Video" | "Branding";

type Project = {
    id: string;
    title: string;
    client: string;
    category: ProjectCategory;
    image: string;
    timeframe: string;
    stack?: string;
    size: "small" | "large" | "tall" | "wide";
};

const PORTFOLIO_DATA: Project[] = [
    {
        id: "01",
        title: "Aura E-Commerce",
        client: "Aura Cosmetics",
        category: "Software",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1600&auto=format&fit=crop",
        timeframe: "8 WEEKS",
        stack: "NEXT.JS, STRIPE",
        size: "large"
    },
    {
        id: "02",
        title: "Neon Genesis",
        client: "HBO Max",
        category: "Video",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1600&auto=format&fit=crop",
        timeframe: "3 WEEKS",
        stack: "DAVINCI RESOLVE",
        size: "wide"
    },
    {
        id: "03",
        title: "Monolith Identity",
        client: "Monolith Architecture",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
        timeframe: "4 WEEKS",
        stack: "ILLUSTRATOR, INDESIGN",
        size: "tall"
    },
    {
        id: "04",
        title: "Velocity App",
        client: "Velocity FinTech",
        category: "Software",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        timeframe: "12 WEEKS",
        stack: "REACT NATIVE",
        size: "small"
    },
    {
        id: "05",
        title: "The Silent Cut",
        client: "A24",
        category: "Video",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop",
        timeframe: "6 WEEKS",
        stack: "PREMIERE PRO",
        size: "large"
    },
    {
        id: "06",
        title: "Onyx Packaging",
        client: "Onyx Coffee",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop",
        timeframe: "2 WEEKS",
        stack: "PHOTOSHOP",
        size: "small"
    },
    {
        id: "07",
        title: "Nexus Platform",
        client: "Nexus AI",
        category: "Software",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1600&auto=format&fit=crop",
        timeframe: "16 WEEKS",
        stack: "VUE, NODE.JS",
        size: "wide"
    }
];

export default function PortfolioPage() {
    const [filter, setFilter] = useState<ProjectCategory>("All");
    
    // Ensure body scroll is active
    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);

    const filteredProjects = filter === "All" 
        ? PORTFOLIO_DATA 
        : PORTFOLIO_DATA.filter(p => p.category === filter);

    return (
        <div className="w-full min-h-screen bg-[#F4F4F4] text-[#0A0A0A] font-sans selection:bg-[#90243B] selection:text-white pt-24 pb-32">
            
            {/* Minimal Grid Overlay */}
            <div className="pointer-events-none fixed inset-0 z-0 flex w-full justify-between px-5 sm:px-12 opacity-[0.05]">
                <div className="h-full w-[1px] bg-black"></div>
                <div className="h-full w-[1px] bg-black"></div>
                <div className="h-full w-[1px] bg-black"></div>
                <div className="h-full w-[1px] bg-black"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-5 sm:px-12 relative z-10">
                
                {/* Header */}
                <header className="py-12 sm:py-24 border-b-2 border-black flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="font-mono text-xs text-[#90243B] uppercase tracking-widest mb-4">Proximity Archives</div>
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                            Selected <br/> Works.
                        </h1>
                    </div>
                    <p className="max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60 text-right hidden md:block">
                        A curated selection of our finest digital architecture, brand identities, and cinematic cuts.
                    </p>
                </header>

                {/* Filter Bar */}
                <div className="sticky top-0 z-40 bg-[#F4F4F4]/90 backdrop-blur-md py-6 border-b border-black/10 flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                    {["All", "Software", "Video", "Branding"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                playMechanicalClick();
                                setFilter(cat as ProjectCategory);
                            }}
                            onMouseEnter={playHoverTick}
                            className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors whitespace-nowrap pb-1 border-b-2 ${filter === cat ? 'border-[#90243B] text-black font-bold' : 'border-transparent text-black/50 hover:text-black hover:border-black/20'}`}
                        >
                            [ {cat} ]
                        </button>
                    ))}
                </div>

                {/* The Asymmetrical Masonry Grid */}
                <motion.div layout className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
                    <AnimatePresence>
                        {filteredProjects.map((project) => {
                            
                            // Determine grid spans based on size
                            let spanClasses = "col-span-1 row-span-1";
                            if (project.size === "large") spanClasses = "col-span-1 md:col-span-2 row-span-2";
                            if (project.size === "tall") spanClasses = "col-span-1 row-span-2";
                            if (project.size === "wide") spanClasses = "col-span-1 md:col-span-2 row-span-1";

                            return (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                    className={`relative group overflow-hidden bg-black cursor-crosshair ${spanClasses}`}
                                >
                                    {/* Base Image */}
                                    <Image 
                                        src={project.image} 
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                                    />

                                    {/* Hover Metadata Overlay */}
                                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                        <div className="flex justify-between items-start w-full">
                                            <span className="font-mono text-[10px] text-white uppercase tracking-widest bg-black/50 backdrop-blur-sm px-3 py-1">
                                                {project.id} // {project.category}
                                            </span>
                                            <ArrowRight className="text-white transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-2">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-4 font-mono text-[9px] text-white/70 uppercase tracking-widest">
                                                <span>CLIENT: {project.client}</span>
                                                <span>TIME: {project.timeframe}</span>
                                            </div>
                                            {project.stack && (
                                                <div className="mt-2 font-mono text-[9px] text-[#90243B] font-bold uppercase tracking-widest">
                                                    STACK: {project.stack}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Always-on Title for Large Screens before hover (optional) */}
                                    <div className="absolute bottom-6 left-6 font-black text-2xl uppercase tracking-tighter text-white/90 mix-blend-difference group-hover:opacity-0 transition-opacity duration-300">
                                        {project.title}
                                    </div>
                                    
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
                
                {/* Minimal CTA */}
                <div className="mt-32 pt-16 border-t border-black/10 flex flex-col items-center text-center">
                    <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8">
                        Ready to Build?
                    </h2>
                    <Link 
                        href="/software" 
                        onClick={playMechanicalClick}
                        onMouseEnter={playHoverTick}
                        className="bg-black text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[#90243B] transition-colors"
                    >
                        START A PROJECT
                    </Link>
                </div>

            </div>
        </div>
    );
}
