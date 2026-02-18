**Deployment Instructions (Vercel + Render)**

- **Overview:** This repo contains a Next.js `frontend` and an Express `backend`. The workflow `/.github/workflows/deploy.yml` will build the frontend and attempt to deploy to Vercel and trigger a Render deploy when the required GitHub secrets are present.

- **Recommended paths:**
  - Quick: Deploy frontend to Vercel (recommended for Next.js) and backend to Render (or host backend on a small VPS / Lightsail).
  - Alternative: Use Render to host both frontend and backend by splitting into two services.

- **Required GitHub Secrets (Repository → Settings → Secrets → Actions):**
  - `VERCEL_TOKEN` — your Vercel personal token (if deploying to Vercel via workflow)
  - `VERCEL_ORG_ID` — Vercel organization ID
  - `VERCEL_PROJECT_ID` — Vercel project ID
  - `RENDER_API_KEY` — Render API key (if triggering Render deploy)
  - `RENDER_SERVICE_ID` — Render service id (the id starts with `srv-...` without the prefix in our curl)

- **Vercel setup (quick):**
  1. Sign in to Vercel and import the GitHub repository.
  2. For the project, note `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from the project settings (or use `vercel env` / API).
  3. Create a personal token in Vercel (Account → Tokens) and add it as `VERCEL_TOKEN` in GitHub secrets.
  4. The workflow will run on push to `main` and deploy to Vercel when secrets are present.

- **Render setup (quick):**
  1. Sign in to Render, choose "Create a new Web Service" and connect your GitHub repo, or use the provided `render.yaml` manifest.
  2. Create an API key from Account → API Keys. Add it to GitHub secrets as `RENDER_API_KEY`.
  3. Note the service id (from the Render dashboard) and add it as `RENDER_SERVICE_ID`.
  4. The workflow will POST to Render's deploy endpoint to trigger a deploy on push.

- **Manual deploy (local) with Vercel CLI:**
```bash
# install vercel CLI
npm i -g vercel

# login and deploy (interactive)
vercel --prod
```

- **Manual deploy (local) with Render web service:**
  - Use Render dashboard to create the service and connect the repo (recommended).

- **Post-steps I can do for you (choose one):**
  - Add the required GitHub secrets if you provide tokens/IDs.
  - Create the Vercel project on your behalf (needs `VERCEL_TOKEN`) and update workflow secrets automatically.
  - Create the Render service via API (needs `RENDER_API_KEY`).
