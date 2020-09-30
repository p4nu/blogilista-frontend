import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []);

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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App
