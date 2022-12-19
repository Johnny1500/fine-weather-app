<template>
  <div>
    <div
      class="border-4 border-dashed border-red-500 w-full mx-auto mt-10 p-2 md:w-3/4"
    >
      <div v-if="!loadingWeatherData">
        <section class="border-4 border-dashed border-blue-500 rounded-lg p-2">
          <h2 class="text-2xl">Current weather</h2>
          <div class="border-4 border-dashed border-purple-500 h-56 pt-2">
            <p class="text-xl">{{ currentWeatherDataForRender?.feels_like }}</p>
          </div>
        </section>
        <section class="border-4 border-dashed border-green-500 rounded-lg mt-3 p-2">
          <h2 class="text-2xl">Forecast</h2>
          <div class="border-4 border-dashed border-yellow-500 hidden md:block md:h-56 text-xl pt-2">
            Forecast weather
          </div>
          <div class="border-4 border-dashed border-yellow-500 block md:hidden text-xl mt-2">
            <p v-for="day in Array.from({ length:5 })" class="border-4 border-dashed border-orange-500 py-2">
              Forecast weather2
            </p>
          </div>
        </section>
      </div>
      <div v-else>
        <p class="text-xl">Loading...</p>
      </div>
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

  currentWeatherDataForRender.value = await useCurrentWeatherDataForRender(
    lat,
    lon
  );
  forecastWeatherDataForRender.value = await useForecastWeatherDataForRender(
    lat,
    lon
  );

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
