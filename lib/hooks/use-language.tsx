'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'mn';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: key => key,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Start with 'en' as default and only update after mounting
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const storedLanguage = localStorage.getItem('oyuna-language') as Language;
    if (storedLanguage && ['en', 'mn'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    if (!isClient) return; // Only execute on client
    
    const newLanguage = language === 'en' ? 'mn' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('oyuna-language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (language === 'en') return key;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

// Translation dictionary for Mongolian
const translations: Record<string, string> = {
  // Overview component translations
  'Advanced AI assistant for Mongolian & English': 'Монгол ба Англи хэлний дэвшилтэт AI туслагч',
  'Experience intuitive conversations with cutting-edge language technology': 'Хэлний дэвшилтэт технологиор шуурхай ярилцаарай',
  'Multilingual': 'Олон хэлт',
  'Seamless communication in Mongolian and English': 'Монгол ба Англи хэлээр саадгүй харилцана',
  'Voice Enabled': 'Дуут удирдлага',
  'Advanced speech recognition and natural voice synthesis': 'Дэвшилтэт яриа таних ба дуу синтезлэх',
  'Free Access': 'Үнэгүй хандалт',
  'All premium features without limits or hidden costs': 'Бүх премиум боломжийг хязгааргүй, нуугдмал зардалгүйгээр',
  'Private & Secure': 'Хувийн & Аюулгүй',
  'Your conversations remain protected and confidential': 'Таны харилцаа хамгаалагдсан, нууцлагдмал хэвээр байна',
  'Feature Spotlight': 'Онцлох боломж',
  'Real-time Translation': 'Бодит цагийн орчуулга',
  'Oyuna can translate between Mongolian and English instantly while preserving context and cultural nuances': 'Оюуна нь агуулга, соёлын мэдрэмжийг хадгалан Монгол ба Англи хэлийг хоорондоо шуурхай орчуулж чадна',
  'Start your conversation with Oyuna below': 'Оюунатай ярилцлагаа доор эхлүүлнэ үү',
  
  // Chat interface translations
  'Sign out': 'Гарах',
  'Toggle light mode': 'Гэрлийн горим руу шилжих',
  'Toggle dark mode': 'Харанхуй горим руу шилжих',
  'Are you absolutely sure?': 'Та итгэлтэй байна уу?',
  'This action cannot be undone. This will permanently delete your chat and remove it from our servers.': 'Энэ үйлдлийг буцаах боломжгүй. Энэ нь таны чатыг бүрмөсөн устгаж, манай серверээс хасна.',
  'Cancel': 'Цуцлах',
  'Continue': 'Үргэлжлүүлэх',
  'Delete': 'Устгах',
  
  // Sidebar translations
  'Today': 'Өнөөдөр',
  'Yesterday': 'Өчигдөр',
  'Last 7 days': 'Сүүлийн 7 хоног',
  'Last 30 days': 'Сүүлийн 30 хоног',
  'Older': 'Хуучин',
  'Login to save and revisit previous chats!': 'Өмнөх чатуудаа хадгалахын тулд нэвтэрнэ үү!',
  'Your conversations will appear here once you start chatting!': 'Чат хийж эхлэхээр таны ярилцлагууд энд харагдана!',
  'Share': 'Хуваалцах',
  'Private': 'Хувийн',
  'Public': 'Нийтийн',

  // Visibility selector translations
  'Only you can access this chat': 'Зөвхөн та энэ чатад хандах боломжтой',
  'Anyone with the link can access this chat': 'Холбоос бүхий хэн ч энэ чатад хандах боломжтой',
  
  // Model categories and types
  'Default': 'Үндсэн',
  'Fast': 'Хурдан',
  'Balanced': 'Тэнцвэртэй',
  'Smart': 'Ухаалаг',
  'Small': 'Жижиг',
  'Large': 'Том',
  'Reasoning': 'Логик',
  'Most capable': 'Хамгийн чадвартай',
  
  // AI model related translations
  'Claude\'s fastest and most affordable model': 'Claude-н хамгийн хурдан, хамгийн хямд загвар',
  'Claude\'s most balanced model between price and performance': 'Claude-н үнэ ба гүйцэтгэлийн хооронд хамгийн тэнцвэртэй загвар',
  'Claude\'s most capable model, higher cost': 'Claude-н хамгийн чадвартай загвар, өндөр зардалтай',
  'OpenAI\'s most advanced model, fastest and smartest': 'OpenAI-н хамгийн дэвшилтэт загвар, хамгийн хурдан, хамгийн ухаалаг',
  'Meta\'s open model, built on LLaMA 3': 'Meta-н нээлттэй загвар, LLaMA 3 дээр тулгуурласан',
  'Mistral\'s most advanced and versatile model': 'Mistral-н хамгийн дэвшилтэт, олон талт загвар',
  'Mistral\'s mixture-of-experts system': 'Mistral-н мэргэжилтнүүдийн холимог систем',
  'Google\'s high performance model': 'Google-н өндөр гүйцэтгэлтэй загвар',

  // Model selector "Coming Soon" text
  'Coming Soon': 'Удахгүй нэмэгдэх',
  'Coming soon': 'Удахгүй',

  // User nav translations
  'Switch to Mongolian': 'Монгол хэл рүү шилжих',
  'Англи хэл рүү шилжих': 'Англи хэл рүү шилжих', // This is already in Mongolian
  'User Avatar': 'Хэрэглэгчийн зураг',
};
