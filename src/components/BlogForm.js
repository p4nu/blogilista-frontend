import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id='title'
            type='text'
            value={title}
            name='BlogTitle'
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div>
          Author:
          <input
            id='author'
            type='text'
            value={author}
            name='BlogAuthor'
            onChange={event => setAuthor(event.target.value)}
          />
        </div>

        <div>
          Url:
          <input
            id='url'
            type='text'
            value={url}
            name='BlogUrl'
            onChange={event => setUrl(event.target.value)}
          />
        </div>

        <button id='create-button' type='submit'>
          Create
        </button>
      </form>
    </>
  )
}

export default BlogForm
