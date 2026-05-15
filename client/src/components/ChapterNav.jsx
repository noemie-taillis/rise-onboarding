const CHAPTERS = [
  { num: '01', label: 'Family Office' },
  { num: '02', label: 'Mantu' },
  { num: '03', label: 'Les Brourhant' },
];

export default function ChapterNav({ current, onChange }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 32px',
        background: 'rgba(15, 10, 31, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Left arrow */}
      <button
        onClick={() => current > 0 && onChange(current - 1)}
        style={{
          background: 'none',
          border: 'none',
          color: current === 0 ? 'rgba(255,255,255,0.2)' : '#F5F3FF',
          cursor: current === 0 ? 'default' : 'pointer',
          fontSize: '1.1rem',
          padding: '4px 6px',
          lineHeight: 1,
          transition: 'color 0.2s',
        }}
        aria-label="Chapitre précédent"
      >
        ←
      </button>

      {/* Dots */}
      {CHAPTERS.map((ch, i) => (
        <button
          key={ch.num}
          onClick={() => onChange(i)}
          title={ch.label}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: i === current ? '#7C3AED' : 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#F5F3FF',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            flexShrink: 0,
          }}
        >
          {ch.num}
        </button>
      ))}

      {/* Current label */}
      <span
        style={{
          color: '#F5F3FF',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 500,
          marginLeft: 4,
          opacity: 0.9,
        }}
      >
        {CHAPTERS[current].label}
      </span>

      {/* Right arrow */}
      <button
        onClick={() => current < 2 && onChange(current + 1)}
        style={{
          background: 'none',
          border: 'none',
          color: current === 2 ? 'rgba(255,255,255,0.2)' : '#F5F3FF',
          cursor: current === 2 ? 'default' : 'pointer',
          fontSize: '1.1rem',
          padding: '4px 6px',
          lineHeight: 1,
          transition: 'color 0.2s',
          marginLeft: 'auto',
        }}
        aria-label="Chapitre suivant"
      >
        →
      </button>
    </div>
  );
}
