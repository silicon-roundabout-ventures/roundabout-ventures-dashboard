import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag component', () => {
  it('renders children and applies className', () => {
    render(<Tag className="test-class">Label</Tag>);
    const el = screen.getByText('Label');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('test-class');
  });
});
