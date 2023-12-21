import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "@/utils/renderWithRedux";
import Favorites from "./";

describe("Favorites", () => {
  it("Should render with a child element with class equal to joke-list", () => {
    const mockCallback = jest.fn();
    const { container } = renderWithRedux(
      <Favorites onCloseFavorites={mockCallback} />,
    );
    expect(
      container.getElementsByClassName("joke-list")[0],
    ).toBeInTheDocument();
  });
  it("Should render with a button with class equal to favorites__heart-button", () => {
    const mockCallback = jest.fn();
    const { container } = renderWithRedux(
      <Favorites onCloseFavorites={mockCallback} />,
    );
    expect(
      container.getElementsByClassName("favorites__heart-button")[0],
    ).toBeInTheDocument();
  });
  it("Should render with an onCloseFavorites callback, which works correctly", async () => {
    const mockCallback = jest.fn();
    renderWithRedux(<Favorites onCloseFavorites={mockCallback} />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
it("Should render with a class equal to favorites and favorites_mock", () => {
  const mockCallback = jest.fn();
  const { container } = renderWithRedux(
    <Favorites className="favorites_mock" onCloseFavorites={mockCallback} />,
  );
  expect(container.getElementsByClassName("favorites")[0]).toBeInTheDocument();
  expect(
    container.getElementsByClassName("favorites_mock")[0],
  ).toBeInTheDocument();
});
