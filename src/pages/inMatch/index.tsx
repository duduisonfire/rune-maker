import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import ILockfileData from '../../interfaces/ILockfileData';
import GetRunesApi from '../../libs/GetRunesApi';
import RunePageToCreate from '../../libs/RunePageToCreate';
import IRunePage from '../../interfaces/IRunePage';

export default function InMatch(): JSX.Element {
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
  const navigate = useNavigate();
  const [champion, setChampion] = useState('');
  const [, setRunes] = useState<IRunePage>();
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(lockfile), [lockfile]);
  const runePageApi = useMemo(() => new GetRunesApi(), []);

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inChampionSelect();

        const championSelectStage = res?.data as IChampionSelectRequest;
        const player = championSelectStage.actions[0][0];
        const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
        const championToSet = await LeagueOfLegendsExternalApi.getChampionName(
          player.championId.toString(),
          lolVersion,
        );

        if (championToSet !== champion) {
          setChampion(championToSet);
          const lane = lolClientApi.getLane(championSelectStage);
          const runes = await runePageApi.getChampionRunes(championToSet, lane);
          setRunes(runes);
          const runePage = new RunePageToCreate(runes);
          const currentRunePage = await lolClientApi.getCurrentRunePage();
          await lolClientApi.deleteCurrentRunePage(currentRunePage.id);
          await lolClientApi.createCurrentRunePage(runePage);
        }

        return res;
      },
      refetchInterval: 500,
    });

    if (res1.status === 'error') navigate('/closed');
  };

  QueryMultiple();

  return (
    <div className="col-start-2 col-end-12 grid grid-cols-12">
      {champion === '' ? (
        <div className="self-center col-start-2 col-end-12">
          <h1 className="text-white text-xl">Select your champion</h1>
        </div>
      ) : (
        <div className="self-center col-start-2 col-end-5">
          <img
            src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/img/champion/loading/${champion}_0.jpg`}
            alt={`Champion: ${champion}`}
            height={450}
          />
        </div>
      )}
    </div>
  );
}
