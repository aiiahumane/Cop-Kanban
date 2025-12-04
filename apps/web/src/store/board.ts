import { create } from 'zustand'

// Tipos de columnas
export type ColumnKey = 'PEDIDO'|'COLA'|'INICIO'|'EN_PROCESO'|'FINALIZADA'|'FACTURADA'

// Tipos de dominio
export interface Column { key: ColumnKey; label: string }
export interface Responsable { nombre: string; colorHex?: string }
export interface Assignee { id: string; nombre: string; colorHex?: string; activo?: boolean }
export interface Card {
  id: string
  titulo: string
  fechaInicio?: string
  duracionPrevista?: number
  diasRestantes?: number
  responsable?: Responsable
  recursos?: Assignee[]
}

// Estado del tablero
export interface BoardState {
  columns: Column[]
  cardsByColumn: Record<ColumnKey, Card[]>
  moveCard: (cardId: string, newCol: ColumnKey) => void
}

// Columnas por defecto
const defaultColumns: Column[] = [
  { key: 'PEDIDO',      label: 'Pedido' },
  { key: 'COLA',        label: 'Cola' },
  { key: 'INICIO',      label: 'Inicio' },
  { key: 'EN_PROCESO',  label: 'En Proceso' },
  { key: 'FINALIZADA',  label: 'Finalizada' },
  { key: 'FACTURADA',   label: 'Facturada' },
]

// Datos demo
const initialCards: Record<ColumnKey, Card[]> = {
  PEDIDO: [{
    id: 'c1',
    titulo: 'Ficha demo',
    fechaInicio: '2025-01-12',
    duracionPrevista: 5,
    diasRestantes: 3,
    responsable: { nombre: 'Ana', colorHex: '#fde68a' },
    recursos: [{ id: 'r1', nombre: 'Compresor', colorHex: '#93c5fd', activo: true }],
  }],
  COLA: [],
  INICIO: [],
  EN_PROCESO: [],
  FINALIZADA: [],
  FACTURADA: [],
}

// Store tipado (¡sin backticks extra!)
export const useBoardStore = create<BoardState>((set, get) => ({
  columns: defaultColumns,
  cardsByColumn: initialCards,
  moveCard: (cardId, newCol) => {
    const map: Record<ColumnKey, Card[]> = { ...get().cardsByColumn }
    // Buscar la columna que contiene la ficha
    for (const key of Object.keys(map) as ColumnKey[]) {
      const idx = map[key].findIndex((c) => c.id === cardId)
      if (idx > -1) {
        const extracted = map[key][idx]
        // eliminar del origen sin mutar
        map[key] = [
          ...map[key].slice(0, idx),
          ...map[key].slice(idx + 1),
        ]
        // añadir al destino
        map[newCol] = [...(map[newCol] ?? []), extracted]
        break
      }
    }
    set({ cardsByColumn: map })
  },
}))
