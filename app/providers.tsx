'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/hooks/use-language';

export function Providers({ children }: { children: ReactNode }) {
  // Avoid hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
