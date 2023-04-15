/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ElectronApi from '../../libs/ElectronApi';

export default function HaveFolder({ ...rest }) {
  if (!localStorage.getItem('Lockfile')) {
    localStorage.setItem('Lockfile', '');
  }

  const electron = new ElectronApi();
  electron.setLeagueOfLegendsPath();
  electron.watch();
  electron.openHandle();

  const haveFolder = localStorage.getItem('Lockfile') === '';
  return haveFolder ? <Outlet {...rest} /> : <Navigate to="/closed" />;
}
