export interface RouteData {
  path: string;
  value: string;
  icon: string;
  children?: {path: string; value: string}[];
}
