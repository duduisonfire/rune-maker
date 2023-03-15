import React from 'react';
import IGameData from '../../interfaces/IGameData';

export default function ItemList(props: { version: string; match: IGameData }): JSX.Element {
  const version = props.version as string;
  const match = props.match as IGameData;
  const item0 = match.participants[0].stats.item0 === 0 ? '7050' : match.participants[0].stats.item0;
  const item1 = match.participants[0].stats.item1 === 0 ? '7050' : match.participants[0].stats.item1;
  const item2 = match.participants[0].stats.item2 === 0 ? '7050' : match.participants[0].stats.item2;
  const item3 = match.participants[0].stats.item3 === 0 ? '7050' : match.participants[0].stats.item3;
  const item4 = match.participants[0].stats.item4 === 0 ? '7050' : match.participants[0].stats.item4;
  const item5 = match.participants[0].stats.item5 === 0 ? '7050' : match.participants[0].stats.item5;
  const item6 = match.participants[0].stats.item6 === 0 ? '7050' : match.participants[0].stats.item6;

  return (
    <div className="m-2 self-center flex col-start-4">
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item0}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item1}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item2}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item3}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item4}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item5}.png`}
        alt="Item"
      />
      <img
        className="border-x border-y border-amber-400 mx-1"
        src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item6}.png`}
        alt="Item"
      />
    </div>
  );
}
