export interface EventConfig {
  eventDate: string;
  eventDisplayDate: string;
  eventTime: string | null;
  venueLabel: string;
  accessInstructions: string | null;
  mapsUrl: string | null;
  demoMode: boolean;
}
export const event: EventConfig = {
  eventDate: '2026-11-27',
  eventDisplayDate: '27 de noviembre de 2026',
  eventTime: 'A partir de 21:30',
  venueLabel: 'Parte de abajo de la casa de Estela',
  accessInstructions: 'Se recomienda transporte compartido',
  mapsUrl: null,
  demoMode: false,
};

export function configuredMapsUrl(value: string | null): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
