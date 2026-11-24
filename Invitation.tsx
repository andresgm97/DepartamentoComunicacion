import { useEffect, useRef } from 'react';
import { event, configuredMapsUrl, type EventConfig } from '../config/event';
import { Crest } from './Crest';

export function InvitationCard({ name, config = event }: { name: string; config?: EventConfig }) {
  const mapsUrl = configuredMapsUrl(config.mapsUrl);
  const pending = !config.eventTime || !config.accessInstructions;
  return <article className="invitation-card" aria-label={`Invitación oficial de ${name}`}>
    <Crest/><p className="eyebrow">Residencia Estela</p><h2 id="invitation-title">Invitación oficial</h2>
    <div className="invitation-rule" aria-hidden="true">✦</div>
    <p className="invitation-label">Se autoriza la asistencia de</p><p className="invitation-name">{name}</p>
    <p className="invitation-label">A la celebración del próximo</p><time dateTime={config.eventDate} className="invitation-date">{config.eventDisplayDate}</time>
    <section className="invitation-venue"><h3>Ubicación autorizada</h3><p>{config.venueLabel}</p></section>
    <dl className="invitation-details"><div><dt>Hora</dt><dd>{config.eventTime || 'Pendiente de confirmar'}</dd></div><div><dt>Indicaciones de acceso</dt><dd>{config.accessInstructions || 'Pendientes de confirmar'}</dd></div></dl>
    {(config.demoMode || pending) && <p className="invitation-pending">{pending ? 'Datos de acceso pendientes de configurar' : 'Modo demostración'}</p>}
    {mapsUrl && <a className="button button-green maps-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Consultar ubicación</a>}
    <p className="invitation-reference">EXPEDIENTE DC-2711 · CERRADO</p>
  </article>;
}

export function InvitationDialog({ name, onClose }: { name: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);
  return <dialog ref={dialog} className="invitation-dialog" aria-labelledby="invitation-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="invitation-dialog-bar"><span>Correspondencia oficial</span><button className="back" autoFocus onClick={onClose}>Volver al chat</button></div>
    <InvitationCard name={name}/>
  </dialog>;
}
