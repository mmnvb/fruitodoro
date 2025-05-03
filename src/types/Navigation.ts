export type NavigationDirection = "left" | "right";


export enum Tab {
  Home,
  Inventory,
  Settings,
  Disc
}

// note: good enough for now
export enum SettingsTab {
  Time,
  Notifications,
  Preferences,
  Themes 
}

export interface SettingsTabItem {
  text: string;
  value: SettingsTab
}