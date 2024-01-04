import React from "react";
import { render, screen } from "@testing-library/react";
import { getWithFirstUpperCharText } from "@/utils/get-init-upper-char";
import { mockData } from "@/mock";
import Joke from "./";

describe("Joke", () => {
  it("should render with a children", () => {
    render(
      <Joke data={mockData}>
        <svg data-testid="svg" />
      </Joke>,
    );

    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });

  it("should be displayed with the passed data", () => {
    const { container } = render(<Joke data={mockData} />);

    expect(
      container.getElementsByClassName("joke__setup-text")[0],
    ).toHaveTextContent(getWithFirstUpperCharText(mockData.setup));
    expect(
      container.getElementsByClassName("joke__punchline-text")[0],
    ).toHaveTextContent(getWithFirstUpperCharText(mockData.punchline));
  });

  it("should render with a class equal to 'joke' and 'joke_mock'", () => {
    const { container } = render(
      <Joke className="joke_mock" data={mockData} />,
    );

    expect(container.getElementsByClassName("joke")[0]).toBeInTheDocument();
    expect(
      container.getElementsByClassName("joke_mock")[0],
    ).toBeInTheDocument();
  });
});
