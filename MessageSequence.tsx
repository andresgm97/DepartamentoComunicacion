import { useEffect, useRef, useState, type ReactNode } from 'react';
import { visibleMessages, type Message } from '../state/transcript';
// Tiempo de «está escribiendo…» proporcional a la longitud del mensaje,
// para que dé tiempo a leer el anterior y parezca que alguien lo escribe.
export function typingDelay(message: Message | undefined): number {
  if (!message) return 0;
  if (message.kind) return 900;
  return Math.min(3200, Math.max(1100, 700 + message.text.length * 24));
}

export function MessageSequence({ messages, instant, initiallyVisible, onReady, renderAttachment }: { messages: Message[]; instant: boolean; initiallyVisible: boolean; onReady: () => void; renderAttachment?: (message: Message) => ReactNode }) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set(initiallyVisible ? messages.map(m => m.id) : []));
  const visible = instant ? messages : visibleMessages(messages, seen);
  const pending = messages[visible.length];
  const pendingId = pending?.id;
  const shown = visible.length;
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pendingId || instant) return;
    const timer = window.setTimeout(() => setSeen(previous => new Set(previous).add(pendingId)), typingDelay(pending));
    return () => window.clearTimeout(timer);
  }, [pendingId, instant]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (shown === messages.length) onReady(); }, [shown, messages.length, onReady]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }, [shown]);
  return <><div className="messages" role="log" aria-label="Conversación" aria-live="polite" aria-relevant="additions">
    {visible.map(m => <div key={m.id} data-message-id={m.id} className={m.kind ? 'attachment' : `bubble ${m.from === 'guest' ? 'bubble-guest' : ''}`}>{m.kind ? renderAttachment?.(m) : m.text}</div>)}
    {shown < messages.length && <div className="typing" role="status"><span className="typing-dots" aria-hidden="true"><i/><i/><i/></span>El Departamento está escribiendo…</div>}
  </div><div ref={end}/></>;
}
