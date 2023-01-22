<template>
  <div>
    <div class="mx-auto mt-10 p-2 min-w-[300px] max-w-fit">
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
        </section>
        <section class="bg-stone-100 rounded-lg shadow-inner mt-3 p-2">
          <h2 class="text-2xl">Forecast for 5 days</h2>
          <div
            class="border-4 border-dashed border-yellow-500 hidden md:block md:h-fit text-xl py-2"
          >
            <Carousel
              :slide-count="forecastWeatherDataForRender?.length"
              v-slot="{ currentSlide }"
            >
              <Slide
                v-for="(slide, index1) in forecastWeatherDataForRender"
                key="index1"
              >
                <div v-show="currentSlide === index1" class="absolute">
                  <p class="mb-1">
                    {{
                      slide[0].dateArr[1] +
                      ", " +
                      slide[0].dateArr[2] +
                      " " +
                      slide[0].dateArr[3]
                    }}
                  </p>
                  <table>
                    <tbody>
                      <tr
                        v-for="item in forecastWeatherDataForRender[index1]"
                        class="pb-1"
                      >
                        <td class="px-2">
                          {{ item.dateArr[4] }}
                        </td>
                        <td class="pr-3">
                          {{ item.temp }}
                        </td>
                        <td>
                          <img
                            :src="getImageUrl(item?.picture)"
                            alt="current weather"
                            class="w-8"
                          />
                        </td>
                        <td>
                          {{ item.weather_description }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Slide>
            </Carousel>
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

import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";

const route = useRoute();

// console.log("route.path", route.path);

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
let forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);
let queryCity = ref(route.query.fullName);

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
