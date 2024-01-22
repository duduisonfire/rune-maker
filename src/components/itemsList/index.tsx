import React from 'react';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import IPlayerStatus from '../../interfaces/IPlayerStats';
import Tooltip from '../tooltip/';

type Props = {
  player: IPlayerPosGameStats;
};

export default function ItemList({ player }: Props): JSX.Element {
  const item: string[] = [];
  const tooltipItem: string[] = [];
  const blankItem = '7050';
  const playerStats = player.stats as IPlayerStatus;
  const allItems = JSON.parse(localStorage.getItem('allItems') as string);

  for (let index = 0; index < 7; index++) {
    const itemIndex = `item${index}`;
    const itemId = playerStats[itemIndex];

    if (itemId === 0) {
      item.push(blankItem);
      tooltipItem.push('');
    } else {
      item.push(`${playerStats[`item${index}`]}`);
      if (allItems[Number(itemId)]) {
        tooltipItem.push(
          `<itemName>${allItems[Number(itemId)].name}</itemName> <br />${allItems[Number(itemId)].description}`,
        );
      }
    }
  }

  const itemImage = (item: string): string => {
    return `https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/item/${item}.png`;
  };

  return (
    <div className="grid my-2 grid-cols-4 col-start-5 col-end-8 gap-[2px] ">
      <Tooltip tooltip={tooltipItem[0]}>
        <div className="...">
          <img src={itemImage(item[0])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[1]}>
        <div className="...">
          <img src={itemImage(item[1])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[2]}>
        <div className="...">
          <img src={itemImage(item[2])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[6]}>
        <div className="...">
          <img src={itemImage(item[6])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[3]}>
        <div className="...">
          <img src={itemImage(item[3])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[4]}>
        <div className="...">
          <img src={itemImage(item[4])} alt="Item" />
        </div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[5]}>
        <div className="...">
          <img src={itemImage(item[5])} alt="Item" />
        </div>
      </Tooltip>

      <div className="..." />
    </div>
  );
}
