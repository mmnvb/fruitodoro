<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue';
import HomeView from '@/views/HomeView.vue';
import { Tab } from './types/Navigation';

import { ref } from 'vue';

const tabName = ref<Tab>(Tab.Home);

const handleTabSwicth = (givenTab: Tab) => {
  tabName.value = givenTab;
}

</script>

<template>
  <TitleBar 
    @on-tab="handleTabSwicth" 
  />
  <HomeView v-model="tabName" />
</template>

