<template>
  <div class="mt-10">
    <div v-if="!loadingWeatherData">
      <div
        v-if="currentWeatherDataForRenderArr.length > 0"
        class="flex flex-col lg:flex-row items-center justify-center gap-5"
      >
        <section
          class="min-w-[20rem] w-fit bg-stone-100 shadow-inner rounded-lg p-4"
          v-for="(item, index) in currentWeatherDataForRenderArr"
        >
          <CityCurrentWeatherCard
            :current-weather-data-for-render="item"
            :city-full-name="item.city_full_name"
            :saved-to-local-storage="true"
            :home-view="true"
            @remove-item-from-local-storage="
              removeWeatherCityItemFromLocalStorageFromHomeView
            "
          />
        </section>
      </div>
      <div v-else class="flex items-center justify-center">
        <p class="text-xl">You haven't saved cities yet</p>
      </div>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
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
const currentWeatherDataForRenderArr: Ref<CurrentWeatherDataForRender[]> = ref(
  []
);

const removeWeatherCityItemFromLocalStorageFromHomeView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = removeWeatherCityItemFromLocalStorage(
    cityItemFullName,
    fineWeatherCitiesLocalStorage.value
  );

  currentWeatherDataForRenderArr.value =
    currentWeatherDataForRenderArr.value.filter(
      (city) => city.city_full_name !== cityItemFullName
    );

  console.log(
    "currentWeatherDataForRenderArr.value ==",
    currentWeatherDataForRenderArr.value
  );
};

const loadingWeatherData = ref(false);

onMounted(async () => {
  loadingWeatherData.value = true;

  fineWeatherCitiesLocalStorage.value = getFineWeatherCitiesFromLocalStorage();

  const promises: Promise<CurrentWeatherDataForRender>[] =
    fineWeatherCitiesLocalStorage.value.map(
      ({ lat, lon, cityItemFullName }: CityLocalStorageItem) => {
        return useCurrentWeatherDataForRender(lat, lon, cityItemFullName);
      }
    );

  currentWeatherDataForRenderArr.value = await Promise.all(promises);

  console.group("City Block values");
  console.log(
    "fineWeatherCitiesLocalStorage.value === ",
    fineWeatherCitiesLocalStorage.value
  );
  console.log("promises", promises);
  console.log(
    "currentWeatherDataForRenderArr.value",
    currentWeatherDataForRenderArr.value
  );
  console.groupEnd();

  loadingWeatherData.value = false;
});
</script>
