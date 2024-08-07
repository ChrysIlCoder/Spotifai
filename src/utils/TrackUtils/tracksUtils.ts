export function calculateTotalDuration(tracks) {
  const totalDurationMs = tracks.reduce((sum, track) => {
    return sum + track.duration_ms;
  }, 0);

  const totalDurationMin = Math.floor(totalDurationMs / 60000);
  const totalDurationHr = Math.floor(totalDurationMin / 60);
  const remainingMin = totalDurationMin % 60;

  return { hours: totalDurationHr, minutes: remainingMin };
}