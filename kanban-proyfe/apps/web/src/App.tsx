import { Board } from './components/Board'

export function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="p-3 border-b border-gray-200/20">
        <h1 className="text-xl font-semibold">Kanban Proyfe</h1>
      </header>
      <main className="p-4">
        <Board />
      </main>
    </div>
  )
}
