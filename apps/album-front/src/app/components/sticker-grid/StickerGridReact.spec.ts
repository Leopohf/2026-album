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
      { id: 'A1', name: 'Player A', number: 1, section: 'A', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'B1', name: 'Player B', number: 1, section: 'B', group: 'B', type: 'player', owned: false, duplicates: 0 }
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
    expect(groups).toEqual(['FWC', 'GROUP A', 'GROUP B', 'Coca-Cola']);
  });

  it('should sort players within teams correctly (#1, #13, then rest)', () => {
    const teamStickers: Sticker[] = [
      // Team 1: [2, 1] -> forces b.number === 1
      { id: 'T1_2', name: 'Player 2', number: 2, section: 'Team1', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T1_1', name: 'Player 1', number: 1, section: 'Team1', group: 'A', type: 'player', owned: false, duplicates: 0 },

      // Team 2: [13, 2] -> forces a.number === 13
      { id: 'T2_13', name: 'Player 13', number: 13, section: 'Team2', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T2_2', name: 'Player 2', number: 2, section: 'Team2', group: 'A', type: 'player', owned: false, duplicates: 0 },

      // Team 3: [2, 13] -> forces b.number === 13
      { id: 'T3_2', name: 'Player 2', number: 2, section: 'Team3', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T3_13', name: 'Player 13', number: 13, section: 'Team3', group: 'A', type: 'player', owned: false, duplicates: 0 },

      // Team 4: [1, 2] -> forces a.number === 1
      { id: 'T4_1', name: 'Player 1', number: 1, section: 'Team4', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T4_2', name: 'Player 2', number: 2, section: 'Team4', group: 'A', type: 'player', owned: false, duplicates: 0 },

      // Team 5: [2, 14] -> forces fallthrough
      { id: 'T5_2', name: 'Player 2', number: 2, section: 'Team5', group: 'A', type: 'player', owned: false, duplicates: 0 },
      { id: 'T5_14', name: 'Player 14', number: 14, section: 'Team5', group: 'A', type: 'player', owned: false, duplicates: 0 }
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
      .filter(t => t && !t.startsWith('Team'));
      
    expect(names).toEqual(['Player 1', 'Player 2', 'Player 13', 'Player 2', 'Player 13', 'Player 2', 'Player 1', 'Player 2', 'Player 2', 'Player 14']);
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
