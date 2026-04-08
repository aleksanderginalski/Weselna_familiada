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

| Role | Font | Tailwind Token | Notes |
|------|------|----------------|-------|
| Dot-matrix board cells | Familiada-2 | `font-display` | Custom OTF, em-square 640×896 (5:7), glyphs fill cell exactly |
| Headings, team names, labels | Familiada | `font-heading` | TTF/WOFF2, retro TV style |
| UI text (operator panel) | Arial | `font-body` | Fallback: Helvetica, sans-serif |

### Board cell sizing (US-027)
- Cell aspect-ratio: 5:7 — matches Familiada-2 em-square (640×896)
- Grid: 30 cols × 10 rows; gap = 1 px unit
- Font size: `calc(700cqi / 179)` — 700 units tall / 179 horizontal units total
- `line-height: 1` — eliminates extra whitespace above/below glyphs

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

*This brief is updated when design decisions evolve.*
