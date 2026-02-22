"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticSquareProps {
    href: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

export default function MagneticSquare({ href, title, subtitle, icon }: MagneticSquareProps) {
    const ref = useRef<HTMLAnchorElement>(null);

    // Raw motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for the values
    const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Transformations for the different layers to create parallax
    // Container moves slightly
    const containerX = useTransform(springX, [-1, 1], [-5, 5]);
    const containerY = useTransform(springY, [-1, 1], [-5, 5]);

    // Text moves more
    const textX = useTransform(springX, [-1, 1], [-15, 15]);
    const textY = useTransform(springY, [-1, 1], [-15, 15]);

    // Background icon moves opposite direction for deeper parallax
    const bgX = useTransform(springX, [-1, 1], [15, -15]);
    const bgY = useTransform(springY, [-1, 1], [15, -15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent touch emulation on mobile devices from triggering mouse move
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
            return;
        }

        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        // Calculate distance from center, normalized from -1 to 1
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Clamp values just in case
        const moveX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
        const moveY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };



    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            style={{
                x: containerX,
                y: containerY,
            }}
            className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden bg-[#F05A00] p-3 sm:p-5 flex flex-col items-center justify-center text-center rounded-sm shadow-sm hover:bg-[#E65100] transition-colors duration-300 cursor-pointer"
        >
            <div className="absolute inset-0 bg-white opacity-[0.08] pointer-events-none z-[1]"></div>

            {/* Background Icon Layer */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <div className="w-[140%] h-[140%] text-white opacity-10 group-active:opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    {icon}
                </div>
            </motion.div>

            {/* Foreground Content Layer */}
            <motion.div
                style={{ x: textX, y: textY }}
                className="flex flex-col items-center justify-center gap-2 relative z-10 w-full h-full"
            >
                <span className="text-base sm:text-lg font-body font-medium text-white">{title}</span>
                <span className="text-[11px] sm:text-[13px] font-body text-white/80 leading-snug">{subtitle}</span>
            </motion.div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#FF5A00] opacity-0 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300 pointer-events-none z-20"></div>
        </motion.a>
    );
}
