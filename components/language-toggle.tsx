'use client';

import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useLanguage } from '@/lib/hooks/use-language';

interface LanguageToggleProps {
  size?: 'default' | 'sm' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
  showText?: boolean;
}

export function LanguageToggle({
  size = 'icon',
  variant = 'outline',
  showText = false,
}: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={toggleLanguage}
          className={showText ? 'gap-2' : ''}
        >
          <Globe className="h-4 w-4" />
          {showText && (
            <span>
              {language === 'en' ? 'MN' : 'EN'}
            </span>
          )}
          <span className="sr-only">Toggle language</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {language === 'en' ? 'Switch to Mongolian' : 'Англи хэл рүү шилжих'}
      </TooltipContent>
    </Tooltip>
  );
}
