import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const filterGroups = {
  country: ['USA', 'Canada', 'UK', 'Germany'],
  budget: ['Low', 'Mid', 'High'],
};

const FilterSidebar = () => {
  const [selected, setSelected] = useState({ country: 'USA', budget: 'Mid' });

  const activeCount = useMemo(() => Object.values(selected).filter(Boolean).length, [selected]);

  return (
    <Card className="space-y-5 p-6 no-scrollbar">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-primary">Filters</h3>
        <Badge variant="accent">{activeCount} active</Badge>
      </div>
      {Object.entries(filterGroups).map(([group, options]) => (
        <div key={group} className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{group}</p>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isSelected = selected[group] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelected((current) => ({ ...current, [group]: option }))}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    isSelected
                      ? 'border-brand bg-brand text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default FilterSidebar;