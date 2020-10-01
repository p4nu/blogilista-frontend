import React, {useState} from 'react'
import blogService from '../services/blogs';

const Blog = ({ pBlog, setMessage }) => {
  const [viewInfo, setViewInfo] = useState(false);
  const [blog, setBlog] = useState(pBlog);

  const toggleInfoVisibility = () => {
    setViewInfo(!viewInfo);
  }

  const addLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const returnedBlog = await blogService.update(updatedBlog, blog.id);

      setBlog(returnedBlog);
    } catch (exception) {
      setMessage(exception.message);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
    </div>
  )
};

export default Blog
