import React from 'react';
import moment from 'moment';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

type Props = {
  gameMode: string;
  gameDuration: number;
  gameDate: string;
  player: IPlayerPosGameStats;
};

export default function GameInfo({ gameMode, gameDuration, gameDate, player }: Props) {
  const matchResult = player.stats.win ? 'VICTORY' : 'DEFEAT';
  const resultTextColor = player.stats.win ? 'text-blue-400' : 'text-red-600';

  // this is to add space to the game name
  const getGameModeText = (type: string): string => {
    if (type === 'NEXUSBLITZ') return 'NEXUS BLITZ';
    if (type === 'PRACTICETOOL') return 'PRACTICE TOOL';

    return type;
  };

  const minutes = Math.floor(gameDuration / 60);
  const seconds = gameDuration - minutes * 60;
  const gameDurationText = `${minutes}min ${seconds}s`;
  const gameDateText = moment(gameDate).fromNow();

  return (
    <div className="col-start-3 flex-col flex justify-center">
      <h1 className={`${resultTextColor} font-bold text-[12px] whitespace-nowrap`}>{getGameModeText(gameMode)}</h1>
      <h1 className={`text-white font-bold text-[12px]`}>{gameDurationText}</h1>
      <h1 className={`${resultTextColor} font-bold text-[12px]`}>{matchResult}</h1>
      <h1 className={`text-white font-bold text-[12px]`}>{gameDateText}</h1>
    </div>
  );
}
