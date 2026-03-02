# Junaid Paramberi — Portfolio

Creative technologist & visual storyteller portfolio. Built with React, Vite, and Firebase (projects, experience, clients, and profile data).

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deploy (Vercel)

Deploy the repo to Vercel. The app uses:

- **Rewrites** so `/project/:id` is handled by the serverless function (see `vercel.json`).
- **Firebase** (client): ensure your Firebase config in `firebase.ts` and Firestore/Storage are set up.

## Social share (project link previews)

When someone shares a project link (WhatsApp, Twitter, LinkedIn, etc.), the preview shows the **project cover image**, **title**, and **description**.

1. **Share the path URL:** `https://junaidparamberi.com/project/PROJECT_ID` — use the **Share** button on a project to copy this link.
2. **Deploy on Vercel** so the `/project/:id` serverless route runs.
3. In Vercel → Project → Settings → Environment Variables, add:
   - **`FIREBASE_SERVICE_ACCOUNT_JSON`** — full JSON string of your Firebase service account key (Firebase Console → Project settings → Service accounts → Generate new private key).

Without this env var, shared project links still work but show the default site image and title instead of the project’s.
