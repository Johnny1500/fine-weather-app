<template>
  <div>
    <div v-if="!loadingWeatherData">
      <p>{{ currentWeatherData?.name }}</p>
      <p>{{ currentWeatherData?.id }}</p>
      <p>{{ currentWeatherData?.dt }}</p>
      <p>{{ currentWeatherData?.remoteTime }}</p>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type { CurrentWeatherData, ForecastWeatherData } from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { timeForRemote } from "../utility";

const route = useRoute();

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherData: Ref<CurrentWeatherData | null> = ref(null);
let forecastWeatherData: Ref<ForecastWeatherData | null> = ref(null);

console.log("lat ===", lat);
console.log("lon ===", lon);

onMounted(async () => {
  loadingWeatherData.value = true;

  currentWeatherData.value = await useOpenWeatherData<CurrentWeatherData>(
    lat,
    lon,
    "weather"
  );
  forecastWeatherData.value = await useOpenWeatherData<ForecastWeatherData>(
    lat,
    lon,
    "forecast"
  );
  
  currentWeatherData.value.remoteTime = timeForRemote(
    currentWeatherData.value.dt,
    currentWeatherData.value.timezone
  );

  console.log("currentWeatherData.value === ", currentWeatherData.value);
  console.log("forecastWeatherData.value === ", forecastWeatherData.value);

  loadingWeatherData.value = false;
});
</script>

<style lang="scss" scoped></style>
