import React from 'react';

export default function SummonerSpells({
  summonerSpells: { firstSummonerSpell, secondSummonerSpell },
}: {
  summonerSpells: {
    firstSummonerSpell: number;
    secondSummonerSpell: number;
  };
}) {
  return (
    <div className="flex-col m-4 items-center justify-center">
      <img
        alt="first summoner spell"
        src={`https://lolcdn.darkintaqt.com/cdn/spells/${firstSummonerSpell}`}
        className="border-x border-y border-amber-200 mx-1"
      />
      <img
        alt="second summoner spell"
        src={`https://lolcdn.darkintaqt.com/cdn/spells/${secondSummonerSpell}`}
        className="border-x border-y border-amber-200 mx-1"
      />
    </div>
  );
}
