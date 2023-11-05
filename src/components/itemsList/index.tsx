import React from 'react';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import IPlayerStatus from '../../interfaces/IPlayerStats';

type Props = {
  player: IPlayerPosGameStats;
};

export default function ItemList({ player }: Props): JSX.Element {
  const item: string[] = [];
  const blankItem = '7050';
  const playerStats = player.stats as IPlayerStatus;

  for (let index = 0; index < 7; index++) {
    const itemId = `item${index}`;
    if (playerStats[itemId] === 0) {
      item.push(blankItem);
    } else {
      item.push(`${playerStats[`item${index}`]}`);
    }
  }

  const itemImage = (item: string): string => {
    return `https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/item/${item}.png`;
  };

  return (
    <div className="grid my-2 grid-cols-4 col-start-5 col-end-8 gap-[2px] ">
      <div className="...">
        <img src={itemImage(item[0])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[1])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[2])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[6])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[3])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[4])} alt="Item" />
      </div>
      <div className="...">
        <img src={itemImage(item[5])} alt="Item" />
      </div>
      <div className="..." />
    </div>
  );
}
