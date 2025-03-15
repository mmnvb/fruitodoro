
export enum TimerContext {
  Work,
  Rest,
  BigRest
}

export enum TimerState {
  Idle,
  Playing,
  Paused
}

export type TimerSettingsStorageKeys = 'Work' | 'Rest' | 'BigRest' | 'ExtraTime';
export type TimerSettingsStorage = Record<TimerSettingsStorageKeys, number>;

export type TimerEmit = {
  (e: 'paused'): void
  (e: 'played'): void
  (e: 'stoped'): void 
}