import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card component', () => {
  it('renders children and applies className', () => {
    render(
      <Card className="test-class">
        Hello Card
      </Card>
    );
    const child = screen.getByText('Hello Card');
    expect(child).toBeInTheDocument();
    expect(child).toHaveClass('test-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        Clickable
      </Card>
    );
    const card = screen.getByText('Clickable');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });
});
