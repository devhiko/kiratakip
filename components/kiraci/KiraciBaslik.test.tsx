/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { KiraciBaslik } from './KiraciBaslik';



// render 
describe('Render Block', () => {
  it('renders kiracibaslik', () => {
    const el = render(<KiraciBaslik kiracilar={[]} />)
    expect(el.getByTestId('kb')).toBeInTheDocument()
  })
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })

})