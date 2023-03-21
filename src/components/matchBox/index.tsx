import React, { useEffect, useState } from 'react';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import lolExternalApi from '../../libs/lolExternalApi';
import ItemList from '../itemsList';
import { MatchBoxContainer } from './styles/MatchBoxContainer';

export default function MatchBox(props: { version: string; player: IPLayerPosGameStats }): JSX.Element {
  const version = props.version;
  const player = props.player;
  const matchResult = player.stats.win ? 'VICTORY' : 'DEFEAT';
  const resultTextColor = player.stats.win ? 'text-green-400' : 'text-red-400';
  const resultBorderColor = player.stats.win ? 'border-green-400' : 'border-red-400';
  const [championName, setChampionName] = useState('');

  useEffect(() => {
    const getChampionName = async () => {
      const championNameResponse = await lolExternalApi.getChampionName(player.championId.toString(), version);

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
      <ItemList version={version} player={player} />
      <div className="m-2 self-center flex col-start-11">
        <h6 className="mx-1">{player.stats.kills}</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1 text-red-600">{player.stats.deaths}</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1">{player.stats.assists}</h6>
      </div>
    </MatchBoxContainer>
  );
}
