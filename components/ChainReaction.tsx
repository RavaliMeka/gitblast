"use client";

// The chain reaction: every file is a domino on a round table. The picked file falls
// first, then everything a change to it reaches, ring by ring. Drawn with three.js,
// which is only loaded when this view is shown.

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Reach } from "@/lib/graph";
import { layoutChain } from "./chain";

/** Dominoes drawn at once. Past this, the files the change can't reach are thinned out. */
const MAX_TILES = 3600;
const START = 0.95; // seconds of setting the table before the first domino goes
const SPEED = 30; // how fast the fall travels outwards
const FALL = 1.34; // how far a domino tips, in radians
const DEPTH_COLOR = ["#ff3b30", "#ff7a00", "#f5b000", "#4c8dff"];

interface Tile {
  x: number;
  z: number;
  angle: number;
  tilt: number;
}

interface Selection {
  center: string;
  reach: Reach;
  others: string[];
  weight: (path: string) => number;
}

interface Stage {
  select(s: Selection): void;
  dispose(): void;
}

function easeInOut(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function createStage(
  canvas: HTMLCanvasElement,
  labels: { sel: HTMLElement; edge: HTMLElement; tip: HTMLElement },
  onPick: (path: string) => void,
): Stage {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(3, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 6000);
  const view = { theta: 0.5, phi: 0.86, radius: 560 };
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");

  const hemi = new THREE.HemisphereLight(0xffffff, 0xdfe3ee, 1.25);
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  const sun = new THREE.DirectionalLight(0xffffff, 1.7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0006;
  sun.shadow.radius = 3;
  scene.add(hemi, ambient, sun);

  const tableMat = new THREE.MeshStandardMaterial({ roughness: 0.9 });
  const table = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.985, 6, 128), tableMat);
  table.position.y = -3;
  table.receiveShadow = true;
  scene.add(table);

  // A domino's origin is the bottom edge it falls over.
  const box = new THREE.BoxGeometry(1, 1, 1);
  box.translate(0, 0.5, -0.5);
  const tiles = new THREE.InstancedMesh(box, new THREE.MeshStandardMaterial({ roughness: 0.32, metalness: 0.02 }), MAX_TILES + 1);
  tiles.castShadow = true;
  tiles.receiveShadow = true;
  tiles.count = 0;
  scene.add(tiles);

  const flat = (inner: number, color: number) => {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(inner, 1, 160),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    return mesh;
  };
  const wave = flat(0.955, 0xff5a36);
  wave.position.y = 0.12;
  const edgeRing = flat(0.992, 0xff3b30);
  edgeRing.position.y = 0.1;

  const rest = new THREE.Color();
  const hit = DEPTH_COLOR.map((c) => new THREE.Color(c));
  function theme() {
    const dark = scheme.matches;
    rest.set(dark ? "#6b6f7b" : "#dfe4ef");
    tableMat.color.set(dark ? "#2a2a2e" : "#fbfcfe");
    hemi.intensity = dark ? 0.9 : 1.25;
    ambient.intensity = dark ? 0.25 : 0.3;
    dirty = true;
    settled = false;
  }

  // State kept per file, so dominoes slide from where they stood when another file is picked.
  const state = new Map<string, Tile>();
  let paths: string[] = [];
  let from: Tile[] = [];
  let to: { x: number; z: number; angle: number; radius: number; depth: number; delay: number; height: number }[] = [];
  let edge = 9;
  let endAt = 0;
  let t0 = performance.now();
  let settled = true;
  let dirty = true;
  let first = true;
  let reached = 0;
  let tableSize = 60;

  const m4 = new THREE.Matrix4();
  const quat = new THREE.Quaternion();
  const euler = new THREE.Euler(0, 0, 0, "YXZ");
  const pos = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const color = new THREE.Color();
  const WIDTH = 3.3;
  const THICK = 0.95;

  function select(s: Selection) {
    // Keep every reached file; thin out the unreached ones if the repository is very large.
    const reachedPaths = [...s.reach.keys()].slice(0, MAX_TILES - 200);
    const others = s.others.slice(0, Math.max(0, MAX_TILES - reachedPaths.length));
    const shown: Reach = new Map(reachedPaths.map((p) => [p, s.reach.get(p)!]));
    const layout = layoutChain(s.center, shown, others);
    edge = layout.edge;
    reached = s.reach.size;

    paths = [...layout.slots.keys()];
    from = [];
    to = [];
    let last = START;
    for (const p of paths) {
      const slot = layout.slots.get(p)!;
      const was = state.get(p) ?? { x: slot.x, z: slot.z, angle: slot.angle, tilt: 0 };
      from.push({ ...was });
      const delay = slot.depth === 0 ? START : START + 0.3 + slot.radius / SPEED + Math.random() * 0.07;
      if (slot.depth > 0) last = Math.max(last, delay);
      to.push({ x: slot.x, z: slot.z, angle: slot.angle, radius: slot.radius, depth: slot.depth, delay, height: 6.2 + 5.2 * Math.sqrt(s.weight(p)) });
    }
    for (const p of state.keys()) if (!layout.slots.has(p)) state.delete(p);
    tiles.count = paths.length;
    endAt = Math.max(last, START + edge / SPEED) + 1.6;

    const size = layout.outer + 16;
    table.scale.set(size, 1, size);
    view.radius = size * 3.4;
    tableSize = size;
    const span = size + 10;
    Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 10, far: 900 });
    sun.shadow.camera.updateProjectionMatrix();

    labels.sel.textContent = s.center.slice(s.center.lastIndexOf("/") + 1);
    labels.edge.textContent = reached > 0 ? `blast radius · ${reached.toLocaleString("en-US")} files down` : "";
    // The first time, the table is already set: go straight to the fall.
    t0 = performance.now() - (first ? 750 : 0);
    first = false;
    settled = false;
    dirty = true;
  }

  function animate(t: number) {
    const move = easeInOut(t / 0.8);
    for (let k = 0; k < paths.length; k++) {
      const a = from[k];
      const b = to[k];
      let turn = b.angle - a.angle;
      turn = Math.atan2(Math.sin(turn), Math.cos(turn));
      const x = a.x + (b.x - a.x) * move;
      const z = a.z + (b.z - a.z) * move;
      const angle = a.angle + turn * move;
      const since = t - b.delay;
      // Stand back up while sliding to the new place, then fall (or just rock) when the wave arrives.
      let tilt = a.tilt * (1 - move);
      if (b.depth >= 0) {
        if (since > 0) {
          const p = Math.min(1, since / 0.42);
          tilt = FALL * p * p + (since > 0.42 ? -0.07 * Math.sin((since - 0.42) * 20) * Math.exp(-(since - 0.42) * 8) : 0);
          tiles.setColorAt(k, color.copy(rest).lerp(hit[b.depth], Math.min(1, since / 0.3)));
        } else tiles.setColorAt(k, rest);
      } else {
        tiles.setColorAt(k, rest);
        if (since > 0) tilt = 0.15 * Math.exp(-(b.radius - edge) / 45) * Math.sin(since * 15) * Math.exp(-since * 4.5);
      }
      state.set(paths[k], { x, z, angle, tilt });
      euler.set(tilt, Math.PI / 2 - angle, 0);
      quat.setFromEuler(euler);
      pos.set(x, 0, z);
      scale.set(WIDTH, b.height, THICK);
      m4.compose(pos, quat, scale);
      tiles.setMatrixAt(k, m4);
    }
    tiles.instanceMatrix.needsUpdate = true;
    if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;

    const front = (t - START) * SPEED + 6;
    wave.scale.setScalar(Math.max(0.01, front));
    // The wave fades out past the fallen dominoes and never runs off the table.
    const fade = Math.max(8, Math.min(60, tableSize - edge - 6));
    (wave.material as THREE.MeshBasicMaterial).opacity = t > START && front < edge + fade ? 0.5 * (1 - Math.max(0, front - edge) / fade) : 0;
    const arrived = t - START - edge / SPEED;
    edgeRing.scale.setScalar(Math.max(0.01, edge));
    (edgeRing.material as THREE.MeshBasicMaterial).opacity = reached > 0 && arrived > 0 ? Math.min(0.55, arrived * 1.4) : 0;
    labels.edge.style.opacity = String(reached > 0 && arrived > 0 ? Math.min(1, arrived * 2) : 0);
    labels.sel.style.opacity = String(Math.min(1, Math.max(0, (t - 0.5) * 3)));
    if (t > endAt) settled = true;
  }

  const projected = new THREE.Vector3();
  function placeLabel(el: HTMLElement, x: number, y: number, z: number) {
    projected.set(x, y, z).project(camera);
    el.style.transform = `translate(${((projected.x + 1) / 2) * canvas.clientWidth}px, ${((1 - projected.y) / 2) * canvas.clientHeight}px)`;
  }

  let raf = 0;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (settled && !dirty) return; // nothing is moving: don't redraw
    const t = still ? 999 : (now - t0) / 1000;
    if (!settled) animate(t);
    const lean = still || settled ? 0 : 0.1 * Math.exp(-Math.pow((t - START - 0.35) / 0.4, 2));
    const r = view.radius * (1 - lean);
    const s = Math.sin(view.phi);
    camera.position.set(r * s * Math.sin(view.theta), r * Math.cos(view.phi), r * s * Math.cos(view.theta));
    camera.lookAt(0, 4, 0);
    // The light follows the camera round the table, so the faces in view are the lit ones.
    sun.position.set(Math.sin(view.theta - 0.9) * 190, 260, Math.cos(view.theta - 0.9) * 190);
    renderer.render(scene, camera);
    placeLabel(labels.sel, 0, 16, 0);
    // On the near side of the circle, whichever way the table is turned.
    placeLabel(labels.edge, Math.sin(view.theta) * edge, 1, Math.cos(view.theta) * edge);
    dirty = false;
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function fileAt(e: PointerEvent): string | null {
    const box = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - box.left) / box.width) * 2 - 1, -((e.clientY - box.top) / box.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    // The dominoes move, so the bounds three.js cached for them on an earlier pick are out of date.
    tiles.boundingSphere = null;
    const found = ray.intersectObject(tiles)[0];
    return found?.instanceId === undefined ? null : (paths[found.instanceId] ?? null);
  }
  let drag: { x: number; y: number; moved: number } | null = null;
  const down = (e: PointerEvent) => {
    drag = { x: e.clientX, y: e.clientY, moved: 0 };
    canvas.setPointerCapture(e.pointerId);
  };
  const moveTo = (e: PointerEvent) => {
    if (drag) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY, moved: drag.moved + Math.abs(dx) + Math.abs(dy) };
      view.theta -= dx * 0.005;
      view.phi = Math.min(1.42, Math.max(0.25, view.phi - dy * 0.004));
      labels.tip.hidden = true;
      dirty = true;
      return;
    }
    const path = fileAt(e);
    labels.tip.hidden = path === null;
    if (path === null) return;
    const box = canvas.getBoundingClientRect();
    labels.tip.textContent = path;
    labels.tip.style.left = `${e.clientX - box.left}px`;
    labels.tip.style.top = `${e.clientY - box.top}px`;
  };
  const up = (e: PointerEvent) => {
    if (drag && drag.moved < 6) {
      const path = fileAt(e);
      if (path) onPick(path);
    }
    drag = null;
  };
  const leave = () => {
    labels.tip.hidden = true;
  };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", moveTo);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointerleave", leave);
  scheme.addEventListener("change", theme);

  theme();
  resize();
  raf = requestAnimationFrame(frame);

  return {
    select,
    dispose() {
      cancelAnimationFrame(raf);
      observer.disconnect();
      scheme.removeEventListener("change", theme);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", moveTo);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", leave);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
    },
  };
}

