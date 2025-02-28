'use client';

import { useState, useEffect, memo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MicrophoneIcon, StopCircleIcon } from './icons';
import { useLanguage } from '@/lib/hooks/use-language';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Types for browser's SpeechRecognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionProps {
  onTranscript: (text: string) => void;
  isDisabled?: boolean;
}

const SpeechRecognitionButton = ({ onTranscript, isDisabled = false }: SpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { language } = useLanguage();
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const [transcriptDuration, setTranscriptDuration] = useState(0);
  const transcriptTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run in browser context
    if (typeof window === 'undefined') return;
    
    // Access SpeechRecognition API with browser prefixes
    const SpeechRecognition = window.SpeechRecognition || 
                             window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsBrowserSupported(false);
      return;
    }

    setIsBrowserSupported(true);

    const recognitionInstance = new SpeechRecognition();
    recognitionRef.current = recognitionInstance;
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language === 'mn' ? 'mn-MN' : 'en-US';

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      // Only pass final results or continuous speaking results
      if (event.results[event.resultIndex].isFinal) {
        onTranscript(transcript);
        setErrorState(null); // Clear any error state on successful result
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      
      // Handle different error types with appropriate messages
      switch (event.error) {
        case 'aborted':
          // This is a normal case when user manually stops recording
          if (isListening) {
            // Only show error if not manually triggered
            setErrorState('aborted');
          }
          break;
        case 'network':
          toast.error(language === 'mn' ? 'Сүлжээний алдаа' : 'Network error');
          setErrorState('network');
          break;
        case 'no-speech':
          toast.error(language === 'mn' ? 'Яриа илрээгүй' : 'No speech detected');
          setErrorState('no-speech');
          break;
        case 'not-allowed':
          toast.error(language === 'mn' ? 'Микрофон зөвшөөрөл татгалзсан' : 'Microphone permission denied');
          setErrorState('not-allowed');
          break;
        case 'service-not-allowed':
          toast.error(language === 'mn' ? 'Яриа таних үйлчилгээ боломжгүй' : 'Speech recognition service unavailable');
          setErrorState('service-not-allowed');
          break;
        default:
          toast.error(language === 'mn' ? 'Яриа таних алдаа' : 'Speech recognition error');
          setErrorState('error');
      }
      
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      // Only show notification if not manually stopped and no error
      if (isListening && !errorState) {
        toast.info(language === 'mn' ? 'Яриа таних дууссан' : 'Speech recognition ended');
      }
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    // Cleanup function - ensure we stop recognition when component unmounts or deps change
    return () => {
      try {
        if (recognitionRef.current) {
          // Check if recognition is active before stopping
          try {
            recognitionRef.current.stop();
          } catch (e) {
            console.log('Recognition already stopped');
          }
          recognitionRef.current = null;
        }
      } catch (e) {
        console.error('Error cleaning up speech recognition', e);
      }
    };
  }, [language, onTranscript, errorState, isListening]);

  // Update the ref when state changes
  useEffect(() => {
    recognitionRef.current = recognition;
  }, [recognition]);

  // Timer to track recording duration
  useEffect(() => {
    if (isListening) {
      setTranscriptDuration(0);
      transcriptTimerRef.current = setInterval(() => {
        setTranscriptDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (transcriptTimerRef.current) {
        clearInterval(transcriptTimerRef.current);
        transcriptTimerRef.current = null;
      }
    }

    return () => {
      if (transcriptTimerRef.current) {
        clearInterval(transcriptTimerRef.current);
      }
    };
  }, [isListening]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleListening = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent form submission
    event.preventDefault();
    
    if (!recognition) return;

    if (isListening) {
      try {
        // Make sure we attempt to stop recognition and handle any errors
        recognition.stop();
        console.log('Recognition stopped manually');
      } catch (error) {
        console.error('Error stopping recognition:', error);
      } finally {
        setIsListening(false);
      }
    } else {
      setErrorState(null); // Reset error state when starting new recording
      
      try {
        // Try to start recognition with error handling
        recognition.start();
        setIsListening(true);
        toast.info(language === 'mn' ? 'Яриа таних эхэлсэн' : 'Listening...', {
          duration: 1500,
        });
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error(language === 'mn' ? 'Яриа таних эхлүүлэхэд алдаа гарлаа' : 'Error starting speech recognition');
        setIsListening(false);
      }
    }
  };

  if (!isBrowserSupported) {
    return null; // Don't render the button if browser doesn't support speech recognition
  }

  const tooltipContent = isListening 
    ? (language === 'mn' ? `Бичиж байна... ${formatDuration(transcriptDuration)}` : `Recording... ${formatDuration(transcriptDuration)}`)
    : (language === 'mn' ? 'Дуу бичлэг ашиглах' : 'Use voice input');

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "rounded-md h-fit dark:border-zinc-700 hover:dark:bg-zinc-900 hover:bg-zinc-200 transition-all duration-200",
            isListening && "bg-red-100 dark:bg-red-900/30 relative",
            isListening && "after:absolute after:inset-0 after:rounded-md after:animate-pulse after:bg-red-300/20 after:dark:bg-red-500/20",
            errorState && "bg-amber-100 dark:bg-amber-900/30"
          )}
          onClick={(event) => toggleListening(event)}
          disabled={isDisabled}
          variant="ghost"
          type="button" // Explicitly set button type to button to prevent form submission
        >
          {isListening ? (
            <StopCircleIcon 
              size={16} 
              className={cn("text-red-500 transition-transform duration-300", isListening && "animate-pulse")} 
            />
          ) : (
            <MicrophoneIcon 
              size={16} 
              className={cn(
                "transition-all duration-200", 
                errorState ? "text-amber-500" : ""
              )} 
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

// Add these types to augment the Window interface
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export default memo(SpeechRecognitionButton);
