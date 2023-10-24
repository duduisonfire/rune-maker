import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IElectronApi from '../../interfaces/IElectronApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function SelectFolder(props: { electron: IElectronApi }): JSX.Element {
  const navigate = useNavigate();
  const electron = props.electron;

  async function getDir(e: MouseEvent) {
    e.preventDefault();
    const file = document.getElementById('file-input') as HTMLElement;
    electron.getLeagueOfLegendsPath(file);

    if (localStorage.getItem('Lockfile') !== '' && localStorage.getItem('Lockfile') !== null) {
      electron.setLeagueOfLegendsPath();
      const lockfileData = await electron.getLockfileContent();
      localStorage.setItem('lockfileData', JSON.stringify(lockfileData));
      navigate('/closed');
    }
  }

  return (
    <form className="w-full flex flex-wrap justify-center">
      <input
        className="text-slate-500 file:mr-4
        file:py-2 file:px-4 file:rounded-full
        file:border-0 file:bg-violet-50
      file:text-violet-700 hover:file:bg-violet-100
        cursor-pointer mx-28"
        title="file-input"
        type="file"
        id="file-input"
      ></input>
      <button
        className="flex justify-center w-44 m-6 my-10 text-xl text-violet-600
        hover:text-violet-700 rounded-full bg-gray-200 hover:bg-gray-400"
        onClick={getDir}
      >
        <p className="mx-2">CONFIRM</p>
        <p>
          <FontAwesomeIcon icon={faCheck} />
        </p>
      </button>
    </form>
  );
}
