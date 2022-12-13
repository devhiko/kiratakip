/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

const MockKliste = () => {
  return (
    <div data-testid="kliste">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
};

// render
describe("Render Block", () => {
  it("renders kiraciliste", () => {
    const el = render(<MockKliste />);
    expect(el.getByTestId("kliste")).toBeInTheDocument();
  });
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
});
