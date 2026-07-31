# Clarence Villanueva — Portfolio

A responsive single-page portfolio built with Next.js/Vinext for Cloudflare Sites.

## Customize

- Edit portfolio text, skills, projects, and experience in `app/page.tsx`.
- Edit colors, typography, spacing, and responsive behavior in `app/globals.css`.
- Replace the placeholder GitHub, LinkedIn, and email URLs in `app/page.tsx`.
- Add the real resume as `public/clarence-villanueva-resume.pdf`.
- Update the education, seminar names, dates, and completion status with Clarence's exact details.

## Run locally

On macOS/Linux, run `npm run dev`. On Windows PowerShell, run:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx vinext dev
```

Open the local address shown in the terminal. For a production build, replace `dev` with `build`.

## Deploy

This project includes `.openai/hosting.json` and is ready for OpenAI Sites hosting. It can also be deployed to any platform that supports a Next.js-compatible application; use that platform's standard repository import workflow.
