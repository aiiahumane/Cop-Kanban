import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useBoardStore } from '../store/board'
import type { ColumnKey } from '../store/board'
import { Column as ColumnComponent } from './Column'

export function Board(){
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const columns = useBoardStore((state) => state.columns)
  const cardsByColumn = useBoardStore((state) => state.cardsByColumn)
  const moveCard = useBoardStore((state) => state.moveCard)

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if(!over) return
    const targetId = over.id.toString()
    if (targetId.startsWith('col:')) {
      const newCol = targetId.slice(4) as ColumnKey
      moveCard(active.id.toString(), newCol)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {columns.map((col) => (
          <ColumnComponent key={col.key} column={col} cards={cardsByColumn[col.key] ?? []} />
        ))}
      </div>
    </DndContext>
  )
