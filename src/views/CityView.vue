<template>
  <div
    class="mx-auto mt-10 p-2 min-w-[300px] max-w-fit flex flex-col items-center justify-center"
  >
    <div v-if="!loadingWeatherData">
      <section
        class="bg-stone-100 shadow-inner rounded-lg p-4 divide-gray-400 divide-y-2"
      >
        <div class="text-2xl pb-2">
          <h2>
            {{ queryCity }}
          </h2>
          <h2>
            {{ currentWeatherDataForRender?.dateArr[0] }}
          </h2>
        </div>
        <div class="max-h-fit py-3">
          <div class="flex flex-row items-center gap-3">
            <p class="text-5xl">{{ currentWeatherDataForRender?.temp }}</p>
            <img
              :src="
                getImageUrl(
                  '../src/assets/weather-pictures/',
                  currentWeatherDataForRender?.picture
                )
              "
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
          <div
            class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5 pt-5"
          >
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
        <div v-if="forecastWeatherDataForRender[0]" class="pt-2">
          <ForecastTable
            :forecast-weather-day-data-for-render="
              forecastWeatherDataForRender[0]
            "
          />
        </div>
      </section>
      <section
        class="bg-stone-100 rounded-lg shadow-inner mt-3 p-4 divide-gray-400 divide-y-2"
      >
        <h2 class="text-2xl pb-2">Forecast for 5 days</h2>
        <div class="hidden md:block md:h-fit text-xl py-2">
          <Carousel
            :slide-count="forecastWeatherDataForRender.slice(1)?.length"
            v-slot="{ currentSlide }"
          >
            <Slide
              v-for="(slide, index1) in forecastWeatherDataForRender.slice(1)"
              :key="slide[0].dt"
            >
              <div v-show="currentSlide === index1" class="absolute">
                <ForecastTable
                  :forecast-weather-day-data-for-render="slide"
                  :show-title="true"
                />
              </div>
            </Slide>
          </Carousel>
        </div>
        <div
          class="border-4 border-dashed border-yellow-500 block md:hidden text-xl mt-2"
        >
          <!-- <p
              v-for="slide in forecastWeatherDataForRender.slice(1)"
              class="border-4 border-dashed border-orange-500 py-2"
            >
              <ForecastTable
                :forecast-weather-day-data-for-render="slide"
                :show-title="true"
              />
            </p> -->
        </div>
      </section>
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

import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import ForecastTable from "@/components/ForecastTable.vue";

import { getImageUrl } from "@/utility";

const route = useRoute();

// console.log("route.path", route.path);

const lat = route.query.lat;
const lon = route.query.lon;

const loadingWeatherData = ref(false);
const currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
const forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);
const queryCity = ref(route.query.fullName);

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
