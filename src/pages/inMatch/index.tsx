import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RuneWebScrap from '../../libs/RunesWebScrap';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';
import LeagueOfLegendsClientApi from '../../libs/LeagueOfLegendsClientApi';
import LeagueOfLegendsExternalApi from '../../libs/LeagueOfLegendsExternalApi';
import ILockfileData from '../../interfaces/ILockfileData';

export default function InMatch(): JSX.Element {
  const lockfile = JSON.parse(localStorage.getItem('lockfileData') as string) as ILockfileData;
  const navigate = useNavigate();
  const [champion, setChampion] = useState('');
  const [lolVersion, setLolVersion] = useState('');
  const lolClientApi = useMemo(() => LeagueOfLegendsClientApi.create(lockfile), [lockfile]);

  const QueryMultiple = () => {
    const res1 = useQuery({
      queryKey: ['isClosed'],
      queryFn: async () => {
        const res = await lolClientApi.inChampionSelect();
        return res;
      },
      refetchInterval: 500,
    });
    const res2 = useQuery({
      queryKey: ['inMatch'],
      queryFn: async () => {
        const res = await lolClientApi.inChampionSelect();
        return res;
      },
      refetchInterval: 100,
    });
    return [res1, res2];
  };

  const [{ status: test }, { status, data: match }] = QueryMultiple();

  useEffect(() => {
    if (status === 'error') {
      navigate('/closed');
    }
  });

  useEffect(() => {
    const getLolVersion = async () => {
      const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
      setLolVersion(lolVersion);
    };

    getLolVersion();
  });

  useEffect(() => {
    const getChampionName = async () => {
      const championSelect = match?.data as IChampionSelectRequest;
      const player = championSelect.actions[0][0];
      const champion = await LeagueOfLegendsExternalApi.getChampionName(player.championId.toString(), lolVersion);

      setChampion(champion);
    };

    const getRunes = async () => {
      const webScrapper = new RuneWebScrap(champion, 'mid');
    };

    getChampionName();
    getRunes();
  }, [match?.data, lolVersion, champion]);

  return (
    <div className="col-start-2 col-end-12 grid grid-cols-12">
      {champion === '' ? (
        <div className="self-center col-start-2 col-end-12">
          <h1 className="text-white text-xl">Select your champion</h1>
        </div>
      ) : (
        <div className="self-center col-start-3 col-end-6">
          <img
            src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/img/champion/loading/${champion}_0.jpg`}
            alt="Champion"
            height={450}
          />
        </div>
      )}
    </div>
  );
}
