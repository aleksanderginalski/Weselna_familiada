# Weselna Familiada - Wireframes & Screen Flows

**Version:** 1.0  
**Date:** 2025-01-XX  
**Author:** Solution Architect

---

## 1. Screen Inventory

| Screen ID | Screen Name | Purpose | Priority |
|-----------|-------------|---------|----------|
| S-001 | Lobby Screen | Game configuration before start | MVP |
| S-002 | Game Board | Projector display for guests | MVP |
| S-003 | Operator Panel | Game controls for host | MVP |
| S-004 | Winner Screen | End game celebration | MVP |

---

## 2. User Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   LOBBY     │────►│   PLAYING   │────►│   WINNER    │
│  (config)   │     │  (rounds)   │     │ (celebrate) │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           │ "Nowa Gra"
                           ▼
                    ┌─────────────┐
                    │   LOBBY     │
                    └─────────────┘
```

---

## 3. S-002: Game Board (Projector View)

**Purpose:** Display game state for wedding guests

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                        ┌──────────────┐                                │
│                        │     156      │  ◄── Points to win (sum × mult)│
│                        └──────────────┘                                │
│                                                                        │
│  ┌────────────┐                                        ┌────────────┐  │
│  │  DRUŻYNA   │                                        │  DRUŻYNA   │  │
│  │   PANA     │                                        │   PANNY    │  │
│  │  MŁODEGO   │                                        │  MŁODEJ    │  │
│  │            │                                        │            │  │
│  │    245     │  ◄── Total score                       │    180     │  │
│  └────────────┘                                        └────────────┘  │
│                                                                        │
│       ┌─┐         ┌────────────────────────────────┐         ┌─┐       │
│       │X│         │  1   WAKACJE NAD MORZEM    30  │         │ │       │
│       ├─┤         ├────────────────────────────────┤         ├─┤       │
│       │X│         │  2   ████████████████████      │         │ │       │
│       ├─┤         ├────────────────────────────────┤         ├─┤       │
│       │ │         │  3   ████████████████████      │         │ │       │
│       └─┘         ├────────────────────────────────┤         └─┘       │
│                   │  4   PIŁKA NOŻNA           18  │                   │
│   ◄── Mistakes    ├────────────────────────────────┤    Mistakes ──►   │
│   (left team)     │  5   ████████████████████      │   (right team)    │
│                   ├────────────────────────────────┤                   │
│                   │  6   ████████████████████      │                   │
│                   └────────────────────────────────┘                   │
│                                                                        │
│                        ┌──────────────┐                                │
│                        │   Suma: 48   │  ◄── Sum of revealed answers   │
│                        └──────────────┘                                │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Top center: Points to win this round (sum × multiplier)
- Left/Right: Team names and total scores
- Center: Answer board (6 rows shown, can be 3-7)
- Left/Right of answers: Mistake indicators (X marks)
- Bottom center: Sum of revealed answers

**States:**
- Hidden answer: `████████████████████` (masked)
- Revealed answer: `WAKACJE NAD MORZEM    30`
- Active mistake: Red X
- Empty mistake slot: Gray outline

---

## 4. S-003: Operator Panel (Laptop View)

**Purpose:** Control the game

```
┌────────────────────────────────────────────────────────────────────────┐
│  WESELNA FAMILIADA — Panel Operatora              [Otwórz Tablicę]    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Runda 2/4    Mnożnik: x2    Do wygrania: 156 pkt                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  PYTANIE: Co Polacy robią najchętniej w wakacje?                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        ODPOWIEDZI                                 │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │  1. Wakacje nad morzem ......... 30 pkt   [ODKRYJ] ✓ revealed    │  │
│  │  2. Góry / Tatry ............... 25 pkt   [ODKRYJ]               │  │
│  │  3. Grill z rodziną ............ 22 pkt   [ODKRYJ]               │  │
│  │  4. Piłka nożna ................ 18 pkt   [ODKRYJ] ✓ revealed    │  │
│  │  5. Oglądanie TV ............... 15 pkt   [ODKRYJ]               │  │
│  │  6. Remonty domowe ............. 12 pkt   [ODKRYJ]               │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─────────────────────────┐    ┌─────────────────────────┐           │
│  │  ○ DRUŻYNA PANA MŁODEGO │    │  ● DRUŻYNA PANNY MŁODEJ │           │
│  │      Wynik: 245         │    │      Wynik: 180         │           │
│  │      Błędy: X X ·       │    │      Błędy: · · ·       │           │
│  │                         │    │                         │           │
│  │  Status: Zgaduje        │    │  Status: Czeka          │           │
│  └─────────────────────────┘    └─────────────────────────┘           │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  [  BŁĄD  ]      Kolejny błąd = przejęcie przez przeciwnika     │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  [ ZAKOŃCZ RUNDĘ — wygrywa Drużyna Panny Młodej +156 pkt ]      │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- Header: Round info, multiplier, points to win
- Question: Current question text
- Answer list: All answers with reveal buttons
- Team panels: Selection, scores, mistakes
- Action buttons: Mistake, End Round

---

## 5. S-001: Lobby Screen

**Purpose:** Configure game before starting

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                        WESELNA FAMILIADA                               │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                       USTAWIENIA GRY                              │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                   │  │
│  │  Drużyna Lewa:  [Drużyna Pana Młodego_____________]              │  │
│  │                                                                   │  │
│  │  Drużyna Prawa: [Drużyna Panny Młodej_____________]              │  │
│  │                                                                   │  │
│  │  ─────────────────────────────────────────────────────────────   │  │
│  │                                                                   │  │
│  │  Tryb gry:      ○ Stała liczba rund   ● Do punktów               │  │
│  │                                                                   │  │
│  │  Liczba rund:   [4]        Cel punktowy: [300]                   │  │
│  │                                                                   │  │
│  │  ─────────────────────────────────────────────────────────────   │  │
│  │                                                                   │  │
│  │  Pytania załadowane: 5 rund                                      │  │
│  │                                                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│                    [      ROZPOCZNIJ GRĘ      ]                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. S-004: Winner Screen

**Purpose:** Celebrate winning team

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                           🎉 🎊 🎉                                     │
│                                                                        │
│                         WYGRYWA                                        │
│                                                                        │
│                  ╔═══════════════════════════╗                         │
│                  ║   DRUŻYNA PANNY MŁODEJ    ║                         │
│                  ║                           ║                         │
│                  ║         356 PKT           ║                         │
│                  ╚═══════════════════════════╝                         │
│                                                                        │
│                                                                        │
│            Drużyna Pana Młodego: 245 pkt                              │
│                                                                        │
│                                                                        │
│                    [      NOWA GRA      ]                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Responsive Notes

### Game Board (Projector)
- Optimized for 1920x1080
- Text sizes: Team names 48px, Answers 36px, Scores 72px
- High contrast: Dark background, gold/white text

### Operator Panel (Laptop)
- Works on 1366x768 minimum
- Scrollable if needed
- Touch-friendly button sizes (44px minimum)

---

*This document is updated when UI changes are made during /discover or implementation.*
