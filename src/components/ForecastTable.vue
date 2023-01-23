<template>
  <div>
    <p v-if="showTitle" class="px-2">
      {{
        forecastWeatherDayDataForRender[0].dateArr[1] +
        ", " +
        forecastWeatherDayDataForRender[0].dateArr[2] +
        " " +
        forecastWeatherDayDataForRender[0].dateArr[3]
      }}
    </p>
    <table>
      <tbody class="text-base">
        <tr v-for="item in forecastWeatherDayDataForRender">
          <td class="px-2 pt-2">
            {{ item.dateArr[4] }}
          </td>
          <td class="pr-4 pt-2">
            {{ item.temp }}
          </td>
          <td class="flex items-end justify-start">
            <img
              :src="
                getImageUrl('../src/assets/weather-pictures/', item?.picture)
              "
              alt="current weather"
              class="w-8"
            />
            <p class="ml-3">
              {{ item.weather_description }}
            </p>
          </td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ForecastItemWeatherDataForRender } from "../interfaces";

import { toRefs } from "vue";

import { getImageUrl } from "@/utility";

const props = withDefaults(
  defineProps<{
    forecastWeatherDayDataForRender: ForecastItemWeatherDataForRender[];
    showTitle?: boolean;
  }>(),
  {
    showTitle: false,
  }
);

const { forecastWeatherDayDataForRender, showTitle } = toRefs(props);
</script>
