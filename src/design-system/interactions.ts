import { useRef, useEffect, useState, useCallback } from "react";
import { motion, PanInfo, useTransform } from "framer-motion";

// ────────────────────────────────────────────────────────────────────────────────
// ADVANCED INTERACTION UTILITIES FOR GLASSY VISIONOS UI
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Gesture recognition types
 */
export type GestureType = 
  | "tap" 
  | "doubleTap" 
  | "longPress" 
  | "swipe" 
  | "pinch" 
  | "rotate" 
  | "pan";

export interface GestureConfig {
  threshold?: number;
  timeout?: number;
  direction?: "up" | "down" | "left" | "right" | "any";
  distance?: number;
}

export interface GestureEvent {
  type: GestureType;
  position: { x: number; y: number };
  delta?: { x: number; y: number };
  velocity?: { x: number; y: number };
  scale?: number;
  rotation?: number;
}

/**
 * Advanced gesture detection hook
 */
export const useGestureDetection = (
  onGesture: (event: GestureEvent) => void,
  config: GestureConfig = {}
) => {
  const [isListening, setIsListening] = useState(false);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const startTime = useRef<number>(0);
  const tapCount = useRef(0);
  const lastTapTime = useRef(0);
  const longPressTimeout = useRef<NodeJS.Timeout>();
  
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    startTime.current = Date.now();
    setIsListening(true);
    
    // Long press detection
    longPressTimeout.current = setTimeout(() => {
      if (startPos.current) {
        onGesture({
          type: "longPress",
          position: startPos.current,
        });
      }
    }, config.timeout || 500);
  }, [onGesture, config.timeout]);
  
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  }, []);
  
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
    
    if (!startPos.current) return;
    
    const touch = event.changedTouches[0];
    const endPos = { x: touch.clientX, y: touch.clientY };
    const deltaX = endPos.x - startPos.current.x;
    const deltaY = endPos.y - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Date.now() - startTime.current;
    
    // Tap detection
    if (distance < (config.threshold || 10) && duration < 300) {
      const now = Date.now();
      if (now - lastTapTime.current < 300) {
        // Double tap
        onGesture({
          type: "doubleTap",
          position: endPos,
        });
        tapCount.current = 0;
      } else {
        // Single tap
        tapCount.current++;
        lastTapTime.current = now;
        
        setTimeout(() => {
          if (tapCount.current === 1) {
            onGesture({
              type: "tap",
              position: endPos,
            });
          }
          tapCount.current = 0;
        }, 300);
      }
    } else if (distance > (config.distance || 50)) {
      // Swipe detection
      const velocity = distance / duration;
      const direction = getSwipeDirection(deltaX, deltaY);
      
      if (config.direction === "any" || config.direction === direction) {
        onGesture({
          type: "swipe",
          position: endPos,
          delta: { x: deltaX, y: deltaY },
          velocity: { x: deltaX / duration, y: deltaY / duration },
        });
      }
    }
    
    setIsListening(false);
    startPos.current = null;
  }, [onGesture, config]);
  
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
  
  return { isListening };
};

/**
 * Spatial audio cues - simplified visual feedback
 */
export const useSpatialAudioCues = () => {
  const playSpatialCue = useCallback((
    frequency: number = 800,
    duration: number = 200,
    pan: number = 0,
    volume: number = 0.3
  ) => {
    // Simplified: just log the cue for now
    console.log(`Audio cue: ${frequency}Hz, ${duration}ms, pan: ${pan}, vol: ${volume}`);
  }, []);
  
  const playSuccessCue = useCallback(() => {
    // Visual feedback instead of audio
    const element = document.activeElement as HTMLElement;
    if (element && element.style) {
      element.style.transform = 'scale(1.05)';
      setTimeout(() => {
        element.style.transform = '';
      }, 200);
    }
  }, []);
  
  const playErrorCue = useCallback(() => {
    // Visual feedback instead of audio
    const element = document.activeElement as HTMLElement;
    if (element && element.style) {
      element.style.transform = 'scale(0.95)';
      setTimeout(() => {
        element.style.transform = '';
      }, 200);
    }
  }, []);
  
  const playNavigationCue = useCallback((direction: string) => {
    // Visual feedback for navigation
    console.log(`Navigation cue: ${direction}`);
  }, []);
  
  return {
    isEnabled: true,
    playSpatialCue,
    playSuccessCue,
    playErrorCue,
    playNavigationCue,
  };
};

