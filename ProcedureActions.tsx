import { authorization, observation, protocol } from '../content/procedure';
import type { Action, Session } from '../state/session';

export function ProcedureActions({ session, dispatch, openInvitation }: { session: Session; dispatch: (action: Action) => void; openInvitation: () => void }) {
  const { stage } = session;
  if (stage === 'personal-reply' || stage === 'protocol-reply') return <button className="button button-green" onClick={() => dispatch({ type: 'continue' })}>Continuar</button>;
  if (stage === 'protocol' || stage === 'authorization-choice') {
    const choices = stage === 'protocol' ? protocol.choices : authorization.choices;
    return <><p className="actions-label">Seleccione su respuesta</p>{choices.map(c => <button className="choice" key={c.id} onClick={() => dispatch({ type: stage === 'protocol' ? 'protocol' : 'authorize', id: c.id })}>{c.label}</button>)}</>;
  }
  if (stage === 'observation-intro') return <button className="button button-green" onClick={() => dispatch({ type: 'start-observation', now: Date.now() })}>Comenzar comprobación</button>;
  if (stage === 'observation-question') return <><p className="actions-label">¿Qué elemento falta?</p><div className="observation-choices">{observation.choices.map(c => <button className="choice" key={c.id} onClick={() => dispatch({ type: 'observe-answer', id: c.id })}>{c.label}</button>)}</div></>;
  if (stage === 'observation-result') return session.observationChoice === observation.correctId ? <><div className="approval-stamp">Capacidad de observación: validada</div><button className="button button-green" onClick={() => dispatch({ type: 'continue' })}>Continuar</button></> : <button className="button button-green" onClick={() => dispatch({ type: 'start-observation', now: Date.now() })}>Volver a observar</button>;
  if (stage === 'authorization-reply') return <><div className="approval-stamp">Autorización concedida</div><button className="button button-green" onClick={() => dispatch({ type: 'continue' })}>Continuar</button></>;
  if (stage === 'revelation') return <button className="button button-green" onClick={() => { dispatch({ type: 'consult-invitation' }); openInvitation(); }}>Consultar invitación oficial</button>;
  if (stage === 'invitation') return <><div className="approval-stamp">Expediente DC-2711: cerrado</div><button className="button button-green" onClick={openInvitation}>Ver mi invitación</button><button className="choice" onClick={() => dispatch({ type: 'back' })}>Revisar conversación</button></>;
  return null;
}
