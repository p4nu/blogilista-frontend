import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('wrong credentials');
    }
  }

  const handleLogout = () => {
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            Username

            <input type="text"
                   value={username}
                   name="Username"
                   onChange={({ target }) => {setUsername(target.value)}}
            />
          </div>

          <div>
            Password

            <input type="password"
                   value={password}
                   name="Password"
                   onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      <button onClick={handleLogout}>Logout</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App
