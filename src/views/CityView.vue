<template>
  <div>
    {{ $route.params.cityname }}
    {{ $route.params.lat }}
    {{ $route.params.lon }}
  </div>
</template>

<script lang="ts" setup>
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";
import { onMounted } from "vue";
import router from "../router";

onMounted(async () => {
  // console.log('route', router);

  try {
    const lat = router.currentRoute.value.params.lat;
    const lon = router.currentRoute.value.params.lon;

    console.log("lat ===", lat);
    console.log("lon ===", lon);

    const response = await fetch(`${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`);
    const weatherData = await response.json();

    console.dir(weatherData);


  } catch (error) {

    console.log('error during fetch', error);

  }
});
</script>

<style lang="scss" scoped></style>
