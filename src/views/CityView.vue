<template>
  <div>   
    <div v-if="!loadingWeatherData">
      <p>{{ currentWeatherData?.name }}</p>      
      <p>{{ currentWeatherData?.id }}</p>
      <p>{{ currentWeatherData?.dt }}</p>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";
import useOpenWeatherData from "@/composables/useOpenWeatherData";
import type { CurrentWeatherData, ForecastWeatherData } from "../interfaces";

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

  currentWeatherData.value = await useOpenWeatherData<CurrentWeatherData>(lat, lon, "weather");
  forecastWeatherData.value = await useOpenWeatherData<ForecastWeatherData >(lat, lon, "forecast");

  console.log("currentWeatherData.value === ", currentWeatherData.value);
  console.log("forecastWeatherData.value === ", forecastWeatherData.value);

  loadingWeatherData.value = false;
});

</script>

<style lang="scss" scoped></style>
