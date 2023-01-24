<template>
  <header class="sticky z-10 top-0 bg-weather-primary shadow-lg">
    <nav class="container py-4 flex flex-col sm:flex-row items-center">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <img :src="titleImageUrl" class="w-10 h-10" />
          <p class="text-2xl">Fine Weather</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import titleImageUrl from "@/assets/weather-pictures/01d.png";
</script>
