import Tag from './Tag';
import { render, screen } from '@testing-library/react'


describe('Tag', () => {
  test('should render component Tag', () => {
    render(
      <Tag>Hola</Tag>
    )
    expect(screen.getByText('Hola')).toBeDefined()
  })

  test('Should render tag component with preffix', () => {
    render(
      <Tag prefix>Hola</Tag>
    )
    expect(screen.getByText('Hola')).toBeDefined()
  })
})
