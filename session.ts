import { characters, opening } from '../content/dialogue';
import { authorization, observation, protocol } from '../content/procedure';

export const stages = ['cover', 'opening', 'opening-reply', 'identify', 'review', 'personal', 'personal-reply', 'protocol', 'protocol-reply', 'observation-intro', 'observing', 'observation-reveal', 'observation-question', 'observation-result', 'authorization', 'authorization-choice', 'authorization-reply', 'revelation', 'invitation'] as const;
export type Stage = typeof stages[number];
export interface Session {
  stage: Stage;
  characterId: string | null;
  candidateId: string | null;
  openingChoice: string | null;
  personalChoice: string | null;
  protocolChoice: string | null;
  observationChoice: string | null;
  observationStartedAt: number | null;
  authorizationChoice: string | null;
  invitationUnlocked: boolean;
}
const clearObservation = { observationChoice: null, observationStartedAt: null, authorizationChoice: null };
const clearProcedure = { protocolChoice: null, ...clearObservation };
export const initialSession: Session = { stage: 'cover', characterId: null, candidateId: null, openingChoice: null, personalChoice: null, ...clearProcedure, invitationUnlocked: false };
export type Action = { type: 'enter' | 'back' | 'continue' | 'correct' | 'confirm' | 'change-identity' | 'authorization-ready' | 'consult-invitation' } | { type: 'opening' | 'select' | 'personal' | 'protocol' | 'observe-answer' | 'authorize'; id: string } | { type: 'start-observation' | 'observation-elapsed' | 'reveal-elapsed'; now: number };
export function transition(state: Session, action: Action): Session {
  switch (action.type) {
    case 'enter': return { ...state, stage: state.characterId ? 'personal' : 'opening' };
    case 'opening': return state.stage === 'opening' && !state.characterId && opening.choices.some(c => c.id === action.id) ? { ...state, stage: 'opening-reply', openingChoice: action.id, candidateId: null, personalChoice: null } : state;
    case 'continue': {
      if (state.stage === 'opening-reply' && !state.characterId) return { ...state, stage: 'identify' };
      if (state.stage === 'personal-reply') return { ...state, stage: 'protocol' };
      if (state.stage === 'protocol-reply') return { ...state, stage: 'observation-intro' };
      if (state.stage === 'observation-result' && state.observationChoice === observation.correctId) return { ...state, stage: 'authorization' };
      if (state.stage === 'authorization-reply' && state.invitationUnlocked) return { ...state, stage: 'revelation' };
      return state;
    }
    case 'consult-invitation': return state.stage === 'revelation' && state.invitationUnlocked ? { ...state, stage: 'invitation' } : state;
    case 'change-identity': return state.characterId ? { ...state, stage: 'identify', candidateId: null } : state;
    case 'select': return state.stage === 'identify' && characters.some(c => c.id === action.id) ? { ...state, candidateId: action.id, stage: 'review' } : state;
    case 'correct': return state.stage === 'review' ? { ...state, stage: 'identify', candidateId: null } : state;
    case 'confirm': return state.stage === 'review' && state.candidateId ? { ...state, ...clearProcedure, characterId: state.candidateId, candidateId: null, personalChoice: null, stage: 'personal' } : state;
    case 'personal': return state.stage === 'personal' && characters.find(c => c.id === state.characterId)?.choices.some(c => c.id === action.id) ? { ...state, ...clearProcedure, stage: 'personal-reply', personalChoice: action.id } : state;
    case 'protocol': return state.stage === 'protocol' && protocol.choices.some(c => c.id === action.id) ? { ...state, ...clearObservation, stage: 'protocol-reply', protocolChoice: action.id } : state;
    case 'start-observation': return state.stage === 'observation-intro' || (state.stage === 'observation-result' && state.observationChoice !== observation.correctId) ? { ...state, ...clearObservation, stage: 'observing', observationStartedAt: action.now } : state;
    case 'observation-elapsed': return state.stage === 'observing' && state.observationStartedAt !== null && action.now - state.observationStartedAt >= observation.durationMs ? { ...state, stage: 'observation-reveal', observationStartedAt: action.now } : state;
    case 'reveal-elapsed': return state.stage === 'observation-reveal' && state.observationStartedAt !== null && action.now - state.observationStartedAt >= observation.revealDurationMs ? { ...state, stage: 'observation-question', observationStartedAt: null } : state;
    case 'observe-answer': return state.stage === 'observation-question' && observation.choices.some(c => c.id === action.id) ? { ...state, stage: 'observation-result', observationChoice: action.id, authorizationChoice: null } : state;
    case 'authorization-ready': return state.stage === 'authorization' ? { ...state, stage: 'authorization-choice' } : state;
    case 'authorize': return state.stage === 'authorization-choice' && authorization.choices.some(c => c.id === action.id) ? { ...state, stage: 'authorization-reply', authorizationChoice: action.id, invitationUnlocked: true } : state;
    case 'back': {
      if (state.characterId) {
        if (state.stage === 'invitation') return { ...state, stage: 'revelation' };
        if (state.stage === 'revelation') return { ...state, stage: 'authorization-choice', authorizationChoice: null };
        if (state.stage === 'authorization-reply') return { ...state, stage: 'authorization-choice', authorizationChoice: null };
        if (state.stage === 'authorization-choice' || state.stage === 'authorization') return { ...state, ...clearObservation, stage: 'observation-question' };
        if (state.stage === 'observation-result') return { ...state, ...clearObservation, stage: 'observation-question' };
        if (state.stage === 'observation-question' || state.stage === 'observing' || state.stage === 'observation-reveal') return { ...state, ...clearObservation, stage: 'observation-intro' };
        if (state.stage === 'observation-intro' || state.stage === 'protocol-reply') return { ...state, ...clearProcedure, stage: 'protocol' };
        if (state.stage === 'protocol') return { ...state, ...clearProcedure, stage: 'personal', personalChoice: null };
        if (state.stage === 'review') return { ...state, stage: 'identify', candidateId: null };
        if (state.stage === 'personal') return { ...state, stage: 'identify', candidateId: null };
        return { ...state, ...clearProcedure, stage: 'personal', candidateId: null, personalChoice: null };
      }
      const previous: Partial<Record<Stage, Stage>> = { opening: 'cover', 'opening-reply': 'opening', identify: 'opening', review: 'identify' };
      return { ...state, stage: previous[state.stage] ?? 'cover', candidateId: null, openingChoice: state.stage === 'review' ? state.openingChoice : null, personalChoice: null };
    }
  }
}
export const SESSION_KEY = 'residencia-estela:v1:session';
export const IDENTITY_KEY = 'residencia-estela:v1:identity';
type StoragePort = Pick<Storage, 'getItem' | 'setItem'>;
export function restore(storage: StoragePort): Session {
  let saved: Partial<Session> = {};
  try { saved = JSON.parse(storage.getItem(SESSION_KEY) ?? '{}') ?? {}; } catch { /* Recovery preserves separate confirmed identity. */ }
  const identity = saved.characterId ?? storage.getItem(IDENTITY_KEY);
  const character = characters.find(c => c.id === identity);
  const openingChoice = opening.choices.find(c => c.id === saved.openingChoice)?.id ?? null;
  const candidateId = characters.find(c => c.id === saved.candidateId)?.id ?? null;
  if (character) {
    const choice = character.choices.find(c => c.id === saved.personalChoice);
    const protocolChoice = protocol.choices.find(c => c.id === saved.protocolChoice)?.id ?? null;
    const observationChoice = observation.choices.find(c => c.id === saved.observationChoice)?.id ?? null;
    const authorizationChoice = authorization.choices.find(c => c.id === saved.authorizationChoice)?.id ?? null;
    let stage: Stage = saved.stage && stages.includes(saved.stage) ? saved.stage : 'personal';
    if (stage === 'review' && !candidateId) stage = 'identify';
    if (stages.indexOf(stage) > stages.indexOf('personal') && !choice) stage = 'personal';
    if (stages.indexOf(stage) > stages.indexOf('protocol') && !protocolChoice) stage = 'protocol';
    if (stage === 'observing' || stage === 'observation-reveal') stage = 'observation-intro'; // A reload restarts the full observation sequence.
    if (stage === 'observation-result' && !observationChoice) stage = 'observation-question';
    if (stage.startsWith('authorization') && observationChoice !== observation.correctId) stage = 'observation-intro';
    if (stage === 'authorization-reply' && !authorizationChoice) stage = 'authorization-choice';
    if ((stage === 'revelation' || stage === 'invitation') && (!authorizationChoice || saved.invitationUnlocked !== true)) stage = 'authorization-choice';
    if (['cover', 'opening', 'opening-reply'].includes(stage)) stage = 'personal';
    return { ...initialSession, characterId: character.id, stage, candidateId, openingChoice, personalChoice: choice?.id ?? null, protocolChoice, observationChoice, authorizationChoice, invitationUnlocked: saved.invitationUnlocked === true };
  }
  const stage: Stage = saved.stage === 'review' && candidateId && openingChoice ? 'review' : saved.stage === 'identify' && openingChoice ? 'identify' : saved.stage === 'opening-reply' && openingChoice ? 'opening-reply' : saved.stage === 'opening' ? 'opening' : 'cover';
  return { ...initialSession, stage, openingChoice, candidateId };
}
export function persist(storage: StoragePort, state: Session) {
  storage.setItem(SESSION_KEY, JSON.stringify(state));
  if (state.characterId) storage.setItem(IDENTITY_KEY, state.characterId);
}
