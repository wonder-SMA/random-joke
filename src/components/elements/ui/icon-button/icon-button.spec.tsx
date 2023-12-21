import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IconButton from "./";

describe("IconButton", () => {
  it("Should render with a children", () => {
    render(
      <IconButton>
        <svg data-testid="svg" />
      </IconButton>,
    );
    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });
  it("Should render with a class equal to icon-button and icon-button_mock", () => {
    const { container } = render(<IconButton className="icon-button_mock" />);
    expect(
      container.getElementsByClassName("icon-button")[0],
    ).toBeInTheDocument();
    expect(
      container.getElementsByClassName("icon-button_mock")[0],
    ).toBeInTheDocument();
  });
});