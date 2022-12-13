/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const Mocksil = () => {
  return (
    <div data-testid="ks">
      <div>Silme Modalı</div>
    </div>
  );
};

// render
describe("Render Block", () => {
  it("renders kiracisilmodal", () => {
    const el = render(<Mocksil />);
    expect(el.getByTestId("ks")).toBeInTheDocument();
  });
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })
});
