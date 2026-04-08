# Weselna Familiada — Design Brief

**Version:** 1.0  
**Created:** 2025-01-XX  
**Purpose:** Visual identity for the game application

---

## 1. Visual Identity

### Personality
Weselna Familiada is **nostalgic, festive, and entertaining**.  
The design should feel like a Polish TV show from the 90s/2000s meets wedding celebration.

**Three words that describe the visual tone:**
- Retro
- Elegant
- Playful

**Inspiration:** Original Polish "Familiada" TV show, classic game show aesthetics

---

## 2. Color System

### Primary Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background Dark | familiada-bg-dark | `#0a1628` | Main board background |
| Background Panel | familiada-bg-panel | `#1a2744` | Answer rows, panels |
| Gold Accent | familiada-gold | `#fbbf24` | Scores, revealed text, highlights |
| Red/Error | familiada-red | `#ef4444` | Mistakes (X), error states |
| Border | familiada-border | `#334155` | Subtle borders |
| Text Primary | white | `#ffffff` | Main text |
| Text Secondary | gray-400 | `#9ca3af` | Secondary info |

---

## 3. Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Logo/Title | **Familiada** (Impact fallback) | Regular | 48px |
| Answer Text | **Familiada** (Impact fallback) | Regular | 36px |
| Score Numbers | **Familiada** (Impact fallback) | Regular | 72px |
| UI Labels | Arial / System | Medium | 16px |

**Font file:** `src/assets/fonts/familiada.ttf` — loaded via `@font-face` in `src/index.css`  
**Scope:** Game board only. Operator panel uses system fonts.  
**Fallback stack:** `['Familiada', 'Impact', 'Arial Narrow Bold', 'sans-serif']`

---

## 4. Border Radius

| Element | Radius |
|---------|--------|
| Answer rows | 8px |
| Score boxes | 12px |
| Buttons | 6px |
| Panels | 12px |

---

## 5. Effects

### Gold Glow
```css
text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
```

---

## 6. X Error Indicators (Mistake / Steal)

**Reference:** original Familiada LED board — see `/Duży błąd.JPG` and `/Mały Błąd.JPG`

| Property | Value |
|----------|-------|
| Color | Yellow (`#fbbf24`) — same as gold accent |
| Style | Dot-matrix LED pattern via CSS `radial-gradient` grid |
| Background | Dark (`#0a1628`) with visible dot grid |
| Active state | Yellow dots |
| Inactive/empty state | Dark/invisible dots (no bright color) |

**Types:**
- **Small X** — 3 stacked slots on the controlling team's side (one per mistake)
- **Large X** — 1 tall slot on the opposing side (steal indicator), height = 3 small slots combined

**Scope:** Game board only. Operator panel keeps current styling.

---

*This brief is updated when design decisions evolve.*
