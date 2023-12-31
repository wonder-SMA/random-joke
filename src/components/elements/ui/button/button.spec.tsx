import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './';

describe('Button', () => {
  it('should render with a children', () => {
    render(
      <Button>
        <svg data-testid="svg" />
      </Button>
    );

    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });

  it("should render with a class equal to 'button', 'button_primary' and 'button_mock'", () => {
    render(<Button className="button_mock" />);

    expect(screen.getByRole('button')).toHaveClass('button');
    expect(screen.getByRole('button')).toHaveClass('button_primary');
    expect(screen.getByRole('button')).toHaveClass('button_mock');
  });

  it("should render with a class according to the passed value called 'design'", () => {
    render(<Button design="ghost" />);

    expect(screen.getByRole('button')).toHaveClass('button_ghost');
  });
});
