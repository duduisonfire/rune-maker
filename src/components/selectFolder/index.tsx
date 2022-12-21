import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectFolder(): JSX.Element {
  const navigate = useNavigate();

  function getDir(e: MouseEvent) {
    const file = document.getElementById('file-input') as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    localStorage.setItem('Lockfile', file.files[0].path.replaceAll('LeagueClient.exe', 'lockfile'));

    if (localStorage.getItem('Lockfile') !== '' && localStorage.getItem('Lockfile') !== null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.lockfile.setFile(localStorage.getItem('Lockfile'));
      console.log(localStorage.getItem('Lockfile'));
      navigate('/closed');
    }
  }

  return (
    <form>
      <input type="file" id="file-input"></input>
      <input type="button" value="Choose File" onClick={getDir} />
    </form>
  );
}
