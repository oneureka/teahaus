function isValidCoord(val: number): boolean {
  return Number.isFinite(val) && val >= -90 && val <= 90;
}

function isValidLng(val: number): boolean {
  return Number.isFinite(val) && val >= -180 && val <= 180;
}

export function getDistance(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number },
): number {
  if (
    !isValidCoord(from.latitude) ||
    !isValidLng(from.longitude) ||
    !isValidCoord(to.latitude) ||
    !isValidLng(to.longitude)
  ) {
    return 0;
  }

  const R = 6371000;
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters: number): string {
  if (!Number.isFinite(meters) || meters < 0) return "0.0km";
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
