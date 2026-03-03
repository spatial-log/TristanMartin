"use client";

import Image from 'next/image';
import PillButton from "@/components/PillButton";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [bioWidth, setBioWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      if (titleRef.current) {
        setBioWidth(titleRef.current.offsetWidth + 20);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <main className="h-dvh relative flex flex-col items-center justify-center p-2 sm:p-4 md:p-12 selection:bg-[#ea580c] selection:text-white bg-[#FAFAFA] overflow-hidden">
      <div className="z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-6 sm:gap-8 pb-0 sm:pb-16">

        {/* Header Profile Section */}
        <div className="animate-fade-in-up flex flex-col items-center text-center gap-3 sm:gap-6">
          <div className="relative flex flex-col items-center justify-end">
            <div className="w-32 h-32 sm:w-48 sm:h-48 relative overflow-hidden flex items-end justify-center rounded-t-full">
              <Image
                src="/tristan-photo.png"
                alt="Tristan Martin Portrait"
                fill
                className="object-cover object-bottom"
                priority
                draggable={false}
              />
            </div>
            {/* Thin Flat Orange Baseline */}
            <div className="w-36 sm:w-56 h-[2px] bg-[#ea580c] relative z-10"></div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 px-4 items-center">
            <h1 ref={titleRef} className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] font-semibold leading-tight mt-1 sm:mt-2">
              Hi, I'm Tristan<span className="text-[#ea580c]">.</span>
            </h1>
            <p
              className="text-xs sm:text-sm text-[#666666] font-body leading-tight flex flex-col gap-2 text-center transition-opacity duration-300"
              style={bioWidth ? { maxWidth: bioWidth, opacity: 1 } : { opacity: 0 }}
            >
              <span>Creative operations specialist and analog photographer based in Canada.</span>
            </p>
          </div>
        </div>

        {/* Links Container */}
        <div className="w-full flex justify-center w-full px-2 sm:px-0">
          <div className="flex flex-col w-full max-w-[320px] sm:max-w-sm">
            {/* Static Top Orange Border */}
            <div className="w-full h-[1.2px] bg-[#ea580c]"></div>

            <motion.div
              className="flex flex-col w-full overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >

              <PillButton
                href="https://spatiallog.ca"
                title="Spatial Log"
                subtitle="35mm Film Journal"
                logoSrc="/sl-logo-bl.png"
              />

              <PillButton
                href="https://instagram.com/_tristan.martin_"
                title="Instagram"
                subtitle="Photography & Life"
                logoSrc="/ig-logo-bl.png"
              />

              <PillButton
                href="https://linkedin.com/in/tristan-martin-ca"
                title="LinkedIn"
                subtitle="Career Journey"
                logoSrc="/li-logo-bl.png"
                isBottom={true}
              />

            </motion.div>

            {/* Bottom Orange Border - appears after last card animates in */}
          </div>
        </div>

      </div>

      {/* Footer text */}
      <div className="absolute bottom-2 sm:bottom-6 w-full z-10 flex flex-col items-center gap-1 text-center pointer-events-none">
        <p className="text-[10px] sm:text-xs font-body tracking-widest text-[#666666] opacity-60">tristan martin © {new Date().getFullYear()}</p>
        <a href="mailto:hello@tristanmartin.ca" className="text-[10px] sm:text-xs font-body tracking-widest text-[#666666] opacity-60 hover:opacity-100 hover:text-[#ea580c] transition-all pointer-events-auto">
          hello@tristanmartin.ca
        </a>
      </div>
    </main>
  );
}
