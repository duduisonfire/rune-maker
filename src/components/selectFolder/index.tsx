import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IElectronApi from '../../interfaces/IElectronApi';

export default function SelectFolder(props: { electron: IElectronApi }): JSX.Element {
  const navigate = useNavigate();
  const electron = props.electron;

  async function getDir(e: MouseEvent) {
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
    <form>
      <input title="file-input" type="file" id="file-input"></input>
      <input type="button" value="Choose File" onClick={getDir} />
    </form>
  );
}
