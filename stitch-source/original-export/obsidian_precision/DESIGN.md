---
name: Obsidian Precision
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
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e1e3e1'
  inverse-on-surface: '#2e3130'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffb3af'
  on-tertiary: '#650911'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#111413'
  on-background: '#e1e3e1'
  surface-variant: '#323534'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a premium, modern, and minimal digital presence for RIXON, a website development and digital creative services agency. Targeted at ambitious startups, technology leaders, and design-conscious enterprises, the interface evokes authority, technical mastery, and quiet confidence.

The visual language blends **Minimalism** with **Subtle Glassmorphism**:
- **Minimalism:** Generous negative space, disciplined typographic hierarchy, and a restrained dark-mode palette that keeps focus on case studies, interactive prototypes, and service offerings.
- **Glassmorphism:** Translucent surface layers with fine, low-opacity borders and soft backdrop blurs that create depth without visual clutter.

## Colors

The palette is anchored in a deep obsidian canvas (`#080B0A`) that maximizes contrast and reduces eye strain while allowing showcase visuals and typography to command attention.

- **Primary (`#10B981`):** Emerald green reserved for primary calls to action, active states, key metrics, and subtle ambient glows.
- **Secondary (`#FFFFFF`):** Crisp white used for primary headlines, high-emphasis labels, and secondary outlined actions.
- **Neutral (`#080B0A`):** Deep black-green base for the main canvas, paired with elevated translucent dark surfaces (`rgba(255, 255, 255, 0.03)` to `rgba(255, 255, 255, 0.06)`) and soft grey (`#A1A1AA`) for body copy and secondary metadata.

Maintain at least a 4.5:1 contrast ratio for all body text (`#A1A1AA` on `#080B0A` exceeds 7:1) and reserve `#10B981` for interactive accents rather than large text blocks.

## Typography

This design system pairs three modern geometric sans-serifs to balance expressive agency branding with crisp UI legibility:
- **Space Grotesk** drives display and headline roles, bringing architectural geometry and tight tracking to hero statements and section titles.
- **Inter** handles all body copy, ensuring effortless readability across long-form case studies and service descriptions.
- **Plus Jakarta Sans** is used for UI labels, navigation items, and uppercase micro-tags (`label-sm` with `0.06em` tracking).

On mobile viewports (`< 768px`), automatically step down `display-lg` and `headline-lg` to their `-mobile` tokens to preserve hierarchy without horizontal overflow.

## Layout & Spacing

The layout uses a **12-column fluid grid** on desktop (max-width `1280px` centered within the viewport) with `1.5rem` (`24px`) gutters and generous outer margins.

- **Desktop (`>= 1024px`):** 12 columns, `1.5rem` gutters, `3rem`–`5rem` vertical section padding.
- **Tablet (`768px` – `1023px`):** 8 columns, `1.5rem` gutters, `1.5rem` outer margins.
- **Mobile (`< 768px`):** 4 columns, `1rem` gutters, `1.5rem` outer margins. Multi-column card grids collapse to a single-column stack with `space-lg` vertical gaps.

Use `space-xs` and `space-sm` for tight inline pairings (icon-to-label, chip padding), `space-md` for standard component internal padding, and `space-lg` to `space-xl` for separating distinct content blocks.

## Elevation & Depth

Hierarchy on the `#080B0A` canvas is achieved through **Glassmorphism** and **Low-Contrast Outlines** rather than heavy drop shadows:

- **Translucent Surfaces:** Elevated cards and panels use `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(12px)`. Hover and active containers step up to `rgba(255, 255, 255, 0.06)`.
- **Ghost Borders:** Define container edges with `1px solid rgba(255, 255, 255, 0.08)`. Interactive hover states brighten the border to `rgba(255, 255, 255, 0.16)` or `rgba(16, 185, 129, 0.4)` for emerald-accented focus.
- **Ambient Glows:** Use subtle, diffused radial gradients of `#10B981` at `8%–12%` opacity behind hero elements or featured cards to create atmospheric depth without harsh shadows.

## Shapes

This design system uses a **Rounded (`2`)** shape language (`0.5rem` / `8px` base radius) to soften the technical precision of the dark geometric layout.

- **Standard (`0.5rem`):** Buttons, input fields, and small badges.
- **Large (`1rem`):** Glassmorphic cards, dropdown menus, and modal dialogs.
- **Extra Large (`1.5rem`):** Hero showcase containers and featured case-study media frames.
- **Pill (`9999px`):** Status chips and filter tags.

## Components

- **Buttons:**
  - *Primary:* Solid `#10B981` fill with `#080B0A` bold text (`label-lg`), `0.5rem` radius, and `space-sm` vertical / `space-lg` horizontal padding. Hover state lightens slightly and adds a subtle emerald outer glow.
  - *Secondary:* Transparent background with `1px solid rgba(255, 255, 255, 0.2)` border and `#FFFFFF` text. Hover shifts background to `rgba(255, 255, 255, 0.06)`.
  - *Ghost:* Text-only `#A1A1AA` transitioning to `#FFFFFF` on hover.
- **Chips & Tags:** Pill-shaped (`9999px` radius) with `rgba(255, 255, 255, 0.05)` fill, `1px solid rgba(255, 255, 255, 0.08)` border, and `label-sm` typography. Active filter chips use `rgba(16, 185, 129, 0.15)` fill with `#10B981` text.
- **Cards:** Glassmorphic containers (`rgba(255, 255, 255, 0.03)` + `blur(12px)`), `1rem` radius, `1px solid rgba(255, 255, 255, 0.08)` border, and `space-lg` internal padding.
- **Input Fields:** `rgba(255, 255, 255, 0.03)` background, `1px solid rgba(255, 255, 255, 0.12)` border, `0.5rem` radius, `#FFFFFF` input text, and `#A1A1AA` placeholder. Focus state transitions border to `#10B981`.
- **Checkboxes & Radio Buttons:** `1px solid rgba(255, 255, 255, 0.25)` stroke on transparent fill; checked state fills with `#10B981` and `#080B0A` checkmark/dot.
- **Lists:** Clean vertical stacks separated by `1px solid rgba(255, 255, 255, 0.06)` dividers with `space-md` vertical row padding.
- **Navigation Bar:** Sticky top bar with `rgba(8, 11, 10, 0.8)` background, `blur(16px)`, and a bottom `1px solid rgba(255, 255, 255, 0.06)` hairline border.