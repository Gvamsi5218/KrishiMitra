import { useState, useEffect, useRef } from 'react';
import { VoiceCommand } from '../types';

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function useVoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Default to Hindi
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = (language = 'hi-IN') => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = language;
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text: string, language = 'hi-IN') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const processCommand = (text: string): VoiceCommand => {
    // Simple intent recognition (in production, this would use advanced NLP)
    const lowerText = text.toLowerCase();
    let intent = 'unknown';
    let entities = {};

    if (lowerText.includes('weather') || lowerText.includes('मौसम')) {
      intent = 'weather_query';
    } else if (lowerText.includes('crop') || lowerText.includes('फसल')) {
      intent = 'crop_query';
    } else if (lowerText.includes('price') || lowerText.includes('भाव')) {
      intent = 'price_query';
    } else if (lowerText.includes('scheme') || lowerText.includes('योजना')) {
      intent = 'scheme_query';
    }

    return {
      text,
      confidence: 0.85,
      intent,
      entities
    };
  };

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    speak,
    processCommand
  };
}