export default function LinkButton({ href, title, subtitle }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="clean-card w-full p-6 flex flex-col group text-[#1A1A1A] text-left relative"
    >
      <div className="flex justify-between items-start mb-12">
        <span className="text-xl md:text-2xl font-serif font-medium tracking-tight clean-link">
          {title}
        </span>

        {/* Subtle Arrow Icon */}
        <div className="w-8 h-8 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[#FF5A00]">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      {subtitle && (
        <span className="text-sm font-body text-[#666666] group-hover:text-[#1A1A1A] transition-colors mt-auto pt-4 border-t border-[#E5E5E5] group-hover:border-[#FF5A00]">
          {subtitle}
        </span>
      )}

      {/* Subtle bottom border highlight on hover */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
    </a>
  );
}
