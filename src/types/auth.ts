
export interface UserMetadata {
  full_name?: string;
  specialty?: string;
  bio?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  [key: string]: unknown;
}
