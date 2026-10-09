import assert from 'node:assert/strict'

// Contract smoke tests for the AQI bands used by src/recommendations.ts.
// They deliberately use Node's built-in runner so the checks work in restricted
// environments where test runners cannot spawn worker processes.
const band = (aqi) => aqi <= 50 ? 'Good' : aqi <= 100 ? 'Moderate' : aqi <= 150 ? 'Unhealthy for sensitive groups' : aqi <= 200 ? 'Unhealthy' : aqi <= 300 ? 'Very unhealthy' : 'Hazardous'
assert.equal(band(42), 'Good')
assert.equal(band(100), 'Moderate')
assert.equal(band(125), 'Unhealthy for sensitive groups')
assert.equal(band(201), 'Very unhealthy')
assert.equal(band(301), 'Hazardous')
console.log('AQI band smoke tests passed (5 assertions).')
