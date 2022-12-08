<template>
  <div>   
    <div v-if="!loadingWeatherData">
      <p>{{ currentWeatherData["name"] }}</p>      
      <p>{{ currentWeatherData["id"] }}</p>
      <p>{{ currentWeatherData["dt"] }}</p>
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

const route = useRoute();

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherData: Ref<any> = ref({});
let forecastWeatherData: Ref<any> = ref({});

console.log("lat ===", lat);
console.log("lon ===", lon);

onMounted(async () => {
  loadingWeatherData.value = true;

  currentWeatherData.value = await useOpenWeatherData(lat, lon, "weather");
  forecastWeatherData.value = await useOpenWeatherData(lat, lon, "forecast");

  console.log("currentWeatherData.value === ", currentWeatherData.value);
  console.log("forecastWeatherData.value === ", forecastWeatherData.value);

  loadingWeatherData.value = false;
});

// const currentWeatherData = useOpenWeatherData(lat, lon, "weather");

// console.log('currentWeatherData ===', currentWeatherData);

// const getCurrentWeatherData = async () => {
//   try {
//     const response = await fetch(
//       `${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
//     );
//     const currentWeatherData = await response.json();

//     console.log(
//       "currentWeatherData",
//       JSON.stringify(currentWeatherData, null, 2)
//     );

//     console.dir(currentWeatherData);

//     return currentWeatherData;
//   } catch (error) {
//     console.log("error during fetch", error);
//   }
// };

// const getForecastWeatherData = async () => {
//   try {
//     const response = await fetch(
//       `${OPEN_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
//     );

//     const forecastWeatherData = await response.json();

//     console.log(
//       "forecastWeatherData",
//       JSON.stringify(forecastWeatherData, null, 2)
//     );

//     console.dir(forecastWeatherData);
//   } catch (error) {
//     console.log("error during fetch", error);
//   }
// };

// onMounted(async () => {
//   await getCurrentWeatherData();
//   await getForecastWeatherData();
// });
</script>

<style lang="scss" scoped></style>
