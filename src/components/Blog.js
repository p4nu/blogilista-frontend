import React, { useState } from 'react'

const Blog = ({
  blog = new Blog(),
  handleLikeAddition,
  handleBlogRemoval,
  user,
}) => {
  const [viewInfo, setViewInfo] = useState(false)

  const toggleInfoVisibility = () => {
    setViewInfo(!viewInfo)
  }

  const addLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    handleLikeAddition(updatedBlog, blog.id)
  }

  const promptRemoval = () => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )

    if (result) {
      handleBlogRemoval(blog)
    }
  }

  if (!viewInfo) {
    return (
      <div className='blog'>
        {blog.title} {blog.author}
        <button id='view-button' onClick={toggleInfoVisibility}>
          View
        </button>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleInfoVisibility}>Hide</button>
      <br />
      {blog.url}
      <br />
      Likes: <span className='like-count'>{blog.likes}</span>
      <button id='like-button' onClick={addLike}>
        Like
      </button>
      <br />
      {blog.author}
      <br />
      {blog.user.username === user.username ? (
        <button id='remove-button' onClick={promptRemoval}>
          Remove
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
