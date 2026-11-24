import { expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { characters } from '../content/dialogue';
import { authorization, protocol } from '../content/procedure';
import { closing, revelation } from '../content/invitation';
import { event, configuredMapsUrl } from '../config/event';
import { InvitationCard } from '../components/Invitation';
import { initialSession, persist, restore, transition, type Session } from './session';
import { transcript, visibleMessages } from './transcript';

function completed(characterId: string): Session {
  const character = characters.find(c => c.id === characterId)!;
  return { ...initialSession, characterId, personalChoice: character.choices[0].id, protocolChoice: protocol.choices[0].id, observationChoice: 'seal', authorizationChoice: authorization.choices[0].id, stage: 'authorization-reply', invitationUnlocked: true };
}
const storage = () => { const data = new Map<string, string>(); return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } }; };

it('conserva todos los mensajes finales aprobados', () => {
  const spec = readFileSync(new URL('../../SPEC.md', import.meta.url), 'utf8');
  [...closing, ...revelation].forEach(text => expect(spec).toContain(text));
});
it.each(characters)('$title: emite la invitación y restaura el cierre tras recargar', character => {
  const reveal = transition(completed(character.id), { type: 'continue' });
  expect(reveal.stage).toBe('revelation');
  const invitation = transition(reveal, { type: 'consult-invitation' });
  expect(invitation.stage).toBe('invitation');
  const store = storage(); persist(store, invitation);
  expect(restore(store)).toEqual(invitation);
  const card = renderToStaticMarkup(<InvitationCard name={character.title}/>);
  expect(card).toContain(character.title);
  expect(card).toContain('2026-11-27');
  expect(card).toContain(event.venueLabel);
});
it('mantiene el desbloqueo al retroceder y cambiar todas las respuestas', () => {
  let state = transition(transition(completed('estela'), { type: 'continue' }), { type: 'consult-invitation' });
  for (const stage of ['revelation', 'authorization-choice', 'observation-question', 'observation-intro', 'protocol', 'personal', 'identify']) {
    state = transition(state, { type: 'back' });
    expect(state.stage).toBe(stage);
    const store = storage(); persist(store, state);
    expect(restore(store).invitationUnlocked).toBe(true);
  }
  state = transition(state, { type: 'select', id: 'jimmy' });
  state = transition(state, { type: 'confirm' });
  expect(state.invitationUnlocked).toBe(true);
  expect(state.characterId).toBe('jimmy');
});
it('no permite emitir una invitación antes de la autorización', () => {
  const state: Session = { ...initialSession, stage: 'revelation', characterId: 'estela' };
  expect(transition(state, { type: 'consult-invitation' })).toEqual(state);
});
it('solo añade la despedida sin reproducir lo ya leído', () => {
  const reveal = transition(completed('estela'), { type: 'continue' });
  const before = transcript(reveal);
  const after = transcript(transition(reveal, { type: 'consult-invitation' }));
  expect(after.slice(0, before.length)).toEqual(before);
  expect(visibleMessages(after, new Set(before.map(m => m.id)))).toEqual(before);
});
it('muestra los datos confirmados sin dirección, aviso pendiente ni mapas', () => {
  const html = renderToStaticMarkup(<InvitationCard name="Doña Estela Enigma"/>);
  expect(html).toContain('A partir de 21:30');
  expect(html).toContain('Se recomienda transporte compartido');
  expect(html).not.toContain('<dt>Dirección</dt>');
  expect(html).not.toContain('Datos de acceso pendientes de configurar');
  expect(html).not.toContain('Modo demostración');
  expect(html).not.toContain('href=');
  expect(event.mapsUrl).toBeNull();
});
it('solo activa mapas con una URL HTTPS configurada', () => {
  expect(configuredMapsUrl(null)).toBeNull();
  expect(configuredMapsUrl('javascript:alert(1)')).toBeNull();
  expect(configuredMapsUrl('sin configurar')).toBeNull();
  // Synthetic configuration for validation only; no event data is changed.
  const html = renderToStaticMarkup(<InvitationCard name="Prueba" config={{ ...event, mapsUrl: 'https://example.com/map' }}/>);
  expect(html).toContain('href="https://example.com/map"');
  expect(html).toContain('Consultar ubicación');
});
