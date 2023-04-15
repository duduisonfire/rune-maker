/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function HaveFolder({ ...rest }) {
  if (!localStorage.getItem('Lockfile')) {
    localStorage.setItem('Lockfile', '');
  }

  window.lockfile.setFile(localStorage.getItem('Lockfile'));
  window.lockfile.watch();
  window.lockfile.openHandles();

  const haveFolder = localStorage.getItem('Lockfile') === '';
  return haveFolder ? <Outlet {...rest} /> : <Navigate to="/closed" />;
}
