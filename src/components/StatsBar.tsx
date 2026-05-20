import { CheckCircle2, Circle, ChevronsDown } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  onToggleAll: () => void;
};

export default function StatsBar({ activeCount, completedCount, onToggleAll }: StatsBarProps) {
  const total = activeCount + completedCount;
  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between bg-surface rounded-2xl shadow-sm px-4 py-2.5 mb-3">
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Circle size={13} className="text-primary" />
          <strong className="text-slate-700">{activeCount}</strong> active
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-emerald-500" />
          <strong className="text-slate-700">{completedCount}</strong> done
        </span>
      </div>

      {total > 0 && (
        <button
          type="button"
          onClick={onToggleAll}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors"
          title="Toggle all"
        >
          <ChevronsDown size={14} />
          Toggle all
        </button>
      )}
    </div>
  );
}
