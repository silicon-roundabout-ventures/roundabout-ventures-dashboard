import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewDetailsText from '../ViewDetailsText';

describe('ViewDetailsText component', () => {
  it('renders the correct text and classes', () => {
    render(<ViewDetailsText />);
    const el = screen.getByText('View details →');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('text-srv-teal', 'text-xs');
  });
});
