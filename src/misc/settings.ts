import {  TIMER_SETTINGS_KEY, NOTIFICATION_TITLES_KEY } from '@/consts';
import type { TimerSettingsStorage } from "@/types/Timer";
import type { NotificationTitlesStorage } from '@/types/Notification';


// TIMES 
export function setTimerSettings(obj: TimerSettingsStorage): void {
  localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(obj));
}

export function loadTimerSettings(): TimerSettingsStorage {
  const storageSettings = localStorage.getItem(TIMER_SETTINGS_KEY);

  if(storageSettings){
    return JSON.parse(storageSettings) as TimerSettingsStorage;
  }

  const defaultSettings: TimerSettingsStorage = {
    'Work': 1500,
    'Rest': 300,
    'BigRest': 1800,
    'ExtraTime': 60
  }

  setTimerSettings(defaultSettings);

  return defaultSettings;
}

// NOTIFICATIONS 
export function setNotificationTitles(obj: NotificationTitlesStorage): void {
  localStorage.setItem(NOTIFICATION_TITLES_KEY, JSON.stringify(obj));
}

export function loadNotificationTitles(): NotificationTitlesStorage {
  const storageSettings = localStorage.getItem(NOTIFICATION_TITLES_KEY);

  if(storageSettings){
    return JSON.parse(storageSettings) as NotificationTitlesStorage;
  }

  const defaultSettings: NotificationTitlesStorage = {
    'Work': "It's time to work!",
    'Rest': "Have a rest my friend :)",
    'BigRest': "Session is over. You can enjoy your break now",
    'ExtraTime': "Extra time is over!"
  }

  setNotificationTitles(defaultSettings);
  
  return defaultSettings;
}