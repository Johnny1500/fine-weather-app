import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";
import type { LocationQueryValue } from "vue-router";

export default async function useOpenWeatherData(
  lat: LocationQueryValue | LocationQueryValue[],
  lon: LocationQueryValue | LocationQueryValue[],
  kind: string
) {
    
    let weatherData;

    try {
        const response = await fetch(
          `${OPEN_WEATHER_API_URL}/${kind}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
        );
  
        weatherData = await response.json();
      } catch (error) {
        console.log("error during fetch", error);
      }
    
    console.log('weatherData ===', weatherData);

  return weatherData;
}
