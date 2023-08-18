import React from 'react';
import { render, screen } from '@testing-library/react';
import Invoice from './Invoice';

test('renders learn react link', () => {
  render(<Invoice />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
