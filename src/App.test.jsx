import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

// Setup basic window.matchMedia mock if needed for any UI components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

describe('App Component', () => {
  it('renders without crashing and displays the default AI Developer role', () => {
    render(<App />);
    // Check if the developer name is present
    expect(screen.getByText(/Mohammed B./i)).toBeTruthy();
    
    // Check if the default active role is highlighted
    expect(screen.getByText('AI Agent Developer')).toBeTruthy();
  });

  it('switches the active identity when clicking a different role', () => {
    render(<App />);
    
    // Find the BI Developer role option
    const biDeveloperOption = screen.getByText('BI Developer');
    
    // Click it
    fireEvent.click(biDeveloperOption);
    
    // Check that it became active (the status should reflect executing as BI Developer)
    const activeStatusText = screen.getByText(/Executing sequence as/i);
    expect(activeStatusText.parentElement.textContent).toMatch(/BI Developer/i);
  });
});
