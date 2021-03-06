import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title, author, url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          Title:

          <input type="text"
            value={title}
            name="BlogTitle"
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div>
          Author:

          <input type="text"
            value={author}
            name="BlogAuthor"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>

        <div>
          Url:

          <input type="text"
            value={url}
            name="BlogUrl"
            onChange={event => setUrl(event.target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default BlogForm;
