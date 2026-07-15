import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Hero3DSceneProps {
  isGreenTheme?: boolean;
}

/**
 * Elegant Three.js scene — torus knot centrepiece, orbiting rings,
 * soft particle cloud, mouse-follow camera. No clutter.
 */
const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isGreenTheme = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const testCanvas = document.createElement("canvas");
    const hasWebGL = !!(
      testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")
    );
    if (!hasWebGL) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Palette ────────────────────────────────────────────────────────────
    const C = isGreenTheme
      ? { l1: 0x22c55e, l2: 0x10b981, l3: 0x34d399,
          base: 0x052e16, emit: 0x15803d, emitI: 0.6,
          r1: 0x22c55e, r2: 0x14b8a6, r3: 0x86efac,
          wire: 0x4ade80, pts: 0x86efac }
      : { l1: 0x6366f1, l2: 0x8b5cf6, l3: 0x06b6d4,
          base: 0x0f0a2e, emit: 0x4f46e5, emitI: 0.7,
          r1: 0x6366f1, r2: 0x8b5cf6, r3: 0xa78bfa,
          wire: 0x818cf8, pts: 0x93c5fd };

    // ── Renderer / Scene / Camera ──────────────────────────────────────────
    const { width, height } = mount.getBoundingClientRect();
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height || 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const pl1 = new THREE.PointLight(C.l1, 5, 16); pl1.position.set( 3,  4,  3); scene.add(pl1);
    const pl2 = new THREE.PointLight(C.l2, 5, 16); pl2.position.set(-4, -3,  2); scene.add(pl2);
    const pl3 = new THREE.PointLight(C.l3, 3, 10); pl3.position.set( 0,  0,  6); scene.add(pl3);

    // ── Torus knot ────────────────────────────────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(0.92, 0.28, 180, 28, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: C.base, emissive: C.emit, emissiveIntensity: C.emitI,
      metalness: 0.98, roughness: 0.03,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    const wireGeo = new THREE.TorusKnotGeometry(0.94, 0.29, 90, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: C.wire, wireframe: true, transparent: true, opacity: 0.13,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // ── Orbiting rings ────────────────────────────────────────────────────
    const makeRing = (r: number, tube: number, color: number, opacity: number, rx: number, ry: number) => {
      const geo  = new THREE.TorusGeometry(r, tube, 6, 128);
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rx, ry, 0);
      scene.add(mesh);
      return { mesh, geo, mat };
    };
    const ring1 = makeRing(1.65, 0.018, C.r1, 0.75, Math.PI / 3.5, 0.3);
    const ring2 = makeRing(1.92, 0.013, C.r2, 0.55, Math.PI / 6,   Math.PI / 4);
    const ring3 = makeRing(2.18, 0.008, C.r3, 0.35, Math.PI / 2.2, -0.5);

    // ── Particle cloud ────────────────────────────────────────────────────
    const N = 700;
    const pPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.4 + Math.random() * 1.6;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: C.pts, size: 0.022, transparent: true, opacity: 0.65, sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ── Mouse ─────────────────────────────────────────────────────────────
    const mouse     = { x: 0, y: 0 };
    const camTarget = { x: 0, y: 0 };

    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / (rect.width  || 1) - 0.5) * 2;
      mouse.y = -(((e.clientY - rect.top)  / (rect.height || 1) - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);

    // ── Render loop ───────────────────────────────────────────────────────
    let raf: number;
    let t = 0;
    const spd = prefersReduced ? 0.0004 : 0.006;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += spd;

      knot.rotation.x += 0.004;
      knot.rotation.y += 0.007;
      wire.rotation.x  = knot.rotation.x;
      wire.rotation.y  = knot.rotation.y;

      const floatY = Math.sin(t) * 0.1;
      knot.position.y = wire.position.y = floatY;

      ring1.mesh.rotation.z += 0.0045;
      ring2.mesh.rotation.z -= 0.0030;
      ring3.mesh.rotation.z += 0.0018;

      points.rotation.y += 0.0007;
      points.rotation.x += 0.0003;

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

    const onResize = () => {
      const { width: w, height: h } = mount.getBoundingClientRect();
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      [knotGeo, wireGeo, ring1.geo, ring2.geo, ring3.geo, pGeo].forEach(g => g.dispose());
      [knotMat, wireMat, ring1.mat, ring2.mat, ring3.mat, pMat].forEach(m => (m as THREE.Material).dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [isGreenTheme]);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
};

export default Hero3DScene;
