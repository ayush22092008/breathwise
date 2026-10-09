# BreatheWise AI

BreatheWise turns local air-quality and weather data into a clear answer to the question: **what should I do today?** It is built for the Air track of WeMakeDevs Environmental Hacks 2026.

## What works

- Search for a city or neighbourhood.
- Read the current US AQI, PM2.5, PM10, ozone, and NO₂ values.
- See outside temperature, apparent temperature, humidity, wind, and a simple weather label.
- Get AQI-specific “Do” and “Avoid” actions.
- Plan an activity using a health profile, duration, and live AQI.
- See the next 24 hours, indoor-air actions, city comparison, map context, browser alerts, and a data-grounded question helper.
- See the live data source and the time the app last updated.
- See a useful error and retry state if a provider is unavailable.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Data and privacy

BreatheWise uses Open-Meteo's public Geocoding, Air Quality, and Forecast APIs. There are no API keys, accounts, or personal data in this demo. Because the browser talks to a public provider directly, there are no secrets to leak through the bundle. If a paid provider is added later, put it behind an AWS Lambda/API Gateway function and store its key in AWS Secrets Manager—never in `VITE_*` variables or frontend code.

The app uses the US AQI scale. It is educational guidance, not medical advice. Follow local public-health alerts and a clinician's advice.

## Deploy to AWS Amplify

Amplify Hosting is the simplest AWS deployment for this Vite app.

1. Push this repository to a public GitHub repository.
2. In the AWS Console, open **Amplify** → **Create new app** → **Host web app**.
3. Connect GitHub, choose the repository and its default branch.
4. Use these build settings (Amplify can also detect them):

   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 20

5. Deploy and copy the generated HTTPS URL into the hackathon submission.
6. Open the URL in a signed-out browser and verify location search, refresh, and the error/retry presentation before recording the demo.

Amplify is the AWS service used by the shipped deployment. No Lambda is needed for this keyless public-data version.

## Hackathon submission checklist

The official Environmental Hacks rules currently require:

- A public repository.
- A YouTube demo video under 3 minutes, public or unlisted, with AWS visibly shown in the demo.
- A short writeup covering the problem, build, and where AWS fits.
- A project started during the event; pre-event planning and learning are allowed, but old project work does not qualify.
- Disclosure of AI coding tools used. This project was built with Codex.
- One team submission, with 1–4 eligible university students in India.

The official schedule says online submissions are due Sunday, October 11, 2026; as of October 9, the page says the exact cutoff time is still being finalised. Check the official schedule immediately before submitting: <https://www.wemakedevs.org/aws/env/schedule>.

Before submission:

- [ ] Confirm your WeMakeDevs account and verified AWS Builder Center student profile.
- [ ] Push the final repository publicly.
- [ ] Deploy through AWS Amplify and include that URL.
- [ ] Record a ≤3 minute flow: choose a location → show AQI → show guidance → show AWS Amplify deployment and repository.
- [ ] Upload the video to YouTube as public/unlisted and test it signed out.
- [ ] Submit the repository, video, live URL, and writeup before the cutoff.

## Sources

- [Environmental Hacks overview](https://www.wemakedevs.org/aws/env)
- [Official rules](https://www.wemakedevs.org/aws/env/rules)
- [Official schedule](https://www.wemakedevs.org/aws/env/schedule)
- [Open-Meteo API documentation](https://open-meteo.com/en/docs)
