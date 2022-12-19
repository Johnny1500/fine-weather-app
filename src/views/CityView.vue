<template>
  <div>
    <div v-if="!loadingWeatherData">
      <p class="text-xl">Current weather</p>
      <p class="text-xl">{{ currentWeatherDataForRender?.feels_like  }}</p>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type {  
  CurrentWeatherDataForRender,  
  ForecastItemWeatherDataForRender,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import useCurrentWeatherDataForRender from "@/composables/useCurrentWeatherDataForRender";
import useForecastWeatherDataForRender from "@/composables/useForecastWeatherDataForRender";

const route = useRoute();

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
let forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);

onMounted(async () => {
  loadingWeatherData.value = true;
  
  currentWeatherDataForRender.value = await useCurrentWeatherDataForRender(lat, lon);
  forecastWeatherDataForRender.value = await useForecastWeatherDataForRender(lat, lon);  
   
  console.log(
    "currentWeatherDataForRender.value === ",
    currentWeatherDataForRender.value
  );  
  console.log(
    "forecastWeatherDataForRender.value === ",
    forecastWeatherDataForRender.value
  );

  loadingWeatherData.value = false;
});
</script>

<style lang="scss" scoped></style>
