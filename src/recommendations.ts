export type Band = { label: string; color: string; advice: string; detail: string }

export function getBand(aqi: number | null): Band {
  if (aqi === null) return { label: 'No reading', color: 'slate', advice: 'Check again shortly', detail: 'We could not read the current AQI for this location.' }
  if (aqi <= 50) return { label: 'Good', color: 'green', advice: 'Enjoy the outdoors', detail: 'Air quality is satisfactory for most people.' }
  if (aqi <= 100) return { label: 'Moderate', color: 'yellow', advice: 'Sensitive groups take it easy', detail: 'Most people can continue usual activities. Sensitive people may notice symptoms.' }
  if (aqi <= 150) return { label: 'Unhealthy for sensitive groups', color: 'orange', advice: 'Reduce long outdoor sessions', detail: 'Children, older adults, and people with heart or lung conditions should reduce prolonged exertion outdoors.' }
  if (aqi <= 200) return { label: 'Unhealthy', color: 'red', advice: 'Move exercise indoors', detail: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.' }
  if (aqi <= 300) return { label: 'Very unhealthy', color: 'purple', advice: 'Avoid outdoor exertion', detail: 'Health alert: the risk of health effects is increased for everyone.' }
  return { label: 'Hazardous', color: 'maroon', advice: 'Stay indoors if possible', detail: 'Health warning of emergency conditions. Follow local public-health guidance.' }
}

export function getActions(aqi: number | null) {
  const band = getBand(aqi)
  if (aqi === null) return { do: ['Wait for a fresh reading before planning strenuous outdoor activity'], avoid: ['Treating an old reading as current'] }
  if (aqi <= 50) return { do: ['Open windows when outdoor air feels fresh', 'Walk, cycle, or exercise outside'], avoid: ['Burning waste or adding smoke to the air'] }
  if (aqi <= 100) return { do: ['Keep normal plans and watch for symptoms', 'Take breaks if outdoor air feels irritating'], avoid: ['Long, intense exercise if you are sensitive to pollution'] }
  if (aqi <= 150) return { do: ['Keep rescue medication accessible if prescribed', 'Choose shorter outdoor routes and breaks'], avoid: ['Prolonged or heavy exertion outdoors'] }
  return { do: ['Keep windows closed during peak pollution', 'Use a well-fitting mask outdoors if you must go out', 'Check on children, older adults, and people with asthma'], avoid: ['Outdoor exercise and unnecessary travel', 'Adding indoor smoke from incense, cigarettes, or cooking without ventilation'] }
}

export function weatherLabel(code: number | null) {
  if (code === null) return 'Weather unavailable'
  if (code === 0) return 'Clear sky'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Misty'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  return 'Stormy'
}
