import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadIndicator from "./";

describe("UploadIndicator", () => {
  it("Should render with a class equal to upload-indicator and upload-indicator_mock", () => {
    const { container } = render(
      <UploadIndicator className="upload-indicator_mock" />,
    );
    expect(
      container.getElementsByClassName("upload-indicator_mock")[0],
    ).toBeInTheDocument();
  });
});
