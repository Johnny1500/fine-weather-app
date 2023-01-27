<template>
  <div class="divide-gray-400 divide-y-2">
    <div class="relative text-2xl pb-2">
      <h1>
        {{ cityFullName }}
      </h1>
      <h1>
        {{ currentWeatherDataForRender?.dateArr[0] }}
      </h1>
      <button
        @click="handleSetItem"
        class="w-8 h-8 absolute top-1 right-1 text-xl hover:bg-weather-green hover:text-white duration-150 cursor-pointer rounded-full"
        v-if="!savedToLocalStorageCityCard"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
      <div class="absolute flex flex-row top-1 right-1">
        <button
          class="w-8 h-8 text-xl hover:bg-weather-green hover:text-white duration-150 cursor-pointer rounded-full"
          v-if="homeView"
        >
          <i class="fa-solid fa-circle-info"></i>
        </button>
        <button
          @click="handleRemoveItem"
          class="w-8 h-8 text-xl hover:bg-red-500 hover:text-white duration-150 cursor-pointer rounded-full"
          v-if="savedToLocalStorageCityCard"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
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
          <div>
            <div>{{ currentWeatherDataForRender?.wind_speed }},</div>
            <p>
              {{ currentWeatherDataForRender?.wind_direction }}
            </p>
          </div>
        </div>
        <div class="mx-0 w-full max-w-fit">
          <img
            src="../assets/weather-kind-pictures/humidity.png"
            alt="humidity"
            class="w-8 inline"
          />
          <p class="inline">
            {{ currentWeatherDataForRender?.humidity }}
          </p>
        </div>
        <div class="mx-0 w-full max-w-fit">
          <img
            src="../assets/weather-kind-pictures/pressure.png"
            alt="pressure"
            class="w-8 inline mr-2"
          />
          <p class="inline">
            {{ currentWeatherDataForRender?.pressure }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrentWeatherDataForRender } from "../interfaces";

import { ref, toRefs } from "vue";

import { getImageUrl } from "@/utility";

const emit = defineEmits([
  "setItemToLocalStorage",
  "removeItemFromLocalStorage",
]);
const props = withDefaults(
  defineProps<{
    currentWeatherDataForRender: CurrentWeatherDataForRender | null;
    cityFullName: string | undefined;
    savedToLocalStorage?: boolean;
    homeView?: boolean;
  }>(),
  {
    savedToLocalStorage: false,
    homeView: false,
  }
);

const {
  currentWeatherDataForRender,
  cityFullName,
  savedToLocalStorage,
  homeView,
} = toRefs(props);
const savedToLocalStorageCityCard = ref(savedToLocalStorage.value);

const handleSetItem = (): void => {
  emit("setItemToLocalStorage", cityFullName.value);
  savedToLocalStorageCityCard.value = true;
};

const handleRemoveItem = (): void => {
  emit("removeItemFromLocalStorage", cityFullName.value);
  savedToLocalStorageCityCard.value = false;
};
</script>

<style scoped>
.container-weather-parameter {
  max-width: fit-content;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
}

.unit {
  display: inline-block;
}

</style>