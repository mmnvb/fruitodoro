import { ref, computed } from "vue";
import { TimerContext, TimerState, type TimerSettingsStorageKeys, type TimerSettingsStorage } from "@/types/Timer";
import { loadTimerSettings, loadNotificationTitles } from "@/misc/settings";
import { defineStore } from 'pinia'
import { notify } from "@/misc/notify";
import { useAudioStore } from "./audio";
import type { NotificationTitlesStorage } from "@/types/Notification";


export const useTimerStore = defineStore('timer', () => {
  const audioStore = useAudioStore();
  const state = ref<TimerState>(TimerState.Idle);
  const context = ref<TimerContext>(TimerContext.Work);
  const workCount = ref<number>(0);
  const isExtraTime = ref<boolean>(false);
  const isAlarm = ref<boolean>(false);

  let SETTINGS: TimerSettingsStorage = loadTimerSettings();
  let TITLES: NotificationTitlesStorage = loadNotificationTitles();

  const startTime = ref<number>(SETTINGS[TimerContext[context.value] as TimerSettingsStorageKeys]);
  const timer = ref<number>(startTime.value);

  let intervalId: number;

  // ---- General ----
  const reloadSettings = () => {
    SETTINGS = loadTimerSettings();
    TITLES = loadNotificationTitles();

    startTime.value = SETTINGS[TimerContext[context.value] as TimerSettingsStorageKeys];
    timer.value = startTime.value;
    handlePause();
  }

  const getNextContext = (): TimerContext => {
    switch(context.value){
      case TimerContext.Work:
        return workCount.value >= 4 ? TimerContext.BigRest : TimerContext.Rest;
      case TimerContext.BigRest:
        workCount.value = 0;
    }

    return TimerContext.Work;
  }

  const loadNextTimer = (key: TimerSettingsStorageKeys) => {
    timer.value = SETTINGS[key];
    startTime.value = SETTINGS[key];
  }

  // ---- ALARM LOGIC ----
  const startAlarm = () => {
    audioStore.playAlarmSound();
    isAlarm.value = true;

    if(isExtraTime.value){
      notify('Fruitodoro', TITLES['ExtraTime']);
      return;
    }

    notify('Fruitodoro', TITLES[TimerContext[getNextContext()] as TimerSettingsStorageKeys]);
  }

  const acceptAlarm = () => {
    audioStore.stopAlarmSound();
    isAlarm.value = false;
    isExtraTime.value = false;

    // do not auto play next timer
    if(context.value == TimerContext.BigRest){
      moveContext();
      return;
    }

    moveContext();
    handlePlay();
  }

  const postponeAlarm = () => {
    audioStore.stopAlarmSound();
    isAlarm.value = false;

    loadNextTimer('ExtraTime');
    isExtraTime.value = true;

    handlePlay();
  }

  // ---- TIMER ----
  const handleTimeout = () => {
    clearInterval(intervalId);
    state.value = TimerState.Idle;

    if(!isExtraTime.value && context.value == TimerContext.Work) {
      workCount.value += 1;
    }

    startAlarm();
  }

  const decrementTime = () => {
    if(timer.value - 1 < 0){
      handleTimeout();
      return;
    }

    timer.value -= 1;
  }

  const moveContext = () => {
    context.value = getNextContext();
    loadNextTimer(TimerContext[context.value] as TimerSettingsStorageKeys);
  }

  const handlePlay = () => {
    if(state.value != TimerState.Playing){
      state.value = TimerState.Playing;
      intervalId = setInterval(decrementTime, 1000);
      audioStore.playClick();
    }
  }

  const handlePause = () => {
    if(state.value != TimerState.Paused){
      clearInterval(intervalId);
      state.value = TimerState.Paused;
      audioStore.playBack();
    }
  }

  const breakTimer = () => {
    state.value = TimerState.Idle;
    isExtraTime.value = false;
    clearInterval(intervalId);

    moveContext();
  }

  // ---- Display ----
  const timerTitle = computed(() => {
    if(isExtraTime.value){
      return 'Extra time';
    }

    return TimerContext[context.value];
  });

  return { 
    // timer objs
    state,
    context,
    timer,
    startTime,
    workCount,
    // alarm
    isAlarm,
    acceptAlarm,
    postponeAlarm,
    // timer methods
    handlePlay,
    handlePause,
    breakTimer,
    reloadSettings,
    // display
    timerTitle,
  }
});