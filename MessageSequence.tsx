import { useEffect, useRef, useState, type ReactNode } from 'react';
import { visibleMessages, type Message } from '../state/transcript';
export function MessageSequence({ messages, instant, initiallyVisible, onReady, renderAttachment }: { messages: Message[]; instant: boolean; initiallyVisible: boolean; onReady: () => void; renderAttachment?: (message: Message) => ReactNode }) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set(initiallyVisible ? messages.map(m => m.id) : []));
  const visible = instant ? messages : visibleMessages(messages, seen);
  const pending = messages[visible.length];
  const pendingId = pending?.id;
  const shown = visible.length;
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pendingId || instant) return;
    const timer = window.setTimeout(() => setSeen(previous => new Set(previous).add(pendingId)), 350);
    return () => window.clearTimeout(timer);
  }, [pendingId, instant]);
  useEffect(() => { if (shown === messages.length) onReady(); }, [shown, messages.length, onReady]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); }, [shown]);
  return <><div className="messages" role="log" aria-label="Conversación" aria-live="polite" aria-relevant="additions">
    {visible.map(m => <div key={m.id} data-message-id={m.id} className={m.kind ? 'attachment' : `bubble ${m.from === 'guest' ? 'bubble-guest' : ''}`}>{m.kind ? renderAttachment?.(m) : m.text}</div>)}
    {shown < messages.length && <div className="typing" role="status"><span className="typing-dots" aria-hidden="true"><i/><i/><i/></span>El Departamento está escribiendo…</div>}
  </div><div ref={end}/></>;
}
