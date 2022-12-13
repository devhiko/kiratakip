/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const Mockkart = () => {
  return <div data-testid="kk">Kiraci Bilgileri</div>;
};

// render
describe("Render Block", () => {
  it("renders kiracikart", () => {
    const el = render(<Mockkart />);
    expect(el.getByTestId("kk")).toBeInTheDocument();
  });
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })
});
