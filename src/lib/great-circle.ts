export type LatLng = { lat: number; lng: number };

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

function latLngToVec3({ lat, lng }: LatLng) {
  const latRad = toRad(lat);
  const lngRad = toRad(lng);
  return {
    x: Math.cos(latRad) * Math.cos(lngRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.sin(lngRad),
  };
}

function vec3ToLatLng({ x, y, z }: { x: number; y: number; z: number }): LatLng {
  const lat = toDeg(Math.asin(Math.max(-1, Math.min(1, y))));
  const lng = toDeg(Math.atan2(z, x));
  return { lat, lng };
}

/** Spherical linear interpolation between two lat/lng points, t in [0,1]. */
export function slerpLatLng(a: LatLng, b: LatLng, t: number): LatLng {
  const va = latLngToVec3(a);
  const vb = latLngToVec3(b);
  const dot = Math.max(-1, Math.min(1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const sinOmega = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / sinOmega;
  const wb = Math.sin(t * omega) / sinOmega;
  return vec3ToLatLng({
    x: va.x * wa + vb.x * wb,
    y: va.y * wa + vb.y * wb,
    z: va.z * wa + vb.z * wb,
  });
}

/** Altitude arc (0 -> peak -> 0) for a "rises then descends" flight path. */
export function arcAltitude(t: number, peak: number) {
  return Math.sin(t * Math.PI) * peak;
}

/** Initial compass bearing from a to b, in degrees (0 = north, 90 = east). */
export function bearingDeg(a: LatLng, b: LatLng) {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
