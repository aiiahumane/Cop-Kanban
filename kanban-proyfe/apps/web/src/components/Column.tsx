import { useDroppable } from '@dnd-kit/core'
import { CardView } from './CardView'

export function Column({ column, cards }: any){
  const { setNodeRef } = useDroppable({ id: `col:${column.key}`, data: { type: 'column' } })
  return (
    <section ref={setNodeRef} className="rounded-lg p-2 bg-[var(--surface)] border border-gray-200/30 min-h-[220px]">
      <h3 className="font-semibold mb-2">{column.label}</h3>
      <div className="flex flex-col gap-2">
        {cards.map((c:any)=> <CardView key={c.id} card={c} />)}
      </div>
    </section>
  )
}
