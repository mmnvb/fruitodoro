<script setup lang="ts">
import FruitImage from '@/components/FruitImage.vue';
import ChangeTheme from '@/components/ChangeTheme.vue';
import TimerLayout from '@/components/TimerLayout.vue';
import FluidAnimation from '@/components/FluidAnimation.vue';

import SoundBoardView from "@/views/SoundBoardView.vue";
import InventoryView from '@/views/InventoryView.vue';
import SettingsView from './settings/SettingsView.vue';

import { Tab } from '@/types/Navigation';
import { ref } from 'vue';

const imgName = ref();
const tabName = defineModel<Tab>({default: Tab.Home});

const imgUpdate = (givenName: string) => {
  imgName.value = givenName;
}
</script>

<template>
  <!-- full screen fluid animation -->
  <FluidAnimation />

  <!-- Tab -->
  <SoundBoardView :class="{'hidden': tabName != Tab.Disc}" />
  <InventoryView v-if="tabName == Tab.Inventory" />
  <SettingsView v-if="tabName == Tab.Settings" />

  <!-- main -->
  <div 
    class="
    main flex items-center
    justify-around rounded-b-lg
    relative
    "
  >
    <!-- left -->
    <div class="w-2/4 h-full flex flex-col">
      <ChangeTheme @update-img="imgUpdate" />
      <FruitImage
        v-if="imgName"
        :img-name="imgName"
        class="z-10 mt-4"
      />
    </div>
    
    <!-- right -->
    <TimerLayout class="mt-4 z-10" />
  </div>
</template>

<style scoped>
.main{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  width: var(--view-w);
  height: var(--view-h);
}
</style>
