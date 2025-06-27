export interface RouteConfig {
  path: string;
  name: string;
  public: boolean;
  component: string;
  icon?: string;
  description?: string;
}

export interface RouteParams {
  id?: string;
  [key: string]: string | undefined;
} 