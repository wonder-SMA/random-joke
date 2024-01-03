import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./";

describe("Header", () => {
  it("Should render with a button with the correct text value", () => {
    const mockCallback = jest.fn();
    render(<Header onOpenFavorites={mockCallback} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Избранное")).toBeInTheDocument();
  });
  it("Should render with a button, which class equal to button_ghost", () => {
    const mockCallback = jest.fn();
    const { container } = render(<Header onOpenFavorites={mockCallback} />);
    expect(
      container.getElementsByClassName("button_ghost")[0],
    ).toBeInTheDocument();
  });
  it("Should render with an onOpenFavorites callback, which works correctly", async () => {
    const mockCallback = jest.fn();
    render(<Header onOpenFavorites={mockCallback} />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("Should render with a class equal to header and header_mock", () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <Header className="header_mock" onOpenFavorites={mockCallback} />,
    );
    expect(container.getElementsByClassName("header")[0]).toBeInTheDocument();
    expect(
      container.getElementsByClassName("header_mock")[0],
    ).toBeInTheDocument();
  });
});
