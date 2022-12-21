import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function HaveFolder({ ...rest }) {
  if (!localStorage.getItem('Lockfile')) {
    localStorage.setItem('Lockfile', '');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.lockfile.setFile(localStorage.getItem('Lockfile'));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.lockfile.watch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  window.lockfile.openHandles();

  const haveFolder = localStorage.getItem('Lockfile') === '';
  return haveFolder ? <Outlet {...rest} /> : <Navigate to="/closed" />;
}
