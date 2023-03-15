import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IGameData from '../../interfaces/IGameData';
import ItemList from '../itemsList';
import { MatchBoxContainer } from './styles/matchBoxContainer';

export default function MatchBox(props: { matchData: IGameData }): JSX.Element {
  const [version, setVersion] = useState('');
  const match = props.matchData as IGameData;
  const matchResult = match.participants[0].stats.win ? 'VICTORY' : 'DEFEAT';
  const resultTextColor = match.participants[0].stats.win ? 'text-green-400' : 'text-red-400';
  const resultBorderColor = match.participants[0].stats.win ? 'border-green-400' : 'border-red-400';

  useEffect(() => {
    const getLolVersion = async () => {
      const version = (await (
        await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      ).data) as Array<string>;
      setVersion(version[0]);
    };

    getLolVersion();
  }, []);

  return (
    <MatchBoxContainer className={`${resultBorderColor}`}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Aatrox.png`}
        alt="Champion"
        className="m-2 col-start-1"
        width={150}
        height={150}
      />
      <h1 className={`col-start-2 self-center ${resultTextColor}`}>{matchResult}</h1>
      <ItemList match={match} version={version} />
      <div className="m-2 self-center flex col-start-11">
        <h6 className="mx-1">{match.participants[0].stats.kills}</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1 text-red-600">{match.participants[0].stats.deaths}</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1">{match.participants[0].stats.assists}</h6>
      </div>
    </MatchBoxContainer>
  );
}
