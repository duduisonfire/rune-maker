import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
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
  function openGithub() {
    window.open('https://github.com/duduisonfire/rune-maker');
  }

  return (
    <div title="sidebar" className="bg-black h-screen flex-col flex">
      <div
        title="Github"
        className="p-4 px-6 text-white text-2xl hover:bg-opacity-70 hover:bg-gray-800 cursor-pointer"
        onClick={openGithub}
      >
        <FontAwesomeIcon icon={faGithub} />
      </div>
      <div
        title="Reset Folder"
        className="p-4 px-6 text-white mt-auto text-2xl hover:bg-opacity-70 hover:bg-gray-800 cursor-pointer"
        onClick={resetFolderLocation}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </div>
  );
}
