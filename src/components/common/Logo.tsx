import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = true,
  showSubtitle = true
}) => {
  const sizeMap = {
    sm: { icon: 38, text: 'text-xs sm:text-sm', sub: 'text-[9px] sm:text-[10px]' },
    md: { icon: 54, text: 'text-sm sm:text-[15px]', sub: 'text-[10px] sm:text-[11px]' },
    lg: { icon: 68, text: 'text-base sm:text-lg', sub: 'text-xs' },
    xl: { icon: 84, text: 'text-xl sm:text-2xl', sub: 'text-xs sm:text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none flex-shrink-0 ${className}`}>
      {/* Official Circular Organization Logo Container */}
      <div
        className="relative flex-shrink-0 rounded-full p-0.5 bg-gradient-to-br from-[#F4B942] via-[#1D4ED8] to-[#059669] shadow-lg transition-transform duration-300 hover:scale-105"
        style={{ width: current.icon + 4, height: current.icon + 4 }}
      >
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 shadow-inner">
          <img
            src="/assets/aistudio/image_79c33d08.png"
            alt="Dergaj Kebele Administration • Wegera Woreda Central Gondar Official Emblem"
            className="w-full h-full object-contain rounded-full"
            loading="eager"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          {/* Amharic Branding (Noto Sans Ethiopic) */}
          <div
            className={`font-bold tracking-tight leading-tight ${current.text} ${
              lightText ? 'text-white' : 'text-[#101F46]'
            }`}
            style={{ fontFamily: '"Noto Sans Ethiopic", "Noto Serif Ethiopic", sans-serif' }}
          >
            የደርጋጅ አንድነትና በጎ አድራጎት
          </div>
          {/* English Branding (Times New Roman) */}
          {showSubtitle && (
            <div
              className={`font-semibold tracking-wide leading-tight mt-0.5 ${current.sub} ${
                lightText ? 'text-[#F4B942]' : 'text-[#1D4ED8]'
              }`}
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Dergag Unity & Charity Association
            </div>
          )}
        </div>
      )}
    </div>
  );
};
