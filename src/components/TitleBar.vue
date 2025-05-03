<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';
import MinimizeIcon from './icons/MinimizeIcon.vue';
import CloseIcon from './icons/CloseIcon.vue';
import DotsIcon from './icons/DotsIcon.vue';
import DiscIcon from "./icons/DiscIcon.vue";
import WarehouseIcon from './icons/WarehouseIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';
import GithubIcon from './icons/GithubIcon.vue';
import { playClick, playBack } from '@/misc/audio';
import { ref } from 'vue';

import { Tab } from '@/types/Navigation';

const emit = defineEmits(['onTab']);

const hide = () => {
  setTimeout(()=>{
    appWindow.hide();
  }, 10);
}

const isOpen = ref(false);
const lastTab = ref<Tab | null>();

const sendEmit = (tab: Tab) => {
  if(lastTab.value == tab){
    playBack();
    goHome();
    return;
  }

  playClick();
  emit('onTab', tab);
  lastTab.value = tab;
}

const goHome = () => {
  emit('onTab', Tab.Home);
  lastTab.value = null;
}

const autoClose = () =>{
  if(isOpen.value){
    playBack();
    goHome();
  }else{
    playClick();
  }
  isOpen.value = !isOpen.value;
}

</script>

<template>
  <div
    data-tauri-drag-region
    class="titlebar rounded-t-lg flex justify-between items-center"
  >
    <div class="flex">
      <DotsIcon 
        class="ml-3 btn"
        @click="autoClose"
      />
      
      <div 
        class="flex items-center ml-3 gap-4"
        :class="{'hidden': !isOpen}"
      >
        <DiscIcon 
          @click="sendEmit(Tab.Disc)"
          class="micro"
        />
        <WarehouseIcon
          @click="sendEmit(Tab.Inventory)" 
          class="micro"
        />

        <SettingsIcon
          @click="sendEmit(Tab.Settings)" 
          class="micro"
        />
        <a 
          href="https://github.com/mmnvb/fruitodoro"
          target="_blank"
        >
          <GithubIcon 
            @click="playClick();" 
            class="micro"
          />
        </a>
      </div>
    </div>

    <div class="flex">
      <MinimizeIcon 
        class="btn mr-3"
        @click="hide()"
      />

      <CloseIcon 
        class="btn mr-3"
        @click="appWindow.close()"
      />
    </div>
  </div>
</template>

<style>
.titlebar {
  height: 30px;
  background: var(--color-primary);;
  color: var(--color-text-primary);;
  user-select: none;
}

.micro{
  width: 19px;
  height: 19px;
}

.btn{
  width: 21px;
  height: 21px;
}

.btn:hover, .micro:hover{
  color: var(--color-background);
  cursor: pointer;
}

.btn:active{
  color: var(--color-secondary);
}
</style>