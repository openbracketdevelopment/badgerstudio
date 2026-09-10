import { render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Create brief</Button>);

    expect(
      screen.getByRole("button", { name: "Create brief" }),
    ).toBeInTheDocument();
  });

  it("supports a disabled state", () => {
    render(<Button disabled>Unavailable</Button>);

    expect(screen.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  });
});
