/**
 * @jest-environment jsdom
 */

/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Sidebar from '.';
import { BrowserRouter } from 'react-router-dom';

describe('<SelectFolder />', () => {
  it('should be render a sidebar', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>,
    );

    const sidebar = screen.getByTitle('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
});
