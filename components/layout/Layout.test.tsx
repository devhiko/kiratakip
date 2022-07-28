/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Layout } from './Layout';

// demo test
describe('Render', () => {
  it('renders layout', () => {
    const lyt = render(<Layout children />)
    expect(lyt.getByTestId('lyt')).toBeInTheDocument()
  })
})