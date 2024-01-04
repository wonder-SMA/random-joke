import React from "react";
import { render } from "@testing-library/react";
import Joke from "../joke";
import JokeList from "./";
import { mockListData } from "@/mock";
import { IJoke } from "@/types/joke";

describe("JokeList", () => {
  it("should render the correct number of child elements whose class is equal to 'joke-list__item'", () => {
    const mockCallback = jest.fn((data: IJoke) => <Joke data={data} />);

    const { container } = render(
      <JokeList data={mockListData} renderJoke={mockCallback} />,
    );

    expect(container.getElementsByClassName("joke-list__item").length).toBe(
      mockListData.length,
    );
  });

  it("should render with a class equal to 'joke-list' and 'joke-list_mock'", () => {
    const mockCallback = jest.fn((data: IJoke) => <Joke data={data} />);

    const { container } = render(
      <JokeList
        className="joke-list_mock"
        data={mockListData}
        renderJoke={mockCallback}
      />,
    );

    expect(
      container.getElementsByClassName("joke-list")[0],
    ).toBeInTheDocument();
    expect(
      container.getElementsByClassName("joke-list_mock")[0],
    ).toBeInTheDocument();
  });
});
