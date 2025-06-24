import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";

// ────────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY ENHANCEMENTS FOR GLASSY VISIONOS UI
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Accessibility configuration interface
 */
export interface AccessibilityConfig {
  enableVoiceControl?: boolean;
  enableEyeTracking?: boolean;
  enableKeyboardNavigation?: boolean;
  enableScreenReader?: boolean;
  enableHighContrast?: boolean;
  enableLargeText?: boolean;
  enableReducedMotion?: boolean;
  enableFocusIndicators?: boolean;
  enableAudioCues?: boolean;
  enableHapticFeedback?: boolean;
}

/**
 * Voice control commands and actions
 */
export interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
  category: "navigation" | "interaction" | "system" | "custom";
}

/**
 * Eye tracking focus management
 */
export interface EyeTrackingConfig {
  dwellTime?: number; // Time to dwell before activation
  focusRadius?: number; // Radius around gaze point
  enableAutoScroll?: boolean;
  enableFocusIndicators?: boolean;
}

/**
 * Accessibility context provider
 */
export class AccessibilityManager {
  private config: AccessibilityConfig;
  private voiceCommands: Map<string, VoiceCommand> = new Map();
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex = 0;
  private isListening = false;
  private recognition: SpeechRecognition | null = null;
  private audioContext: AudioContext | null = null;
  private hasUserInteracted = false;
  
  constructor(config: AccessibilityConfig = {}) {
    this.config = {
      enableVoiceControl: true,
      enableEyeTracking: true,
      enableKeyboardNavigation: true,
      enableScreenReader: true,
      enableHighContrast: false,
      enableLargeText: false,
      enableReducedMotion: false,
      enableFocusIndicators: true,
      enableAudioCues: true,
      enableHapticFeedback: true,
      ...config,
    };
    
    this.initialize();
  }
  
  private initialize() {
    this.setupUserInteractionListener();
    this.setupVoiceRecognition();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.applyAccessibilityStyles();
  }
  
  /**
   * Setup user interaction listener for AudioContext
   */
  private setupUserInteractionListener() {
    const handleFirstInteraction = () => {
      this.hasUserInteracted = true;
      this.initializeAudioContext();
      
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
  }

  /**
   * Initialize AudioContext after user interaction
   */
  private initializeAudioContext() {
    if (!this.config.enableAudioCues || this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch (error) {
      console.warn("AudioContext not supported:", error);
    }
  }
  
  /**
   * Voice control setup
   */
  private setupVoiceRecognition() {
    if (!this.config.enableVoiceControl || typeof window === "undefined") return;
    
    if ("webkitSpeechRecognition" in window) {
      try {
        this.recognition = new (window as typeof window & { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
        
        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript.toLowerCase())
            .join("");
          
          this.processVoiceCommand(transcript);
        };
        
        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (event.error === 'not-allowed') {
            console.warn("Microphone access denied. Voice control disabled.");
            if (typeof toast === 'function') {
              toast.error("Microphone Access Denied", { description: "Voice control is disabled because microphone access was denied. Please allow microphone permissions in your browser settings." });
            } else {
              alert("Microphone access denied. Voice control disabled. Please allow microphone permissions in your browser settings.");
            }
            this.config.enableVoiceControl = false;
          } else if (event.error === 'no-speech') {
            // Ignore no-speech errors as they're common
            return;
          } else {
            console.warn("Voice recognition error:", event.error);
          }
          this.isListening = false;
        };

        this.recognition.onend = () => {
          this.isListening = false;
        };
      } catch (error) {
        console.warn("Speech recognition not supported:", error);
        this.config.enableVoiceControl = false;
      }
    } else {
      console.warn("Speech recognition not supported in this browser");
      this.config.enableVoiceControl = false;
    }
  }
  
  /**
   * Process voice commands
   */
  private processVoiceCommand(transcript: string) {
    for (const [command, voiceCommand] of this.voiceCommands) {
      if (transcript.includes(command.toLowerCase())) {
        this.executeVoiceCommand(voiceCommand);
        break;
      }
    }
  }
  
  /**
   * Execute voice command with feedback
   */
  private executeVoiceCommand(voiceCommand: VoiceCommand) {
    try {
      voiceCommand.action();
      this.provideAudioFeedback("success");
      this.provideHapticFeedback("success");
    } catch (error) {
      this.provideAudioFeedback("error");
      this.provideHapticFeedback("error");
    }
  }
  
  /**
   * Register voice command
   */
  public registerVoiceCommand(command: VoiceCommand) {
    this.voiceCommands.set(command.command, command);
  }
  
  /**
   * Start voice listening
   */
  public startVoiceListening() {
    if (!this.config.enableVoiceControl || !this.recognition || this.isListening) return;
    
    try {
      this.recognition.start();
      this.isListening = true;
      this.provideAudioFeedback("listening");
    } catch (error) {
      console.warn("Failed to start voice recognition:", error);
      this.isListening = false;
    }
  }
  
  /**
   * Stop voice listening
   */
  public stopVoiceListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
  
  /**
   * Keyboard navigation setup
   */
  private setupKeyboardNavigation() {
    if (!this.config.enableKeyboardNavigation) return;
    
    document.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
  }
  
  /**
   * Handle keyboard navigation
   */
  private handleKeyboardNavigation(event: KeyboardEvent) {
    const { key, ctrlKey } = event;
    
    // Voice control shortcuts
    if (ctrlKey && key === "v") {
      event.preventDefault();
      this.toggleVoiceListening();
      return;
    }
    
    // Focus navigation
    if (key === "Tab") {
      this.handleTabNavigation(event);
      return;
    }
    
    // Arrow key navigation
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
      event.preventDefault();
      this.handleArrowNavigation(key);
      return;
    }
    
    // Enter key activation
    if (key === "Enter") {
      this.activateCurrentFocus();
      return;
    }
    
    // Escape key
    if (key === "Escape") {
      this.clearFocus();
      return;
    }
  }
  
