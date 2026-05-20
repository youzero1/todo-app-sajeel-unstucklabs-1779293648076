import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-1">
            Todo
          </h1>
          <p className="text-slate-500 text-sm">Stay organised, get things done.</p>
        </header>

        {/* Add form */}
        <div className="mb-4">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Stats */}
        <StatsBar
          activeCount={activeCount}
          completedCount={completedCount}
          onToggleAll={toggleAll}
        />

        {/* Filter bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        {/* Todo list */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {filteredTodos.length === 0 && (
          <div className="text-center text-slate-400 py-16 text-sm">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
              ? 'All tasks are done! 🎉'
              : 'No tasks yet. Add one above!'}
          </div>
        )}

        <footer className="mt-10 text-center text-xs text-slate-400">
          Data saved automatically in your browser.
        </footer>
      </div>
    </div>
  );
}
