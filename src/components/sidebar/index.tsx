import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ElectronApi from '../../libs/ElectronApi';

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const electron = new ElectronApi();

  function resetFolderPath() {
    localStorage.removeItem('Lockfile');
    localStorage.removeItem('lockfileData');
    navigate('/');
  }

  function openGithub() {
    electron.openGithub();
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
        onClick={resetFolderPath}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </div>
  );
}
