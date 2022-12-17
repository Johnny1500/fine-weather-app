export interface Coord {
    lon: number;
    lat: number;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface MainParams {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export interface ForecastMainParams extends MainParams {
    temp_kf: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number
}

export interface WeatherData {    
    weather: any;
    base: string;   
    visibility: number;
    wind: Wind;
    rain: any;
    clouds: Clouds;
    dt: number;
    sys: Sys;    
    id: number;
    name: string;    
}

export interface CurrentWeatherData extends WeatherData {
    coord: Coord;
    cod: number;
    main: MainParams;
    timezone: number;
    remoteTime?: number | Date;
}

export interface ForecastItemWeatherData extends WeatherData {
    dt_txt: string
}

export interface ForecastWeatherData {
    cod: number;
    message: number;
    cnt: number;
    list: ForecastItemWeatherData[];
    city: City
}

export interface ForecastItemWeatherDataForRender {
    date: string;
    time: string;
    weather_description: string;
    temp: number;
    picture: string;
}

export interface CurrentWeatherDataForRender extends ForecastItemWeatherDataForRender {
    feels_like: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    wind_deg: number
}