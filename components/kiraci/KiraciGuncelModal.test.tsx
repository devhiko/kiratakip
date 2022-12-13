/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const Mockguncel = () => {
  return (
    <div data-testid="kgc">
      <div>Ekleme Modalı</div>
    </div>
  );
};

// render
describe("Render Block", () => {
  it("renders kiraciguncelmodal", () => {
    const el = render(<Mockguncel />);
    expect(el.getByTestId("kgc")).toBeInTheDocument();
  });
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })
});
