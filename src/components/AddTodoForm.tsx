import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'text-emerald-500' },
  { label: 'Med', value: 'medium', color: 'text-amber-500' },
  { label: 'High', value: 'high', color: 'text-rose-500' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-surface rounded-2xl shadow-md px-4 py-3"
    >
      {/* Priority selector */}
      <div className="flex gap-1">
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'text-xs font-semibold px-2 py-1 rounded-lg border transition-all',
              priority === p.value
                ? 'border-current bg-slate-100 ' + p.color
                : 'border-transparent text-slate-400 hover:text-slate-600'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Text input */}
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="Add a new task…"
        className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={!text.trim()}
        className={clsx(
          'w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
          text.trim()
            ? 'bg-primary hover:bg-primary-hover text-white'
            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
        )}
      >
        <Plus size={16} />
      </button>
    </form>
  );
}
