/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import LeagueOfLegendsExternalApi from '../LeagueOfLegendsExternalApi';

describe('LeagueOfLegendsExternalApi Lib Tests', () => {
  it('should be return a League of Legends Version', async () => {
    const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
    const lolVersionType = typeof lolVersion === 'string' && lolVersion !== '';

    expect(lolVersionType).toBe(true);
  });

  it('should be return a League of Legends champion name', async () => {
    const lolVersion = await LeagueOfLegendsExternalApi.getLolVersion();
    const championName = await LeagueOfLegendsExternalApi.getChampionName('266', lolVersion);

    expect(championName).toBe('Aatrox');
  });
});
