'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';
import { useLanguage } from '@/lib/hooks/use-language';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const { t, language } = useLanguage();
  
  // Define actions with both English and Mongolian options
  const suggestedActions = [
    {
      title: language === 'en' ? 'What are the advantages' : 'Давуу талууд нь юу вэ',
      label: language === 'en' ? 'of using Next.js?' : 'Next.js ашиглахын?',
      action: language === 'en' 
        ? 'What are the advantages of using Next.js?' 
        : 'Next.js ашиглахын давуу талууд юу вэ?',
    },
    {
      title: language === 'en' ? 'Write code to' : 'Код бичиж',
      label: language === 'en' 
        ? `demonstrate dijkstra's algorithm` 
        : `dijkstra-н алгоритмыг харуулна уу`,
      action: language === 'en' 
        ? `Write code to demonstrate dijkstra's algorithm` 
        : `Dijkstra-н алгоритмыг харуулсан код бичиж өгнө үү`,
    },
    {
      title: language === 'en' ? 'Help me write an essay' : 'Эссе бичихэд тусална уу',
      label: language === 'en' ? `about silicon valley` : `силикон хөндийн тухай`,
      action: language === 'en' 
        ? `Help me write an essay about silicon valley` 
        : `Силикон хөндийн тухай эссе бичихэд тусална уу`,
    },
    {
      title: language === 'en' ? 'What is the weather' : 'Цаг агаар ямар байна',
      label: language === 'en' ? 'in San Francisco?' : 'Сан Франциско хотод?',
      action: language === 'en' 
        ? 'What is the weather in San Francisco?' 
        : 'Сан Франциско хотын цаг агаар ямар байна?',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
