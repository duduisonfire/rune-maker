import React, { useEffect, useState } from 'react';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import ItemList from '../itemsList';
import SummonerSpells from '../summonerSpells';
import { MatchBoxContainer } from './styles/MatchBoxContainer';
import GameInfo from '../gameInfo';
import PlayerStats from '../playerStats';

type Props = {
  version: string;
  player: IPlayerPosGameStats;
  gameMode: string;
  gameDuration: number;
  gameDate: string;
};

export default function MatchBox({ version, player, gameMode, gameDuration, gameDate }: Props): JSX.Element {
  const resultBgColor = player.stats.win ? 'bg-[#1E2B5E] hover:bg-[#1C234B]' : 'bg-[#3E223B] hover:bg-[#311F3A]';
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
    <MatchBoxContainer data-testid="matchbox-container" className={`${resultBgColor}`}>
      <img
        src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/champion/${champion}.png`}
        alt="Champion"
        className="m-4 col-start-1 "
        width={150}
        height={150}
      />
      <SummonerSpells summonerSpells={summonerSpells} />
      <GameInfo player={player} gameMode={gameMode} gameDuration={gameDuration} gameDate={gameDate} />
      <ItemList player={player} />
      <PlayerStats player={player} />
    </MatchBoxContainer>
  );
}
