import React, { useState, useEffect } from 'react';
import { FilterState } from '../../models/sticker.model';

interface FilterBarProps {
  sections: string[];
  initialFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onExpandGroups: () => void;
  onCollapseGroups: () => void;
}

const TABS: { label: string; value: FilterState['status'] }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'OWNED', value: 'owned' },
  { label: 'MISSING', value: 'missing' },
  { label: 'DUPLICATES', value: 'duplicates' }
];

export const FilterBarReact: React.FC<FilterBarProps> = ({ 
  sections, 
  initialFilters, 
  onFilterChange,
  onExpandAll,
  onCollapseAll,
  onExpandGroups,
  onCollapseGroups
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const setStatus = (status: FilterState['status']) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col gap-4 mb-8 font-mono">
      {/* Search & Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="SEARCH BY ID OR NAME"
          className="flex-1 bg-transparent border border-border p-3 text-sm focus:outline-none focus:border-ink uppercase placeholder:text-muted/50"
        />
        <select 
          name="section"
          value={filters.section}
          onChange={handleInputChange}
          className="bg-transparent border border-border p-3 text-sm focus:outline-none focus:border-ink uppercase"
        >
          <option value="">ALL SECTIONS</option>
          {sections.map(section => (
            <option key={section} value={section}>{section.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Status Tabs & Actions */}
      <div className="flex flex-col sm:flex-row items-center border-b border-border gap-4 sm:gap-8">
        <div className="flex w-full sm:w-auto overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button 
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border-b-2 transition-all duration-150 hover:text-ink whitespace-nowrap ${
                filters.status === tab.value 
                  ? 'border-ink text-ink' 
                  : 'border-transparent text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pb-2 sm:pb-0">
          <div className="flex gap-4 border-r border-border pr-6">
            <button 
              onClick={onExpandGroups}
              className="text-[10px] uppercase font-bold tracking-tighter text-muted hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>[+]</span> GROUPS
            </button>
            <button 
              onClick={onCollapseGroups}
              className="text-[10px] uppercase font-bold tracking-tighter text-muted hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>[-]</span> GROUPS
            </button>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onExpandAll}
              className="text-[10px] uppercase font-bold tracking-tighter text-muted hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>[+]</span> ALL
            </button>
            <button 
              onClick={onCollapseAll}
              className="text-[10px] uppercase font-bold tracking-tighter text-muted hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>[-]</span> ALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
