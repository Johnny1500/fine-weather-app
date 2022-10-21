<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6">
      <RouterLink :to="{ name: 'home'}">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-cloud text-2xl"></i>
          <p class="text-2xl">Fine Weather</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
