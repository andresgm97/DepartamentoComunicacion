import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { characters } from '../content/dialogue';
import { authorization, observation, protocol } from '../content/procedure';
import { initialSession, persist, restore, transition, type Session } from './session';
import { transcript, visibleMessages } from './transcript';

function start(characterId = 'estela'): Session {
  const character = characters.find(c => c.id === characterId)!;
  return transition({ ...initialSession, characterId, stage: 'personal' }, { type: 'personal', id: character.choices[0].id });
}
function atObservation(characterId = 'estela', choiceId = protocol.choices[0].id): Session {
  let state = transition(start(characterId), { type: 'continue' });
  state = transition(state, { type: 'protocol', id: choiceId });
  return transition(state, { type: 'continue' });
}
function finishObservation(state = atObservation()): Session {
  state = transition(state, { type: 'start-observation', now: 1000 });
  state = transition(state, { type: 'observation-elapsed', now: 6000 });
  state = transition(state, { type: 'reveal-elapsed', now: 9000 });
  return transition(state, { type: 'observe-answer', id: 'seal' });
}
const storage = () => { const data = new Map<string, string>(); return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } }; };

it('conserva literalmente todos los mensajes de las escenas 3–5', () => {
  const spec = readFileSync(new URL('../../SPEC.md', import.meta.url), 'utf8');
  const texts = [...protocol.messages, ...protocol.choices.flatMap(c => [c.label, c.reply]), ...observation.intro, ...observation.question, ...observation.success, ...observation.failure, ...observation.choices.map(c => c.label), ...authorization.intro, ...authorization.review, ...authorization.approved, ...authorization.choices.flatMap(c => [c.label, c.reply])];
  texts.forEach(text => expect(spec).toContain(text));
});

describe.each(characters)('$title: mismo protocolo y minijuego', character => {
  it.each(protocol.choices)('$label: permite completar ambas autorizaciones', protocolChoice => {
    let state = finishObservation(atObservation(character.id, protocolChoice.id));
    state = transition(state, { type: 'continue' });
    expect(state.stage).toBe('authorization');
    state = transition(state, { type: 'authorization-ready' });
    for (const choice of authorization.choices) {
      const before = transcript(state);
      state = transition(state, { type: 'authorize', id: choice.id });
      expect(state.invitationUnlocked).toBe(true);
      const after = transcript(state);
      expect(visibleMessages(after, new Set(before.map(m => m.id)))).toEqual(after.slice(0, -1));
      const store = storage(); persist(store, state);
      expect(restore(store)).toEqual(state);
      state = transition(state, { type: 'back' });
      expect(state.authorizationChoice).toBeNull();
      expect(state.invitationUnlocked).toBe(true);
    }
  });
});

it('exige cinco segundos y tres de revisión y rechaza respuestas antes de completar la observación', () => {
  let state = transition(atObservation(), { type: 'start-observation', now: 5000 });
  expect(transition(state, { type: 'observe-answer', id: 'seal' })).toEqual(state);
  expect(transition(state, { type: 'observation-elapsed', now: 9999 })).toEqual(state);
  state = transition(state, { type: 'observation-elapsed', now: 10000 });
  expect(state.stage).toBe('observation-reveal');
  expect(transition(state, { type: 'observe-answer', id: 'seal' })).toEqual(state);
  expect(transition(state, { type: 'reveal-elapsed', now: 12999 })).toEqual(state);
  state = transition(state, { type: 'reveal-elapsed', now: 13000 });
  expect(state.stage).toBe('observation-question');
});

it('permite reintentos ilimitados, borra el error anterior y concede el acierto', () => {
  let state = atObservation();
  for (let i = 0; i < 12; i++) {
    state = transition(state, { type: 'start-observation', now: i * 10000 });
    expect(transcript(state).some(m => m.id.startsWith('observation-failure'))).toBe(false);
    state = transition(state, { type: 'observation-elapsed', now: i * 10000 + 5000 });
    state = transition(state, { type: 'reveal-elapsed', now: i * 10000 + 8000 });
    state = transition(state, { type: 'observe-answer', id: ['bell', 'cup', 'key'][i % 3] });
    expect(state.stage).toBe('observation-result');
    expect(transition(state, { type: 'continue' })).toEqual(state);
    expect(state.invitationUnlocked).toBe(false);
  }
  state = transition(state, { type: 'start-observation', now: 150000 });
  state = transition(state, { type: 'observation-elapsed', now: 155000 });
  state = transition(state, { type: 'reveal-elapsed', now: 158000 });
  state = transition(state, { type: 'observe-answer', id: 'seal' });
  expect(transition(state, { type: 'continue' }).stage).toBe('authorization');
  expect(transcript(state).some(m => m.id.startsWith('observation-failure'))).toBe(false);
});

it('restaura una prueba interrumpida antes de comenzar los cinco segundos de nuevo', () => {
  const state = transition(atObservation(), { type: 'start-observation', now: 1000 });
  const store = storage(); persist(store, state);
  expect(restore(store).stage).toBe('observation-intro');
  expect(restore(store).observationStartedAt).toBeNull();
  expect(restore(store).characterId).toBe('estela');
});

it('permite retroceder por todas las escenas sin revocar la autorización', () => {
  let state = transition(finishObservation(), { type: 'continue' });
  state = transition(state, { type: 'authorization-ready' });
  state = transition(state, { type: 'authorize', id: authorization.choices[0].id });
  for (const expected of ['authorization-choice', 'observation-question', 'observation-intro', 'protocol', 'personal', 'identify']) {
    state = transition(state, { type: 'back' });
    expect(state.stage).toBe(expected);
    expect(state.invitationUnlocked).toBe(true);
  }
  expect(state.protocolChoice).toBeNull();
  expect(state.observationChoice).toBeNull();
  expect(state.authorizationChoice).toBeNull();
});

it('al cambiar de personaje limpia el protocolo, la prueba y la autorización anterior', () => {
  let state = transition(finishObservation(), { type: 'continue' });
  state = transition(state, { type: 'authorization-ready' });
  state = transition(state, { type: 'authorize', id: authorization.choices[0].id });
  state = transition(state, { type: 'change-identity' });
  state = transition(state, { type: 'select', id: 'jimmy' });
  state = transition(state, { type: 'confirm' });
  expect(state.characterId).toBe('jimmy');
  expect(state.invitationUnlocked).toBe(true);
  expect(state.protocolChoice).toBeNull();
  expect(state.observationChoice).toBeNull();
  expect(state.authorizationChoice).toBeNull();
  expect(transcript(state).some(m => m.id.startsWith('authorization-'))).toBe(false);
});
