<template>
  <div class="animate-pulse min-w-[300px]">
    <section
      class="bg-stone-100 shadow-inner rounded-lg p-4 mt-3 divide-gray-400 divide-y-2"
    >
      <div class="text-2xl pb-2">
        <div class="h-[1.8rem] rounded-full bg-weather-primary mb-1"></div>
        <div class="h-[1.8rem] rounded-full bg-weather-primary"></div>
      </div>
      <div class="py-3">
        <div class="flex flex-row items-center gap-3">
          <div class="w-full h-12 rounded-full bg-weather-primary"></div>
        </div>
        <div class="h-[1.8rem] rounded-full bg-weather-primary mt-5"></div>
      </div>
      <div class="pt-3">
        <div
          v-for="item in Array.from({ length: 8 })"
          class="h-5 rounded-full bg-weather-primary mb-2"
        ></div>
      </div>
    </section>
    <section
      class="bg-stone-100 rounded-lg shadow-inner mt-3 p-4 divide-gray-400 divide-y-2"
    >
      <div class="h-[1.8rem] rounded-full bg-weather-primary mb-2"></div>
      <div class="pt-3 hidden md:block">
        <div class="h-[1.5rem] rounded-full bg-weather-primary"></div>
        <div class="pt-3">
          <div
            v-for="item in Array.from({ length: 8 })"
            class="h-5 rounded-full bg-weather-primary mb-2"
          ></div>
        </div>
      </div>
      <div class="block md:hidden pt-1 divide-gray-400 divide-y-2">
        <div v-for="item in Array.from({ length: 5 })" class="pt-3">
          <div class="h-[1.5rem] rounded-full bg-weather-primary mb-3"></div>
          <div
            v-for="item in Array.from({ length: 8 })"
            class="h-5 rounded-full bg-weather-primary mb-2"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
