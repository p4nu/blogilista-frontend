import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('The blog', () => {
  let blog = {};
  let user = {};

  beforeAll(() => {
    user = {
      username: 'test'
    };
    blog = {
      user: {
        username: user.username
      },
      title: 'test',
      author: 'testinen',
      url: 'google.com',
      likes: 10,
    };
  });

  test('will show title and author only when rendering content the first time', () => {
    const component = render(
      <Blog blog={blog}/>
    );

    expect(component.container).toHaveTextContent('test');
    expect(component.container).toHaveTextContent('testinen');
    expect(component.container).not.toHaveTextContent('google.com');
    expect(component.container).not.toHaveTextContent('Likes: 10');
  });

  test('will show url and likes after pressing the View-button', () => {
    const component = render(
      <Blog
        blog={blog}
        user={user}
      />
    );

    userEvent.click(screen.getByText('View'));

    expect(component.container).toHaveTextContent('google.com');
    expect(component.container).toHaveTextContent('Likes: 10');
  });

  test('will call like function twice when like button is pressed two times', () => {
    const addLike = jest.fn();

    render(
      <Blog
        blog={blog}
        user={user}
        handleLikeAddition={addLike}
      />
    );

    userEvent.click(screen.getByText('View'));
    userEvent.dblClick(screen.getByText('Like'));

    expect(addLike).toHaveBeenCalledTimes(2);
  });
});
