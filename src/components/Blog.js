import React, { useState } from 'react';

const Blog = ({ blog, handleLikeAddition, handleBlogRemoval, user }) => {
  const [viewInfo, setViewInfo] = useState(false);

  const toggleInfoVisibility = () => {
    setViewInfo(!viewInfo);
  };

  const addLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    handleLikeAddition(updatedBlog, blog.id);
  };

  const promptRemoval = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);

    if (result) {
      handleBlogRemoval(blog);
    }
  };

  if (!viewInfo) {
    return (
      <div className='blog'>
        {blog.title} {blog.author}

        <button onClick={toggleInfoVisibility}>View</button>
      </div>
    );
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}

      <button onClick={toggleInfoVisibility}>Hide</button>

      <br/>
      {blog.url}

      <br/>
      Likes: {blog.likes}

      <button onClick={addLike}>Like</button>

      <br/>
      {blog.author}

      <br/>
      {blog.user.username === user.username
        ? <button onClick={promptRemoval}>Remove</button>
        : ''}

    </div>
  );
};

export default Blog;
