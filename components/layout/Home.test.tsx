/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const Mockh = () => {
  return (
    <div data-testid="home">
      <div>kiracibaslik</div>
      <div>kiraciliste</div>
    </div>
  );
};

// demo test
describe("Render Block", () => {
  it("renders home", () => {
    const el = render(<Mockh />);
    expect(el.getByTestId("home")).toBeInTheDocument();
  });
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })
});