/**
 * Eye tracking simulation with focus detection
 */
export const useEyeTrackingSimulation = () => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const [gazePosition, setGazePosition] = useState<{ x: number; y: number } | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout>();
  
  const handleMouseMove = useCallback((event: MouseEvent) => {
    setGazePosition({ x: event.clientX, y: event.clientY });
    
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    if (element && element !== focusedElement) {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      
      hoverTimeout.current = setTimeout(() => {
        setFocusedElement(element);
      }, 200); // Simulate eye tracking delay
    }
  }, [focusedElement]);
  
  const handleMouseLeave = useCallback(() => {
    setGazePosition(null);
    setFocusedElement(null);
  }, []);
  
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);
  
  return {
    focusedElement,
    gazePosition,
    isFocused: (element: HTMLElement) => element === focusedElement,
  };
};

/**
 * Voice control simulation with speech recognition
 */
export const useVoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const recognition = useRef<SpeechRecognition | null>(null);
  
  const startListening = useCallback(() => {
    if (!recognition.current) return;
    
    recognition.current.start();
    setIsListening(true);
  }, []);
  
  const stopListening = useCallback(() => {
    if (!recognition.current) return;
    
    recognition.current.stop();
    setIsListening(false);
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognition.current = new (window as typeof window & { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "en-US";
      
      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        if (event.results.length > 0) {
          setConfidence(event.results[event.results.length - 1][0].confidence);
        }
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);
  
  return {
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    isSupported: !!recognition.current,
  };
};

/**
 * Enhanced drag and drop with haptic feedback
 */
export const useEnhancedDragDrop = <T>(
  onDrop: (item: T, position: { x: number; y: number }) => void,
  onDragStart?: (item: T) => void,
  onDragEnd?: (item: T) => void
) => {
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = useCallback((item: T, event: React.DragEvent) => {
    setDraggedItem(item);
    setIsDragging(true);
    onDragStart?.(item);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [onDragStart]);
  
  const handleDrag = useCallback((event: React.DragEvent) => {
    setDragPosition({ x: event.clientX, y: event.clientY });
  }, []);
  
  const handleDragEnd = useCallback((event: React.DragEvent) => {
    if (draggedItem && dragPosition) {
      onDrop(draggedItem, dragPosition);
    }
    
    setDraggedItem(null);
    setDragPosition(null);
    setIsDragging(false);
    onDragEnd?.(draggedItem!);
    
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  }, [draggedItem, dragPosition, onDrop, onDragEnd]);
  
  return {
    isDragging,
    draggedItem,
    dragPosition,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};

/**
 * Pinch to zoom gesture detection
 */
export const usePinchZoom = (
  onZoom: (scale: number, center: { x: number; y: number }) => void,
  minScale: number = 0.5,
  maxScale: number = 3
) => {
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const initialDistance = useRef<number>(0);
  const initialScale = useRef<number>(1);
  
  const getDistance = (touches: TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };
  
  const getCenter = (touches: TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };
  
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length === 2) {
      setIsPinching(true);
      initialDistance.current = getDistance(event.touches);
      initialScale.current = scale;
    }
  }, [scale]);
  
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length === 2 && isPinching) {
      const currentDistance = getDistance(event.touches);
      const center = getCenter(event.touches);
      const newScale = Math.max(
        minScale,
        Math.min(maxScale, (currentDistance / initialDistance.current) * initialScale.current)
      );
      
      setScale(newScale);
      onZoom(newScale, center);
    }
  }, [isPinching, minScale, maxScale, onZoom]);
  
  const handleTouchEnd = useCallback(() => {
    setIsPinching(false);
  }, []);
  
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
  
  return {
    scale,
    isPinching,
    resetScale: () => setScale(1),
  };
};

/**
 * Utility functions
 */
const getSwipeDirection = (deltaX: number, deltaY: number): "up" | "down" | "left" | "right" => {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  
  if (absX > absY) {
    return deltaX > 0 ? "right" : "left";
  } else {
    return deltaY > 0 ? "down" : "up";
  }
};

/**
 * Haptic feedback utilities
 */
export const hapticFeedback = {
  light: () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(50),
  heavy: () => navigator.vibrate?.(100),
  success: () => navigator.vibrate?.([50, 30, 50]),
  error: () => navigator.vibrate?.([100, 50, 100]),
  pattern: (pattern: number[]) => navigator.vibrate?.(pattern),
};

// Add Speech Recognition type declarations
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};
