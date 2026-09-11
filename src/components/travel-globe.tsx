"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe, { type GlobeMethods } from "react-globe.gl";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { arcAltitude, bearingDeg, slerpLatLng } from "@/lib/great-circle";
import { travelLocations, type TravelLocation } from "@/lib/travel";

const ROUTE = travelLocations; // chronological/narrative order
const MAX_SLIDER = ROUTE.length - 1;
const JUMP_MS = 1000;
const FOLLOW_ALTITUDE = 1.3;

// Local frame after react-globe.gl's surface alignment is East(X)/North(Y)/Up(Z),
// so the model is built nose-forward along +Y and heading is applied as a
// rotation around Z via the `objectRotation` prop (kept out of the mesh itself).
function buildPlane() {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xfdf6ec });
  const accentMaterial = new THREE.MeshLambertMaterial({ color: 0xc2542a });

  const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1.3, 4, 10), bodyMaterial);
  group.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.45, 10), accentMaterial);
  nose.position.y = 0.88;
  group.add(nose);

  const wings = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.5, 0.06), bodyMaterial);
  wings.position.y = -0.05;
  group.add(wings);

  const tailplane = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.3, 0.05), bodyMaterial);
  tailplane.position.y = -0.82;
  group.add(tailplane);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.5), accentMaterial);
  fin.position.set(0, -0.82, 0.28);
  group.add(fin);

  group.scale.set(1.6, 1.6, 1.6);
  return group;
}

type PlanePos = { lat: number; lng: number; alt: number; heading: number };

function positionAlongRoute(value: number): PlanePos {
  const clamped = Math.max(0, Math.min(MAX_SLIDER, value));
  const legIndex = Math.min(ROUTE.length - 2, Math.floor(clamped));
  const t = clamped - legIndex;
  const from = ROUTE[legIndex];
  const to = ROUTE[legIndex + 1];
  const pos = slerpLatLng(
    { lat: from.lat, lng: from.lng },
    { lat: to.lat, lng: to.lng },
    t,
  );
  const heading = bearingDeg(
    { lat: from.lat, lng: from.lng },
    { lat: to.lat, lng: to.lng },
  );
  return { lat: pos.lat, lng: pos.lng, alt: 0.02 + arcAltitude(t, 0.3), heading };
}

const routeArcs = ROUTE.slice(0, -1).map((from, i) => ({
  startLat: from.lat,
  startLng: from.lng,
  endLat: ROUTE[i + 1].lat,
  endLng: ROUTE[i + 1].lng,
}));

export function TravelGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 320, height: 440 });
  const [sliderValue, setSliderValue] = useState(0);
  const jumpRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);
  // A single stable object (never replaced, only its fields updated) so
  // react-globe.gl treats every frame as a cheap position/rotation update
  // instead of tearing down and rebuilding the plane mesh — that rebuild
  // churn was the source of the choppiness.
  const [planePos] = useState<PlanePos>(() => positionAlongRoute(0));
  Object.assign(planePos, positionAlongRoute(sliderValue));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const width = el.clientWidth;
      setSize({ width, height: Math.max(360, Math.min(480, width * 0.85)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView({ lat: ROUTE[0].lat, lng: ROUTE[0].lng, altitude: 2 }, 0);
    const controls = g.controls() as OrbitControls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 150;
    controls.maxDistance = 380;
    const stopAutoRotate = () => {
      controls.autoRotate = false;
    };
    controls.addEventListener("start", stopAutoRotate);
    return () => controls.removeEventListener("start", stopAutoRotate);
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    if (sliderValue !== 0) hasInteractedRef.current = true;
    if (!hasInteractedRef.current) return;
    (g.controls() as OrbitControls).autoRotate = false;
    // duration 0 = set directly; the plane position is already animating
    // smoothly frame-by-frame, so re-triggering an eased camera tween here
    // on every tick would fight itself and look choppy.
    g.pointOfView({ lat: planePos.lat, lng: planePos.lng, altitude: FOLLOW_ALTITUDE }, 0);
  }, [sliderValue, planePos.lat, planePos.lng]);

  useEffect(() => {
    return () => {
      if (jumpRef.current !== null) cancelAnimationFrame(jumpRef.current);
    };
  }, []);

  function jumpToStop(targetIndex: number) {
    if (jumpRef.current !== null) cancelAnimationFrame(jumpRef.current);
    const from = sliderValue;
    const duration = JUMP_MS * Math.max(1, Math.abs(targetIndex - from));
    const startTime = performance.now();

    function step(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      setSliderValue(from + (targetIndex - from) * t);
      if (t < 1) {
        jumpRef.current = requestAnimationFrame(step);
      } else {
        jumpRef.current = null;
      }
    }
    jumpRef.current = requestAnimationFrame(step);
  }

  const nearestIndex = Math.round(sliderValue);
  const active = ROUTE[nearestIndex];
  const arrived = Math.abs(sliderValue - nearestIndex) < 0.02;

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-3xl"
        style={{ height: size.height }}
      >
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          globeImageUrl="/globe/earth-dark.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={ROUTE}
          pointLat="lat"
          pointLng="lng"
          pointLabel={(d) => {
            const loc = d as TravelLocation;
            return `${loc.label} — ${loc.years}`;
          }}
          pointColor={(d) =>
            (d as TravelLocation).id === active.id ? "#c2542a" : "#e8c9b0"
          }
          pointAltitude={0.01}
          pointRadius={0.45}
          onPointClick={(point) => {
            const idx = ROUTE.findIndex((l) => l.id === (point as TravelLocation).id);
            if (idx !== -1) jumpToStop(idx);
          }}
          arcsData={routeArcs}
          arcColor={() => "rgba(194, 84, 42, 0.55)"}
          arcStroke={0.4}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={4000}
          arcAltitudeAutoScale={0.3}
          objectsData={[planePos]}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectRotation={(d) => ({ z: -(d as PlanePos).heading })}
          objectThreeObject={buildPlane}
        />
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={MAX_SLIDER}
          step={1}
          value={nearestIndex}
          onChange={(e) => jumpToStop(Number(e.target.value))}
          aria-label="Jump to a stop on the timeline"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
        />
        <div className="mt-2 flex justify-between text-[11px] text-muted">
          {ROUTE.map((loc, i) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => jumpToStop(i)}
              className={`max-w-[19%] text-left leading-tight ${i === nearestIndex ? "font-semibold text-accent" : ""}`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 max-w-md">
        <div className="text-sm font-semibold">
          {active.label}
          {!arrived ? (
            <span className="ml-2 text-xs font-normal text-muted">
              en route
            </span>
          ) : null}
        </div>
        <div className="mt-1 text-xs text-muted">{active.years}</div>
        <div className="mt-2 text-sm text-muted">{active.description}</div>
      </div>
    </div>
  );
}
