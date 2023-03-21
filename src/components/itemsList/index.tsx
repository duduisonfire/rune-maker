import React from 'react';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

export default function ItemList(props: { version: string; player: IPLayerPosGameStats }): JSX.Element {
  const version = props.version;
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
      {item.map((item: string) => (
        <img
          className="border-x border-y border-amber-400 mx-1"
          src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
          alt="Item"
        />
      ))}
    </div>
  );
}
