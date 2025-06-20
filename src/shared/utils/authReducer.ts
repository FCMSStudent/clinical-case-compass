import { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isOfflineMode: boolean;
}

export type AuthAction =
  | { type: 'SET_SESSION'; payload: Session | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_OFFLINE_MODE'; payload: boolean }
  | { type: 'RESET_AUTH' }
  | { type: 'INITIALIZE_AUTH'; payload: { session: Session | null; user: User | null; isOfflineMode: boolean } };

export const initialAuthState: AuthState = {
  session: null,
  user: null,
  loading: true,
  isOfflineMode: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        session: action.payload,
        user: action.payload?.user ?? null,
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_OFFLINE_MODE':
      return {
        ...state,
        isOfflineMode: action.payload,
        loading: false, // Always set loading to false when offline mode is set
      };
    
    case 'RESET_AUTH':
      return {
        ...initialAuthState,
        loading: false,
      };
    
    case 'INITIALIZE_AUTH':
      return {
        ...state,
        session: action.payload.session,
        user: action.payload.user,
        isOfflineMode: action.payload.isOfflineMode,
        loading: false,
      };
    
    default:
      return state;
  }
} 