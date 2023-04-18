import '@testing-library/jest-dom';
import RunePageToCreate from '../RunePageToCreate';
import IRuneWebScrap from '../../interfaces/IRuneWebScrap';
import runesParseTable from '../runesParseTable';

const runeWebScrap: IRuneWebScrap = {
  runeList: [
    'Precision',
    'Resolve',
    'Conqueror',
    'Triumph',
    'Legend: Tenacity',
    'Last Stand',
    'Second Wind',
    'Revitalize',
    'Adaptive Force',
    'Adaptive Force',
    'Magic Resist',
  ],
  champion: 'aatrox',
  lane: 'top',
};

const runePage = new RunePageToCreate(runeWebScrap);

describe('RunePageToCreate Lib Tests', () => {
  it('runePage.name should be "aatrox"', async () => {
    expect(runePage.name).toBe('aatrox');
  });

  it('runePage.primaryStyleId should be Precision Rune Parse Table Id', async () => {
    const runeId = runesParseTable['Precision'];
    expect(runePage.primaryStyleId).toBe(runeId);
  });

  it('runePage.subStyleId should be Resolve Rune Parse Table Id', async () => {
    const runeId = runesParseTable['Resolve'];
    expect(runePage.subStyleId).toBe(runeId);
  });

  it("runePage.selectedPerkIds should be an array of Rune Parse Table Id's", async () => {
    for (let index = 2; index < runePage.selectedPerkIds.length; index++) {
      const runeId = runesParseTable[runeWebScrap.runeList[index]];
      expect(runePage.selectedPerkIds[index - 2]).toBe(runeId);
    }
  });
});
