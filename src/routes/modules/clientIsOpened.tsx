import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Async from 'react-async';
import ElectronApi from '../../libs/ElectronApi';

export default function ClientIsOpened({ ...rest }) {
  const electron = new ElectronApi();
  return (
    <Async promiseFn={electron.clientIsOpen}>
      {({ data }) => {
        return data ? <Navigate to="/open" /> : <Outlet {...rest} />;
      }}
    </Async>
  );
}
