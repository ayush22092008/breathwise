export type Location = { name: string; latitude: number; longitude: number; country?: string; admin1?: string }

export type AirData = {
  location: Location
  aqi: number | null
  pm25: number | null
  pm10: number | null
  ozone: number | null
  no2: number | null
  temperature: number | null
  feelsLike: number | null
  humidity: number | null
  windSpeed: number | null
  weatherCode: number | null
  observedAt: string
  hourlyForecast: { time: string; aqi: number | null; pm25: number | null; temperature: number | null }[]
}

const json = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Data source returned ${response.status}`)
  return response.json()
}

export async function searchLocations(query: string): Promise<Location[]> {
  const data = await json(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
  return (data.results ?? []).map((item: any) => ({ name: item.name, latitude: item.latitude, longitude: item.longitude, country: item.country, admin1: item.admin1 }))
}

export async function getAirData(location: Location): Promise<AirData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude), longitude: String(location.longitude),
    current: 'pm2_5,pm10,ozone,nitrogen_dioxide,us_aqi',
    hourly: 'pm2_5,pm10,ozone,nitrogen_dioxide,us_aqi', forecast_days: '1', timezone: 'auto',
  })
  const weatherParams = new URLSearchParams({
    latitude: String(location.latitude), longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    hourly: 'temperature_2m', forecast_days: '1', timezone: 'auto',
  })
  const [air, weather] = await Promise.all([
    json(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`),
    json(`https://api.open-meteo.com/v1/forecast?${weatherParams}`),
  ])
  // Prefer the provider's current observation; never use a future forecast hour.
  const currentIndex = nearestHourIndex(air.hourly?.time ?? [])
  const current = air.current ?? {}
  return {
    location, aqi: current.us_aqi ?? air.hourly?.us_aqi?.[currentIndex] ?? null,
    pm25: current.pm2_5 ?? air.hourly?.pm2_5?.[currentIndex] ?? null, pm10: current.pm10 ?? air.hourly?.pm10?.[currentIndex] ?? null,
    ozone: current.ozone ?? air.hourly?.ozone?.[currentIndex] ?? null, no2: current.nitrogen_dioxide ?? air.hourly?.nitrogen_dioxide?.[currentIndex] ?? null,
    temperature: weather.current?.temperature_2m ?? null, feelsLike: weather.current?.apparent_temperature ?? null,
    humidity: weather.current?.relative_humidity_2m ?? null, windSpeed: weather.current?.wind_speed_10m ?? null,
    weatherCode: weather.current?.weather_code ?? null, observedAt: new Date().toISOString(),
    hourlyForecast: (air.hourly?.time ?? []).slice(currentIndex, currentIndex + 24).map((time: string, index: number) => ({
      time, aqi: air.hourly?.us_aqi?.[currentIndex + index] ?? null, pm25: air.hourly?.pm2_5?.[currentIndex + index] ?? null,
      temperature: weather.hourly?.temperature_2m?.[currentIndex + index] ?? null,
    })),
  }
}

function nearestHourIndex(times: string[]) {
  if (!times.length) return 0
  const now = Date.now()
  return times.reduce((best, value, index) => {
    const distance = Math.abs(new Date(value).getTime() - now)
    const bestDistance = Math.abs(new Date(times[best]).getTime() - now)
    return distance < bestDistance ? index : best
  }, 0)
}
