import React from 'react';
import { MatchBoxContainer } from './styles/matchBoxContainer';

export default function MatchBox(): JSX.Element {
  return (
    <MatchBoxContainer>
      <img
        src="http://ddragon.leagueoflegends.com/cdn/13.5.1/img/champion/Aatrox.png"
        alt="Champion"
        className="m-2 col-start-1"
        width={150}
        height={150}
      />
      <h1 className="col-start-3 self-center text-red-500">DEFEAT</h1>
      <div className="m-2 self-center flex col-start-5">
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
        <img
          className="border-x border-y border-amber-400 mx-1"
          src="https://ddragon.leagueoflegends.com/cdn/13.5.1/img/item/3003.png"
          alt="Item"
          width={150}
          height={150}
        />
      </div>
      <div className="m-2 self-center flex col-start-11">
        <h6 className="mx-1">10</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1 text-red-600">3</h6>
        <h6 className="mx-1">/</h6>
        <h6 className="mx-1">7</h6>
      </div>
    </MatchBoxContainer>
  );
}
