import { characters, identification, opening } from '../content/dialogue';
import { authorization, observation, protocol } from '../content/procedure';
import { closing, revelation } from '../content/invitation';
import { stages, type Session } from './session';

export interface Message { id: string; text: string; from?: 'guest' | 'department'; kind?: 'protocol' | 'departments' }

export function transcript(session: Session): Message[] {
  const { stage } = session;
  if (stage === 'cover') return [];
  const messages: Message[] = opening.messages.map((text, i) => ({ id: `opening-${i}`, text }));
  const openingChoice = opening.choices.find(c => c.id === session.openingChoice);
  if (openingChoice && stage !== 'opening') messages.push(
    { id: `${openingChoice.id}-guest`, text: openingChoice.label, from: 'guest' },
    { id: `${openingChoice.id}-reply`, text: openingChoice.reply },
  );
  if (stage === 'opening' || stage === 'opening-reply') return messages;
  messages.push({ id: 'identify', text: identification });
  const character = characters.find(c => c.id === session.characterId);
  const candidate = characters.find(c => c.id === session.candidateId);
  const selected = stage === 'review' ? candidate : stage === 'identify' ? null : character;
  if (selected) messages.push(
    { id: `${selected.id}-selected`, text: selected.name, from: 'guest' },
    { id: `${selected.id}-confirmation`, text: `Ha seleccionado ${selected.title}. ¿Confirmamos su identidad?` },
  );
  if (character && stages.indexOf(stage) >= stages.indexOf('personal')) {
    messages.push(...character.messages.map((text, i) => ({ id: `${character.id}-message-${i}`, text })));
    const choice = character.choices.find(c => c.id === session.personalChoice);
    if (stage !== 'personal' && choice) messages.push(
      { id: `${choice.id}-guest`, text: choice.label, from: 'guest' },
      { id: `${choice.id}-reply`, text: choice.reply },
    );
  }
  const append = (id: string, texts: string[]) => messages.push(...texts.map((text, i) => ({ id: `${id}-${i}`, text })));
  const appendChoice = (choice: {id: string; label: string; reply: string} | undefined) => {
    if (choice) messages.push({ id: `${choice.id}-guest`, text: choice.label, from: 'guest' }, { id: `${choice.id}-reply`, text: choice.reply });
  };
  const atLeast = (target: Session['stage']) => stages.indexOf(stage) >= stages.indexOf(target);
  if (atLeast('protocol')) {
    append('protocol-intro', protocol.messages.slice(0, 3));
    messages.push({ id: 'protocol-document', text: 'PROTOCOLO DC-2711', kind: 'protocol' });
    append('protocol-question', protocol.messages.slice(3));
  }
  if (atLeast('protocol-reply')) appendChoice(protocol.choices.find(c => c.id === session.protocolChoice));
  if (atLeast('observation-intro')) append('observation-intro', observation.intro);
  if (atLeast('observation-question')) append('observation-question', observation.question);
  if (atLeast('observation-result')) {
    const choice = observation.choices.find(c => c.id === session.observationChoice);
    if (choice) {
      messages.push({ id: `observation-${choice.id}-guest`, text: choice.label, from: 'guest' });
      const success = choice.id === observation.correctId;
      append(success ? 'observation-success' : 'observation-failure', success ? observation.success : observation.failure);
    }
  }
  if (atLeast('authorization')) {
    append('authorization-intro', authorization.intro);
    messages.push({ id: 'departments', text: 'Autorización administrativa', kind: 'departments' });
  }
  if (atLeast('authorization-choice')) {
    append('authorization-review', authorization.review);
    append('authorization-approved', authorization.approved);
  }
  if (atLeast('authorization-reply')) appendChoice(authorization.choices.find(c => c.id === session.authorizationChoice));
  if (atLeast('revelation')) append('revelation', revelation);
  if (stage === 'invitation') append('closing', closing);
  return messages;
}

// Reveal only unseen messages; revisiting a scene never replays its history.
export function visibleMessages(messages: Message[], seen: ReadonlySet<string>): Message[] {
  const next = messages.findIndex(m => !seen.has(m.id) && m.from !== 'guest');
  return next === -1 ? messages : messages.slice(0, next);
}
