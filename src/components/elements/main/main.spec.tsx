import React from "react";
import * as reduxHooks from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "./";
import { initialState } from "@/store/jokes-slice";
import { mockData } from "@/mock";

jest.mock("react-redux");

const mockedDispatch = jest.spyOn(reduxHooks, "useDispatch");
const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");

mockedUseSelector.mockReturnValue(initialState);

describe("Main", () => {
  it("should render with a 'h1' with the correct text value", () => {
    const { container } = render(<Main onGetMore={() => {}} />);

    expect(container.getElementsByClassName("main__title")[0]);
    expect(screen.getByText("The Jokes")).toBeInTheDocument();
  });

  it("should render with a child element whose class is equal to 'joke-list'", () => {
    const { container } = render(<Main onGetMore={() => {}} />);

    expect(
      container.getElementsByClassName("joke-list")[0],
    ).toBeInTheDocument();
  });

  it("should render with a button with the correct text value", () => {
    render(<Main onGetMore={() => {}} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("ЕЩЕ")).toBeInTheDocument();
  });

  it("should render with the 'onGetMore' callback, which works correctly", () => {
    const mockCallback = jest.fn();

    render(<Main onGetMore={mockCallback} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should render with a class equal to 'main' and 'main_mock'", () => {
    const { container } = render(
      <Main className="main_mock" onGetMore={() => {}} />,
    );

    expect(
      container.getElementsByClassName("main_mock")[0],
    ).toBeInTheDocument();
  });

  it("should render with an upload indicator if loading state equal to true", () => {
    mockedUseSelector.mockReturnValue({ ...initialState, loading: true });

    const { container } = render(<Main onGetMore={() => {}} />);

    expect(
      container.getElementsByClassName("upload-indicator")[0],
    ).toBeInTheDocument();
  });

  it("shouldn't render with a button if loading state equal to true", () => {
    mockedUseSelector.mockReturnValue({ ...initialState, loading: true });

    const { container } = render(<Main onGetMore={() => {}} />);

    expect(container.getElementsByTagName("button").length).toBe(0);
  });

  describe("Joke", () => {
    const mockState = {
      ...initialState,
      jokes: { [mockData.id]: mockData },
      favoriteJokes: {
        [mockData.id]: { ...mockData, isLiked: false, isDisliked: false },
      },
    };

    it("should render with the passed button with the 'onAddToFavorites' callback, which works correctly", () => {
      const mockCallback = jest.fn();
      mockedUseSelector.mockReturnValue(mockState);
      mockedDispatch.mockReturnValue(mockCallback);

      const { container } = render(<Main onGetMore={() => {}} />);

      fireEvent.click(
        container.getElementsByClassName("joke__heart-button")[0],
      );

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({
        payload: mockData.id,
        type: "jokes/removeFromFavorites",
      });
    });

    it("should render with the passed button whose class is equal to 'joke__heart-button' and 'joke__heart-button_filled'", () => {
      mockedUseSelector.mockReturnValue(mockState);

      const { container } = render(<Main onGetMore={() => {}} />);

      expect(
        container.getElementsByClassName("joke__heart-button").length,
      ).toBe(1);
      expect(
        container.getElementsByClassName("joke__heart-button_filled").length,
      ).toBe(1);
    });
  });
});
