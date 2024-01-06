import React from "react";
import { render, screen } from "@testing-library/react";
import IconButton from "./";

describe("IconButton", () => {
  it("should render with a class equal to 'icon-button' and 'icon-button_mock'", () => {
    render(<IconButton className="icon-button_mock" />);

    expect(screen.getByRole("button")).toHaveClass("icon-button");
    expect(screen.getByRole("button")).toHaveClass("icon-button_mock");
  });

  it("should render with a children", () => {
    render(
      <IconButton>
        <svg data-testid="svg" />
      </IconButton>,
    );

    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });
});
