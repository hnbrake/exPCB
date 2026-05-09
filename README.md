# exPCB

**Interactive electronics intuition** — FPGAs, memory, circuits, power, and buses explained with diagrams, short reads, and demos you can actually poke at.

> Not a SPICE replacement. Built for the mental model you carry from the couch to the bench.

---

## Why this exists

exPCB connects **datasheet vocabulary** to **motion and pictures**: LUTs and bitstreams, SRAM vs flash, MOSFET curves, LDOs vs bucks, SPI/I²C/JTAG — each area mixes prose with something draggable, tappable, or slidable. Several chapters end with **Sources** boxes that point at manuals, standards, and vendor notes (IEEE, JEDEC, architecture guides, and more).

---

## Highlights

| | |
|---|---|
| **Learning trail** | Suggested read order with step dots and prev/next navigation |
| **Route theming** | Per-track accent colors on FPGA, Memory, Circuits, Power, Protocols |
| **Ink aesthetic** | Shared dark “ink” palette on interior pages, footer, and trail |
| **Attribution** | Wikimedia / Commons figures with license links where used |
| **Accessible motion** | Scroll reveals respect `prefers-reduced-motion` |

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** (build + dev server)
- **React Router 7** (client-side routing)
- **ESLint** (flat config)

---

## Quick start

**Requirements:** Node.js **20+** (or current LTS) and npm.

```bash
# install dependencies
npm install

# dev server (http://localhost:5173)
npm run dev

# production build → ./dist
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

---

## Site map

| Path | What you’ll find |
|------|------------------|
| `/` | Home — tracks overview, hero art, dark “tail” sections |
| `/fpga` | FPGA hub |
| `/fpga/fabric` | Programmable fabric, PLL/SerDes context |
| `/fpga/system` | Guided system builder demo |
| `/fpga/soc` | SoC vs FPGA vs MPU angles |
| `/memory` | Memory hub |
| `/memory/deep` | Deeper memory tiers copy |
| `/memory/match` | Drag-and-match lab |
| `/circuits` | Circuits hub |
| `/circuits/mosfet` | MOSFET playground |
| `/circuits/cmos` | CMOS inverter demo |
| `/circuits/passives` | Passives explorer |
| `/light/power` | Power path (LDO vs switcher, decoupling) |
| `/light/protocols` | SPI, I²C, JTAG at a glance |

---

## Project layout (sketch)

```text
public/           # static assets, diagram SVGs, favicon
src/
  App.tsx         # route table
  main.tsx        # entry
  index.css       # global + theme + layout
  components/     # layout, demos, diagrams, art, UI primitives
  pages/          # Home + hubs and deep pages by area
  content/        # learning path + reference metadata
```

---

## License & credits

- **Application code** in this repo: treat as your project license once you add one (e.g. MIT) if you open-source it.
- **Third-party diagrams** (e.g. on Commons) keep their **CC-BY / CC0** terms — see on-page **Image:** credit lines and links.

---

## Contributing / editing

- Content and copy live mostly under `src/pages/` and `src/content/`.
- Visual system: CSS variables and `data-expcb-theme` on `<html>` (set from the router in `Layout.tsx`).
- After substantive style or route changes, run `npm run build` to confirm TypeScript and Vite both pass.

---

<p align="center">
  <strong>exPCB</strong> · learn · build intuition · <em>🧩</em>
</p>
