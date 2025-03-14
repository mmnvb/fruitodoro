<script setup lang="ts">
import { onMounted, ref } from 'vue';

import LeftArrowIcon from './icons/LeftArrowIcon.vue'
import RightArrowIcon from './icons/RightArrowIcon.vue'

import { playClick } from '@/misc/audio';

import themeData from '../assets/themes.json';
import type { ColorPalette, InventoryItem, Themes } from '@/types/Themes';
import type { NavigationDirection } from '@/types/Navigation';


const themes: Themes = themeData;

const index = ref(0);
const emit = defineEmits(['updateImg']);
const fruitName = ref();

const applyTheme = (theme: string) => {
  const root = document.documentElement;
  const themeColors = themes[theme].colors;

  // change colors
  Object.keys(themeColors).forEach((key) => {
    root.style.setProperty(
      key as keyof ColorPalette,
      themeColors[key as keyof ColorPalette]
    );
  });
}

const changeImage = (theme: string) => {
  const img = themes[theme].img;
  emit('updateImg', img);
}

const setTheme = (themeName: string) => {
  applyTheme(themeName);
  changeImage(themeName);
  fruitName.value = themeName;
  localStorage.setItem('selectedTheme', themeName);
}

const nextTheme = (direction: NavigationDirection) => {
  playClick();
  index.value += (direction == "left" ? -1 : 1);

  const keys = Object.keys(themes);
  const current = keys[index.value];

  if(current){
    setTheme(current);
    return
  }
  
  else if(keys.length > 0){
    index.value = (direction == "left" ? (keys.length - 1) : 0);
    setTheme(keys[index.value]);
  }
}

const initInventory = () => {
  const inventory = localStorage.getItem('inventory');

  if(!inventory){
    const obj: Record<string, InventoryItem> = {}

    Object.keys(themes).forEach((key: string)=>{
      obj[key] = {
        count: 0,
        img: themes[key].img as string,
        name: key
      }
    })

    localStorage.setItem('inventory', JSON.stringify(obj));
  }
}

onMounted(()=>{
  const savedTheme = localStorage.getItem('selectedTheme');
  initInventory();

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('plum');
  }
})

</script>

<template>
  <div
    class="
    absolute w-full h-1/6 z-30 top-1
    flex items-center justify-around
    select-none
    "
  >
    <div class="pair" />

    <div class="flex w-3/4 justify-around items-center h-full">
      <LeftArrowIcon 
        class="btn"
        @click="nextTheme('left')"
      />
      <p 
        class="name w-3/4 text-center text-xl"
      >
        {{ fruitName }}
      </p>
      <RightArrowIcon
        class="btn"
        @click="nextTheme('right')"
      />
    </div>

    <div class="pair" />
  </div>
</template>

<style scoped>
.btn:hover{
  color: var(--color-hover);
}

.sec{
  color: var(--color-text-secondary);
}

.name{
  color: var(--color-primary);
  color: "#FFD966";
}

.pair{
  width: 12.5%;
}
</style>