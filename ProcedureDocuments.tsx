import { useEffect, useState } from 'react';

export function ProtocolDocument() {
  return <section className="protocol-document" aria-label="Protocolo DC-2711">
    <span className="eyebrow">Residencia Estela</span><h3>PROTOCOLO DC-2711</h3>
    <dl><div><dt>Identidad del solicitante</dt><dd className="status-approved">VERIFICADA</dd></div><div><dt>Capacidad de observación</dt><dd>PENDIENTE</dd></div><div><dt>Autorización de acceso</dt><dd>PENDIENTE</dd></div></dl>
  </section>;
}

export function Departments({ reviewing, approved, reduced, onReviewed }: { reviewing: boolean; approved: boolean; reduced: boolean; onReviewed: () => void }) {
  const [count, setCount] = useState(reviewing && !reduced ? 0 : 3);
  useEffect(() => {
    if (!reviewing) return;
    if (reduced) { onReviewed(); return; }
    const timer = window.setTimeout(() => {
      if (count < 3) setCount(count + 1);
      else onReviewed();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [reviewing, reduced, count, onReviewed]);
  return <section className="departments" aria-label="Estado de los departamentos"><p className="eyebrow">Autorización administrativa</p>
    {['Identificación', 'Seguridad', 'Comunicación'].slice(0, reviewing ? count : 3).map((name, i) => <div className="department-row" key={name}><span>Departamento de<br/><strong>{name}</strong></span><span className={i < 2 || approved ? 'status-approved' : 'status-review'}>{i < 2 || approved ? 'APROBADO' : 'EN REVISIÓN'}</span></div>)}
    {reviewing && <p className="department-wait" role="status">Tramitando autorizaciones…</p>}
  </section>;
}
