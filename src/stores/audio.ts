import { defineStore } from 'pinia'


// NOTE: this will be rewritten
export const useAudioStore = defineStore('audio', () => {
  const alarm = new Audio('/sound/ringtone_1.ogg');
  alarm.loop = true;

  const playClick = () => {
    new Audio('/sound/click.ogg').play();
  }

  const playBack = () => {
    new Audio('/sound/unclick.ogg').play();
  }

  const playAlarmSound = () => {
    alarm.play();
  }

  const stopAlarmSound = () => {
    alarm.pause();
    alarm.currentTime = 0;
  }

  return {
    playClick,
    playBack,
    playAlarmSound,
    stopAlarmSound
  }
});