import React, {useState, useEffect, useRef} from 'react';
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
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [message, setMessage] = useState(null);
  const formRef = useRef();

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
      setMessage('wrong credentials');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
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

    setBlog({
      title: '',
      author: '',
      url: '',
    });

    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      formRef.current.toggleVisibility();

      setMessage(`A new blog ${blog.title} by ${blog.author} added!`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.message);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

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
    )
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
        <BlogForm handleBlogCreation={handleBlogCreation}
                  blog={blog}
                  setBlog={setBlog}
        />
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App
