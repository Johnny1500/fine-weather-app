<template>
  <div>
    <div class="mx-auto mt-10 p-2 md:w-1/2 lg:w-1/3">
      <div v-if="!loadingWeatherData">
        <section class="bg-stone-100 shadow-inner rounded-lg p-2">
          <h2 class="text-2xl">
            {{ currentWeatherDataForRender?.dateArr[0] }}
          </h2>
          <div class="border-4 border-dashed border-purple-500 h-56 pt-2 pl-4">
            <div class="flex flex-row items-center gap-3">
              <p class="text-5xl">{{ currentWeatherDataForRender?.temp }}</p>
              <img
                :src="getImageUrl(currentWeatherDataForRender?.picture)"
                alt="current weather"
                class="w-12"
              />
              <div class="text-xl">
                <p class="first-letter:uppercase">
                  {{ currentWeatherDataForRender?.weather_description }}
                </p>
                <p>Feels like {{ currentWeatherDataForRender?.feels_like }}</p>
              </div>
            </div>
            <div class="flex flex-row items-center gap-5 pt-2">
              <div class="flex flex-row items-center gap-2">
                <img
                  src="../assets/weather-kind-pictures/wind.png"
                  alt="wind"
                  class="w-8"
                />
                <p>
                  {{ currentWeatherDataForRender?.wind_speed }},
                  {{ currentWeatherDataForRender?.wind_direction }}
                </p>
              </div>
              <div class="flex flex-row items-center">
                <img
                  src="../assets/weather-kind-pictures/humidity.png"
                  alt="humidity"
                  class="w-8"
                />
                <p>
                  {{ currentWeatherDataForRender?.humidity }}
                </p>
              </div>
              <div class="flex flex-row items-center gap-2">
                <img
                  src="../assets/weather-kind-pictures/pressure.png"
                  alt="pressure"
                  class="w-8"
                />
                <p>
                  {{ currentWeatherDataForRender?.pressure }}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-stone-100 rounded-lg shadow-inner mt-3 p-2">
          <h2 class="text-2xl">Forecast for 5 days</h2>
          <div
            class="border-4 border-dashed border-yellow-500 hidden md:block md:h-56 text-xl pt-2"
          >
            Forecast weather
          </div>
          <div
            class="border-4 border-dashed border-yellow-500 block md:hidden text-xl mt-2"
          >
            <p
              v-for="day in Array.from({ length: 5 })"
              class="border-4 border-dashed border-orange-500 py-2"
            >
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

const getImageUrl = (picture: string | undefined) => {
  if (picture)
    return new URL(`../assets/weather-pictures/${picture}.png`, import.meta.url)
      .href;
  return new URL(`../assets/weather-pictures/unknown.png`, import.meta.url)
    .href;
};

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
