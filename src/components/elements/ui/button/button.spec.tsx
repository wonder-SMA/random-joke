import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
  it("should render with a children", () => {
    render(
      <Button>
        <svg data-testid="svg" />
      </Button>,
    );

    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });

  it("should render with a class equal to 'button', 'button_primary' and 'button_mock'", () => {
    const { container } = render(<Button className="button_mock" />);

    expect(container.getElementsByClassName("button")[0]).toBeInTheDocument();
    expect(
      container.getElementsByClassName("button_primary")[0],
    ).toBeInTheDocument();
    expect(
      container.getElementsByClassName("button_mock")[0],
    ).toBeInTheDocument();
  });

  it("should render with a class according to the passed value called 'design'", () => {
    const { container } = render(<Button design="ghost" />);

    expect(
      container.getElementsByClassName("button_ghost")[0],
    ).toBeInTheDocument();
  });
});
