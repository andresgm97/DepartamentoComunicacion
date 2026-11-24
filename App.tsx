import { useCallback, useEffect, useRef, useState } from 'react';
import { characters, opening } from './content/dialogue';
import { Cover } from './components/Cover';
import { Crest } from './components/Crest';
import { MessageSequence } from './components/MessageSequence';
import { transcript } from './state/transcript';
import { ObservationDesk } from './components/ObservationDesk';
import { Departments, ProtocolDocument } from './components/ProcedureDocuments';
import { ProcedureActions } from './components/ProcedureActions';
import { InvitationDialog } from './components/Invitation';
import { initialSession, persist, restore, transition, type Action } from './state/session';

export default function App() {
  const [session, setSession] = useState(() => { try { return restore(localStorage); } catch { return initialSession; } });
  const restoredConversation = useRef(session.stage !== 'cover');
  const [error, setError] = useState('');
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const { stage } = session;
  const sequenceKey = `${stage}-${session.personalChoice}-${session.openingChoice}-${session.candidateId}-${session.characterId}-${session.protocolChoice}-${session.observationChoice}-${session.authorizationChoice}`;
  const ready = readyKey === sequenceKey;
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    const sync = () => { try { setSession(restore(localStorage)); } catch { /* Keep the current session when storage is unavailable. */ } };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) sync(); };
    window.addEventListener('storage', sync);
    window.addEventListener('pageshow', onPageShow);
    return () => { media.removeEventListener('change', update); window.removeEventListener('storage', sync); window.removeEventListener('pageshow', onPageShow); };
  }, []);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [stage]);
  useEffect(() => { if (ready) actions.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }, [ready]);
  const onReady = useCallback(() => setReadyKey(sequenceKey), [sequenceKey]);
  function dispatch(action: Action) {
    const next = transition(session, action);
    if (next === session) return;
    try { persist(localStorage, next); setError(''); } catch {
      setError('No hemos podido guardar el expediente en este navegador. Puede continuar, pero los cambios podrían perderse al recargar.');
    }
    setReadyKey(null); setSession(next);
  }
  const character = characters.find(c => c.id === session.characterId);
  const messages = transcript(session);
  const title = stage === 'revelation' || stage === 'invitation' ? 'Invitación oficial' : stage.startsWith('protocol') ? 'Protocolo de comunicación' : stage.startsWith('observ') ? 'Comprobación de observación' : stage.startsWith('authorization') ? 'Autorización administrativa' : stage === 'opening' || stage === 'opening-reply' ? 'Apertura del expediente' : stage === 'identify' || stage === 'review' ? 'Identificación del invitado' : 'Expediente personal';
  return <div className={`app ${reduced ? 'no-motion' : ''}`}>
    {stage === 'cover' ? <Cover onEnter={() => dispatch({ type: 'enter' })}/> : <main className="chat-shell">
      <aside className="desk-aside"><Crest/><p className="eyebrow gold">Residencia Estela</p><h2>Cada invitación<br/>empieza con<br/><em>un expediente.</em></h2><span className="aside-rule"/><p>Departamento<br/>de Comunicación</p><span className="aside-reference">CORRESPONDENCIA PRIVADA<br/>EXPEDIENTE DC-2711</span></aside>
      <section className="chat" aria-label="Correspondencia con el Departamento">
        <div className="chat-top"><header className="chat-header"><Crest small/><div><p className="chat-residence">Residencia Estela</p><h1>Departamento de Comunicación</h1><p className="service">Servicio oficial de atención a invitados</p></div></header>
        <div className="chat-toolbar"><button className="back" onClick={() => dispatch({ type: 'back' })}>Atrás</button>{character && stage !== 'identify' && stage !== 'review' && <button className="back" onClick={() => dispatch({ type: 'change-identity' })}>Cambiar identidad</button>}</div>
        {session.invitationUnlocked && character && <button className="saved-invitation" onClick={() => setInvitationOpen(true)}>Ver mi invitación <span>Autorización conservada</span></button>}</div>
        <div className="chat-body"><div className="scene-heading"><span>DC-2711</span><h2 ref={heading} tabIndex={-1}>{title}</h2></div>
          {character && stage !== 'identify' && stage !== 'review' && <div className="identity-tag"><span aria-hidden="true">✓</span> {character.title}<span>Identidad seleccionada</span></div>}
          {stage === 'review' && <div className="file-stamp">Expediente localizado</div>}
          <MessageSequence messages={messages} instant={reduced} initiallyVisible={restoredConversation.current} onReady={onReady} renderAttachment={message => message.kind === 'protocol' ? <ProtocolDocument/> : <Departments reviewing={stage === 'authorization'} approved={stage === 'authorization-reply' || stage === 'revelation' || stage === 'invitation' || (stage === 'authorization-choice' && ready)} reduced={reduced} onReviewed={() => dispatch({ type: 'authorization-ready' })}/>}/>
          {(stage === 'observing' || stage === 'observation-reveal' || stage === 'observation-question') && <ObservationDesk observing={stage === 'observing'} startedAt={session.observationStartedAt} onElapsed={() => dispatch({ type: stage === 'observing' ? 'observation-elapsed' : 'reveal-elapsed', now: Date.now() })}/>}
          <div ref={actions} className="actions" aria-label="Opciones de respuesta">
          {ready && <>
            {stage === 'opening' && <><p className="actions-label">Seleccione su respuesta</p>{opening.choices.map(c => <button className="choice" key={c.id} onClick={() => dispatch({ type: 'opening', id: c.id })}>{c.label}</button>)}</>}
            {stage === 'opening-reply' && <button className="button button-green" onClick={() => dispatch({ type: 'continue' })}>Continuar</button>}
            {stage === 'identify' && <><p className="actions-label">Seleccione su nombre · 9 expedientes</p><div className="character-grid">{characters.map(c => <button className="character-choice" key={c.id} onClick={() => dispatch({ type: 'select', id: c.id })}><span className="initial" aria-hidden="true">{c.name[0]}</span><span><strong>{c.name}</strong><span>{c.title}</span></span></button>)}</div></>}
            {stage === 'review' && <><p className="identity-warning">Podrá cambiar de identidad cuando lo desee.</p><button className="button button-green" onClick={() => dispatch({ type: 'confirm' })}>Confirmar identidad</button><button className="choice" onClick={() => dispatch({ type: 'correct' })}>Corregir selección</button></>}
            {stage === 'personal' && character && <><p className="actions-label">Seleccione su respuesta</p>{character.choices.map(c => <button className="choice" key={c.id} onClick={() => dispatch({ type: 'personal', id: c.id })}>{c.label}</button>)}</>}
            <ProcedureActions session={session} dispatch={dispatch} openInvitation={() => setInvitationOpen(true)}/>
          </>}
          </div>
        </div><footer className="chat-footer">RESIDENCIA ESTELA <span aria-hidden="true">✦</span> CORRESPONDENCIA PRIVADA</footer>
      </section>
    </main>}
    {error && <div className="storage-error" role="alert">{error}</div>}
    {invitationOpen && session.invitationUnlocked && character && <InvitationDialog name={character.title} onClose={() => setInvitationOpen(false)}/>}
  </div>;
}
