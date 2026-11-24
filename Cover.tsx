import { Crest } from './Crest';
export function Cover({ onEnter }: { onEnter: () => void }) {
  return <main className="cover">
    <div className="cover-frame">
      <header className="brand"><Crest /><p className="eyebrow">Residencia Estela</p><span className="brand-rule"/><p className="brand-department">Departamento de Comunicación</p></header>
      <div className="cover-main"><p className="eyebrow gold">Servicio de correspondencia privada</p><h1>Tiene usted<br/>correspondencia<br/><em>pendiente.</em></h1>
      <div className="envelope" aria-hidden="true"><div className="envelope-stitch"/><span className="envelope-label">RESIDENCIA ESTELA</span><div className="envelope-flap"/><div className="wax-seal"><span>RE</span></div><span className="envelope-ref">DC · 2711</span></div>
      <p className="sender">Remitente<span>Departamento de Comunicación<br/>Residencia Estela</span></p>
      <button className="button button-gold" onClick={onEnter}>Consultar correspondencia</button></div>
      <footer className="cover-footer"><span className="tiny-ornament">✦</span><span>EXPEDIENTE DC-2711</span><span className="tiny-ornament">✦</span></footer>
    </div>
  </main>;
}
