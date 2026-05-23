import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { FilterBarReact } from './FilterBarReact';
import { createElement } from 'react';
import '@testing-library/jest-dom';

describe('FilterBarReact', () => {
  const sections = ['Argentina', 'Brazil'];
  const initialFilters = { search: '', status: 'all' as const, section: '' };

  it('should render all filter options', () => {
    render(
      createElement(FilterBarReact, {
        sections,
        initialFilters,
        onFilterChange: () => {},
        onExpandAll: () => {},
        onCollapseAll: () => {},
        onExpandGroups: () => {},
        onCollapseGroups: () => {}
      })
    );

    expect(screen.getByPlaceholderText(/SEARCH BY ID OR NAME/i)).toBeInTheDocument();
    expect(screen.getByText('ALL SECTIONS')).toBeInTheDocument();
    expect(screen.getByText('ARGENTINA')).toBeInTheDocument();
    expect(screen.getByText('BRAZIL')).toBeInTheDocument();
    
    // Use getAllByText for 'ALL' as there are multiple (tabs, expansion buttons)
    const allElements = screen.getAllByText(/ALL/i);
    expect(allElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('OWNED')).toBeInTheDocument();
  });

  it('should call onFilterChange when search input changes', () => {
    const onFilterChange = vi.fn();
    render(
      createElement(FilterBarReact, {
        sections,
        initialFilters,
        onFilterChange,
        onExpandAll: () => {},
        onCollapseAll: () => {},
        onExpandGroups: () => {},
        onCollapseGroups: () => {}
      })
    );

    const input = screen.getByPlaceholderText(/SEARCH BY ID OR NAME/i);
    fireEvent.change(input, { target: { value: 'Messi', name: 'search' } });

    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({ search: 'Messi' }));
  });

  it('should call onFilterChange when status tab is clicked', () => {
    const onFilterChange = vi.fn();
    render(
      createElement(FilterBarReact, {
        sections,
        initialFilters,
        onFilterChange,
        onExpandAll: () => {},
        onCollapseAll: () => {},
        onExpandGroups: () => {},
        onCollapseGroups: () => {}
      })
    );

    fireEvent.click(screen.getByText('MISSING'));
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({ status: 'missing' }));
  });

  it('should call expansion callbacks', () => {
    const onExpandAll = vi.fn();
    const onCollapseAll = vi.fn();
    render(
      createElement(FilterBarReact, {
        sections,
        initialFilters,
        onFilterChange: () => {},
        onExpandAll,
        onCollapseAll,
        onExpandGroups: () => {},
        onCollapseGroups: () => {}
      })
    );

    // Using partial text match or finding by role with accessible name
    const buttons = screen.getAllByRole('button');
    const expandBtn = buttons.find(b => b.textContent?.includes('[+]') && b.textContent?.includes('ALL'));
    const collapseBtn = buttons.find(b => b.textContent?.includes('[-]') && b.textContent?.includes('ALL'));

    if (expandBtn) fireEvent.click(expandBtn);
    expect(onExpandAll).toHaveBeenCalled();

    if (collapseBtn) fireEvent.click(collapseBtn);
    expect(onCollapseAll).toHaveBeenCalled();
  });
});
