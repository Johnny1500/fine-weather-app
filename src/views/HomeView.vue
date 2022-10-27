<template>
  <div class="container mt-[100px]">
    <div
      class="bg-weather-primary flex flex-col justify-center items-start rounded-lg"
      :class="{ 'city-search-block': selectedGeoDBCities.length > 0 }"
    >
      <div class="input-wrapper w-full">
        <input
          type="text"
          placeholder="Search for city"
          v-model="cityInput"
          class="w-full text-xl -ml-4 px-9 py-2 rounded-full"
          :class="{ 'input-active': selectedGeoDBCities.length > 0 }"
        />
      </div>
      <div id="selected-cities-array" v-show="selectedGeoDBCities.length > 0">
        <ul v-if="!loadingCities">
          <li
            v-for="item in selectedGeoDBCities"
            :key="item['id']"
            class="selected-city"
          >
            {{ item["name"] }}
          </li>
        </ul>
        <div v-else>Loading...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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

    loadingCities.value = true;

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

const searchFromGeoDBDebounced = debounce(searchFromGeoDB, 1200);

// eslint-disable-next-line
// @ts-ignore
watch(cityInput, (...args) => searchFromGeoDBDebounced(...args));
</script>

<style lang="scss" scoped>
.city-search-block {
  background-color: #fff;
}

.input-wrapper::before {
  font-family: "FontAwesome";
  position: relative;
  left: 12px;
  content: "\f002";
  z-index: 1;
}

.input-active {  
  outline: none;
}
</style>
