import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Async from 'react-async';
import { isOpen } from '../../libs/isOpen';

export default function ClientIsOpened({ ...rest }) {
  return (
    <Async promiseFn={isOpen}>
      {({ data }) => {
        return data ? <Navigate to="/open" /> : <Outlet {...rest} />;
      }}
    </Async>
  );
}
