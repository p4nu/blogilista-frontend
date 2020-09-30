import React from 'react';

const BlogForm = ({ handleBlogCreation, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl }) => (
  <form onSubmit={handleBlogCreation}>
    <div>
      Title:

      <input type="text"
             value={blogTitle}
             name="BlogTitle"
             onChange={({ target }) => setBlogTitle(target.value)}
      />
    </div>

    <div>
      Author:

      <input type="text"
             value={blogAuthor}
             name="BlogAuthor"
             onChange={({ target }) => setBlogAuthor(target.value)}
      />
    </div>

    <div>
      Url:

      <input type="text"
             value={blogUrl}
             name="BlogUrl"
             onChange={({ target }) => setBlogUrl(target.value)}
      />
    </div>

    <button type="submit">Create</button>
  </form>
);

export default BlogForm;
