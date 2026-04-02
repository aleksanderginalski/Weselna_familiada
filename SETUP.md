# Weselna Familiada - Development Setup Guide

**Version:** 1.0  
**Date:** 2025-01-XX  
**Platform:** Windows 10/11

---

## 1. Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18+ | https://nodejs.org/ |
| Git | 2.0+ | https://git-scm.com/ |
| VS Code | Latest | https://code.visualstudio.com/ |

### Verify Installation

```powershell
# Check Node.js
node --version

# Check npm
npm --version

# Check Git
git --version
```

---

## 2. Project Setup

### 2.1 Clone Repository

```powershell
git clone https://github.com/[USERNAME]/Weselna_familiada.git
cd Weselna_familiada
```

### 2.2 Install Dependencies

```powershell
npm install
```

### 2.3 Run Development Server

```powershell
npm run dev
```

Application opens at `http://localhost:3000`

---

## 3. VS Code Configuration

### 3.1 Required Extensions

Open project in VS Code — it will suggest installing recommended extensions from `.vscode/extensions.json`:

| Extension | Purpose |
|-----------|---------|
| ESLint | Linting |
| Prettier | Code formatting |
| Tailwind CSS IntelliSense | Tailwind autocomplete |
| TypeScript Importer | Auto-imports |

### 3.2 Workspace Settings

Settings are pre-configured in `.vscode/settings.json`:
- Format on save enabled
- ESLint auto-fix enabled
- Tailwind CSS suggestions enabled

---

## 4. Project Structure

```
Weselna_familiada/
├── .claude/agents/       # Claude Code agent definitions
├── .vscode/              # VS Code configuration
├── public/
│   └── pytania.json      # Questions file (edit this!)
├── src/
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── CLAUDE.md             # Dev agent instructions
├── BACKLOG.md            # Product backlog
└── package.json
```

---

## 5. Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

---

## 6. Git Workflow

### 6.1 Branch Naming

```
{issue-number}-{short-description}

Examples:
- 1-project-setup
- 5-answer-board
- 12-sound-effects
```

### 6.2 Commit Convention

```
type: short description (Closes #issue)

Types:
- feat: new feature
- fix: bug fix
- test: tests
- docs: documentation
- refactor: code refactoring
- chore: maintenance
```

### 6.3 Standard Workflow

```powershell
# 1. Create branch
git checkout -b 5-answer-board

# 2. Make changes and commit
git add src/components/board/AnswerBoard.tsx
git commit -m "feat: add answer board component (Closes #5)"

# 3. Push and create PR
git push -u origin 5-answer-board

# 4. After merge, cleanup
git checkout main
git pull
git branch -d 5-answer-board
```

**Note:** Never use `&&` in PowerShell — run each command separately.

---

## 7. Claude Code Agents

Project uses multi-agent system. Start each session with:

```
/pm
```

Agent will check git status and route you to appropriate agent:

| Agent | When to use |
|-------|-------------|
| /pm | Start of session |
| /planning | Before implementing US |
| /dev | Implementation |
| /qa | After manual verification |
| /docs | After US completion |
| /debug | When something breaks |
| /discover | New ideas/features |

---

## 8. Editing Questions

Edit `public/pytania.json` in VS Code:

```json
{
  "config": {
    "mode": "fixed",
    "numberOfRounds": 4,
    "multipliers": [1, 2, 3, 3],
    "teams": {
      "left": { "name": "Drużyna Pana Młodego" },
      "right": { "name": "Drużyna Panny Młodej" }
    }
  },
  "rounds": [
    {
      "question": "Co Polacy robią najchętniej w wakacje?",
      "answers": [
        { "text": "Wyjeżdżają nad morze", "points": 35 },
        { "text": "Grillują", "points": 28 },
        { "text": "Odpoczywają w domu", "points": 20 },
        { "text": "Jadą w góry", "points": 12 },
        { "text": "Odwiedzają rodzinę", "points": 5 }
      ]
    }
  ]
}
```

---

## 9. Troubleshooting

### Issue: `npm install` fails

**Solution:**
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Port 3000 in use

**Solution:**
```powershell
# Find process using port
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID [PID] /F
```

### Issue: TypeScript errors

**Solution:**
```powershell
# Restart TS server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## 10. Production Build

```powershell
npm run build
```

Output in `dist/` folder. Open `dist/index.html` in browser or serve with any static server.

---

*This guide is updated when setup requirements change.*
