import clsx from 'clsx';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={clsx(
              'text-xs font-medium px-3 py-1.5 rounded-lg transition-colors',
              filter === f.value
                ? 'bg-primary text-white'
                : 'text-slate-500 hover:bg-slate-200'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="text-xs text-slate-400 hover:text-danger transition-colors"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
