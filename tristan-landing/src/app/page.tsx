"use client";

import Image from 'next/image';
import InteractiveGrid from '../components/InteractiveGrid';

export default function Home() {
  const hoverOverlay = (
    <div className="absolute inset-0 bg-[#FF5A00] opacity-0 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300 pointer-events-none z-20"></div>
  );

  const whiteOverlay = (
    <div className="absolute inset-0 bg-white opacity-[0.08] pointer-events-none z-[1]"></div>
  );

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-12 selection:bg-[#FF5A00] selection:text-white bg-[#FAFAFA] overflow-hidden">
      <InteractiveGrid />
      <div className="z-10 animate-fade-in-up w-full max-w-fit mx-auto">

        {/* Simple 6 square grid (2x3) */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">

          {/* Square 1: Headshot (transparent bg) */}
          <div className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden flex items-center justify-center transition-transform rounded-sm">
            <Image
              src="/tristan-photo.png"
              alt="Tristan Martin"
              width={192}
              height={192}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm relative z-10"
              priority
            />
          </div>

          {/* Square 2: Description/bio (transparent bg) */}
          <div className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden p-3 pb-0 sm:p-5 sm:pb-0 flex flex-col justify-end transition-transform rounded-sm">
            <h1 className="text-lg sm:text-xl font-body text-[#1A1A1A] font-bold leading-tight mb-2 relative z-10">
              Hi, I'm Tristan.
            </h1>
            <p className="text-[11px] sm:text-[13px] text-[#666666] font-body leading-snug relative z-10">
              Creative technologist and analog photographer based in Canada.
              <span className="block h-1" />
              Exploring new mediums to express my creativity while building a career in architecture operations.
            </p>
          </div>

          {/* Square 3: Spatiallog */}
          <a href="https://spatiallog.ca" target="_blank" rel="noopener noreferrer" className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden bg-[#F05A00] p-3 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-[#E65100] hover:-translate-y-1 cursor-pointer rounded-sm shadow-sm">
            {whiteOverlay}
            <span className="text-base sm:text-lg font-body font-medium text-white relative z-10">Spatial Log</span>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {/* Inline SVG matching the original TM circle logo */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-20 sm:h-20 text-white opacity-80 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 100 100" fill="none">
                <text x="50" y="62" textAnchor="middle" fill="currentColor" fontSize="42" fontFamily="serif" fontWeight="500">TM</text>
              </svg>
            </div>

            <span className="text-[11px] sm:text-[13px] font-body text-white/80 leading-snug flex-1 flex items-end relative z-10 w-full justify-center">35mm Film Journal</span>
            {hoverOverlay}
          </a>

          {/* Square 4: Instagram */}
          <a href="https://instagram.com/_tristan.martin_" target="_blank" rel="noopener noreferrer" className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden bg-[#F05A00] p-3 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-[#E65100] hover:-translate-y-1 cursor-pointer rounded-sm shadow-sm">
            {whiteOverlay}
            <span className="text-base sm:text-lg font-body font-medium text-white relative z-10">Instagram</span>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {/* Inline robust SVG since instagram dynamically blocks standard favicon fetching */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-80 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>

            <span className="text-[11px] sm:text-[13px] font-body text-white/80 leading-snug flex-1 flex items-end relative z-10 w-full justify-center">Photography & Life</span>
            {hoverOverlay}
          </a>

          {/* Square 5: Linkedin */}
          <a href="https://www.linkedin.com/in/tristan-martin-ca/" target="_blank" rel="noopener noreferrer" className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden bg-[#F05A00] p-3 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-[#E65100] hover:-translate-y-1 cursor-pointer rounded-sm shadow-sm">
            {whiteOverlay}
            <span className="text-base sm:text-lg font-body font-medium text-white relative z-10">LinkedIn</span>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-80 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>

            <span className="text-[11px] sm:text-[13px] font-body text-white/80 leading-snug flex-1 flex items-end relative z-10 w-full justify-center">Career Journey</span>
            {hoverOverlay}
          </a>

          {/* Square 6: Coming Soon */}
          <div className="w-[42vw] h-[42vw] sm:w-48 sm:h-48 relative group overflow-hidden bg-[#F05A00] opacity-80 p-3 sm:p-5 flex flex-col items-center justify-center text-center rounded-sm transition-all duration-300 shadow-sm">
            {whiteOverlay}
            <span className="text-sm sm:text-base font-body font-medium text-white/90 relative z-10">Coming Soon.</span>
            {hoverOverlay}
          </div>

        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-4 sm:bottom-6 w-full z-10 text-center opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-[10px] sm:text-xs font-body tracking-widest uppercase text-[#666666]">Tristan Martin © {new Date().getFullYear()}</p>
      </div>
    </main>
  );
}
