export const SIDEBAR_CONFIG = {
  STORAGE_KEY: "sidebar:state",
  COOKIE_NAME: "sidebar:state",
  WIDTH: "16rem",
  WIDTH_MOBILE: "18rem", 
  WIDTH_ICON: "4rem",
  KEYBOARD_SHORTCUT: "b",
} as const;

export const getInitialSidebarState = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const stored = localStorage.getItem(SIDEBAR_CONFIG.STORAGE_KEY);
  return stored ? JSON.parse(stored) : false;
};

export const saveSidebarState = (state: boolean): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, JSON.stringify(state));
};

/**
 * Clears the sidebar state from localStorage.
 */
export const clearSidebarState = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SIDEBAR_CONFIG.STORAGE_KEY);
};
