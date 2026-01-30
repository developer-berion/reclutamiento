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
- **Calendly**: Integrated via `react-calendly` inside a GSAP-animated modal.
- **Logos Carousel**: Infinite horizontal scroll using GSAP, with auto-pause on hover.
- **Light Mode Only**: The application is locked to light mode for brand consistency.
- **No Contact Form**: Leads are captured directly via Calendly scheduling.

## Video & Lead Tracking
- **Backend**: Supabase (`agentes` table).
- **Player Integration**: Uses standard **PlayerJS** library to track Bunny Stream iframe events.
- **Metrics Tracked**:
  - `video_started_at`: Timestamp when video modal opens.
  - `video_max_watched_seconds`: Max playhead position reached (debounced updates).
  - `video_duration_seconds`: Total video length.
- **Security**: RLS Policies enabled for public Insert/Update on specific lead rows.

## Assets
- Logo: `/logo-financiegroup.png`
- Insurer Logos: `/public/seguros/`
- Video Thumbnail: `/public/thumb3.png`
- Video Player: Hosted on Bunny Stream (integrated via iframe)

## Deployment
Static hosting. Ensure all relative paths work for production builds.
