<template>
  <div class="divide-gray-400 divide-y-2">
    <div class="text-2xl pb-2">
      <h1>
        {{ queryCity }}
      </h1>
      <h1>
        {{ currentWeatherDataForRender?.dateArr[0] }}
      </h1>
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
  </div>
</template>

<script setup lang="ts">
import type { CurrentWeatherDataForRender } from "../interfaces";

import { toRefs } from "vue";

import { getImageUrl } from "@/utility";

const props = defineProps<{
  currentWeatherDataForRender: CurrentWeatherDataForRender | null;
  queryCity: string | undefined;
}>();

const { currentWeatherDataForRender, queryCity } = toRefs(props);
</script>
