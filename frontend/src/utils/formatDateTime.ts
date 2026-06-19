const BOGOTA_TZ = "America/Bogota";

/** Parsea fechas UTC de la API (naive o con offset) y las muestra en hora de Colombia. */
export function formatDateTime(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "medium",
  },
): string {
  const normalized =
    iso.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(iso) ? iso : `${iso}Z`;
  return new Date(normalized).toLocaleString("es-CO", {
    ...options,
    timeZone: BOGOTA_TZ,
  });
}
