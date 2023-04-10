import React from 'react';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

export default function ItemList(props: { player: IPLayerPosGameStats }): JSX.Element {
  const player = props.player;
  const item: string[] = [];

  for (let index = 0; index < 7; index++) {
    if (player.stats[`item${index}`] === 0) {
      item.push('7050');
    } else {
      item.push(`${player.stats[`item${index}`]}`);
    }
  }

  return (
    <div className="m-2 self-center flex col-start-4">
      {item.map((item: string, index) => (
        <img
          key={index}
          className="border-x border-y border-amber-400 mx-1"
          src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/item/${item}.png`}
          alt="Item"
        />
      ))}
    </div>
  );
}
