/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { NavbarComponent } from "./Navbar";

describe("Render", () => {
  it("renders navbar", () => {
    const nav = render(<NavbarComponent />);
    expect(nav.getByRole("navigation")).toBeInTheDocument();
  });
});
