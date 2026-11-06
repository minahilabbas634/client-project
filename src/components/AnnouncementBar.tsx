import React from 'react';
import { MessageCircle } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenWhatsAppModal: () => void;
  message?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenWhatsAppModal: _onOpenWhatsAppModal,
  message = 'Ittifaq Handicraft · Men\'s & Women\'s Pakistani Shawls · Inquiries & Orders: 03443015624',
}) => {
  return (
    <aside aria-label="Announcement" className="bg-[#482020] text-[#DCC8A5] py-2 px-4 text-xs border-b border-[#371818] z-30 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left truncate">
          <span className="tracking-wider uppercase font-medium text-[11px] text-[#F4ECE0]/90">
            {message}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] font-medium">
          <a
            href="https://wa.me/923443015624"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#DCC8A5] hover:text-white transition-colors cursor-pointer"
            title="Chat on WhatsApp: 03443015624"
          >
            <MessageCircle className="w-3 h-3 text-[#DCC8A5]" />
            <span className="underline decoration-[#DCC8A5]/40 underline-offset-2">WhatsApp: 03443015624</span>
          </a>
          <span className="text-[#DCC8A5]/40">·</span>
          <span className="text-[#F4ECE0]/70">Nationwide Pakistan Delivery</span>
        </div>
      </div>
    </aside>
  );
};
