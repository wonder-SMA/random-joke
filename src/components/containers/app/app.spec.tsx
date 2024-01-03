import React from "react";
import { renderWithRedux } from "@/utils/renderWithRedux";
import App from "./";

describe("App", () => {
  it("Should render with child elements with class equal to header, main and favorites", () => {
    const { container } = renderWithRedux(<App />);
    expect(container.getElementsByClassName("header")[0]).toBeInTheDocument();
    expect(container.getElementsByClassName("main")[0]).toBeInTheDocument();
    expect(
      container.getElementsByClassName("favorites")[0],
    ).toBeInTheDocument();
  });
});
