# Proximity V2 - Core Guidelines

These rules apply to all development on the Proximity project. Do not ignore them.

## 1. Architecture & Tech Stack

- **Framework**: Next.js (App Router preferred, unless otherwise specified).
- **Styling**: Tailwind CSS.

## 2. Mobile-First & Performance (CRITICAL)

- **Mobile First**: All development MUST prioritize the mobile experience. It must be buttery smooth and not laggy on phones.
- **Performance over Visuals**: Always prioritize performance. Avoid heavy, unoptimized assets or complex rendering logic that cause lag.
- **Animations**: Use lightweight, strategic animations (like Framer Motion or pure CSS) that add polish without causing frame drops.

## 3. Design Aesthetic

- **Vibe**: be creative and innovate make it spectacular looking with a"cooling" design.
- **Clarity**: Clear UI/UX environment that intuitively guides the user.
- **Context**: Proximity is an agency for websites, graphic design, and video editing. The site needs to look professional, premium, and state-of-the-art without being bloated.
  and make sure not use anything that resmble the style of vibe coded apps or websites
  Key Creative Guidelines:

1. Aesthetic & Vibe:
   -, disciplined, and editorial aesthetic (high-end architectural studio meets avant-garde editorial design).
   - Strict avoidance of generic SaaS or "vibe-coded" trends: NO rainbow gradients, NO purple neon glows, NO 3D emoji graphics, and NO flashy bloated animations.
   - Strict Color Palette:
     - Pure Stark White (#FFFFFF) and Deep Obsidian Black (#0A0A0A / #000000) for structural contrast and generous whitespace/blackspace.
     - Crimson Red (#990000 / #DC143C) used exclusively as an intentional, high-impact accent (e.g., active indicators, subtle hairline borders, micro-badges, or focused CTAs).
   - Typography: Bold neo-grotesque sans-serif for headings (e.g., Neue Montreal / General Sans style) paired with refined monospace micro-details for metadata and labels.

2. Structure & Sections to Include:
   - Hero Section: High-impact typography, crisp contrast, micro-label "[ PROXIMITY — DIGITAL ATELIER ]", clear positioning statement: "We craft websites, visual identities, and cinematic motion for brands that value precision.", and a discrete crimson-accented CTA button.
   - Selected Works (Portfolio Grid): Asymmetric, editorial showcase cards featuring project visuals/stills, discipline metadata tags, client name, and a one-sentence impact statement.
   - Core Disciplines (Services): Minimal, scannable 3-pillar breakdown (01 Digital Experiences, 02 Visual Identity & Graphics, 03 Motion & Cinematic Editing).
   - 3-Step Process: Streamlined engagement workflow (Audit & Strategy -> Design & Production -> Delivery).
   - High-Conversion Footer / Contact: Direct email link, operational timezone indicator, and a sleek minimal inquiry form (Name, Email, Budget, Brief).

3. Technical & Interaction Details:
   - Mobile-first, fully responsive layout built with clean modern semantic HTML, CSS, or Tailwind CSS.
   - Micro-interactions: Restrained hover states, sharp hairline borders (#1F1F1F or #E5E5E5), smooth opacity transitions, and structured grid lines.

## 4. Development Workflow

- Always build and test the mobile view first before adapting to the PC/Desktop version.
  Key Responsibilities:

Component architecture and naming conventions
Design token implementation
State management patterns in use
Testing strategies and coverage expectations
Build pipeline and deployment process
Leverage context data before asking users
Focus on implementation specifics rather than basics
Validate assumptions from context data
Request only mission-critical missing details
Component scaffolding with TypeScript interfaces

## 5. colors:

white: #FFFFFF
black: #000000
crimson: #90243B
avoid glows and gradients, use solid colors instead

## thinking:

be as innovative as you can think, come up with ideas that would make the user say wow.
##debugging:
you need to minimize contexte and token usage you go through the whole code base never stoping until you find the issue and fix it then you test again to make sure it is fixed, and you keep doing this until the issue is fixed, and not changing anything else that is working
think throught of what the user input and try to replicate exactly what he said,
refrain from using futuristic words
