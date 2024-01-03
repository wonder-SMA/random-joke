import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "@/utils/renderWithRedux";
import Main from "./";

describe("Main", () => {
  it("Should render with a h1 with the correct text value", () => {
    const mockCallback = jest.fn();
    const { container } = renderWithRedux(<Main onGetMore={mockCallback} />);
    expect(container.getElementsByClassName("main__title")[0]);
    expect(screen.getByText("The Jokes")).toBeInTheDocument();
  });
  it("Should render with a child element with class equal to joke-list", () => {
    const mockCallback = jest.fn();
    const { container } = renderWithRedux(<Main onGetMore={mockCallback} />);
    expect(
      container.getElementsByClassName("joke-list")[0],
    ).toBeInTheDocument();
  });
  it("Should render with a button with the correct text value", () => {
    const mockCallback = jest.fn();
    renderWithRedux(<Main onGetMore={mockCallback} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("ЕЩЕ")).toBeInTheDocument();
  });
  it("Should render with an onGetMore callback, which works correctly", async () => {
    const mockCallback = jest.fn();
    renderWithRedux(<Main onGetMore={mockCallback} />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
it("Should render with a class equal to main and main_mock", () => {
  const mockCallback = jest.fn();
  const { container } = renderWithRedux(
    <Main className="main_mock" onGetMore={mockCallback} />,
  );
  expect(container.getElementsByClassName("main_mock")[0]).toBeInTheDocument();
});
