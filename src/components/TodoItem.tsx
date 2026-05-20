import { useState, useRef } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setEditing(true);
    setEditText(todo.text);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function commitEdit() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function cancelEdit() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  return (
    <li
      className={clsx(
        'flex items-center gap-3 bg-surface rounded-2xl px-4 py-3 shadow-sm group transition-opacity',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Priority dot */}
      <span
        className={clsx(
          'w-2.5 h-2.5 rounded-full flex-shrink-0',
          PRIORITY_DOT[todo.priority]
        )}
      />

      {/* Checkbox */}
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
          todo.completed
            ? 'bg-primary border-primary text-white'
            : 'border-slate-300 hover:border-primary'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={10} strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {editing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="flex-1 outline-none border-b border-primary text-slate-700 text-sm bg-transparent"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm text-slate-700 break-all',
            todo.completed && 'line-through text-slate-400'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              type="button"
              onClick={commitEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-500 hover:bg-emerald-50 transition-colors"
              aria-label="Save edit"
            >
              <Check size={14} />
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
              aria-label="Cancel edit"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={startEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors"
              aria-label="Edit todo"
            >
              <Pencil size={14} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-danger transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
