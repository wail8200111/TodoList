import React from 'react';
import { render } from '@testing-library/react';
import { TodoList }  from '../src/Components/TodoList'; 

const task = {
  id: 1,
  title: 'Learn TypeScript',
  description: 'Study TypeScript basics',
  completed: false,
};

describe('TodoList component', () => {
  it('renders TodoList component', () => {
    render(<TodoList/>); 
    expect(true).toBeTruthy()
  });
});
