---
name: Rixon Dark Tech System
colors:
  surface: '#111413'
  surface-dim: '#111413'
  surface-bright: '#373a38'
  surface-container-lowest: '#0c0f0e'
  surface-container-low: '#191c1b'
  surface-container: '#1d201f'
  surface-container-high: '#272b29'
  surface-container-highest: '#323534'
  on-surface: '#e1e3e1'
  on-surface-variant: '#c0c7d5'
  inverse-surface: '#e1e3e1'
  inverse-on-surface: '#2e3130'
  outline: '#8a919e'
  outline-variant: '#404753'
  surface-tint: '#a6c8ff'
  primary: '#a6c8ff'
  on-primary: '#00315f'
  primary-container: '#3392fc'
  on-primary-container: '#002a54'
  inverse-primary: '#005fb0'
  secondary: '#b5c7ef'
  on-secondary: '#1e3051'
  secondary-container: '#37496b'
  on-secondary-container: '#a7b9e0'
  tertiary: '#bec7db'
  on-tertiary: '#283140'
  tertiary-container: '#8891a4'
  on-tertiary-container: '#212a39'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a6c8ff'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#004787'
  secondary-fixed: '#d7e2ff'
  secondary-fixed-dim: '#b5c7ef'
  on-secondary-fixed: '#061b3b'
  on-secondary-fixed-variant: '#354768'
  tertiary-fixed: '#dae3f7'
  tertiary-fixed-dim: '#bec7db'
  on-tertiary-fixed: '#131c2a'
  on-tertiary-fixed-variant: '#3e4758'
  background: '#111413'
  on-background: '#e1e3e1'
  surface-variant: '#323534'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-performance, dark enterprise engineering aesthetic tailored for elite software architecture, cloud platforms, and institutional technology consulting. 

Visual principles:
- **Precision Engineering:** Clean architectural grid alignments, surgical geometry, and razor-sharp contrast.
- **Electric Luminescence:** Controlled photonic cues; high-energy electric blue highlights emerge from an ultra-deep abyssal field.
- **Tactile Digital Planes:** Layered obsidian surfaces with structured borders, avoiding ambient clouding or frivolous decoration.
- **Style Blend:** Modern Corporate Dark combined with Precision Technical Minimalism. Surfaces sit flat and deliberate, bounded by micro-fine containment lines.

## Colors

The palette relies on pure dark values accented by high-frequency electric cyan-blue. Green hues are strictly omitted across all brand and interface states.

### Core Hex Definitions
- **Background Base:** `#080B0A` (Deep dark slate-black canvas)
- **Primary Accent:** `#087FE8` (High-octane electric blue for prime actions, active focus rings, and glowing indicator anchors)
- **Secondary Accent:** `#142747` (Deep structural navy for tinted container bases, chip backdrops, and active toggle track fills)
- **Borders & Dividers:** `#252B35` (Clean hairline perimeter strokes)

### Layered Surfaces
- **Surface Level 1 (Lowest container):** `#0F141C`
- **Surface Level 2 (Cards, tables, elevated modals):** `#141B26`
- **Surface Level 3 (Hover overlays, flyouts, popovers):** `#1A2332`

### Typography & Content Tokens
- **High-Contrast Value:** `#FFFFFF` (Headings, primary actions, high-priority numeric data)
- **Muted / Secondary:** `#A1A1AA` (Body copy, subtitles, unselected tab items, system metadata)
- **Subdued / Tertiary:** `#52525B` (Disabled elements, placeholder inputs, structural icons)

## Typography

The type system blends technical authority with computational ergonomics:
- **Headlines (Space Grotesk):** Delivers clean geometry, crisp apexes, and deliberate structural proportions suited for an advanced tech firm. Tight tracking conveys industrial rigor.
- **Body & Labels (Geist):** Built for developer-grade clarity, tabular data readouts, dense dashboards, and technical documentation.

Hierarchy guidelines:
- Apply uppercase treatment exclusively to `label-sm` or technical metadata badges with explicit tracking (`0.06em`).
- Numerical statistics and telemetry figures inherit `Space Grotesk` with `tabular-nums` enabled.

## Layout & Spacing

The foundation uses a fluid 12-column grid anchored by an 8px base spacing increment.

