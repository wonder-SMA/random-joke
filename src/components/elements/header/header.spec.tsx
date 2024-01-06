import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Header from "./";

describe("Header", () => {
  it("should render with a button with the correct text value", () => {
    render(<Header onOpenFavorites={() => {}} />);

    expect(
      screen.getByRole("button", { name: /Избранное/ }),
    ).toBeInTheDocument();
  });

  it("should render with a button whose class is equal to 'button_ghost'", () => {
    render(<Header onOpenFavorites={() => {}} />);

    expect(screen.getByRole("button", { name: /Избранное/ })).toHaveClass(
      "button_ghost",
    );
  });

  it("should render with an 'onOpenFavorites' callback, which works correctly", async () => {
    const mockCallback = jest.fn();

    render(<Header onOpenFavorites={mockCallback} />);

    await userEvent.click(screen.getByRole("button", { name: /Избранное/ }));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should render with a class equal to 'header' and 'header_mock'", () => {
    render(<Header className="header_mock" onOpenFavorites={() => {}} />);

    expect(screen.getByRole("banner")).toHaveClass("header");
    expect(screen.getByRole("banner")).toHaveClass("header_mock");
  });
});
