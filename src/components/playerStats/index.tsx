import React from 'react';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

type Props = {
  player: IPlayerPosGameStats;
};

export default function PlayerStats({ player }: Props) {
  const {
    stats: { kills, deaths, assists },
  } = player;

  return (
    <div className="m-2 self-center flex col-start-11">
      <h6 className="mx-1 text-white">{kills}</h6>
      <h6 className="mx-1 text-white">/</h6>
      <h6 className="mx-1 text-red-600">{deaths}</h6>
      <h6 className="mx-1 text-white">/</h6>
      <h6 className="mx-1 text-white">{assists}</h6>
    </div>
  );
}
