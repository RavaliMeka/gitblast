# Series look for the house style: a small badge beside the episode label, drifting background shapes and a thin
# strip along the bottom edge. All drawings are original and use the series accent colour (written as ACC).
def _svg(inner, vb="0 0 64 64"):
    return f'<svg viewBox="{vb}" width="1em" height="1em" style="display:block">{inner}</svg>'

WHALE = _svg('<rect x="15" y="17" width="9" height="8" rx="1.5" fill="#ffb020"/><rect x="25" y="17" width="9" height="8" rx="1.5" fill="#ff6b5a"/>'
             '<rect x="35" y="17" width="9" height="8" rx="1.5" fill="#22b573"/><rect x="25" y="8" width="9" height="8" rx="1.5" fill="#7c5cff"/>'
             '<path d="M4 34 C4 29 8 27 12 27 H46 C50 27 52 25 53 21 C54 17 58 15 61 17 C59 19 60 22 62 24 C59 25 58 28 57 32 C55 44 45 52 31 52 H22 C11 52 4 45 4 34 Z" fill="ACC"/>'
             '<path d="M12 44 C18 48 28 49 36 46" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>'
             '<circle cx="14" cy="36" r="2.6" fill="#fff"/><circle cx="14.6" cy="36.4" r="1.2" fill="#14213d"/>')
BOX = _svg('<rect x="8" y="18" width="48" height="30" rx="4" fill="none" stroke="ACC" stroke-width="5"/><path d="M20 18 V48 M32 18 V48 M44 18 V48" stroke="ACC" stroke-width="4"/>')
WHEEL = _svg('<g stroke="ACC" stroke-width="5" stroke-linecap="round" fill="none"><circle cx="32" cy="32" r="17"/>'
             + "".join(f'<path d="M32 32 L{32 + 28 * c:.1f} {32 + 28 * s:.1f}"/>' for c, s in
                       [(1, 0), (.707, .707), (0, 1), (-.707, .707), (-1, 0), (-.707, -.707), (0, -1), (.707, -.707)])
             + '</g><circle cx="32" cy="32" r="6" fill="ACC"/>')
HEX = _svg('<path d="M32 6 L54 19 V45 L32 58 L10 45 V19 Z" fill="none" stroke="ACC" stroke-width="5" stroke-linejoin="round"/><circle cx="32" cy="32" r="7" fill="ACC"/>')
LOOP = _svg('<path d="M20 22 C8 22 8 42 20 42 C30 42 34 22 44 22 C56 22 56 42 44 42 C40 42 37 39 35 36" fill="none" stroke="ACC" stroke-width="6" stroke-linecap="round"/>'
            '<path d="M29 37 L35 35 L37 42" fill="none" stroke="ACC" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')
GEAR = _svg('<g fill="ACC">' + "".join(f'<rect x="28" y="4" width="8" height="12" rx="2" transform="rotate({a} 32 32)"/>' for a in range(0, 360, 45))
            + '</g><circle cx="32" cy="32" r="17" fill="ACC"/><circle cx="32" cy="32" r="7" fill="#fff"/>')
CHECK = _svg('<circle cx="32" cy="32" r="24" fill="none" stroke="ACC" stroke-width="5"/><path d="M21 33 L29 41 L44 24" fill="none" stroke="ACC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
BLOCKS = _svg('<g fill="ACC"><rect x="6" y="36" width="22" height="22" rx="4"/><rect x="34" y="36" width="22" height="22" rx="4" opacity=".65"/><rect x="20" y="8" width="22" height="22" rx="4" opacity=".4"/></g>')
CLOUD = _svg('<path d="M18 46 C8 46 6 34 15 31 C15 20 30 16 35 25 C42 20 53 25 51 34 C59 36 57 46 49 46 Z" fill="none" stroke="ACC" stroke-width="5" stroke-linejoin="round"/>')
GRAPH = _svg('<g stroke="ACC" stroke-width="5" fill="none" stroke-linecap="round"><path d="M18 14 V50"/><path d="M18 32 C18 22 46 28 46 18"/></g><g fill="ACC"><circle cx="18" cy="14" r="7"/><circle cx="18" cy="50" r="7"/><circle cx="46" cy="16" r="7"/></g>')

def _strip(tile, w, h=44):   # one repeating tile, drawn in a w x h box
    return f'<svg width="1080" height="{h}" style="display:block"><defs><pattern id="strip" width="{w}" height="{h}" patternUnits="userSpaceOnUse">{tile}</pattern></defs><rect width="1080" height="{h}" fill="url(#strip)"/></svg>'

ART = {
    "docker": {"badge": WHALE, "shapes": [WHALE, BOX, BOX, WHALE, BOX],
               "strip": _strip('<path d="M0 22 C15 8 30 8 45 22 C60 36 75 36 90 22 V44 H0 Z" fill="ACC"/>', 90)},
    "kubernetes": {"badge": WHEEL, "shapes": [WHEEL, HEX, HEX, WHEEL, HEX],
                   "strip": _strip('<path d="M24 4 L42 14 V34 L24 44 L6 34 V14 Z" fill="none" stroke="ACC" stroke-width="4"/>', 48)},
    "ci/cd": {"badge": LOOP, "shapes": [GEAR, CHECK, LOOP, GEAR, CHECK],
              "strip": _strip('<path d="M0 22 H60" stroke="ACC" stroke-width="6" stroke-dasharray="26 10"/><circle cx="66" cy="22" r="9" fill="ACC"/>', 84)},
    "terraform": {"badge": BLOCKS, "shapes": [BLOCKS, CLOUD, BLOCKS, CLOUD, BLOCKS],
                  "strip": _strip('<g fill="ACC"><rect x="2" y="20" width="22" height="24" rx="3"/><rect x="28" y="6" width="22" height="38" rx="3" opacity=".6"/><rect x="54" y="26" width="22" height="18" rx="3" opacity=".8"/></g>', 80)},
    "git": {"badge": GRAPH, "shapes": None, "strip": None},
}
