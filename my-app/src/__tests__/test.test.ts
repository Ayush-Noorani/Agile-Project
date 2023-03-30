import React from "react";
import { render } from "@testing-library/react";
import { Button } from "@mui/material";

describe("Button", () => {
  it("renders the label text", () => {
    const labelText = "Click me!";
    const { getByText } = render(<Button label={labelText} />);
    expect(getByText(labelText)).toBeInTheDocument();
  });
});
