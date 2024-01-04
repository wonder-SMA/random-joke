import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./";

describe("Header", () => {
  it("should render with a button with the correct text value", () => {
    render(<Header onOpenFavorites={() => {}} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Избранное")).toBeInTheDocument();
  });

  it("should render with a button whose class is equal to 'button_ghost'", () => {
    const { container } = render(<Header onOpenFavorites={() => {}} />);

    expect(
      container.getElementsByClassName("button_ghost")[0],
    ).toBeInTheDocument();
  });

  it("should render with an 'onOpenFavorites' callback, which works correctly", () => {
    const mockCallback = jest.fn();

    render(<Header onOpenFavorites={mockCallback} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should render with a class equal to 'header' and 'header_mock'", () => {
    const { container } = render(
      <Header className="header_mock" onOpenFavorites={() => {}} />,
    );

    expect(container.getElementsByClassName("header")[0]).toBeInTheDocument();
    expect(
      container.getElementsByClassName("header_mock")[0],
    ).toBeInTheDocument();
  });
});
