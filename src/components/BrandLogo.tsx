import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'burgundy';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'burgundy',
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-[#FAF6F0]' : variant === 'burgundy' ? 'text-[#482020]' : 'text-[#302923]';
  const accentColor = isLight ? 'text-[#DCC8A5]' : 'text-[#DCC8A5]';
  const subtextColor = isLight ? 'text-[#EFE5D8]/80' : 'text-[#73685E]';

  const emblemSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Restrained Textile Looped Motif Emblem */}
      <svg
        className={`${emblemSize} ${accentColor} shrink-0`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Subtle geometric loom & warp motif */}
        <path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" strokeDasharray="1 2" stroke="currentColor" opacity="0.6" />
        <path d="M12 4v16" stroke="currentColor" />
        <path d="M4 12h16" stroke="currentColor" />
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 8l-8 8" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-editorial font-medium tracking-[0.14em] uppercase ${titleSize} ${textColor}`}
          style={{ letterSpacing: '0.15em' }}
        >
          ITTIFAQ
        </span>
        {showSubtitle && (
          <span
            className={`font-sans font-medium uppercase tracking-[0.28em] ${subtitleSize} ${subtextColor} mt-0.5`}
          >
            HANDICRAFT
          </span>
        )}
      </div>
    </div>
  );
};
