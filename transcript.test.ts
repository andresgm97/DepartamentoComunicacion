import { expect, it } from 'vitest';
import { characters, opening } from '../content/dialogue';
import { initialSession, transition, type Session } from './session';
import { transcript, visibleMessages } from './transcript';

it('mantiene los mensajes iniciales visibles al elegir una respuesta', () => {
  const start = { ...initialSession, stage: 'opening' as const };
  const before = transcript(start);
  const seen = new Set(before.map(m => m.id));
  const after = transcript(transition(start, { type: 'opening', id: opening.choices[0].id }));
  expect(after.slice(0, before.length)).toEqual(before);
  expect(visibleMessages(after, seen).map(m => m.text)).toEqual([...before.map(m => m.text), opening.choices[0].label]);
});

it.each(characters)('$name: muestra solo la nueva réplica, sin repetir la pregunta', character => {
  const start: Session = { ...initialSession, stage: 'personal', characterId: character.id };
  const question = transcript(start);
  const seen = new Set(question.map(m => m.id));
  const first = transition(start, { type: 'personal', id: character.choices[0].id });
  const answered = transcript(first);
  expect(visibleMessages(answered, seen)).toEqual(answered.slice(0, -1));
  const back = transition(first, { type: 'back' });
  answered.forEach(m => seen.add(m.id));
  expect(visibleMessages(transcript(back), seen)).toEqual(question);
  const alternate = transcript(transition(back, { type: 'personal', id: character.choices[1].id }));
  expect(visibleMessages(alternate, seen)).toEqual(alternate.slice(0, -1));
  expect(alternate.some(m => m.text === character.choices[0].reply)).toBe(false);
});

it('descarta el diálogo anterior al confirmar otro personaje', () => {
  let state: Session = { ...initialSession, stage: 'personal-reply', characterId: 'estela', personalChoice: characters[0].choices[0].id, invitationUnlocked: true };
  state = transition(state, { type: 'change-identity' });
  state = transition(state, { type: 'select', id: 'jose' });
  state = transition(state, { type: 'confirm' });
  expect(transcript(state).some(m => m.id.startsWith('estela-'))).toBe(false);
  expect(state.invitationUnlocked).toBe(true);
});
