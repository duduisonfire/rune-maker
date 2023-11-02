import React from 'react';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import { useQuery } from 'react-query';
import ICreateRunePage from '../../interfaces/ICreateRunePage';
import { IAllRunes, ISlot, IRune } from '../../interfaces/IAllRunes';

export function Runes({ runes }: { runes: ICreateRunePage }) {
  const primaryRune = runes.primaryStyleId;
  const secondaryRune = runes.subStyleId;
  const { data } = useQuery('allRunes', LeagueOfLegendsExternalApi.getAllRunes);
  const primaryRuneData = data?.find((rune) => rune.id === primaryRune);
  const secondaryRuneData = data?.find((rune) => rune.id === secondaryRune);

  const secondarySlots = {
    runes: [
      [
        { id: 5008, name: 'Adaptive Force' },
        { id: 5005, name: 'Attack Speed' },
        { id: 5007, name: 'Ability Haste' },
      ],
      [
        { id: 5008, name: 'Adaptive Force' },
        { id: 5002, name: 'Armor' },
        { id: 5003, name: 'Magic Resist' },
      ],
      [
        { id: 5001, name: 'Health Scaling' },
        { id: 5002, name: 'Armor' },
        { id: 5003, name: 'Magic Resist' },
      ],
    ],
  } as unknown as ISlot;

  const renderSlots = (slots: ISlot) => {
    if (!slots) return null;
    const treeRunes = slots.runes.map((rune: IRune) => {
      const selectedRune = runes.selectedPerkIds.includes(rune.id);
      const style = selectedRune ? 'border-2 border-amber-400 rounded-full' : 'filter grayscale';
      return <img className={style} src={`./imgs/perks/${rune.id}.png`} width={50} alt={rune.name} title={rune.name} />;
    });

    return <div className={`flex py-2 `}>{treeRunes}</div>;
  };

  const renderSecondarySlots = (slots: ISlot) => {
    const firstItem = runes.selectedPerkIds[6];
    const secondItem = runes.selectedPerkIds[7];
    const thirdItem = runes.selectedPerkIds[8];

    const firstSlot = slots[0].map((rune: IRune) => {
      const firstSelectedRune = firstItem === rune.id;
      const style = firstSelectedRune ? 'border-2 border-amber-400 rounded-full mx-4' : 'filter grayscale';
      return <img className={style} src={`./imgs/perks/${rune.id}.png`} width={30} alt={rune.name} title={rune.name} />;
    });

    const secondSlot = slots[1].map((rune: IRune) => {
      const secondSelectedRune = secondItem === rune.id;
      const style = secondSelectedRune ? 'border-2 border-amber-400 rounded-full mx-4' : 'filter grayscale';
      return <img className={style} src={`./imgs/perks/${rune.id}.png`} width={30} alt={rune.name} title={rune.name} />;
    });

    const thirdSlot = slots[2].map((rune: IRune) => {
      const thirdSelectedRune = thirdItem === rune.id;
      const style = thirdSelectedRune ? 'border-2 border-amber-400 rounded-full mx-4' : 'filter grayscale';
      return <img className={style} src={`./imgs/perks/${rune.id}.png`} width={30} alt={rune.name} title={rune.name} />;
    });
    return (
      <>
        <div className={`flex py-2 `}>{firstSlot}</div>
        <div className={`flex py-2 `}>{secondSlot}</div>
        <div className={`flex py-2 `}>{thirdSlot}</div>
      </>
    );
  };

  const renderRunes = (runes: IAllRunes | undefined, secondary?: boolean) => {
    if (!runes) return null;
    return (
      <div className="flex-col mx-2 flex items-center">
        <img className="py-4" src={`./imgs/perks/${runes.id}.png`} width={50} alt={runes.name} title={runes.name} />
        {!secondary && renderSlots(runes.slots[0])}
        {renderSlots(runes.slots[1])}
        {renderSlots(runes.slots[2])}
        {renderSlots(runes.slots[3])}
        {secondary && renderSecondarySlots(secondarySlots)}
      </div>
    );
  };

  return (
    <div className="flex m-4">
      {renderRunes(primaryRuneData)}
      {renderRunes(secondaryRuneData, true)}
    </div>
  );
}
