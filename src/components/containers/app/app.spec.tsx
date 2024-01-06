import React from "react";
import { act, screen } from "@testing-library/react";
import { renderWithRedux } from "@/utils/renderWithRedux";
import App from "./";

describe("App", () => {
  it("should render with a 'header', 'main' and 'aside'", async () => {
    renderWithRedux(<App />);

    await act(async () => {
      // header has 'banner' role name
      expect(screen.getByRole("banner")).toBeInTheDocument();

      expect(screen.getByRole("main")).toBeInTheDocument();

      // aside has 'complementary' role name
      expect(screen.getByRole("complementary")).toBeInTheDocument();
    });
  });
});
