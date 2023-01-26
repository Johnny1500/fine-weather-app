<template>
  <div></div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type {
  CurrentWeatherDataForRender,
  CityLocalStorageItem,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import useCurrentWeatherDataForRender from "@/composables/useCurrentWeatherDataForRender";
import {
  getFineWeatherCitiesFromLocalStorage,
  removeWeatherCityItemFromLocalStorage,
} from "@/composables/useFineWeatherLocalStorage";

import CityCurrentWeatherCard from "@/components/CityCurrentWeatherCard.vue";

const fineWeatherCitiesLocalStorage: Ref<CityLocalStorageItem[]> = ref([]);
const currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);

const loadingWeatherData = ref(false);

onMounted(async () => {
  loadingWeatherData.value = true;

  fineWeatherCitiesLocalStorage.value = getFineWeatherCitiesFromLocalStorage();

  const promises = fineWeatherCitiesLocalStorage.value.map(
    ({ lat, lon, cityItemFullName }: CityLocalStorageItem) => {
      // const {lat, lon} = city;
      return useCurrentWeatherDataForRender(lat, lon);
    }
  );

  const results:CurrentWeatherDataForRender[] = await Promise.all(promises);

  console.group("City Block values");
  console.log(
    "fineWeatherCitiesLocalStorage.value === ",
    fineWeatherCitiesLocalStorage.value
  );
  console.log("promises", promises);
  console.log('results', results);
  console.groupEnd();

  loadingWeatherData.value = false;
});
</script>

<style scoped></style>
