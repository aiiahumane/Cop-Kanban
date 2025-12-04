import { useDraggable } from '@dnd-kit/core'

export function CardView({ card }: any){
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: card.id })
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
  return (
    <article ref={setNodeRef} style={style} {...listeners} {...attributes}
      className="card border border-gray-200/40 rounded-lg p-2 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h4 className="font-medium truncate">{card.titulo}</h4>
        {card.responsable?.nombre && (
          <span className="px-2 py-0.5 rounded-full text-sm" style={{background: card.responsable?.colorHex || '#E5E7EB'}}>
            {card.responsable.nombre}
          </span>
        )}
      </header>
      <div className="mt-1 text-sm text-[var(--muted)]">
        <div>Inicio: {card.fechaInicio || '—'}</div>
        <div>Prevista: {card.duracionPrevista ?? '—'} d</div>
        <div>Restante: {card.diasRestantes ?? '—'} d</div>
      </div>
      <footer className="mt-2 flex flex-wrap gap-1">
        {(card.recursos||[]).map((r:any)=> (
          <span key={r.id} className="text-xs px-2 py-0.5 rounded-md" style={{background: r.activo? (r.colorHex||'#d1fae5') : 'var(--neutral)'}}>
            {r.nombre}{!r.activo && ' (Inactivo)'}
          </span>
        ))}
      </footer>
    </article>
  )
}
