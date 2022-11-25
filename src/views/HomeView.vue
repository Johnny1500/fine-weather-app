<template>
  <div class="container mt-[100px]">
    <div
      class="bg-weather-primary flex flex-col justify-center items-start rounded-xl"
      :class="`${
        cityInput.length > 0 ? 'bg-weather-secondary' : 'bg-weather-primary'
      }`"
    >
      <div class="input-wrapper w-full">
        <input
          type="text"
          placeholder="Search for city"
          v-model="cityInput"
          class="w-full text-xl -ml-4 px-10 py-2 rounded-full outline-none"
        />
      </div>
      <div
        v-show="cityInput.length > 0"
        id="selected-cities-array"
        class="w-full"
      >
        <div v-if="!loadingCities">
          <ul v-if="selectedGeoDBCities.length > 0">
            <li
              v-for="item in selectedGeoDBCities"
              :key="item['id']"
              class="py-2 px-4"
            >
              {{ item["name"] }}
            </li>
          </ul>
          <div v-else>
            <p>There is no such city. Try again.</p>
          </div>
        </div>
        <div v-else class="flex items-center justify-center pb-3">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="text-xl">Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { geoOptions, GEO_API_URL } from "../api";
let selectedGeoDBCities = ref([]);
let cityInput = ref("");
let loadingCities = ref(false);

function debounce(func: any, ms: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    // eslint-disable-next-line
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

async function searchFromGeoDB(newCityInput: string) {
  try {
    console.log("newCityInput", newCityInput);

    if (newCityInput.length === 0) {
      selectedGeoDBCities.value = [];
      return;
    }

    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${newCityInput}`,
      geoOptions
    );

    const cities = await response.json();
    console.log("cities", cities);

    selectedGeoDBCities.value = cities.data;

    loadingCities.value = false;
  } catch (error) {
    console.log("error during fetch cities", error);
  }
}

function handleClickOutside(event: MouseEvent) {
  const elem = event.target as HTMLElement;

  if (elem.tagName !== "LI") {
    cityInput.value = "";
    selectedGeoDBCities.value = [];
  }
}

const searchFromGeoDBDebounced = debounce(searchFromGeoDB, 1200);

watch(cityInput, (...args) => {
  loadingCities.value = true;
  // eslint-disable-next-line
  // @ts-ignore
  return searchFromGeoDBDebounced(...args);
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.input-wrapper::before {
  font-family: "FontAwesome";
  position: relative;
  left: 14px;
  content: "\f002";
  z-index: 1;
}
</style>
