'use client';

import { startTransition, useMemo, useOptimistic, useState, useEffect } from 'react';

import { saveChatModelAsCookie } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatModels } from '@/lib/ai/models';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/hooks/use-language';

import { CheckCircleFillIcon, ChevronDownIcon, LockIcon } from './icons';

export function ModelSelector({
  selectedModelId,
  className,
}: {
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);
  const { language, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run effect in client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Available models and coming soon models
  const { availableModels, comingSoonModels } = useMemo(() => {
    // Define comingSoonModelIds inside useMemo
    const comingSoonModelIds = [
      'anthropic/claude-3-haiku',
      'anthropic/claude-3-sonnet',
      'anthropic/claude-3-opus',
      'gpt-4o',
    ];
    
    const available = [];
    const comingSoon = [];
    
    for (const model of chatModels) {
      if (comingSoonModelIds.includes(model.id)) {
        comingSoon.push(model);
      } else {
        available.push(model);
      }
    }
    
    return { 
      availableModels: available, 
      comingSoonModels: comingSoon 
    };
  }, []);

  // Translate model descriptions and names
  const translatedAvailableModels = useMemo(() => {
    return availableModels.map(model => ({
      ...model,
      name: language === 'mn' ? getTranslatedModelName(model.name) : model.name,
      description: t(model.description)
    }));
  }, [availableModels, language, t]);

  const translatedComingSoonModels = useMemo(() => {
    return comingSoonModels.map(model => ({
      ...model,
      name: language === 'mn' ? getTranslatedModelName(model.name) : model.name,
      description: t(model.description),
      comingSoonLabel: language === 'mn' ? 'Удахгүй' : 'Coming Soon'
    }));
  }, [comingSoonModels, language, t]);

  const selectedChatModel = useMemo(
    () => {
      // Look in available models first
      const model = translatedAvailableModels.find(
        (chatModel) => chatModel.id === optimisticModelId
      );
      
      if (model) return model;
      
      // If not found, check in coming soon models
      return translatedComingSoonModels.find(
        (chatModel) => chatModel.id === optimisticModelId
      );
    },
    [optimisticModelId, translatedAvailableModels, translatedComingSoonModels],
  );

  if (!isMounted) {
    // Show simplified version during SSR to prevent hydration mismatch
    return (
      <Button variant="outline" className="md:px-2 md:h-[34px]" suppressHydrationWarning>
        {selectedModelId}
        <ChevronDownIcon />
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button variant="outline" className="md:px-2 md:h-[34px]">
          {selectedChatModel?.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[300px]">
        {/* Available models section */}
        {translatedAvailableModels.map((chatModel) => {
          const { id } = chatModel;

          return (
            <DropdownMenuItem
              key={id}
              onSelect={() => {
                setOpen(false);

                startTransition(() => {
                  setOptimisticModelId(id);
                  saveChatModelAsCookie(id);
                });
              }}
              className="gap-4 group/item flex flex-row justify-between items-center"
              data-active={id === optimisticModelId}
            >
              <div className="flex flex-col gap-1 items-start">
                <div>{chatModel.name}</div>
                <div className="text-xs text-muted-foreground">
                  {chatModel.description}
                </div>
              </div>

              <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                <CheckCircleFillIcon />
              </div>
            </DropdownMenuItem>
          );
        })}

        {translatedComingSoonModels.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              {language === 'mn' ? 'Удахгүй нэмэгдэх' : 'Coming Soon'}
            </div>
            
            {/* Coming soon models section */}
            {translatedComingSoonModels.map((chatModel) => (
              <div
                key={chatModel.id}
                className="px-2 py-1.5 flex flex-row justify-between items-center opacity-70 cursor-not-allowed"
              >
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex items-center">
                    {chatModel.name}
                    <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-md text-muted-foreground flex items-center">
                      <LockIcon/>
                      {chatModel.comingSoonLabel}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {chatModel.description}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Model description keys for translation
const modelDescriptionKeys: Record<string, string> = {
  'claudeHaikuDesc': 'Claude\'s fastest and most affordable model',
  'claudeSonnetDesc': 'Claude\'s most balanced model between price and performance',
  'claudeOpusDesc': 'Claude\'s most capable model, higher cost',
  'gpt4oDesc': 'OpenAI\'s most advanced model, fastest and smartest',
  'llamaDesc': 'Meta\'s open model, built on LLaMA 3',
  'mistralLargeDesc': 'Mistral\'s most advanced and versatile model',
  'mixtralDesc': 'Mistral\'s mixture-of-experts system',
  'geminiDesc': 'Google\'s high performance model'
};

// Helper function to get Mongolian descriptions for models
function getModelDescriptionInMongolian(modelId: string): string {
  const descriptions: Record<string, string> = {
    'gpt-4o': 'OpenAI-н хамгийн дэвшилтэт загвар, хамгийн хурдан бөгөөд нарийн',
    'anthropic/claude-3-haiku': 'Claude-н хамгийн хурдан, хямд загвар',
    'anthropic/claude-3-sonnet': 'Claude-н тэнцвэртэй үнэ, гүйцэтгэлтэй загвар',
    'anthropic/claude-3-opus': 'Claude-н хамгийн өндөр чанартай, илүү үнэтэй загвар',
    'meta-llama/llama-3-70b-chat': 'Meta-н нээлттэй загвар, LLaMA 3 тулгуурласан',
    'mistral/mistral-large': 'Mistral AI-н хамгийн дэвшилтэт, өргөн зориулалттай загвар',
    'mistral/mixtral-8x7b': 'Mistral-н олон харгалзаат зөвлөх систем',
    'google/gemini-pro': 'Google-н өндөр гүйцэтгэлтэй загвар'
  };
  
  return descriptions[modelId] || 'Загварын тайлбар';
}

// Helper function to translate model names with categories
function getTranslatedModelName(modelName: string): string {
  // Handle specific model names 
  if (modelName.includes('(Small)')) {
    return modelName.replace('(Small)', '(Жижиг)');
  }
  if (modelName.includes('(Large)')) {
    return modelName.replace('(Large)', '(Том)');
  }
  if (modelName.includes('(Reasoning)')) {
    return modelName.replace('(Reasoning)', '(Логик)');
  }
  
  // Translate common model category labels
  const translations: Record<string, string> = {
    'Default': 'Үндсэн',
    'Fast': 'Хурдан',
    'Balanced': 'Тэнцвэртэй',
    'Smart': 'Ухаалаг',
    'Large': 'Том',
    'Small': 'Жижиг',
    'Reasoning': 'Логик'
  };
  
  // Try to translate category words while preserving model brand name
  Object.entries(translations).forEach(([eng, mon]) => {
    if (modelName.includes(eng)) {
      modelName = modelName.replace(eng, mon);
    }
  });

  return modelName;
}
