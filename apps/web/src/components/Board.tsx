import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useBoardStore } from '../store/board'
import type { Column as ColumnT, ColumnKey } from '../store/board'
import { Column as ColumnComponent } from './Column'

export function Board(){
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )
  const columns = useBoardStore((s) => s.columns)
  const cardsByColumn = useBoardStore((s) => s.cardsByColumn)
  const moveCard = useBoardStore((s) => s.moveCard)

  function onDragEnd(e: DragEndEvent){
    const { active, over } = e
    if(!over) return
    if(over.id.toString().startsWith('col:')){
      const newCol = over.id.toString().replace('col:', '') as ColumnKey
      moveCard(active.id.toString(), newCol)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {columns.map((col: ColumnT) => (
          <ColumnComponent key={col.key} column={col} cards={cardsByColumn[col.key] ?? []} />
        ))}
      </div>
    </DndContext>
  )
}
``
