import { useEffect, useRef, useState } from 'react';
import { observation } from '../content/procedure';

export function ObservationDesk({ observing, startedAt, onElapsed }: { observing: boolean; startedAt: number | null; onElapsed: () => void }) {
  const [remaining, setRemaining] = useState(observing ? 5 : 3);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { panel.current?.scrollIntoView({ block: 'end', behavior: 'instant' }); }, [observing]);
  useEffect(() => {
    if (startedAt === null) return;
    const tick = () => {
      const left = Math.max(0, (observing ? observation.durationMs : observation.revealDurationMs) - (Date.now() - startedAt));
      setRemaining(Math.ceil(left / 1000));
      if (!left) onElapsed();
    };
    tick();
    const timer = window.setInterval(tick, 100);
    return () => window.clearInterval(timer);
  }, [observing, startedAt, onElapsed]);
  return <section ref={panel} className="observation-panel" aria-label="Comprobación de observación">
    <div className="desk-caption"><span className="eyebrow">Escritorio del Departamento</span><span className="timer" role="timer" aria-label={startedAt !== null ? `${remaining} segundos restantes` : 'Observación finalizada'}>{startedAt !== null ? `${remaining} s` : 'Revisión'}</span></div>
    <div className={`desk-illustration ${!observing ? 'desk-revealed' : ''}`} key={observing ? 'full' : 'missing'}>
      <svg viewBox="0 0 520 330" role="img" aria-label={observing ? 'Sobre el escritorio: una campanilla, un reloj de bolsillo, una taza, una llave y un sello de lacre.' : 'Sobre el escritorio: una campanilla, un reloj de bolsillo, una taza y una llave.'}>
        <defs><linearGradient id="wood" x2="1" y2="1"><stop stopColor="#624735"/><stop offset="1" stopColor="#352b23"/></linearGradient><linearGradient id="brass" x2="1" y2="1"><stop stopColor="#f0d492"/><stop offset=".5" stopColor="#b78b42"/><stop offset="1" stopColor="#765322"/></linearGradient><radialGradient id="wax"><stop stopColor="#b85f45"/><stop offset="1" stopColor="#763121"/></radialGradient><filter id="shadow"><feDropShadow dx="2" dy="6" stdDeviation="4" floodOpacity=".3"/></filter></defs>
        <rect width="520" height="330" rx="9" fill="url(#wood)"/>
        <path d="M0 38H520M0 108H520M0 178H520M0 248H520M0 318H520" stroke="#c5a17a" strokeOpacity=".1"/>
        <rect x="29" y="27" width="462" height="276" rx="20" fill="#263f34" stroke="#b59a62" strokeWidth="2"/>
        <rect x="38" y="36" width="444" height="258" rx="15" fill="none" stroke="#ad9460" strokeOpacity=".35" strokeDasharray="3 4"/>
        <g filter="url(#shadow)" transform="translate(73 69)"><ellipse cx="44" cy="75" rx="44" ry="10" fill="#203229"/><path d="M9 67c9-7 9-18 11-29 2-15 9-25 24-25s22 10 24 25c2 11 2 22 11 29Z" fill="url(#brass)" stroke="#e2bf78" strokeWidth="2"/><ellipse cx="44" cy="68" rx="38" ry="7" fill="#c6a15a" stroke="#edcd8b"/><path d="M44 14V5" stroke="#d8b775" strokeWidth="5"/><ellipse cx="44" cy="4" rx="9" ry="4" fill="#e2bf78"/></g>
        <g filter="url(#shadow)" transform="translate(240 91) rotate(-13)"><path d="M0-33c-31-45 45-60 53-16s-27 38-13 68" fill="none" stroke="#bb9856" strokeWidth="4"/><circle cy="-38" r="9" fill="none" stroke="#c8a766" strokeWidth="5"/><rect x="-8" y="-32" width="16" height="10" rx="3" fill="#d8b775"/><circle r="34" fill="url(#brass)" stroke="#e3c782" strokeWidth="3"/><circle r="28" fill="#f5e9ce"/><g stroke="#6d5b3f" strokeWidth="2"><path d="M0-24v5M24 0h-5M0 24v-5M-24 0h5M0 0l-12-9M0 0l7-18"/></g><circle r="3" fill="#735833"/></g>
        <g filter="url(#shadow)" transform="translate(402 108)"><ellipse cy="20" rx="52" ry="28" fill="#cfc5ab" stroke="#f3e5c7" strokeWidth="3"/><path d="M30-10c37-11 35 34 6 29" fill="none" stroke="#eee6d2" strokeWidth="11"/><path d="M-31-10h64v32c0 27-64 27-64 0Z" fill="#eee6d2"/><ellipse cy="-10" rx="32" ry="14" fill="#e0d5ba"/><ellipse cy="-9" rx="26" ry="10" fill="#513527"/><path d="M-25 17c4 15 24 18 36 13" fill="none" stroke="#bbad8f" strokeWidth="2"/></g>
        <g filter="url(#shadow)" transform="translate(167 232) rotate(-23)"><circle cx="-24" r="19" fill="none" stroke="url(#brass)" strokeWidth="9"/><path d="M-6 0h77v14H56V0M44 0v9" fill="none" stroke="#d6b36b" strokeWidth="9" strokeLinejoin="round"/></g>
        {observing && <g data-testid="wax-seal" filter="url(#shadow)" transform="translate(365 230) rotate(12)"><path d="m0-32 12 4 11 8 8 11-2 14-6 12-12 9-14-1-13-5-10-10-5-14 4-13 11-10Z" fill="url(#wax)"/><circle r="21" fill="none" stroke="#d28861" strokeWidth="2"/><text textAnchor="middle" y="6" fill="#e3ac80" fontFamily="Georgia,serif" fontSize="19">RE</text></g>}
      </svg>
    </div>
    {observing && <><div className="observation-progress" aria-hidden="true"><span style={{ width: `${remaining / 5 * 100}%` }}/></div><p className="desk-help">Observe los objetos antes de que termine el tiempo.</p></>}
  </section>;
}
