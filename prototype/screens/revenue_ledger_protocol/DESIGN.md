---
name: Revenue Ledger Protocol
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#07006c'
  on-tertiary-container: '#7073ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  status-amber: '#F59E0B'
  status-red: '#EF4444'
  surface-base: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  display-metrics:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 260px
---

## Brand & Style
The brand personality is **Authoritative, Forensic, and Controlled**. As a "Finance-ready Revenue Control Layer," the design system avoids decorative flourishes in favor of "Data Density with Clarity." It is built to serve as the definitive source of truth for CFOs and Revenue Operations, demanding an aesthetic that feels unbreakable and institutional.

The design style is **Corporate / Modern** with a focus on **Systematic Utility**. It utilizes a structured "Overlay" approach, where information is organized into logical tiers. The UI should feel like an extension of high-end financial software—lean, high-contrast, and highly functional. Visual interest is derived from precise alignment, rhythmic spacing, and functional status indicators rather than illustrative elements.

## Colors
This design system utilizes a high-contrast palette to ensure legibility in data-dense environments.

- **Primary (Deep Midnight Blue):** Used for persistent navigation, headers, and primary actions to establish authority and trust.
- **Secondary (Success Green):** Reserved exclusively for positive revenue growth, approved claims, and active statuses.
- **Neutral (Slate Grays):** Utilized for structural lines, secondary text, and metadata to reduce visual noise.
- **Status Colors:** **Amber** is used for items under review or disputed, signaling caution without failure. **Red** is strictly for financial risks, rejected claims, or system breaches.

The default mode is **Light**, optimized for clarity and focus during long periods of data analysis. Backgrounds should use `surface-base` to differentiate the application frame from content cards.

## Typography
The typography system prioritizes scanning efficiency and clarity in tabular data. 

- **Headlines (Public Sans):** A sturdy, institutional sans-serif used for structural identification and executive-level metrics.
- **Body & Labels (Inter):** A neutral, systematic typeface used for all functional data points. 
- **Data Mono:** While using Inter, numeric values and IDs should utilize tabular lining (mono-spacing) to ensure columns of figures align perfectly in ledgers.

For mobile views, `display-metrics` scales down to 32px and `headline-lg` to 24px to maintain readability within tighter viewport constraints.

## Layout & Spacing
The design system employs a **Fixed Grid** philosophy for the main content area to maintain executive-grade presentation, while the sidebar remains persistent.

- **The Ledger Grid:** A 12-column system with 16px gutters. In data-heavy views, padding is reduced to 8px (2 units) to maximize "Data Density with Clarity."
- **Persistent Navigation:** A 260px sidebar on the left provides the "OS feel." It collapses to an icon-only rail on smaller screens.
- **Breakpoints:** 
  - **Mobile (<768px):** Single column, margins reduced to 16px, navigation moves to a bottom bar or hamburger menu.
  - **Tablet (768px - 1280px):** 8-column grid, persistent collapsed sidebar.
  - **Desktop (>1280px):** 12-column grid, full persistent sidebar.
- **RTL Support:** All layouts must be mirrored for GCC markets, including the sidebar position and data table column order.

## Elevation & Depth
This system uses **Tonal Layers** and **Low-contrast Outlines** instead of heavy shadows to maintain a clean, professional aesthetic.

- **Base Layer:** `surface-base` (#F8FAFC) acts as the canvas.
- **Card Layer:** White surfaces with a 1px `border-subtle` (#E2E8F0).
- **Interactive States:** Subtle ambient shadows (4px blur, 5% opacity) are only applied on hover to indicate interactability.
- **Depth Hierarchy:** Modals and fly-outs use a crisp 1px border with a slightly darker tint to distinguish them from the background, ensuring the UI feels like a series of organized sheets rather than floating objects.

## Shapes
The shape language is **Soft but Precise**, using a 4px (0.25rem) base radius. This provides a modern feel without sacrificing the professional, "engineered" look required for financial software. 

- **Atomic Units:** Buttons and input fields use the base 4px radius.
- **Containers:** Cards and Ledger rows use `rounded-lg` (8px) to create a clear container for grouped data.
- **Status Badges:** Use a pill-shape (16px+) to differentiate them from interactive buttons.

## Components

- **Buttons:** Primary buttons are Solid Midnight Blue. Secondary actions use ghost styles with a 1px border. No gradients; focus on flat, high-contrast states.
- **Data Tables (The Ledger):** The core component. Features includes sticky headers, alternating row stripes (subtle), and inline status badges. Row height is compact (40px) to maximize data density.
- **Status Chips:** Small, semi-transparent background badges with bold text color (e.g., Light Green background with Dark Green text) for "Accepted" or "Strategic" statuses.
- **Input Fields:** Rectangular with a 1px border. Focus states use a 2px Primary Blue border. Labels are always persistent (not floating) to ensure clarity during fast data entry.
- **Progress Steppers:** Horizontal indicators for the "Claim Lifecycle" (Prospect -> Strategic), using success green for completed steps and slate for pending ones.
- **Metric Cards:** Large "North Star" values with a label-caps header and display-metrics value, used at the top of dashboards for instant executive visibility.