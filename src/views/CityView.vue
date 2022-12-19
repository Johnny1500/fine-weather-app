<template>
  <div>
    <div v-if="!loadingWeatherData">
      <p class="text-xl">Current weather</p>
    </div>
    <div v-else>
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type {
  CurrentWeatherData,
  CurrentWeatherDataForRender,
  ForecastWeatherData,
  ForecastItemWeatherData,
  ForecastItemWeatherDataForRender,
} from "../interfaces";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { dateAndTimeForRemote, degreesToWindDirection } from "../utility";

const route = useRoute();

const lat = route.query.lat;
const lon = route.query.lon;

let loadingWeatherData = ref(false);
let currentWeatherDataForRender: Ref<CurrentWeatherDataForRender | null> =
  ref(null);
let forecastWeatherDataForRender: Ref<ForecastItemWeatherDataForRender[][]> =
  ref([]);

onMounted(async () => {
  loadingWeatherData.value = true;

  const currentWeatherData = await useOpenWeatherData<CurrentWeatherData>(
    lat,
    lon,
    "weather"
  );
  const forecastWeatherData = await useOpenWeatherData<ForecastWeatherData>(
    lat,
    lon,
    "forecast"
  );

  currentWeatherDataForRender.value = {
    dateArr: dateAndTimeForRemote(
      currentWeatherData.dt,
      currentWeatherData.timezone
    ),
    weather_description: currentWeatherData.weather[0].description,
    temp: currentWeatherData.main.temp,
    feels_like: currentWeatherData.main.feels_like,
    picture: currentWeatherData.weather[0].icon,
    pressure: currentWeatherData.main.pressure,
    humidity: currentWeatherData.main.humidity,
    wind_speed: currentWeatherData.wind.speed,
    wind_direction: degreesToWindDirection(currentWeatherData.wind.deg),
  };

  const forecastWeatherDataTimezone = forecastWeatherData.city.timezone;

  const forecastWeatherDataForRenderArr = forecastWeatherData.list.map(
    (threeHourForecastItem: ForecastItemWeatherData) => {
      const dateArr = dateAndTimeForRemote(
        threeHourForecastItem.dt,
        forecastWeatherDataTimezone
      );

      return {
        dt: threeHourForecastItem.dt,
        dateArr: dateArr,
        date: dateArr[2] + "_" + dateArr[3],
        weather_description: threeHourForecastItem.weather[0].description,
        temp: threeHourForecastItem.main.temp,
        picture: threeHourForecastItem.weather[0].icon,
      };
    }
  );

  const foreacastDates = new Set<string>();

  forecastWeatherDataForRenderArr.forEach(
    (threeHourForecastItemForRender: ForecastItemWeatherDataForRender) => {
      foreacastDates.add(threeHourForecastItemForRender.date);
    }
  );

  const foreacastDatesArr: string[] = Array.from(foreacastDates);
 
  foreacastDatesArr.forEach((forecastDate: string) => {
    const forecastWeatherDataForRenderItemArr =
      forecastWeatherDataForRenderArr.filter(
        (threeHourForecastItemForRender: ForecastItemWeatherDataForRender) =>
          threeHourForecastItemForRender.date === forecastDate
      );

    forecastWeatherDataForRender.value.push(
      forecastWeatherDataForRenderItemArr
    );
  });

  console.log("currentWeatherData === ", currentWeatherData);
  console.log("forecastWeatherData === ", forecastWeatherData);
  console.log(
    "currentWeatherDataForRender.value === ",
    currentWeatherDataForRender.value
  );
  console.log(
    "forecastWeatherDataForRenderArr === ",
    forecastWeatherDataForRenderArr
  );
  console.log("foreacastDatesArr === ", foreacastDatesArr);  
  console.log(
    "forecastWeatherDataForRender.value === ",
    forecastWeatherDataForRender.value
  );

  loadingWeatherData.value = false;
});
</script>

<style lang="scss" scoped></style>
