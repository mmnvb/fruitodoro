<script setup>
import { appWindow } from '@tauri-apps/api/window';
import MinimizeIcon from './icons/MinimizeIcon.vue';
import CloseIcon from './icons/CloseIcon.vue';

const hide = () => {
  setTimeout(()=>{
    appWindow.hide();
  }, 10);
}
</script>

<template>
  <!-- dsds -->
  <div
    data-tauri-drag-region
    class="titlebar rounded-t-lg"
  >
    <div 
      class="titlebar-button rounded mr-3"
      @click="hide()"
    >
      <MinimizeIcon />
    </div>

    <div 
      class="titlebar-button rounded mr-3"
      @click="appWindow.close()"
    >
      <CloseIcon />
    </div>
  </div>
</template>

<style>
.titlebar {
  height: 30px;
  background: var(--color-primary);;
  color: var(--color-text-primary);;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  height: 21px;
}
.titlebar-button:hover {
  color: var(--color-background);  
}
.titlebar-button:active{
  color: var(--color-secondary);
}
</style>