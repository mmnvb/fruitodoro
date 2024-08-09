<script setup>
import themes from '../assets/themes.json'
import { onMounted, ref } from 'vue';

const index = ref(0);
const emit = defineEmits(['updateImg']);

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
  localStorage.setItem('selectedTheme', themeName);
}

const nextTheme =() => {
  const keys = Object.keys(themes);
  const next = keys[index.value];

  if(next){
    setTheme(next);
    index.value++;
    return
  }
  else if(keys.length > 0){
    index.value = 0;
    nextTheme();
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
  <div class="fixed w-2/4 h-1/6 z-10 border" @click="nextTheme()"></div>
  <!-- sdds -->
</template>