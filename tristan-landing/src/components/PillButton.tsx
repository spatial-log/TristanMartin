"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PillButtonProps {
    href: string;
    title: string;
    subtitle: string;
    logoSrc?: string;
    isTop?: boolean;
    isBottom?: boolean;
}

const pillVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PillButton({ href, title, subtitle, logoSrc, isTop, isBottom }: PillButtonProps) {
    return (
        <motion.div variants={pillVariants} className="w-full max-w-sm mx-auto">
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group overflow-hidden border-b p-3 sm:p-4 flex items-center gap-4 transition-colors duration-300 cursor-pointer w-full bg-transparent ${isBottom ? 'border-b-[1.2px] border-b-[#ea580c]' : 'border-b-black/10'}`}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                whileTap={{
                    scale: 0.96,
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {/* Soft Ambient Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/5 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

                {/* Logo Container */}
                {logoSrc && (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 z-10 bg-white/50 rounded-full flex items-center justify-center border border-white/40 shadow-sm">
                        <Image
                            src={logoSrc}
                            alt={`${title} logo`}
                            width={24}
                            height={24}
                            className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                )}

                {/* Text Container */}
                <div className="flex flex-col flex-grow z-10 pr-4">
                    <span className="text-base font-body font-medium text-[#1A1A1A]">{title}</span>
                    <span className="text-xs text-[#666666] font-body line-clamp-1">{subtitle}</span>
                </div>
            </motion.a>
        </motion.div>
    );
}
