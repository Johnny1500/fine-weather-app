<template>
  <div>
    {{ $route.params.cityname }}
    {{ $route.query.lat }}
    {{ $route.query.lon }}
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";

const route = useRoute();

const getCurrentWeatherData = async () => {
  try {
    const lat = route.query.lat;
    const lon = route.query.lon;

    console.log("lat ===", lat);
    console.log("lon ===", lon);

    const response = await fetch(`${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`);
    const currentWeatherData = await response.json();

    console.dir(currentWeatherData);

    return currentWeatherData;

  } catch (error) {
    console.log("error during fetch", error);
  }
};

onMounted(getCurrentWeatherData);

</script>
