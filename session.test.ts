import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { characters, opening } from '../content/dialogue';
import { IDENTITY_KEY, SESSION_KEY, initialSession, persist, restore, transition, type Session } from './session';

const storage = () => { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } }; };
function identified(id: string): Session {
  let state = transition(initialSession, { type: 'enter' });
  state = transition(state, { type: 'opening', id: opening.choices[0].id });
  state = transition(state, { type: 'continue' });
  state = transition(state, { type: 'select', id });
  return transition(state, { type: 'confirm' });
}
describe('Guion aprobado', () => {
  const spec = readFileSync(new URL('../../SPEC.md', import.meta.url), 'utf8').replaceAll('*', '');
  it('incluye exactamente los nueve personajes, incluida Doña Estela Enigma', () => {
    expect(characters.map(c => c.name)).toEqual(['Estela', 'José', 'Clara', 'Noelia', 'Miriam', 'Óscar', 'Ana', 'Paula', 'Jimmy']);
    expect(characters[0].title).toBe('Doña Estela Enigma');
  });
  it('conserva literalmente mensajes, preguntas y ambas réplicas de SPEC', () => {
    for (const scene of [opening, ...characters]) {
      expect(scene.choices).toHaveLength(2);
      for (const text of [...scene.messages, ...scene.choices.flatMap(c => [c.label, c.reply])]) expect(spec).toContain(text);
    }
    const ids = [opening, ...characters].flatMap(c => c.choices.map(c => c.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
describe.each(characters)('$title', character => {
  it('permite corregir selección antes de confirmar', () => {
    const preview: Session = { ...initialSession, stage: 'review', candidateId: character.id };
    const corrected = transition(preview, { type: 'correct' });
    expect(corrected.stage).toBe('identify'); expect(corrected.characterId).toBeNull();
  });
  it('restaura el expediente y permite volver al selector', () => {
    const state = identified(character.id);
    const store = storage(); persist(store, state);
    const restored = restore(store);
    expect(restored.characterId).toBe(character.id);
    expect(transition(restored, { type: 'back' }).stage).toBe('identify');
    expect(transition(restored, { type: 'select', id: 'jimmy' })).toEqual(restored);
    expect(transition(restored, { type: 'correct' })).toEqual(restored);
  });
  it('recorre las dos ramas sin mezclar respuestas ni revocar una invitación', () => {
    let state = { ...identified(character.id), invitationUnlocked: true };
    for (const choice of character.choices) {
      state = transition(state, { type: 'personal', id: choice.id });
      expect(state.personalChoice).toBe(choice.id);
      const store = storage(); persist(store, state);
      expect(restore(store).personalChoice).toBe(choice.id);
      state = transition(state, { type: 'back' });
      expect(state.personalChoice).toBeNull(); expect(state.stage).toBe('personal');
      expect(state.characterId).toBe(character.id); expect(state.invitationUnlocked).toBe(true);
    }
  });
});
it('conserva identidad aunque se corrompa el estado de conversación', () => {
  const store = storage(); persist(store, identified('estela')); store.setItem(SESSION_KEY, '{broken');
  expect(restore(store).characterId).toBe('estela'); expect(restore(store).stage).toBe('personal');
});
it('permite cambiar una identidad guardada y conserva el cambio tras recargar', () => {
  const store = storage(); persist(store, identified('estela'));
  let state = transition(restore(store), { type: 'change-identity' });
  persist(store, state);
  expect(restore(store).stage).toBe('identify');
  state = transition(state, { type: 'select', id: 'jose' });
  persist(store, state);
  expect(restore(store).candidateId).toBe('jose');
  state = transition(state, { type: 'confirm' });
  persist(store, state);
  expect(store.getItem(IDENTITY_KEY)).toBe('jose');
  expect(restore(store).characterId).toBe('jose');
  expect(restore(store).personalChoice).toBeNull();
});
it('descarta selección y réplicas al retroceder hasta apertura', () => {
  const state: Session = { ...initialSession, stage: 'identify', openingChoice: opening.choices[1].id };
  const previous = transition(state, { type: 'back' });
  expect(previous.openingChoice).toBeNull(); expect(previous.stage).toBe('opening');
  const alternate = transition(previous, { type: 'opening', id: opening.choices[0].id });
  expect(alternate.openingChoice).toBe(opening.choices[0].id);
});
