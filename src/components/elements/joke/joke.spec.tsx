import React from 'react';
import { render, screen } from '@testing-library/react';
import { getWithFirstUpperCharText } from '@/utils/get-init-upper-char';
import { mockData } from '@/mock';
import Joke from './';

describe('Joke', () => {
  it('should render with a children', () => {
    const { getByTestId } = render(
      <Joke data={mockData}>
        <svg data-testid="svg" />
      </Joke>
    );

    expect(getByTestId('svg')).toBeInTheDocument();
  });

  it('should be displayed with the passed data', () => {
    render(<Joke data={mockData} />);

    expect(screen.getByText(getWithFirstUpperCharText(mockData.setup))).toHaveClass(
      'joke__setup-text'
    );

    expect(screen.getByText(getWithFirstUpperCharText(mockData.punchline))).toHaveClass(
      'joke__punchline-text'
    );
  });

  it("should render with a class equal to 'joke' and 'joke_mock'", () => {
    const { container } = render(<Joke className="joke_mock" data={mockData} />);

    expect(container.firstChild).toHaveClass('joke');
    expect(container.firstChild).toHaveClass('joke_mock');
  });
});
