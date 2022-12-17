import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";
import type { LocationQueryValue } from "vue-router";

export default async function useOpenWeatherData<T>(
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[],
  kind: string
): Promise<T> {
  let weatherData;

  try {
    const response = await fetch(
      `${OPEN_WEATHER_API_URL}/${kind}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );

    weatherData = await response.json();
  } catch (error) {
    console.log("error during fetch", error);
  }

  console.log("weatherData ===", weatherData);

  return weatherData;
}
