<template>
  <div
    class="mx-auto mt-10 p-2 min-w-[18.75rem] max-w-fit flex flex-col items-center justify-center"
  >
    <div v-if="!loadingWeatherData">
      <section
        class="bg-stone-100 shadow-inner rounded-lg p-4 divide-gray-400 divide-y-2"
      >
        <CityCurrentWeatherCard
          :current-weather-data-for-render="currentWeatherDataForRender"
          :city-full-name="queryCity?.toLocaleString()"
          :saved-to-local-storage="citySavedToLocalStorage"
          @set-item-to-local-storage="
            setFineWeatherCityItemToLocalStorageFromCityView
          "
          @remove-item-from-local-storage="
            removeWeatherCityItemFromLocalStorageFromCityView
          "
        />

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
        <h1 class="text-2xl pb-1">Forecast for 5 days</h1>
        <div class="hidden h-[25rem] md:block md:h-fit text-xl pt-2">
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
        <div class="block md:hidden text-xl mt-2 divide-gray-400 divide-y-2">
          <p
            v-for="slide in forecastWeatherDataForRender.slice(1)"
            class="py-2"
          >
            <ForecastTable
              :forecast-weather-day-data-for-render="slide"
              :show-title="true"
            />
          </p>
        </div>
      </section>
    </div>
    <div v-else>
      <CartSkeletonWithForecast />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type {
  CurrentWeatherDataForRender,
  ForecastItemWeatherDataForRender,
  CityLocalStorageItem,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import useCurrentWeatherDataForRender from "@/composables/useCurrentWeatherDataForRender";
import useForecastWeatherDataForRender from "@/composables/useForecastWeatherDataForRender";
import {
  setFineWeatherCityItemToLocalStorage,
  getFineWeatherCitiesFromLocalStorage,
  removeWeatherCityItemFromLocalStorage,
} from "@/composables/useFineWeatherLocalStorage";

import Carousel from "@/components/Carousel.vue";
import Slide from "@/components/Slide.vue";
import ForecastTable from "@/components/ForecastTable.vue";
import CartSkeletonWithForecast from "@/components/CartSkeletonWithForecast.vue";
import CityCurrentWeatherCard from "@/components/CityCurrentWeatherCard.vue";

const route = useRoute();

// console.log("route.path", route.path);

const lat = ref(route.query.lat);
const lon = ref(route.query.lon);

const loadingWeatherData = ref(false);
const currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
const forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);
const queryCity = ref(route.query.fullName);
const fineWeatherCitiesLocalStorage: Ref<CityLocalStorageItem[]> = ref([]);
const citySavedToLocalStorage = ref(false);

const setFineWeatherCityItemToLocalStorageFromCityView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = setFineWeatherCityItemToLocalStorage(
    cityItemFullName,
    lat.value?.toLocaleString(),
    lon.value?.toLocaleString(),
    fineWeatherCitiesLocalStorage.value
  );

  console.log(
    "fineWeatherCitiesLocalStorage.value === ",
    fineWeatherCitiesLocalStorage.value
  );
};

const removeWeatherCityItemFromLocalStorageFromCityView = (
  cityItemFullName: string
): void => {
  fineWeatherCitiesLocalStorage.value = removeWeatherCityItemFromLocalStorage(
    cityItemFullName,
    fineWeatherCitiesLocalStorage.value
  );

  console.log(
    "fineWeatherCitiesLocalStorage.value === ",
    fineWeatherCitiesLocalStorage.value
  );

};

onMounted(async () => {
  loadingWeatherData.value = true;

  currentWeatherDataForRender.value = await useCurrentWeatherDataForRender(
    lat.value?.toLocaleString(),
    lon.value?.toLocaleString(),
    queryCity.value?.toLocaleString()
  );
  forecastWeatherDataForRender.value = await useForecastWeatherDataForRender(
    lat.value?.toLocaleString(),
    lon.value?.toLocaleString(),
    queryCity.value?.toLocaleString()
  );

  fineWeatherCitiesLocalStorage.value = getFineWeatherCitiesFromLocalStorage();

  fineWeatherCitiesLocalStorage.value.forEach((city) => {
    if (city.cityItemFullName === queryCity.value?.toLocaleString()) {
      citySavedToLocalStorage.value = true;
    }
  });

  console.group("City view ref values");
  console.log(
    "currentWeatherDataForRender.value === ",
    currentWeatherDataForRender.value
  );
  console.log(
    "forecastWeatherDataForRender.value === ",
    forecastWeatherDataForRender.value
  );
  console.log(
    "fineWeatherCitiesLocalStorage.value === ",
    fineWeatherCitiesLocalStorage.value
  );
  console.log(
    "citySavedToLocalStorage.value === ",
    citySavedToLocalStorage.value
  );
  console.groupEnd();

  setTimeout(() =>  loadingWeatherData.value = false, 300)

  // loadingWeatherData.value = false;
});
</script>

<style lang="scss" scoped></style>
