import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();

  function resetFolderLocation() {
    localStorage.removeItem('Lockfile');
    localStorage.removeItem('lockfileData');
    navigate('/');
  }

  return (
    <div className="bg-black h-screen flex justify-center">
      <div
        title="Reset Folder"
        className="p-4 px-6 self-end text-white text-2xl hover:bg-opacity-70 hover:bg-gray-800 cursor-pointer"
        onClick={resetFolderLocation}
      >
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
    </div>
  );
}
