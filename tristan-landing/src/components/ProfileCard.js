import Image from 'next/image';

export default function ProfileCard() {
    return (
        <div className="flex flex-col items-start w-full group">
            <div className="w-48 h-48 mb-6 overflow-hidden relative">
                <Image
                    src="/tristan-photo.png"
                    alt="Tristan Martin"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm"
                />
                <div className="absolute inset-0 bg-[#FF5A00] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] font-medium leading-tight mb-4">
                Hi, I'm Tristan.
            </h1>
            <p className="text-base text-[#666666] font-body leading-relaxed max-w-sm">
                Software developer and analog photographer based in Canada. Exploring the intersection of digital craft and physical media through 35mm film.
            </p>
        </div>
    );
}
