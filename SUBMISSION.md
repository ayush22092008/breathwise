# BreatheWise AI — submission draft

## Problem

Air-quality numbers are difficult to act on. BreatheWise helps people decide whether to go outside, when to plan an activity, and what to do indoors when pollution is elevated.

## What we built

- Live city search with current AQI, PM2.5, PM10, ozone, NO₂, and weather.
- AQI-specific Do/Avoid guidance.
- Personal planner for activity, duration, and health profile.
- Next-24-hour AQI forecast window.
- Indoor-air guidance, browser alerts, city comparison, map context, and a data-grounded question helper.

## Where AWS fits

BreatheWise is deployed with AWS Amplify Hosting. Amplify builds the Vite application from the public repository and serves the production `dist` output over HTTPS. This version uses Open-Meteo's public APIs and therefore does not expose API secrets in the browser. If a paid provider is added later, it should be placed behind AWS Lambda/API Gateway with secrets in AWS Secrets Manager.

## Tools and credits

Codex was used as an AI coding tool. The project uses React, TypeScript, Vite, and Open-Meteo. Open-Meteo is credited as the live data provider.

## Demo sequence (under 3 minutes)

1. Open the deployed HTTPS URL and search for a city.
2. Show current AQI, weather, pollutant snapshot, and source/timestamp.
3. Change the health profile, activity, and duration in the planner.
4. Scroll through the 24-hour forecast and indoor guidance.
5. Compare another city and ask the BreatheWise AI helper a question.
6. Briefly show the AWS Amplify deployment and public repository.

## Final links to add

- Public repository: `TODO`
- AWS Amplify URL: `TODO`
- YouTube demo (public or unlisted, under 3 minutes): `TODO`
- Team name and members: `TODO`

## Final checklist

- [ ] WeMakeDevs account and verified AWS Builder Center student profile confirmed.
- [ ] Public repository is accessible while signed out.
- [ ] AWS Amplify URL works while signed out.
- [ ] YouTube video is under 3 minutes and works while signed out.
- [ ] Exact Sunday, October 11, 2026 cutoff time checked on the official schedule immediately before submission.
- [ ] One submission per team completed on the Environmental Hacks submission form.