  /**
   * Handle tab navigation
   */
  private handleTabNavigation(event: KeyboardEvent) {
    const focusableElements = this.getFocusableElements();
    
    if (event.shiftKey) {
      // Shift + Tab: move backward
      this.currentFocusIndex = Math.max(0, this.currentFocusIndex - 1);
    } else {
      // Tab: move forward
      this.currentFocusIndex = Math.min(focusableElements.length - 1, this.currentFocusIndex + 1);
    }
    
    this.focusElement(this.currentFocusIndex);
  }
  
  /**
   * Handle arrow key navigation
   */
  private handleArrowNavigation(key: string) {
    const focusableElements = this.getFocusableElements();
    const currentElement = focusableElements[this.currentFocusIndex];
    
    if (!currentElement) return;
    
    const rect = currentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let nextIndex = this.currentFocusIndex;
    
    switch (key) {
      case "ArrowUp":
        nextIndex = this.findClosestElement(centerX, centerY, "up");
        break;
      case "ArrowDown":
        nextIndex = this.findClosestElement(centerX, centerY, "down");
        break;
      case "ArrowLeft":
        nextIndex = this.findClosestElement(centerX, centerY, "left");
        break;
      case "ArrowRight":
        nextIndex = this.findClosestElement(centerX, centerY, "right");
        break;
    }
    
    if (nextIndex !== -1) {
      this.currentFocusIndex = nextIndex;
      this.focusElement(nextIndex);
    }
  }
  
  /**
   * Find closest element in direction
   */
  private findClosestElement(centerX: number, centerY: number, direction: string): number {
    const focusableElements = this.getFocusableElements();
    let closestIndex = -1;
    let closestDistance = Infinity;
    
    focusableElements.forEach((element, index) => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      let isValid = false;
      let distance = 0;
      
      switch (direction) {
        case "up":
          isValid = elementCenterY < centerY;
          distance = Math.abs(elementCenterX - centerX) + (centerY - elementCenterY);
          break;
        case "down":
          isValid = elementCenterY > centerY;
          distance = Math.abs(elementCenterX - centerX) + (elementCenterY - centerY);
          break;
        case "left":
          isValid = elementCenterX < centerX;
          distance = Math.abs(elementCenterY - centerY) + (centerX - elementCenterX);
          break;
        case "right":
          isValid = elementCenterX > centerX;
          distance = Math.abs(elementCenterY - centerY) + (elementCenterX - centerX);
          break;
      }
      
      if (isValid && distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  }
  
  /**
   * Get all focusable elements
   */
  private getFocusableElements(): HTMLElement[] {
    if (this.focusableElements.length === 0) {
      this.focusableElements = Array.from(
        document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
        )
      ) as HTMLElement[];
    }
    return this.focusableElements;
  }
  
  /**
   * Focus element by index
   */
  private focusElement(index: number) {
    const focusableElements = this.getFocusableElements();
    const element = focusableElements[index];
    
    if (element) {
      element.focus();
      this.provideAudioFeedback("focus");
      this.provideHapticFeedback("light");
    }
  }
  
  /**
   * Activate current focus
   */
  private activateCurrentFocus() {
    const focusableElements = this.getFocusableElements();
    const element = focusableElements[this.currentFocusIndex];
    
    if (element) {
      element.click();
      this.provideAudioFeedback("activation");
      this.provideHapticFeedback("medium");
    }
  }
  
  /**
   * Clear focus
   */
  private clearFocus() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.currentFocusIndex = 0;
  }
  
  /**
   * Focus management setup
   */
  private setupFocusManagement() {
    if (!this.config.enableFocusIndicators) return;
    
    // Add focus indicators to all interactive elements
    const style = document.createElement("style");
    style.textContent = `
      .focus-visible {
        outline: 3px solid #3b82f6 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3) !important;
      }
      
      .focus-indicator {
        position: absolute;
        border: 2px solid #3b82f6;
        border-radius: 4px;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.2s ease;
      }
    `;
    document.head.appendChild(style);
    
    // Track focus changes
    document.addEventListener("focusin", this.handleFocusIn.bind(this));
    document.addEventListener("focusout", this.handleFocusOut.bind(this));
  }
  
