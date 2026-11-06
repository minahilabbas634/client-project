import React, { useState } from 'react';
import { PageRoute } from '../types';
import { MessageCircle, Mail, MapPin, Send, HelpCircle, CheckCircle } from 'lucide-react';
import { buildWhatsAppInquiryUrl } from '../data/config';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenWhatsAppModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate: _onNavigate,
  onOpenWhatsAppModal: _onOpenWhatsAppModal,
}) => {
  const [inquiryTopic, setInquiryTopic] = useState("Men's & Women's Shawls");
  const [customQuery, setCustomQuery] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const queryPart = customQuery ? ` (${customQuery.trim()})` : '';
    const fullMsg = `Assalam-o-Alaikum! I am interested in ${inquiryTopic}${queryPart}. Please share its price and availability.`;
    const inquiry = buildWhatsAppInquiryUrl(undefined, undefined, null, fullMsg);

    setSubmittedMessage(true);
    setTimeout(() => {
      window.open(inquiry.url, '_blank', 'noopener,noreferrer');
      setSubmittedMessage(false);
    }, 400);
  };

  return (
    <div className="py-12 md:py-20 bg-[#F6F0E7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#73685E] block">
            Ittifaq Handicraft Communication
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#302923] font-medium leading-tight">
            Contact &amp; Ordering Assistance
          </h1>
          <p className="text-sm sm:text-base text-[#483E36] font-normal leading-relaxed">
            Have questions about a specific embroidery style, fabric composition, custom color requests, or delivery timelines within Pakistan? Connect directly with us.
          </p>
        </div>

        {/* Two-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Communication Channels & Confirmed Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Channel: WhatsApp */}
            <div className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#482020] flex items-center justify-center text-[#DCC8A5]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-editorial text-xl font-semibold text-[#302923]">
                    WhatsApp Orders
                  </h2>
                  <span className="text-xs text-[#73685E]">Direct Customer Support</span>
                </div>
              </div>

              <p className="text-xs text-[#483E36] leading-relaxed">
                We handle our customer consultations, stock confirmations, and courier dispatches directly on WhatsApp.
              </p>

              <div className="pt-2">
                <a
                  href="https://wa.me/923443015624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#DCC8A5]" />
                  <span>Chat on WhatsApp: 03443015624</span>
                </a>
              </div>
            </div>

            {/* Channels & Location */}
            <div className="bg-[#FAF6F0] p-6 border border-[#E2D6C6] rounded-sm space-y-4 text-xs text-[#483E36]">
              <h2 className="font-editorial text-lg font-semibold text-[#302923]">
                Business Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#482020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#302923] block">Service Area:</strong>
                    <span>Pakistan Nationwide (Courier delivery to all cities)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#482020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#302923] block">Promotion Channels:</strong>
                    <span>Facebook Catalog &amp; Direct WhatsApp Ordering</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Interactive Message Builder & Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF6F0] p-6 sm:p-8 border border-[#E2D6C6] rounded-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#73685E]">
                Direct Chat
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#302923]">
                Prepare Your WhatsApp Inquiry
              </h2>
              <p className="text-xs text-[#73685E]">
                Select your preferred shawl or query. It will automatically open in WhatsApp with a prefilled message so our team can assist immediately.
              </p>
            </div>

            <form onSubmit={handleLaunchWhatsApp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#302923]">
                  Shawl or Collection:
                </label>
                <select
                  value={inquiryTopic}
                  onChange={(e) => setInquiryTopic(e.target.value)}
                  className="w-full text-xs p-3 bg-[#F6F0E7] border border-[#E2D6C6] rounded-xs text-[#302923] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#482020]"
                >
                  <option value="Ivory Woven Shawl with Embroidered Border">Ivory Woven Shawl with Embroidered Border</option>
                  <option value="Classic Black Winter Shawl with Embroidered Trim">Classic Black Winter Shawl with Embroidered Trim</option>
                  <option value="Heather Grey Twill Shawl with Geometric Border">Heather Grey Twill Shawl with Geometric Border</option>
                  <option value="Ivory Floral Embroidered Shawl with Tulip Border">Ivory Floral Embroidered Shawl with Tulip Border</option>
                  <option value="Black Embroidered Shawl with Magenta Diamond Motif">Black Embroidered Shawl with Magenta Diamond Motif</option>
                  <option value="Black Draped Shawl with Silver Floral Booti Motifs">Black Draped Shawl with Silver Floral Booti Motifs</option>
                  <option value="Men's Shawls Collection">General Men's Shawls Inquiry</option>
                  <option value="Women's Shawls Collection">General Women's Shawls Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#302923]">
                  Any additional questions or specific color request? (Optional):
                </label>
                <textarea
                  rows={3}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="e.g. Please share close-up photos of the embroidery border, or confirm delivery timing."
                  className="w-full text-xs p-3 bg-[#F6F0E7] border border-[#E2D6C6] rounded-xs text-[#302923] placeholder-[#73685E]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#482020]"
                />
              </div>

              {submittedMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Opening WhatsApp conversation with Ittifaq Handicraft...</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#DCC8A5]" />
                <span>Launch WhatsApp Inquiry (03443015624)</span>
              </button>
            </form>

            <div className="flex items-center gap-2 text-xs text-[#73685E] pt-2">
              <HelpCircle className="w-4 h-4 text-[#482020]" />
              <span>We usually respond promptly on WhatsApp.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
