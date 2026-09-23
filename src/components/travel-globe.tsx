"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { travelLocations, type TravelLocation } from "@/lib/travel";

const ROUTE = travelLocations; // chronological/narrative order

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
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

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
    // Tilted north so every stop, Johannesburg to Vancouver, passes through view.
    g.pointOfView({ lat: 22, lng: ROUTE[0].lng, altitude: 2.3 }, 0);
    const controls = g.controls() as OrbitControls;
    // Left enabled because react-globe.gl only runs update() (which drives
    // autoRotate) on enabled controls; the user-facing gestures are switched off.
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    // OrbitControls sets touch-action: none, which would block page scrolling
    // on phones when a swipe starts over the globe.
    controls.domElement!.style.touchAction = "";
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 1.5;
  }, [reducedMotion]);

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
          pointColor={() => "#8e83ff"}
          pointAltitude={0.02}
          pointRadius={0.55}
          arcsData={routeArcs}
          arcColor={() => "rgba(142, 131, 255, 0.75)"}
          arcStroke={0.4}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={reducedMotion ? 0 : 4000}
          arcAltitudeAutoScale={0.3}
        />
      </div>

      <ol className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTE.map((loc, i) => (
          <li key={loc.id} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent tabular-nums">
              {i + 1}
            </span>
            <div>
              <div className="text-sm font-semibold">{loc.label}</div>
              <div className="mt-0.5 text-xs text-muted">{loc.years}</div>
              <div className="mt-1 text-sm text-muted">{loc.description}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
