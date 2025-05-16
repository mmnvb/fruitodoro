<script setup lang="ts">
import { ref } from 'vue';
import { SettingsTab, type SettingsTabItem } from "@/types/Navigation";
import { playBack, playClick } from '@/misc/audio';

import SettingsTimeTab from './components/SettingsTimeTab.vue';
import SettingsNotificationTab from './components/SettingsNotificationTab.vue';
import SettingsPreferencesTab from './components/SettingsPreferencesTab.vue';
import SettingsThemesTab from './components/SettingsThemesTab.vue';
import SaveIcon from '@/components/icons/SaveIcon.vue';
import { useTimerStore } from '@/stores/timer';

const tabs: SettingsTabItem[] = [
  {
    text: "Time",
    value: SettingsTab.Time
  },
  {
    text: "Preferences",
    value: SettingsTab.Preferences
  },
  {
    text: "Themes",
    value: SettingsTab.Themes
  },
  {
    text: "Notifications",
    value: SettingsTab.Notifications
  }
];

const tabComponents = {
  [SettingsTab.Time]: SettingsTimeTab,
  [SettingsTab.Notifications]: SettingsNotificationTab,
  [SettingsTab.Themes]: SettingsThemesTab,
  [SettingsTab.Preferences]: SettingsPreferencesTab
}

const currentTab = ref<SettingsTabItem>(tabs[0]);
const currentTabComponentRef = ref();
const timerStore = useTimerStore();

const handleSelect = (tab: SettingsTabItem) => {
  currentTab.value = tab;
  playClick();
}

const onSaveClicked = () => {
  playBack();
  currentTabComponentRef.value.save();
  timerStore.reloadSettings();
}
</script>

<template>
  <div class="main rounded-b-lg flex flex-col items-center select-none justify-center">
    <!-- main content    -->
    <div class="flex w-full h-full gap-2 p-3">
      <!-- sidebar -->
      <nav class="flex gap-1 flex-col border rounded border-[--color-border] justify-between">
        <h1 class="text-center text-xl border-b p-2 border-[--color-border]">
          Settings
        </h1>

        <div class="flex flex-col">
          <button
            v-for="(item, key) in tabs"
            :key="key"
            class="
              flex border-[--color-shadow] px-3 py-1 text-sm items-center rounded m-1
              text-[--color-text-primary]
              hover:text-[--color-hover]
              bg-[--color-surface]
              "
            :class="{
              'bg-transparent text-[--color-text-secondary]': item.value != currentTab.value
            }"
            @click="handleSelect(item)"
          >
            {{ item.text }} 
          </button>
        </div>
      </nav>

      <!-- content -->
      <div class="border flex-grow p-3 rounded border-[--color-border]">
        <!-- local navbar -->
        <div class="border-b p-1 border-[--color-border] flex justify-between items-center">
          <label>
            {{ currentTab.text }}
          </label>

          <button @click="onSaveClicked">
            <SaveIcon class="hover:bg-[--color-background]" />
          </button>
        </div>
        <!-- tab content -->
        <component 
          :is="tabComponents[currentTab.value]"
          ref="currentTabComponentRef"
          class="py-4"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  position: absolute;
  z-index: 100;
  width: var(--view-w);
  height: var(--view-h);
  background-color: var(--color-background);
  color: var(--color-text-primary);
}
</style>