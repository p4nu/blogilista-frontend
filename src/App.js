import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('wrong credentials');
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(
      'loggedBlogListAppUser'
    );
  };

  const handleBlogCreation = async (event) => {
    event.preventDefault();

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');

    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      console.log(exception.message);
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <LoginForm handleLogin={handleLogin}
                   username={username}
                   setUsername={setUsername}
                   password={password}
                   setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      <button onClick={handleLogout}>Logout</button>

      <h2>Create new</h2>

      <BlogForm handleBlogCreation={handleBlogCreation}
                blogTitle={blogTitle}
                setBlogTitle={setBlogTitle}
                blogAuthor={blogAuthor}
                setBlogAuthor={setBlogAuthor}
                blogUrl={blogUrl}
                setBlogUrl={setBlogUrl}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App
