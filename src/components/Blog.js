import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [viewInfo, setViewInfo] = useState(false);

  const toggleInfoVisibility = () => {
    setViewInfo(!viewInfo);
  }

  const addLike = () => {

  }

  if (!viewInfo) {
    return (
      <div className='blog'
           onClick={toggleInfoVisibility}
      >
        {blog.title} {blog.author}

        <button onClick={toggleInfoVisibility}>View</button>
      </div>
    );
  }

  return (
    <div className='blog'
         onClick={toggleInfoVisibility}
    >
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
