import { WhatsAppConfig } from '../types';

export const STORAGE_KEY_WHATSAPP = 'itti_faq_whatsapp_config';

// Verified Business Configuration
export const INITIAL_WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: '923443015624',
  displayNumber: '+92 344 3015624',
  isConfigured: true,
  storeName: 'Ittifaq Handicraft',
  defaultGreeting: 'Assalam-o-Alaikum! I am browsing the Ittifaq Handicraft shawl collection.',
};

/**
 * Retrieves the active WhatsApp configuration.
 * Reads from localStorage if the business owner or tester has configured it.
 */
export function getWhatsAppConfig(): WhatsAppConfig {
  if (typeof window === 'undefined') return INITIAL_WHATSAPP_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WHATSAPP);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.phoneNumber === 'string') {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_WHATSAPP_CONFIG;
}

/**
 * Saves updated WhatsApp configuration to localStorage.
 */
export function saveWhatsAppConfig(config: WhatsAppConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_WHATSAPP, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save WhatsApp config', e);
  }
}

/**
 * Generates the clean WhatsApp URL click-to-chat link.
 * Properly URL-encodes messages and sanitizes phone numbers.
 */
export function buildWhatsAppInquiryUrl(
  productName?: string,
  variantOrCategory?: string,
  productPrice?: number | null,
  customMessage?: string,
  extraCategory?: string
): { url: string; encodedMessage: string; isLive: boolean } {
  const config = getWhatsAppConfig();
  
  let messageText = '';
  if (customMessage) {
    messageText = customMessage;
  } else if (productName) {
    const details = [extraCategory, variantOrCategory].filter(Boolean).join(' · ');
    const detailsPart = details ? ` (${details})` : '';
    messageText = `Assalam-o-Alaikum! I am interested in ${productName}${detailsPart}. Please share its price and availability.`;
  } else {
    messageText = `Assalam-o-Alaikum! I am browsing the Ittifaq Handicraft shawl collection and would like to inquire about availability and ordering.`;
  }

  const encodedMessage = encodeURIComponent(messageText);
  const sanitizedNumber = config.phoneNumber.replace(/[^0-9]/g, '') || '923443015624';

  return {
    url: `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`,
    encodedMessage: messageText,
    isLive: true,
  };
}
