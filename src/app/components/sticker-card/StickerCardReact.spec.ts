import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { StickerCardReact } from './StickerCardReact';
import { Sticker } from '../../models/sticker.model';
import { createElement } from 'react';
import '@testing-library/jest-dom';

describe('StickerCardReact', () => {
  const mockSticker: Sticker = {
    id: 'ARG1',
    name: 'Lionel Messi',
    type: 'player',
    number: 10,
    owned: false,
    duplicates: 0,
    section: 'Argentina',
    group: 'A'
  };

  it('should render sticker information', () => {
    render(
      createElement(StickerCardReact, {
        sticker: mockSticker,
        onToggle: () => {},
        onUpdateDuplicates: () => {}
      })
    );

    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText('Lionel Messi')).toBeInTheDocument();
    expect(screen.getByText('Missing')).toBeInTheDocument();
  });

  it('should call onToggle when status button is clicked', () => {
    const onToggle = vi.fn();
    render(
      createElement(StickerCardReact, {
        sticker: mockSticker,
        onToggle: onToggle,
        onUpdateDuplicates: () => {}
      })
    );

    fireEvent.click(screen.getByRole('button', { name: /Missing/i }));
    expect(onToggle).toHaveBeenCalledWith('ARG1');
  });

  it('should call onToggle when name/section area is clicked', () => {
    const onToggle = vi.fn();
    render(
      createElement(StickerCardReact, {
        sticker: mockSticker,
        onToggle: onToggle,
        onUpdateDuplicates: () => {}
      })
    );

    // Click on the name
    fireEvent.click(screen.getByText('Lionel Messi'));
    expect(onToggle).toHaveBeenCalledWith('ARG1');
  });

  it('should call onUpdateDuplicates when increment/decrement buttons are clicked', () => {
    const onUpdateDuplicates = vi.fn();
    const ownedSticker: Sticker = { ...mockSticker, owned: true, duplicates: 1 };
    
    render(
      createElement(StickerCardReact, {
        sticker: ownedSticker,
        onToggle: () => {},
        onUpdateDuplicates: onUpdateDuplicates
      })
    );

    const incrementBtn = screen.getByText('+');
    const decrementBtn = screen.getByText('-');

    fireEvent.click(incrementBtn);
    expect(onUpdateDuplicates).toHaveBeenCalledWith('ARG1', 1);

    fireEvent.click(decrementBtn);
    expect(onUpdateDuplicates).toHaveBeenCalledWith('ARG1', -1);
  });
});
