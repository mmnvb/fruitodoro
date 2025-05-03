<script setup lang="ts">
import type { TimerSettingsStorage, TimerSettingsStorageKeys } from '@/types/Timer';
import { loadTimerSettings, setTimerSettings } from '@/misc/settings';
import { ref } from 'vue';

const keys: TimerSettingsStorageKeys[] = ['Work', 'Rest', 'BigRest', 'ExtraTime'];

const loadedSettings: TimerSettingsStorage = loadTimerSettings();
const currentSettings = ref<TimerSettingsStorage>(loadedSettings);

const save = () => {
  setTimerSettings(currentSettings.value);
}

defineExpose({
  save
})
</script>

<template>
  <div>  
    <div class="flex flex-col gap-1">
      <div 
        v-for="timerKey in keys"
        :key="timerKey"
        class="flex items-center justify-between"
      >
        <label>
          {{ timerKey }}:
        </label>
        <input
          type="number"
          v-model="currentSettings[timerKey]"
          class="px-1 outline-none"
        >
      </div>
    </div>
  </div>
</template>