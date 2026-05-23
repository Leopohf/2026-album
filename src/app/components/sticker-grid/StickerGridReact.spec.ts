import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { StickerGridReact } from './StickerGridReact';
import { createElement } from 'react';
import { Sticker } from '../../models/sticker.model';
import '@testing-library/jest-dom';

describe('StickerGridReact', () => {
  const stickers: Sticker[] = [
    { id: 'ARG1', name: 'Messi', number: 10, section: 'Argentina', group: 'A', type: 'player', owned: false, duplicates: 0 },
    { id: 'BRA1', name: 'Neymar', number: 10, section: 'Brazil', group: 'B', type: 'player', owned: true, duplicates: 1 }
  ];

  it('should render grouped stickers', () => {
    render(
      createElement(StickerGridReact, {
        stickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    expect(screen.getByText('GROUP A')).toBeInTheDocument();
    expect(screen.getByText('GROUP B')).toBeInTheDocument();
    
    expect(screen.getAllByText('Argentina').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Brazil').length).toBeGreaterThan(0);
    
    expect(screen.getByText('Messi')).toBeInTheDocument();
    expect(screen.getByText('Neymar')).toBeInTheDocument();
  });

  it('should call onToggleGroup when group header is clicked', () => {
    const onToggleGroup = vi.fn();
    render(
      createElement(StickerGridReact, {
        stickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup,
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    fireEvent.click(screen.getByText('GROUP A'));
    expect(onToggleGroup).toHaveBeenCalledWith('A');
  });

  it('should call onToggleSection when team header is clicked', () => {
    const onToggleSection = vi.fn();
    render(
      createElement(StickerGridReact, {
        stickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection,
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    const teamHeader = screen.getByRole('heading', { level: 3, name: 'Argentina' }).closest('div');
    const collapseBtn = teamHeader?.querySelector('button');
    if (collapseBtn) fireEvent.click(collapseBtn);
    expect(onToggleSection).toHaveBeenCalledWith('Argentina');
  });

  it('should handle special group sorting (FWC and Coca-Cola)', () => {
    const specialStickers: Sticker[] = [
      { id: 'C1', name: 'Coke', number: 1, section: 'Coca-Cola', group: 'Coca-Cola', type: 'player', owned: false, duplicates: 0 },
      { id: 'F1', name: 'Intro', number: 1, section: 'FWC', group: 'FWC', type: 'player', owned: false, duplicates: 0 },
      { id: 'A1', name: 'Player A', number: 1, section: 'A', group: 'A', type: 'player', owned: false, duplicates: 0 }
    ];

    render(
      createElement(StickerGridReact, {
        stickers: specialStickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    const groups = screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent);
    expect(groups).toEqual(['FWC', 'GROUP A', 'Coca-Cola']);
  });

  it('should sort players within teams correctly (#1, #13, then rest)', () => {
    const teamStickers: Sticker[] = [
      { id: 'T2', name: 'Player 2', number: 2, section: 'TeamName', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T14', name: 'Player 14', number: 14, section: 'TeamName', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T13', name: 'Player 13', number: 13, section: 'TeamName', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T1', name: 'Player 1', number: 1, section: 'TeamName', group: 'A', type: 'player', owned: false, duplicates: 0 }
    ];

    render(
      createElement(StickerGridReact, {
        stickers: teamStickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    const names = screen.getAllByRole('heading', { level: 3 })
      .map(h => h.textContent)
      .filter(t => t !== 'TeamName');
      
    expect(names).toEqual(['Player 1', 'Player 13', 'Player 2', 'Player 14']);
  });

  it('should render "No stickers found" message when list is empty', () => {
    render(
      createElement(StickerGridReact, {
        stickers: [],
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    expect(screen.getByText(/No stickers found/i)).toBeInTheDocument();
  });

  it('should render collapsed groups and teams', () => {
    const collapsedSections = new Set(['Argentina']);
    const collapsedGroups = new Set(['B']);
    
    render(
      createElement(StickerGridReact, {
        stickers,
        collapsedSections,
        collapsedGroups,
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    const groupBContent = screen.getByText('GROUP B').closest('div')?.nextElementSibling;
    expect(groupBContent).toHaveClass('grid-rows-[0fr]');
  });

  it('should handle redundant headers (team name === group name)', () => {
    const redundantStickers: Sticker[] = [
      { id: 'FWC1', name: 'Intro', number: 1, section: 'FWC', group: 'FWC', type: 'player', owned: false, duplicates: 0 }
    ];

    render(
      createElement(StickerGridReact, {
        stickers: redundantStickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged: () => {}
      })
    );

    const teamHeaders = screen.queryAllByRole('heading', { level: 3 });
    expect(teamHeaders.some(h => h.textContent === 'FWC')).toBe(false);
  });

  it('should call onRepeatChanged when duplicates buttons are clicked', () => {
    const onRepeatChanged = vi.fn();
    render(
      createElement(StickerGridReact, {
        stickers,
        collapsedSections: new Set<string>(),
        collapsedGroups: new Set<string>(),
        onToggleSection: () => {},
        onToggleGroup: () => {},
        onToggled: () => {},
        onRepeatChanged
      })
    );

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    expect(onRepeatChanged).toHaveBeenCalledWith('BRA1', 2);
    
    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);
    expect(onRepeatChanged).toHaveBeenCalledWith('BRA1', 0);
  });
});
