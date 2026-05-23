import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { StatsPanelReact } from './StatsPanelReact';
import { createElement } from 'react';
import '@testing-library/jest-dom';

describe('StatsPanelReact', () => {
  const mockStats = {
    total: 100,
    owned: 60,
    missing: 40,
    duplicates: 10,
    progress: 60
  };

  it('should render all metrics correctly', () => {
    render(
      createElement(StatsPanelReact, {
        stats: mockStats
      })
    );

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
    expect(screen.getByText(/Owned/i)).toBeInTheDocument();
    expect(screen.getByText(/Missing/i)).toBeInTheDocument();
    expect(screen.getByText(/Duplicates/i)).toBeInTheDocument();
  });
});
