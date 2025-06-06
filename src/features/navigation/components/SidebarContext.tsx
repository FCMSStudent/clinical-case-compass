import { createContext, useContext } from "react";

export interface SidebarContextValue {
  open: boolean;
  isMobile: boolean;
  collapsed: boolean;
  toggle: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  isMobile: false,
  collapsed: false,
  toggle: () => {},
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

