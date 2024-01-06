import React from "react";
import { render } from "@testing-library/react";
import UploadIndicator from "./";

describe("UploadIndicator", () => {
  it("should render with a class equal to 'upload-indicator' and 'upload-indicator_mock'", () => {
    const { container } = render(
      <UploadIndicator className="upload-indicator_mock" />,
    );

    expect(container.firstChild).toHaveClass("upload-indicator_mock");
  });
});
