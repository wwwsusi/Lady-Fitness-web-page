/** Hold each scene for reading, then dissolve into the next scene. */
export function sceneWeights(progress: number, count: number): number[] {
  if (count < 1) return [];
  if (count === 1) return [1];
  const clamped = Math.max(
    0,
    Math.min(1, Number.isFinite(progress) ? progress : 0),
  );
  const position = clamped * (count - 1);
  const current = Math.floor(position);
  const t = Math.max(0, Math.min(1, (position - current - 0.55) / 0.3));
  const blend = t * t * (3 - 2 * t);
  return Array.from({ length: count }, (_, i) =>
    i === current ? 1 - blend : i === current + 1 ? blend : 0,
  );
}
