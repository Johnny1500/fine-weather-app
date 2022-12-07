<template>
  <div>
    <Suspense>
      <CityWeatherData />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import CityWeatherData from "@/components/CityWeatherData.vue";
</script>

<style lang="scss" scoped></style>
