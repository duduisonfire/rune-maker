import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import ILockfileData from '../../interfaces/ILockfileData';
import GetRunesApi from '../../libs/GetRunesApi';
import RunePageToCreate from '../../libs/RunePageToCreate';
import ICreateRunePage from '../../interfaces/ICreateRunePage';
import Runes from '../../components/runes';

export default function InMatch(): JSX.Element {
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
  const navigate = useNavigate();
  const [champion, setChampion] = useState('');
  const [lane, setLane] = useState('');
  const [runes, setRunes] = useState<ICreateRunePage>();
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(lockfile), [lockfile]);
  const runePageApi = useMemo(() => new GetRunesApi(), []);

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inChampionSelect();

        const championSelectStage = res?.data as IChampionSelectRequest;
        const championId = lolClientApi.getChampionId(championSelectStage);
        const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
        const championName = await LeagueOfLegendsExternalApi.getChampionName(championId.toString(), lolVersion);

        if (championName !== champion) {
          setLane(lolClientApi.getLane(championSelectStage));
          setChampion(championName);
          const runes = await runePageApi.getChampionRunes(championName, lane);
          const runePage = new RunePageToCreate(runes);
          setRunes(runePage);

          let successInGetRunePage = false;

          while (!successInGetRunePage) {
            const currentRunePage = await lolClientApi.getCurrentRunePage();

            if (currentRunePage instanceof Error) {
              continue;
            } else {
              successInGetRunePage = true;
            }

            await lolClientApi.deleteCurrentRunePage(currentRunePage.id);
            await lolClientApi.createCurrentRunePage(runePage);
          }
        }

        return res;
      },
      refetchInterval: 500,
    });

    if (res1.status === 'error') navigate('/closed');
  };

  QueryMultiple();

  return (
    <div className="col-start-2 col-end-13 grid grid-cols-12">
      {champion === '' ? (
        <div className="self-center col-start-5 col-end-12">
          <h1 className="text-white text-xl">Select your champion</h1>
        </div>
      ) : (
        <div className="flex mx-2 self-center col-start-1 col-end-13">
          <img
            src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/img/champion/loading/${champion}_0.jpg`}
            alt={`Champion: ${champion}`}
            height={450}
          />
          {runes !== undefined && <Runes runes={runes} />}
        </div>
      )}
    </div>
  );
}
