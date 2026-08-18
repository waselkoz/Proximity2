"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const getLinks = () => {
        switch (pathname) {
            case '/':
                return [
                    { label: 'Capabilities', href: '#capabilities' },
                    { label: 'Disciplines', href: '#disciplines' },
                    { label: 'Contact', href: '#contact' },
                ];
            case '/video':
                return [
                    { label: 'Discipline', href: '#discipline' },
                    { label: 'Philosophy', href: '#philosophy' },
                    { label: 'Process', href: '#process' },
                    { label: 'Contact', href: '#contact' },
                ];
            case '/software':
                return [
                    { label: 'Capabilities', href: '#capabilities' },
                    { label: 'Methodology', href: '#methodology' },
                    { label: 'Stack', href: '#stack' },
                    { label: 'Deploy', href: '#deploy' },
                ];
            case '/branding':
                return [
                    { label: 'Vision', href: '#vision' },
                    { label: 'Identity', href: '#identity' },
                    { label: 'Inquiry', href: '#inquiry' },
                ];
            default:
                return [
                    { label: 'Software', href: '/software' },
                    { label: 'Branding', href: '/branding' },
                    { label: 'Video', href: '/video' },
                    { label: 'Contact', href: '#contact' },
                ];
        }
    };

    const links = getLinks();

    return (
        <nav className="fixed top-0 left-0 w-full p-6 sm:px-12 sm:py-10 flex justify-between items-start z-[100] pointer-events-auto mix-blend-difference">
            {/* Massive Logo */}
            <Link href="/" className="flex items-center gap-4 hover:opacity-70 transition-opacity mt-2">
                <Image 
                    src="/Logo_crimson.png" 
                    alt="Proximity Logo" 
                    width={500} 
                    height={200} 
                    className="h-12 sm:h-20 w-auto object-contain brightness-0 invert" 
                    priority 
                />
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-white mt-4">
                {links.map((link) => (
                    <Link 
                        key={link.label}
                        href={link.href}
                        className="hover:text-white/70 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:w-0"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
            
            {/* Mobile Menu Toggle (Minimalist) */}
            <div className="lg:hidden flex items-center gap-2 text-[9px] font-mono text-white uppercase tracking-widest cursor-pointer mt-4">
                <div className="w-1.5 h-1.5 bg-white"></div>
                MENU
            </div>
        </nav>
    );
}
