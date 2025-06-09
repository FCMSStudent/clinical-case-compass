import { useRef, useEffect, useState, useCallback } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

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
 * Spatial audio cue simulation with visual feedback
 */
export const useSpatialAudioCues = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  
  const initializeAudio = useCallback(async () => {
    try {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      setIsEnabled(true);
    } catch (error) {
      console.warn("Audio context not supported:", error);
    }
  }, []);
  
  const playSpatialCue = useCallback((
    frequency: number = 800,
    duration: number = 200,
    pan: number = 0,
    volume: number = 0.3
  ) => {
    if (!audioContext.current || !isEnabled) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    const panner = audioContext.current.createStereoPanner();
    
    oscillator.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(audioContext.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration / 1000);
    
    panner.pan.setValueAtTime(pan, audioContext.current.currentTime);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration / 1000);
  }, [isEnabled]);
  
  const playSuccessCue = useCallback(() => {
    playSpatialCue(1000, 300, 0, 0.2);
  }, [playSpatialCue]);
  
  const playErrorCue = useCallback(() => {
    playSpatialCue(400, 500, 0, 0.2);
  }, [playSpatialCue]);
  
  const playNavigationCue = useCallback((direction: "left" | "right" | "up" | "down") => {
    const panMap = {
      left: -0.8,
      right: 0.8,
      up: 0,
      down: 0,
    };
    playSpatialCue(600, 150, panMap[direction], 0.15);
  }, [playSpatialCue]);
  
  useEffect(() => {
    initializeAudio();
    return () => {
      audioContext.current?.close();
    };
  }, [initializeAudio]);
  
  return {
    isEnabled,
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
      recognition.current = new (window as any).webkitSpeechRecognition();
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