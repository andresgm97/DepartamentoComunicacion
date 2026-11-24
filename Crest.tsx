export function Crest({ small = false }: { small?: boolean }) {
  return <div className={small ? 'crest crest-small' : 'crest'} aria-hidden="true"><svg viewBox="0 0 80 90" fill="none"><path d="M15 32h50v25c0 14-25 25-25 25S15 71 15 57V32Z"/><path d="m23 21-3-12 13 7 7-12 7 12 13-7-3 12H23ZM25 27h30M40 40v30M24 56h32"/><path d="M6 38C0 57 8 73 24 83M74 38c6 19-2 35-18 45M7 48l-5-4M9 62l-7-2M16 75l-8 1M73 48l5-4M71 62l7-2M64 75l8 1"/></svg></div>;
}
