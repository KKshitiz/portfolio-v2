/**
 * Format an ISO date for display. Pinned to UTC so server and client render the
 * same string regardless of the viewer's timezone.
 */
export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string {
  return new Date(date).toLocaleDateString("en-US", {
    ...options,
    timeZone: "UTC",
  });
}
