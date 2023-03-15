import React, { useEffect, useState } from 'react';
import IGameData from '../../interfaces/IGameData';
import lolExternalApi from '../../libs/lolExternalApi';
import ItemList from '../itemsList';
import { MatchBoxContainer } from './styles/MatchBoxContainer';

export default function MatchBox(props: { matchData: IGameData; version: string }): JSX.Element {
  const version = props.version;
  const match = props.matchData as IGameData;
  const matchResult = match.participants[0].stats.win ? 'VICTORY' : 'DEFEAT';
  const resultTextColor = match.participants[0].stats.win ? 'text-green-400' : 'text-red-400';
  const resultBorderColor = match.participants[0].stats.win ? 'border-green-400' : 'border-red-400';
  const [championName, setChampionName] = useState('');

  useEffect(() => {
    const getChampionName = async () => {
      const championNameResponse = await lolExternalApi.getChampionName(
        match.participants[0].championId.toString(),
        version,
      );

      setChampionName(championNameResponse);
    };

    getChampionName();
  });

  return (
    <MatchBoxContainer className={`${resultBorderColor}`}>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`}
        alt="Champion"
        className="m-2 col-start-1"
        width={150}
        height={150}
      />
      <h1 className={`col-start-3 self-center ${resultTextColor}`}>{matchResult}</h1>
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
