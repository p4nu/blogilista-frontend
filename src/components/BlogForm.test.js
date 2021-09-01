import React from 'react'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('The Blog form', () => {
  const createBlog = jest.fn(() => {})
  let component

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlog} />)
  })

  test('Will be displayed as an empty form at start when rendered', () => {
    const titleInput = component.container.querySelector('#title')

    expect(component.container).toHaveTextContent('Title:')
    expect(component.container).toHaveTextContent('Author:')
    expect(component.container).toHaveTextContent('Url:')
    expect(component.container).toHaveTextContent('Create')
    expect(titleInput).toHaveValue('')
  })

  test('Will enter user input to title field', () => {
    const titleInput = component.container.querySelector('#title')

    userEvent.type(titleInput, 'Blog created from test works like charm!')

    expect(titleInput).toHaveValue('Blog created from test works like charm!')
  })

  test('Will enter user input to author field', () => {
    const authorField = component.container.querySelector('#author')

    userEvent.type(authorField, 'Testi Testinen')

    expect(authorField).toHaveValue('Testi Testinen')
  })

  test('Will enter user input to url field', () => {
    const urlField = component.container.querySelector('#url')

    userEvent.type(urlField, 'www.testi.fi')

    expect(urlField).toHaveValue('www.testi.fi')
  })

  test('Will send the right details when a new blog is created', () => {
    const titleInput = component.container.querySelector('#title')
    const authorField = component.container.querySelector('#author')
    const urlField = component.container.querySelector('#url')
    const createButton = component.container.querySelector('button')

    userEvent.type(titleInput, 'Title over here')
    userEvent.type(authorField, 'Testi Testaaja')
    userEvent.type(urlField, 'www.testaaja.vip')

    userEvent.click(createButton)

    expect(createBlog).toHaveBeenCalledWith({
      title: 'Title over here',
      author: 'Testi Testaaja',
      url: 'www.testaaja.vip',
    })
  })
})
