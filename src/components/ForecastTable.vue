<template>
  <div>
    <p v-if="showTitle">
      {{
        forecastWeatherDayDataForRender[0].dateArr[1] +
        ", " +
        forecastWeatherDayDataForRender[0].dateArr[2] +
        " " +
        forecastWeatherDayDataForRender[0].dateArr[3]
      }}
    </p>
    <table>
      <tbody>
        <tr v-for="item in forecastWeatherDayDataForRender" class="pb-1">
          <td class="px-2">
            {{ item.dateArr[4] }}
          </td>
          <td class="pr-3">
            {{ item.temp }}
          </td>
          <td>
            <img
              :src="
                getImageUrl('../src/assets/weather-pictures/', item?.picture)
              "
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
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { ForecastItemWeatherDataForRender } from "../interfaces";

import { ref, toRefs } from "vue";

import { getImageUrl } from "@/utility";

const props = withDefaults(
  defineProps<{
    forecastWeatherDayDataForRender: ForecastItemWeatherDataForRender[];
    showTitle: boolean;
  }>(),
  {
    showTitle: false,
  }
);

const { forecastWeatherDayDataForRender, showTitle } = toRefs(props);
</script>

<style scoped></style>