  /**
   * Handle focus in
   */
  private handleFocusIn(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.classList.add("focus-visible");
    
    // Update focus index
    const focusableElements = this.getFocusableElements();
    const index = focusableElements.indexOf(target);
    if (index !== -1) {
      this.currentFocusIndex = index;
    }
  }
  
  /**
   * Handle focus out
   */
  private handleFocusOut(event: FocusEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove("focus-visible");
  }
  
  /**
   * Apply accessibility styles
   */
  private applyAccessibilityStyles() {
    const style = document.createElement("style");
    let css = "";
    
    if (this.config.enableHighContrast) {
      css += `
        * {
          background: white !important;
          color: black !important;
          border-color: black !important;
        }
        
        *:hover {
          background: #f0f0f0 !important;
        }
      `;
    }
    
    if (this.config.enableLargeText) {
      css += `
        * {
          font-size: 1.2em !important;
          line-height: 1.5 !important;
        }
        
        h1 { font-size: 2.5em !important; }
        h2 { font-size: 2em !important; }
        h3 { font-size: 1.75em !important; }
      `;
    }
    
    if (this.config.enableReducedMotion) {
      css += `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
    }
    
    if (css) {
      style.textContent = css;
      document.head.appendChild(style);
    }
  }
  
  /**
   * Provide audio feedback
   */
  private provideAudioFeedback(type: "success" | "error" | "focus" | "activation" | "listening") {
    if (!this.config.enableAudioCues || !this.hasUserInteracted || !this.audioContext) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      const frequencies = {
        success: 800,
        error: 400,
        focus: 600,
        activation: 1000,
        listening: 1200,
      };
      
      oscillator.frequency.setValueAtTime(frequencies[type], this.audioContext.currentTime);
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn("Audio feedback failed:", error);
    }
  }
  
  /**
   * Provide haptic feedback
   */
  private provideHapticFeedback(type: "light" | "medium" | "heavy" | "success" | "error") {
    if (!this.config.enableHapticFeedback || !navigator.vibrate) return;
    
    const patterns = {
      light: 10,
      medium: 50,
      heavy: 100,
      success: [50, 30, 50],
      error: [100, 50, 100],
    };
    
    navigator.vibrate(patterns[type]);
  }
  
  /**
   * Toggle voice listening
   */
  public toggleVoiceListening() {
    if (this.isListening) {
      this.stopVoiceListening();
    } else {
      this.startVoiceListening();
    }
  }
  
  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<AccessibilityConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.applyAccessibilityStyles();
  }
  
  /**
   * Get current configuration
   */
  public getConfig(): AccessibilityConfig {
    return { ...this.config };
  }
  
  /**
   * Cleanup
   */
  public destroy() {
    this.stopVoiceListening();
    if (this.recognition) {
      this.recognition.abort();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

/**
 * React hook for accessibility manager
 */
export const useAccessibility = () => {
  const [manager, setManager] = useState<AccessibilityManager | null>(null);

  useEffect(() => {
    const accessibilityManager = new AccessibilityManager();
    setManager(accessibilityManager);

    return () => {
      accessibilityManager.destroy();
    };
  }, []);

  const registerVoiceCommand = useCallback((command: {
    command: string;
    action: () => void;
    description: string;
    category: string;
  }) => {
    manager?.registerVoiceCommand(command as VoiceCommand);
  }, [manager]);

  const startVoiceListening = useCallback(() => {
    manager?.startVoiceListening();
  }, [manager]);

  return {
    manager,
    registerVoiceCommand,
    startVoiceListening,
  };
};

/**
 * Eye tracking hook - simplified simulation
 */
export const useEyeTracking = (config: EyeTrackingConfig = {}) => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  
  // Simplified implementation - just track mouse hover for now
  const handleMouseEnter = useCallback((event: MouseEvent) => {
    const element = event.target as HTMLElement;
    setFocusedElement(element);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setFocusedElement(null);
  }, []);
  
  useEffect(() => {
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);
  
  return {
    focusedElement,
    gazePosition: null,
    isFocused: (element: HTMLElement) => element === focusedElement,
  };
};

/**
 * Screen reader announcements
 */
export const useScreenReader = () => {
  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.overflow = "hidden";
    
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);
  
  return { announce };
};

/**
 * High contrast mode hook
 */
export const useHighContrast = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  const toggle = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);
  
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "high-contrast-styles";
    
    if (isEnabled) {
      style.textContent = `
        * {
          background: white !important;
          color: black !important;
          border-color: black !important;
        }
        
        *:hover {
          background: #f0f0f0 !important;
        }
        
        .glassmorphic {
          background: white !important;
          border: 2px solid black !important;
          backdrop-filter: none !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById("high-contrast-styles");
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    }
  }, [isEnabled]);
  
  return { isEnabled, toggle };
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
