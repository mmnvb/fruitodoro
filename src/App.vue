<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TitleBar from './components/TitleBar.vue';
import HomeView from './views/HomeView.vue'

import { ref } from 'vue';

const tabName = ref('home');

const handleTabSwicth = (e) => {
  tabName.value = e;
}

</script>

<template>
  <TitleBar 
    @on-tab="handleTabSwicth" 
  />
  <HomeView v-model="tabName"/>
</template>

