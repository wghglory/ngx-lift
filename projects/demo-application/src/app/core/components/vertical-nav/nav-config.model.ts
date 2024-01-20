export interface NavConfig {
  path: string;
  value: string;
  icon: string;
  children?: {path: string; value: string}[];
}
