import {  TIMER_SETTINGS_KEY, NOTIFICATION_TITLES_KEY } from '@/consts';
import type { TimerSettingsStorage } from "@/types/Timer";
import type { NotificationTitlesStorage } from '@/types/Notification';


export function loadTimerSettings(): TimerSettingsStorage {
  const storageSettings = localStorage.getItem(TIMER_SETTINGS_KEY);

  if(storageSettings){
    return JSON.parse(storageSettings) as TimerSettingsStorage;
  }

  const defaultSettings: TimerSettingsStorage = {
    'Work': 5,
    'Rest': 1,
    'BigRest': 10,
    'ExtraTime': 2
  }

  // localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(defaultSettings));

  return defaultSettings;
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

  // localStorage.setItem(NOTIFICATION_TITLES_KEY, JSON.stringify(defaultSettings));

  return defaultSettings;
}