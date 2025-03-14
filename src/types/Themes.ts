export interface InventoryItem {
  count: number,
  img: string;
  name: string;
}

export type ColorPalette = {
  "--color-primary": string;
  "--color-secondary": string;
  "--color-background": string;
  "--color-surface": string;
  "--color-text-primary": string;
  "--color-text-secondary": string;
  "--color-border": string;
  "--color-hover": string;
  "--color-shadow": string;
}

export type Theme = {
  img: string;
  colors: ColorPalette;
};

export type Themes = Record<string, Theme>;