### Grid Breakpoints
- **Desktop (>= 1280px):** 12 columns, `margin: 3rem`, `gutter: 1.5rem`. Max layout width constrained to `1440px`.
- **Tablet (768px - 1279px):** 8 columns, `margin: 2rem`, `gutter: 1.25rem`.
- **Mobile (< 768px):** 4 columns, `margin: 1.25rem`, `gutter: 1rem`.

### Spatial Flow
- Interior component padding scales strictly along `space-xs` through `space-xl`.
- Horizontal layouts collapse to stacked vertical arrangements below 768px without intermediate floating states.

## Elevation & Depth

Depth is established via layered tonal surfaces combined with crisp low-contrast borders rather than heavy blur drop-shadows.

### Surface Tiers
- **Tier 0 (Root Level):** `#080B0A` (Raw canvas viewport).
- **Tier 1 (Panels & Shell):** `#0F141C` bounded by a 1px border of `#252B35`.
- **Tier 2 (Interactive Modules):** `#141B26` with 1px border of `#252B35`.
- **Tier 3 (Floating Overlays & Menus):** `#1A2332` with a 1px border of `#252B35` and a tight ambient drop: `box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.65)`.

### Photonic Glow & Luminescence
- **Electric Accent Glow:** Used sparingly on primary interactive focal points (active inputs, hero CTA hovers, live system indicators):
  `box-shadow: 0 0 24px -2px rgba(8, 127, 232, 0.35);`
- **Subtle Gradient Wash:** Soft directional linear overlay on hero cards:
  `background: linear-gradient(180deg, rgba(20, 39, 71, 0.4) 0%, rgba(15, 20, 28, 0.8) 100%);`

## Shapes

The design system maintains a refined, technical geometry using Level 1 (Soft) corner treatment:
- **Base Components (Inputs, Buttons, Badges):** `4px` (`0.25rem`) radius.
- **Cards, Panels, & Content Blocks:** `8px` (`0.5rem`, `rounded-lg`).
- **Modals, Dialogs, & Master Shells:** `12px` (`0.75rem`, `rounded-xl`).

Circular radii are strictly limited to status pips and avatar nodes. All container corners remain sharp and engineered.

## Components

### Buttons
- **Primary:** Background `#087FE8`, text `#FFFFFF`, font weight 500, radius `4px`. Hover: `#1B8EF0` with a subtle electric glow `0 0 16px rgba(8, 127, 232, 0.4)`. Active: `#0667BF`.
- **Secondary:** Background `#142747`, text `#FFFFFF`, 1px border in `#252B35`. Hover: background `#1A2332`, border `#087FE8`.
- **Ghost / Outline:** Background transparent, text `#A1A1AA`, border 1px solid `#252B35`. Hover: text `#FFFFFF`, border `#087FE8`, background `rgba(8, 127, 232, 0.05)`.

### Input Fields & Selects
- Height: `40px`. Background `#0F141C`, text `#FFFFFF`, placeholder `#52525B`.
- Border: 1px solid `#252B35`. Radius `4px`.
- Focus State: Border color `#087FE8`, outline none, box shadow `0 0 0 1px #087FE8, 0 0 12px rgba(8, 127, 232, 0.25)`.

### Cards & Data Modules
- Background `#141B26`, border 1px solid `#252B35`, radius `8px`, padding `space-lg`.
- Interactive Card Hover: Border transitions to `#087FE8` at 50% opacity with a top edge micro-highlight line (`1px solid rgba(8, 127, 232, 0.6)`).

### Chips, Tags & Badges
- Background `#142747` (40% opacity), border 1px solid `#252B35`, text `#A1A1AA`, font typography `label-sm`.
- Active / Status Indicator: Text `#087FE8`, border `rgba(8, 127, 232, 0.4)`, optional 6px glowing dot in `#087FE8`.

### Checkboxes & Radio Controls
- Base Box: `16px x 16px`, background `#0F141C`, border 1px solid `#252B35`, radius `3px` (Checkbox) or `50%` (Radio).
- Selected: Background `#087FE8`, border `#087FE8`, icon fill `#FFFFFF`. Glow on focus.

### Lists & Tables
- Table Header: Background `#0F141C`, border-bottom 1px solid `#252B35`, text `#A1A1AA`, uppercase typography `label-sm`.
- Table Row: Border-bottom 1px solid `#252B35`. Hover row background `#141B26`.
- Metric Cells: Space Grotesk tabular numbers in `#FFFFFF`.