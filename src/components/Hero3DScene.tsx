import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DSceneProps {
  isGreenTheme?: boolean;
}

/**
 * Lazy-loaded Three.js scene that renders behind the hero profile photo.
 * – Torus knot (main object) with metallic PBR material
 * – Wireframe overlay on the same geometry
 * – Three independently rotating rings at different orbital angles
 * – 700-point particle cloud forming a sphere around the knot
 * – Camera gently follows mouse cursor
 * – Respects prefers-reduced-motion
 * – Pauses when the browser tab is hidden
 */
const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isGreenTheme = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Guard: skip if WebGL is not available
    const canvas = document.createElement("canvas");
    const hasWebGL = !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
    if (!hasWebGL) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── Palette ────────────────────────────────────────────────────────────
    const C = isGreenTheme
      ? {
          light1: 0x22c55e,
          light2: 0x10b981,
          meshColor: 0x14532d,
          emissive: 0x15803d,
          emissiveI: 0.55,
          ring1: 0x22c55e,
          ring2: 0x14b8a6,
          ring3: 0x86efac,
          wire: 0x4ade80,
          pts: 0x86efac,
        }
      : {
          light1: 0x3b82f6,
          light2: 0x7c3aed,
          meshColor: 0x1e3a8a,
          emissive: 0x2563eb,
          emissiveI: 0.5,
          ring1: 0x6366f1,
          ring2: 0x8b5cf6,
          ring3: 0xa78bfa,
          wire: 0x818cf8,
          pts: 0x93c5fd,
        };

    // ── Renderer / Scene / Camera ──────────────────────────────────────────
    const { width, height } = mount.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height || 1, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const pl1 = new THREE.PointLight(C.light1, 4, 14);
    pl1.position.set(3, 4, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(C.light2, 4, 14);
    pl2.position.set(-4, -3, 2);
    scene.add(pl2);
    // Rim light from front
    const pl3 = new THREE.PointLight(0xffffff, 1, 8);
    pl3.position.set(0, 0, 5);
    scene.add(pl3);

    // ── Torus Knot (main object) ──────────────────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(0.92, 0.28, 160, 24, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: C.meshColor,
      emissive: C.emissive,
      emissiveIntensity: C.emissiveI,
      metalness: 0.95,
      roughness: 0.05,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Wireframe overlay — slightly larger so it "halos" the main mesh
    const wireGeo = new THREE.TorusKnotGeometry(0.94, 0.29, 80, 14, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: C.wire,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // ── Orbiting Rings ────────────────────────────────────────────────────
    type RingRef = { mesh: THREE.Mesh; geo: THREE.BufferGeometry; mat: THREE.Material };

    const makeRing = (
      r: number,
      tube: number,
      color: number,
      opacity: number,
      rx: number,
      ry: number,
      rz: number
    ): RingRef => {
      const geo = new THREE.TorusGeometry(r, tube, 6, 128);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rx, ry, rz);
      scene.add(mesh);
      return { mesh, geo, mat };
    };

    const ring1 = makeRing(1.62, 0.018, C.ring1, 0.75, Math.PI / 3.5, 0.3, 0);
    const ring2 = makeRing(1.88, 0.013, C.ring2, 0.55, Math.PI / 6, Math.PI / 4, 0);
    const ring3 = makeRing(2.12, 0.008, C.ring3, 0.35, Math.PI / 2.2, -0.5, 0);

    // ── Particle Sphere ───────────────────────────────────────────────────
    const N = 800;
    const pPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.3 + Math.random() * 1.5;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: C.pts,
      size: 0.024,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ── Mouse ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / (rect.width || 1) - 0.5) * 2;
      mouse.y = -(((e.clientY - rect.top) / (rect.height || 1) - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Render Loop ───────────────────────────────────────────────────────
    let raf: number;
    let t = 0;
    const speed = prefersReduced ? 0.0004 : 0.006;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += speed;

      // Main knot rotation
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.007;
      wire.rotation.x = knot.rotation.x;
      wire.rotation.y = knot.rotation.y;

      // Subtle float
      const floatY = Math.sin(t) * 0.1;
      knot.position.y = floatY;
      wire.position.y = floatY;

      // Rings counter-rotate for depth
      ring1.mesh.rotation.z += 0.0045;
      ring2.mesh.rotation.z -= 0.003;
      ring3.mesh.rotation.z += 0.0018;

      // Particle cloud slow drift
      points.rotation.y += 0.0007;
      points.rotation.x += 0.0003;

      // Camera glide follows mouse
      camTarget.x += (mouse.x * 0.4 - camTarget.x) * 0.04;
      camTarget.y += (mouse.y * 0.4 - camTarget.y) * 0.04;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    tick();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();

      // Dispose geometries
      for (const geo of [knotGeo, wireGeo, ring1.geo, ring2.geo, ring3.geo, pGeo]) {
        geo.dispose();
      }
      // Dispose materials
      for (const mat of [knotMat, wireMat, ring1.mat, ring2.mat, ring3.mat, pMat]) {
        (mat as THREE.Material).dispose();
      }
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isGreenTheme]);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
};

export default Hero3DScene;
