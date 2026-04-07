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
| S-005 | Final Round Board | Projector view during final round | US-026 |
| S-006 | Final Round Operator | Operator controls during final round | US-026 |

---

## 2. User Flow

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────────┐
│   LOBBY     │────►│   PLAYING   │────►│  last round summary  │
│  (config)   │     │  (rounds)   │     │  in RoundControls:   │
└─────────────┘     └─────────────┘     │  [OGŁOŚ ZWYCIĘSTWO]  │
                                        │  [RUNDA FINAŁOWA]    │
                                        └──────────┬───────────┘
                                                   │
                              ┌────────────────────┴──────────────────────┐
                              │                                           │
                              ▼                                           ▼
                    ┌─────────────────┐                       ┌──────────────────┐
                    │    WINNER       │                       │  FINAL ROUND     │
                    │  (celebrate)    │                       │  (S-005 + S-006) │
                    └─────────────────┘                       └────────┬─────────┘
                              ▲                                        │
                              │                               finishFinalRound()
                              └────────────────────────────────────────┘
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

## 7. S-005: Final Round Board (US-026)

**Purpose:** Projector view during the final round

```
┌────────────────────────────────────────────────────────────────────────┐
│  00:15                    RUNDA FINAŁOWA                               │
├────────────────────────────────────────────────────────────────────────┤
│  Gracz A                   Pkt A  Pkt B          Gracz B              │
│ ──────────────────────────────────────────────────────────────────────│
│  MARCHEWKA                  28     ?                                   │
│                              ?     ?                                   │
│                              ?     ?                                   │
│                              ?     ?                                   │
│                              ?     ?                                   │
│ ──────────────────────────────────────────────────────────────────────│
│                           SUMA: 28                                     │
└────────────────────────────────────────────────────────────────────────┘
```

**Key elements:**
- Timer top-left (hidden when 0 and not running)
- Fixed-width points columns — layout never shifts
- All text in gold color
- Player A text hidden while Player B answers (`playerAHidden`)
- `?` = unrevealed, `…` = revealed but points pending, number = fully visible

---

## 8. S-006: Final Round Operator (US-026)

**Purpose:** Operator controls during final round

```
┌────────────────────────────────────────────────────────────────────────┐
│  RUNDA FINAŁOWA — Panel Operatora                                      │
│  ┌────────────────────────────────────────────────────────────────────┐│
│  │  Timer — Gracz A          00:15                                    ││
│  │  [START]  [+5s]  [-5s]                                             ││
│  └────────────────────────────────────────────────────────────────────┘│
│                                                                        │
│  P1: Co kojarzy się z królikiem?                                       │
│    [Uszy (35)] [Marchewka (28)] [Biały kolor (20)] …                   │
│    Gracz A: [___________] [ODKRYJ]   Gracz B: [___________] [ODKRYJ]  │
│                                                                        │
│  P2–P5: (same layout)                                                  │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│  Suma finałowa: 0 pkt                                                  │
│  [GOTOWY DO SPRAWDZANIA]                                               │
└────────────────────────────────────────────────────────────────────────┘
```

**Phase progression:**
1. `answeringA` → START timer, player A answers verbally
2. Operator clicks "GOTOWY DO SPRAWDZANIA" → `revealingA`
3. Operator reveals each answer (correct/wrong/skipped) one by one
4. All 5 revealed → "UKRYJ ODPOWIEDZI GRACZA A" → `answeringB`
5. Player B answers → reveal answers → `revealingB`
6. All 10 revealed → "ZAKOŃCZ RUNDĘ FINAŁOWĄ" → `finished`

---

## 9. Responsive Notes

### Game Board (Projector)
- Optimized for 1920x1080
- Text sizes: Team names 48px, Answers 36px, Scores 72px
- High contrast: Dark background, gold/white text

### Operator Panel (Laptop)
- Works on 1366x768 minimum
- Scrollable if needed
- Touch-friendly button sizes (44px minimum)

### Final Round Board
- Fixed-width point columns (80px each) — no layout shift as text appears
- Timer shown only when running or when seconds > 0
- WinnerScreen on board: no "Nowa Gra" button; team name and score 2× larger than operator view

---

*This document is updated when UI changes are made during /discover or implementation.*
