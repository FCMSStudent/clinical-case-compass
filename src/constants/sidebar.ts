export const SIDEBAR_CONFIG = {
  COOKIE_NAME: "sidebar:state",
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7,
  WIDTH: "16rem",
  WIDTH_MOBILE: "18rem",
  WIDTH_ICON: "4rem",
  KEYBOARD_SHORTCUT: "b",
} as const;

export const saveSidebarState = (state: boolean) => {
  try {
    document.cookie = `${SIDEBAR_CONFIG.COOKIE_NAME}=${state}; path=/; max-age=${SIDEBAR_CONFIG.COOKIE_MAX_AGE}`;
  } catch (error) {
    console.warn("Failed to save sidebar state:", error);
  }
};

export const getInitialSidebarState = (defaultOpen = false) => {
  if (typeof document === "undefined") return defaultOpen;
  const cookies = document.cookie.split(";");
  const sidebarCookie = cookies.find((c) => c.trim().startsWith(SIDEBAR_CONFIG.COOKIE_NAME));
  return sidebarCookie ? sidebarCookie.split("=")[1] === "true" : defaultOpen;
};
