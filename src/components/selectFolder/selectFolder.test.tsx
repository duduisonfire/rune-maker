/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SelectFolder from '.';
import ElectronApi from '../../libs/ElectronApi';
import { BrowserRouter } from 'react-router-dom';

const electron = new ElectronApi();
const mockElectron = {
  getLeagueOfLegendsPath() {
    localStorage.setItem('Lockfile', 'test');
  },

  setLeagueOfLegendsPath() {
    return localStorage.getItem('Lockfile');
  },

  getLockfileContent() {
    return 'test string';
  },

  clientIsOpen() {
    return true;
  },
};

const mockElectronFalse = {
  getLeagueOfLegendsPath() {
    localStorage.setItem('Lockfile', '');
  },

  setLeagueOfLegendsPath() {
    return localStorage.getItem('Lockfile');
  },

  getLockfileContent() {
    return 'test string';
  },

  clientIsOpen() {
    return false;
  },
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('<SelectFolder />', () => {
  it('should be render a file input', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={electron} />
      </BrowserRouter>,
    );

    const fileInput = screen.getByTitle('file-input');
    expect(fileInput).toBeInTheDocument();
  });

  it('should be render a button input', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={electron} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    expect(buttonInput).toBeInTheDocument();
  });

  it('local storage "Lockfile "should be have "test" value', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectron} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    expect(localStorage.getItem('Lockfile')).toBe('test');
  });

  it('local storage "Lockfile " is not empty', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectron} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    const storage = localStorage.getItem('Lockfile') !== '' && localStorage.getItem('Lockfile') !== null;
    expect(storage).toBe(true);
  });

  it('local storage "lockfileData " is not empty', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectron} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    const storage = localStorage.getItem('lockfileData') !== '' && localStorage.getItem('lockfileData') !== null;
    expect(storage).toBe(true);
  });

  it('navigate should be called', async () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectron} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledTimes(1);
    });
  });

  it('navigate should not to be called', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectronFalse} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    expect(mockNavigate).not.toBeCalled();
  });

  it('button should to be clicked', () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectronFalse} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    const click = fireEvent.click(buttonInput);
    expect(click).toBe(true);
  });

  it("'Lockfile' storage should to be null", () => {
    render(
      <BrowserRouter>
        <SelectFolder electron={mockElectronFalse} />
      </BrowserRouter>,
    );

    const buttonInput = screen.getByRole('button', { name: 'Choose File' });
    fireEvent.click(buttonInput);
    const storage = localStorage.getItem('Lockfile') !== '' && localStorage.getItem('Lockfile') !== null;
    expect(storage).toBe(false);
  });
});
