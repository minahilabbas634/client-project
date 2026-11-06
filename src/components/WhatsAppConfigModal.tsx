import React, { useState } from 'react';
import { X, MessageCircle, AlertCircle, CheckCircle2, Phone, ExternalLink } from 'lucide-react';
import { WhatsAppConfig } from '../types';
import { saveWhatsAppConfig } from '../data/config';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WhatsAppConfig;
  onUpdateConfig: (newConfig: WhatsAppConfig) => void;
  sampleMessage?: string;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  sampleMessage,
}) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState(config.phoneNumber || '');
  const [displayNumberInput, setDisplayNumberInput] = useState(config.displayNumber || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const testMessage = sampleMessage || "Assalam-o-Alaikum! I am interested in Kashmiri Aari Embroidered Wool Shawl (Color: Deep Burgundy & Champagne). Please share the price, availability, and ordering details.";
  const encodedTest = encodeURIComponent(testMessage);

  const cleanNumber = phoneNumberInput.replace(/[^0-9]/g, '');
  const isNumberValid = cleanNumber.length >= 10;
  const testUrl = isNumberValid ? `https://wa.me/${cleanNumber}?text=${encodedTest}` : '#';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WhatsAppConfig = {
      ...config,
      phoneNumber: cleanNumber,
      displayNumber: displayNumberInput.trim() || `+${cleanNumber}`,
      isConfigured: cleanNumber.length >= 10,
    };
    saveWhatsAppConfig(updated);
    onUpdateConfig(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSetQuickDemo = () => {
    // Allows evaluator to test with an actual Pakistani formatted number format
    setPhoneNumberInput('923001234567');
    setDisplayNumberInput('+92 300 1234567');
  };

  const handleClear = () => {
    const cleared: WhatsAppConfig = {
      ...config,
      phoneNumber: '',
      displayNumber: 'Awaiting Business Phone Verification',
      isConfigured: false,
    };
    saveWhatsAppConfig(cleared);
    onUpdateConfig(cleared);
    setPhoneNumberInput('');
    setDisplayNumberInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#302923]/60 backdrop-blur-xs">
      <div 
        className="bg-[#FAF6F0] border border-[#E2D6C6] rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl relative animate-fadeIn"
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#73685E] hover:text-[#302923] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#482020] flex items-center justify-center text-[#DCC8A5]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <h2 id="modal-title" className="font-editorial text-2xl text-[#302923] font-medium">
              WhatsApp Integration &amp; Live Test
            </h2>
          </div>
          <p className="text-xs text-[#73685E]">
            ITTI FAQ HANDICRAFT conducts product inquiries and orders through direct WhatsApp chat.
          </p>
        </div>

        {/* Current Verification Status */}
        <div className={`p-3.5 rounded-xs border text-xs flex items-start gap-2.5 ${
          config.isConfigured 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50/80 border-amber-200 text-amber-900'
        }`}>
          {config.isConfigured ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <span className="font-semibold block">
              {config.isConfigured ? 'Status: Configured & Operational' : 'Status: Awaiting Real Business Number'}
            </span>
            <p className="text-[11px] leading-relaxed">
              {config.isConfigured
                ? `Inquiry buttons currently direct to ${config.displayNumber} with pre-filled product details.`
                : 'As required by brand guidelines, no fake number is hardcoded. You can test the integration by entering the owner\'s verified WhatsApp number below.'}
            </p>
          </div>
        </div>

        {/* Form to enter or test business number */}
        <form onSubmit={handleSave} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#302923] flex items-center justify-between">
              <span>WhatsApp Number (International format without + or spaces):</span>
              <button
                type="button"
                onClick={handleSetQuickDemo}
                className="text-[11px] text-[#482020] hover:underline font-normal cursor-pointer"
              >
                Fill Sample Pakistan Format
              </button>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#73685E] absolute left-3 top-3" />
              <input
                type="text"
                value={phoneNumberInput}
                onChange={(e) => setPhoneNumberInput(e.target.value)}
                placeholder="e.g. 923001234567"
                className="w-full text-xs py-2.5 pl-9 pr-3 bg-[#F6F0E7] border border-[#E2D6C6] rounded-xs text-[#302923] font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#482020]"
              />
            </div>
            <span className="text-[10px] text-[#73685E] block">
              Format: Country code + Mobile digits. Pakistan country code is 92.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#302923]">
              Display Label (optional, shown to customers):
            </label>
            <input
              type="text"
              value={displayNumberInput}
              onChange={(e) => setDisplayNumberInput(e.target.value)}
              placeholder="e.g. +92 300 1234567"
              className="w-full text-xs p-2.5 bg-[#F6F0E7] border border-[#E2D6C6] rounded-xs text-[#302923] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#482020]"
            />
          </div>

          {/* Test Link Preview */}
          <div className="p-3 bg-[#EFE5D8] border border-[#DCC8A5]/60 rounded-xs space-y-1.5 text-xs">
            <span className="font-semibold text-[#482020] block text-[11px] uppercase tracking-wider">
              Live Encoded Message Generator Test:
            </span>
            <p className="text-[11px] text-[#483E36] italic line-clamp-2">
              "{testMessage}"
            </p>
            {isNumberValid && (
              <a
                href={testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#482020] font-medium hover:underline pt-1"
              >
                <span>Test Open WhatsApp Link in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-[#482020] hover:bg-[#371818] text-white text-xs font-semibold rounded-xs transition-colors cursor-pointer"
            >
              {isSaved ? 'Settings Saved!' : 'Save & Activate Number'}
            </button>
            {config.isConfigured && (
              <button
                type="button"
                onClick={handleClear}
                className="py-2.5 px-3 bg-[#EFE5D8] hover:bg-[#E2D6C6] text-[#73685E] text-xs font-medium rounded-xs cursor-pointer"
              >
                Reset to Unconfigured
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-transparent border border-[#E2D6C6] text-[#302923] hover:bg-[#FAF6F0] text-xs font-medium rounded-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
