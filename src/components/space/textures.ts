import * as THREE from "three";

/**
 * Deterministic PRNG (mulberry32). Generated textures must look identical on
 * every reload, otherwise the scene "flickers" between visits.
 */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** A banded, speckled surface tinted with the theme accent. No image assets. */
export function createPlanetTexture(color: string, seed = 1): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 192;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;

  const context = canvas.getContext("2d");
  if (!context) return texture;

  const random = createRandom(seed);

  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Latitude bands read as atmosphere even at a distance.
  for (let y = 0; y < canvas.height; y += 4) {
    const band = Math.sin((y / canvas.height) * Math.PI * 6 + seed) * 0.5 + 0.5;
    context.fillStyle =
      band > 0.5
        ? `rgba(255, 255, 255, ${(0.04 + band * 0.06).toFixed(3)})`
        : `rgba(0, 0, 0, ${(0.05 + band * 0.06).toFixed(3)})`;
    context.fillRect(0, y, canvas.width, 4);
  }

  // Speckles and soft craters.
  for (let index = 0; index < 520; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 1 + random() * 10;
    context.beginPath();
    context.fillStyle =
      random() > 0.5
        ? `rgba(255, 255, 255, ${(0.03 + random() * 0.07).toFixed(3)})`
        : `rgba(0, 0, 0, ${(0.04 + random() * 0.08).toFixed(3)})`;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  // Terminator shading so the sphere reads before the key light hits it.
  const shade = context.createLinearGradient(0, 0, canvas.width, 0);
  shade.addColorStop(0, "rgba(0, 0, 0, 0.32)");
  shade.addColorStop(0.42, "rgba(0, 0, 0, 0)");
  shade.addColorStop(0.75, "rgba(255, 255, 255, 0.06)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0.34)");
  context.fillStyle = shade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  texture.needsUpdate = true;
  return texture;
}

/**
 * Concentric alpha bands drawn into a square canvas. RingGeometry's planar UVs
 * map that square directly, so the bands line up with the ring's radii.
 */
export function createRingTexture(seed = 7): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const context = canvas.getContext("2d");
  if (!context) return texture;

  const random = createRandom(seed);
  const center = size / 2;
  const outer = center - 2;
  const inner = outer * 0.62;

  context.clearRect(0, 0, size, size);

  for (let radius = inner; radius < outer; radius += 1) {
    const edgeFade = Math.min(1, Math.min(radius - inner, outer - radius) / 26);
    const bands = 0.45 + 0.4 * Math.sin(radius * 0.48 + seed) * Math.sin(radius * 0.17);
    const alpha = Math.max(0, Math.min(0.95, bands * edgeFade + random() * 0.05));
    context.beginPath();
    context.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
    context.lineWidth = 1.4;
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.stroke();
  }

  texture.needsUpdate = true;
  return texture;
}

/** Soft cloud puff built from overlapping radial gradients; tinted by the material. */
export function createNebulaTexture(seed = 11): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const context = canvas.getContext("2d");
  if (!context) return texture;

  const random = createRandom(seed);
  context.clearRect(0, 0, size, size);
  context.globalCompositeOperation = "lighter";

  for (let index = 0; index < 7; index += 1) {
    const x = size * (0.3 + random() * 0.4);
    const y = size * (0.3 + random() * 0.4);
    const radius = size * (0.16 + random() * 0.24);
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.16)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalCompositeOperation = "source-over";
  texture.needsUpdate = true;
  return texture;
}
