import React from 'react';

const BlogForm = ({handleBlogCreation, blog, setBlog}) => {
  const handleTitleChange = ({ target }) => {
    const newBlog = {
      ...blog,
      title: target.value,
    };

    setBlog(newBlog);
  }

  const handleAuthorChange = ({ target }) => {
    const newBlog = {
      ...blog,
      author: target.value,
    };

    setBlog(newBlog);
  }

  const handleUrlChange = ({ target }) => {
    const newBlog = {
      ...blog,
      url: target.value,
    };

    setBlog(newBlog);
  }

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={handleBlogCreation}>
        <div>
          Title:

          <input type="text"
                 value={blog.title}
                 name="BlogTitle"
                 onChange={handleTitleChange}
          />
        </div>

        <div>
          Author:

          <input type="text"
                 value={blog.author}
                 name="BlogAuthor"
                 onChange={handleAuthorChange}
          />
        </div>

        <div>
          Url:

          <input type="text"
                 value={blog.url}
                 name="BlogUrl"
                 onChange={handleUrlChange}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
