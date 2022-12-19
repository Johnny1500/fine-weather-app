<template>
  <div>
    <div v-if="!loadingWeatherData">
      <p class="text-xl">Current weather</p>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type {
  CurrentWeatherData,
  CurrentWeatherDataForRender,
  ForecastWeatherData,
  ForecastItemWeatherDataForRender,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { dateAndTimeForRemote, degreesToWindDirection } from "../utility";

const route = useRoute();

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
let forecastWeatherDataForRender: Ref<
  ForecastItemWeatherDataForRender[] | null
> = ref(null);

onMounted(async () => {
  loadingWeatherData.value = true;

  const currentWeatherData = await useOpenWeatherData<CurrentWeatherData>(
    lat,
    lon,
    "weather"
  );
  const forecastWeatherData = await useOpenWeatherData<ForecastWeatherData>(
    lat,
    lon,
    "forecast"
  );

  currentWeatherDataForRender.value = {
    date: dateAndTimeForRemote(
      currentWeatherData.dt,
      currentWeatherData.timezone
    ),
    weather_description: currentWeatherData.weather[0].description,
    temp: currentWeatherData.main.temp,
    feels_like: currentWeatherData.main.feels_like,
    picture: currentWeatherData.weather[0].icon,
    pressure: currentWeatherData.main.pressure,
    humidity: currentWeatherData.main.pressure,
    wind_speed: currentWeatherData.wind.speed,
    wind_direction: degreesToWindDirection(currentWeatherData.wind.deg),
  };
  
  console.log("currentWeatherData.value === ", currentWeatherData);
  console.log("forecastWeatherData.value === ", forecastWeatherData);
  console.log(
    "currentWeatherDataForRender.value === ",
    currentWeatherDataForRender.value
  );

  loadingWeatherData.value = false;
});
</script>

<style lang="scss" scoped></style>
