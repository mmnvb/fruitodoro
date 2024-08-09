<script setup>
import themes from '../assets/themes.json'
import { onMounted, ref } from 'vue';
import LeftArrowIcon from '../components/icons/LeftArrowIcon.vue'
import RightArrowIcon from '../components/icons/RightArrowIcon.vue'

const index = ref(0);
const emit = defineEmits(['updateImg']);
const fruitName = ref();

const applyTheme = (theme) => {
  const root = document.documentElement;
  const themeColors = themes[theme].colors;

  // change colors
  Object.keys(themeColors).forEach((key) => {
    root.style.setProperty(key, themeColors[key]);
  });
}

const changeImage = (theme) => {
  const img = themes[theme].img;
  emit('updateImg', img);
}

const setTheme = (themeName) => {
  applyTheme(themeName);
  changeImage(themeName);
  fruitName.value = themeName;
  localStorage.setItem('selectedTheme', themeName);
}

const nextTheme = (direction) => {
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

onMounted(()=>{
  const savedTheme = localStorage.getItem('selectedTheme');

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
    fixed w-full h-1/6 z-10
    flex items-center justify-around
    select-none
    "
  >
    <LeftArrowIcon class="btn" @click="nextTheme('left')"/>
    <p class="name w-28 text-center text-xl">{{ fruitName }}</p>
    <RightArrowIcon  class="btn" @click="nextTheme('right')" />
  </div>
</template>

<style scoped>
.btn:hover{
  color: var(--color-border);
}

.name{
  color: var(--color-primary);
  color: "#FFD966";
}
</style>