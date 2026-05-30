import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { LangSwitcher } from './LangSwitcher';
import { createElement } from 'react';
import '@testing-library/jest-dom';

describe('LangSwitcher', () => {
  it('should render language switcher buttons', () => {
    const onSwitch = vi.fn();
    render(
      createElement(LangSwitcher, {
        currentLocale: 'en-US',
        onSwitch,
      })
    );

    expect(screen.getByRole('group', { name: /language selector/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /switch language to EN/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /switch language to ES/i })).toBeInTheDocument();
  });

  it('should highlight active language', () => {
    render(
      createElement(LangSwitcher, {
        currentLocale: 'en-US',
        onSwitch: () => {},
      })
    );

    const enButton = screen.getByRole('button', { name: /switch language to EN/i });
    const esButton = screen.getByRole('button', { name: /switch language to ES/i });

    expect(enButton).toHaveAttribute('aria-pressed', 'true');
    expect(esButton).toHaveAttribute('aria-pressed', 'false');
    expect(enButton.className).toContain('text-ink');
  });

  it('should call onSwitch when a button is clicked', () => {
    const onSwitch = vi.fn();
    render(
      createElement(LangSwitcher, {
        currentLocale: 'en-US',
        onSwitch,
      })
    );

    const esButton = screen.getByRole('button', { name: /switch language to ES/i });
    fireEvent.click(esButton);

    expect(onSwitch).toHaveBeenCalledWith('es-CO');
  });
});
