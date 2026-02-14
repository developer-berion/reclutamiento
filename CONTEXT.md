# Project Context: Financie IUL Landing

## Business Objective
Create a high-conversion landing page for **Financie Group** to promote IUL (Indexed Universal Life) insurance policies. The design must feel professional, trustworthy, and premium.

## Core Rules & Design System
- **Tone**: Professional, Educational, Personal.
- **Colors**: 
  - `Primary`: #f6c71e (Yellow - Trust/Energy)
  - `Deep Teal`: #19272b (Dark background)
  - `Text`: #414042 (Gray)
- **Typography**: 
  - `Sora`: Headings/Display.
  - `DM Sans`: Body text.
- **Animations**: Subtle, purposeful GSAP animations. Smooth scroll for navigation.

## Key Implementation Details
- **Lead Capture (Video Gate)**: 
  - Users must enter **Name**, **Email** and **Phone Number** to unlock the exclusive video.
  - Form validation ensures a valid email and a 10-digit phone number.
- **Calendly Integration**: 
  - Integrated via `react-calendly`.
  - Opens automatically after the video modal is closed, or manually via "Agendar Entrevista" buttons.
  - Uses a verified Personal Access Token (PAT) stored in Supabase `app_settings`.
- **Logos Carousel**: Infinite horizontal scroll using GSAP.
- **Light Mode Only**: The application is locked to light mode.

## Backend & Data
- **Supabase**: 
  - **Table**: `agentes`
  - **Columns**: `id`, `full_name`, `email` (Required), `phone_number` (Required), `video_started_at`, `video_max_watched_seconds`, `video_duration_seconds`.
  - **Security**: RLS Policies enabled. Google ReCAPTCHA v2 protects the submission form.

## Video Tracking
- **Player**: Bunny Stream (iframe) with PlayerJS.
- **Metrics**: Tracks start time, max watched duration, and total duration to gauge lead interest.

## Assets
- Logo: `/logo-financiegroup.png`
- Insurer Logos: `/public/seguros/`
- Video Thumbnail: `/public/thumb3.png`

## Deployment
Static hosting (e.g., Vercel/Netlify). The build command `npm run build` generates the production assets in `dist/`.
