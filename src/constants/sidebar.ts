export const SIDEBAR_CONFIG = {
  STORAGE_KEY: "sidebar:state",
  WIDTH: "16rem",
  WIDTH_MOBILE: "18rem",
  WIDTH_ICON: "4rem",
  KEYBOARD_SHORTCUT: "b",
} as const;

export const saveSidebarState = (state: boolean) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, JSON.stringify(state));
    }
  } catch (error) {
    console.warn("Failed to save sidebar state:", error);
  }
};

export const getInitialSidebarState = (defaultOpen = false) => {
  if (typeof window === "undefined") return defaultOpen;
  try {
    const stored = localStorage.getItem(SIDEBAR_CONFIG.STORAGE_KEY);
    return stored !== null ? JSON.parse(stored) : defaultOpen;
  } catch {
    return defaultOpen;
  }
};