export default function ChainReaction({
  center,
  reach,
  others,
  weight,
  replay,
  onPick,
  onUnsupported,
}: Selection & {
  /** Bump to knock the same file over again. */
  replay: number;
  onPick: (path: string) => void;
  /** Called when this device can't draw 3D, so the page can show the flat radar instead. */
  onUnsupported: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const stage = useRef<Stage | null>(null);
  const pick = useRef(onPick);
  pick.current = onPick;
  const unsupported = useRef(onUnsupported);
  unsupported.current = onUnsupported;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selRef.current || !edgeRef.current || !tipRef.current) return;
    try {
      stage.current = createStage(canvas, { sel: selRef.current, edge: edgeRef.current, tip: tipRef.current }, (p) => pick.current(p));
    } catch {
      unsupported.current();
      return;
    }
    setReady(true);
    return () => {
      stage.current?.dispose();
      stage.current = null;
    };
    // Set up once: the selection is fed in by the effect below, and the callbacks are read through refs.
  }, []);

  useEffect(() => {
    if (ready) stage.current?.select({ center, reach, others, weight });
  }, [ready, center, reach, others, weight, replay]);

  return (
    <div className="chain">
      <canvas
        ref={canvasRef}
        aria-label="A table of dominoes, one per file. The picked file falls first, then every file that depends on it. The lists beside it give the same result as text."
      />
      <div className="chain-label chain-sel" ref={selRef} />
      <div className="chain-label chain-edge" ref={edgeRef} />
      <div className="tooltip chain-tip" ref={tipRef} hidden />
    </div>
  );
}
