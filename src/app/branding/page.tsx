import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-5">
       <div className="max-w-3xl text-center">
           <div className="font-mono text-[10px] text-[#90243B] uppercase tracking-[0.2em] mb-4">Service // Graphic Design</div>
           <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter mb-8">Brand Identity<br/>Coming Soon.</h1>
           <Link href="/" className="inline-flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
               <ArrowLeft size={14} /> Back to Home
           </Link>
       </div>
    </div>
  );
}
