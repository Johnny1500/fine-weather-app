<template>
  <header class="sticky z-10 top-0 bg-weather-primary shadow-lg">
    <nav class="container py-4">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <img :src="titleImageUrl" class="w-10 h-10" />
          <p class="text-2xl">Fine Weather</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import titleImageUrl from "@/assets/weather-pictures/01d.png";
</script>
