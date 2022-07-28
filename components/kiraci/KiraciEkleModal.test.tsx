/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';


const Mockekle = () => {

  return (
    <div data-testid='kek'>
      <div>
        Ekleme Modalı
      </div>
    </div>
  )
}

// render 
describe('Render Block', () => {
  it('renders kiracieklemodal', () => {
    const el = render(<Mockekle />)
    expect(el.getByTestId('kek')).toBeInTheDocument()
  })
  // it('renders home', () => {
  //   // const el = render(<Home kiracilar={kiracilar} />)
  //   expect(1 + 1).toBe(2)
  // })

})