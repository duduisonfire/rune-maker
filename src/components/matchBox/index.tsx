import React, { useEffect, useState } from 'react';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import ItemList from '../itemsList';
import SummonerSpells from '../summonerSpells';
import { MatchBoxContainer } from './styles/MatchBoxContainer';

export default function MatchBox(props: { version: string; player: IPLayerPosGameStats }): JSX.Element {
  const version = props.version;
  const player = props.player;
  const matchResult = player.stats.win ? 'VICTORY' : 'DEFEAT';
  const resultTextColor = player.stats.win ? 'text-green-400' : 'text-red-400';
  const resultBorderColor = player.stats.win ? 'border-green-400' : 'border-red-400';
  const [champion, setChampion] = useState('');
  const summonerSpells = {
    firstSummonerSpell: player.spell1Id,
    secondSummonerSpell: player.spell2Id,
  };

  useEffect(() => {
    const getChampionName = async () => {
      const championNameResponse = await LeagueOfLegendsExternalApi.getChampionName(
        player.championId.toString(),
        version,
      );

      setChampion(championNameResponse);
    };

    getChampionName();
  });

  return (
    <MatchBoxContainer className={`${resultBorderColor}`}>
      <img
        src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/champion/${champion}.png`}
        alt="Champion"
        className="m-4 col-start-1"
        width={150}
        height={150}
      />
      <SummonerSpells summonerSpells={summonerSpells} />
      <h1 className={`col-start-3 self-center ${resultTextColor}`}>{matchResult}</h1>
      <ItemList player={player} />
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
