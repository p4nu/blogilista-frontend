import React, {useState} from 'react'

const Blog = ({ blog, handleLikeAddition }) => {
  const [viewInfo, setViewInfo] = useState(false);

  const toggleInfoVisibility = () => {
    setViewInfo(!viewInfo);
  }

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
    </div>
  )
};

export default Blog
