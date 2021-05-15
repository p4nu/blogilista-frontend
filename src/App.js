import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showMessage = (message, timeout = 5000) => {
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

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
      showMessage('wrong credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(
      'loggedBlogListAppUser'
    );
  };

  const handleBlogCreation = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      formRef.current.toggleVisibility();

      showMessage(`A new blog ${blog.title} by ${blog.author} added!`);
    } catch (exception) {
      showMessage(exception.message);
    }
  };

  const handleLikeAddition = async (blog, blogId) => {
    try {
      const returnedBlog = await blogService.update(blog, blogId);

      const formattedBlog = {
        ...returnedBlog,
        user: {
          ...user,
        },
      };

      const updatedBlogs = blogs.map(blog => {
        if (formattedBlog.id === blog.id) {
          return formattedBlog;
        }
        return blog;
      });

      setBlogs(updatedBlogs);
    } catch (exception) {
      showMessage(exception.message);
    }
  };

  const handleBlogRemoval = async (removableBlog) => {
    try {
      await blogService.remove(removableBlog);

      const updatedBlogs = blogs.filter(blog => {
        return blog.id !== removableBlog.id;
      });

      setBlogs(updatedBlogs);
      showMessage(`${removableBlog.title} by ${removableBlog.author} deleted successfully!`);
    } catch (exception) {
      showMessage(exception.message);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message}/>

        <LoginForm handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message}/>

      <div>
        {user.name} logged in

        <button onClick={handleLogout}>Logout</button>
      </div>

      <Toggleable buttonLabel='New note' ref={formRef}>
        <BlogForm createBlog={handleBlogCreation}/>
      </Toggleable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id}
            blog={blog}
            handleLikeAddition={handleLikeAddition}
            handleBlogRemoval={handleBlogRemoval}
            user={user}
          />
        )}
    </div>
  );
};

export default App;
