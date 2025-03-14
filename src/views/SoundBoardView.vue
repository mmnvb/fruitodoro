<script setup lang="ts">
import SoundCard from '@/components/SoundCard.vue';
import NightIcon from '@/components/icons/NightIcon.vue'
import OceanIcon from '@/components/icons/OceanIcon.vue'
import ThunderIcon from '@/components/icons/ThunderIcon.vue'
import WaveIcon from '@/components/icons/WaveIcon.vue'
import RainIcon from '@/components/icons/RainIcon.vue'
import BirdIcon from '@/components/icons/BirdIcon.vue'
</script>

<template>
  <div class="main rounded-b-lg flex flex-col items-center select-none">
    <h1 class="text-center mt-4 text-xl">
      Ambient sounds
    </h1>
    
    <!-- Cards -->
    <div class="flex flex-wrap items-center justify-center w-4/5 h-4/5 gap-3 mb-4 mt-4">
      <SoundCard audio-name="night.ogg">
        <NightIcon />
      </SoundCard>

      <SoundCard audio-name="ocean.ogg">
        <OceanIcon />
      </SoundCard>

      <SoundCard audio-name="thunder.ogg">
        <ThunderIcon />
      </SoundCard>

      <SoundCard audio-name="noise.ogg">
        <WaveIcon />
      </SoundCard>

      <SoundCard audio-name="rain.ogg">
        <RainIcon />
      </SoundCard>

      <SoundCard audio-name="birds.ogg">
        <BirdIcon />
      </SoundCard>
    </div>
  </div>
</template>

<style scoped>
.main{
  position: absolute;
  z-index: 100;
  width: var(--view-w);
  height: var(--view-h);
  background-color: var(--color-background);
  color: var(--color-text-primary);
}
</style>