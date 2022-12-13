/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const MockLay = () => {
  return <div data-testid="lyt">Layout</div>;
};

// demo test
describe("Render", () => {
  it("renders layout", () => {
    const layout = render(<MockLay />);
    expect(layout.getByTestId("lyt")).toBeInTheDocument();
  });
});
