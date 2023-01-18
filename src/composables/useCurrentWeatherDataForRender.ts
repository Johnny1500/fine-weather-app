import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { dateAndTimeForRemote, degreesToWindDirection } from "../utility";

import type { CurrentWeatherData, CurrentWeatherDataForRender } from "../interfaces";
import type { LocationQueryValue } from "vue-router";

export default async function useCurrentWeatherDataForRender(
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[]
) {
  const currentWeatherData = await useOpenWeatherData<CurrentWeatherData>(
    lat,
    lon,
    "weather"
  );

  const currentWeatherDataForRender: CurrentWeatherDataForRender = {
    dateArr: dateAndTimeForRemote(
      currentWeatherData.dt,
      currentWeatherData.timezone
    ),
    weather_description: currentWeatherData.weather[0].description,
    temp: Math.round(currentWeatherData.main.temp) + '°',
    feels_like: Math.round(currentWeatherData.main.feels_like) + '°',
    picture: currentWeatherData.weather[0].icon,
    pressure: currentWeatherData.main.pressure,
    humidity: currentWeatherData.main.humidity,
    wind_speed: currentWeatherData.wind.speed,
    wind_direction: degreesToWindDirection(currentWeatherData.wind.deg),
  };

  return currentWeatherDataForRender;
}
