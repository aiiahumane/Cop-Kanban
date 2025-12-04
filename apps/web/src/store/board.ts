import { create } from 'zustand'

type ColumnKey = 'PEDIDO'|'COLA'|'INICIO'|'EN_PROCESO'|'FINALIZADA'|'FACTURADA'

const defaultColumns = [
  { key: 'PEDIDO', label: 'Pedido' },
  { key: 'COLA', label: 'Cola' },
  { key: 'INICIO', label: 'Inicio' },
  { key: 'EN_PROCESO', label: 'En Proceso' },
  { key: 'FINALIZADA', label: 'Finalizada' },
  { key: 'FACTURADA', label: 'Facturada' },
]

export const useBoardStore = create<any>((set, get)=>({
  columns: defaultColumns,
  cardsByColumn: {
    PEDIDO: [
      { id: 'c1', titulo: 'Ficha demo', fechaInicio: '2025-01-12', duracionPrevista: 5, diasRestantes: 3,
        responsable: { nombre: 'Ana', colorHex: '#fde68a' }, recursos:[{id:'r1', nombre:'Compresor', colorHex:'#93c5fd', activo:true}] }
    ]
  },
  moveCard: (cardId: string, newCol: ColumnKey)=>{
    const map = { ...get().cardsByColumn }
    for (const k of Object.keys(map)) {
      const idx = map[k].findIndex((c:any)=> c.id===cardId)
      if(idx>-1){
        const [card] = map[k].splice(idx,1)
        (map[newCol] ||= []).push(card)
        break
      }
    }
    set({ cardsByColumn: map })
  }
}))
