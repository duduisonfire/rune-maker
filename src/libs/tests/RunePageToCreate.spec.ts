import '@testing-library/jest-dom';
import RunePageToCreate from '../RunePageToCreate';
import IRunePage from '../../interfaces/IRunePage';

const runesData: IRunePage = {
  champion: 'aatrox',
  lane: 'mid',
  runes: [
    [
      'Domination',
      'Sorcery',
      'Electrocute',
      'Taste of Blood',
      'Eyeball Collection',
      'Ultimate Hunter',
      'Manaflow Band',
      'Transcendence',
      'Attack Speed',
      'Adaptive Force',
      'Armor',
    ],
  ],
  runesId: [
    {
      runePageTitle: 'test',
      primaryStyleId: 8100,
      subStyleId: 8200,
      selectedPerkIds: [8112, 8139, 8138, 8106, 8226, 8210, 5005, 5008, 5002],
    },
  ],
};

const runePage = new RunePageToCreate(runesData, 0);

describe('RunePageToCreate Lib Tests', () => {
  it('runePage.name should be "aatrox"', async () => {
    expect(runePage.name).toBe('aatrox');
  });

  it('runePage.primaryStyleId should be Precision Rune Parse Table Id', async () => {
    const primaryStyleId = runesData.runesId[0].primaryStyleId;
    expect(runePage.primaryStyleId).toBe(primaryStyleId);
  });

  it('runePage.subStyleId should be Resolve Rune Parse Table Id', async () => {
    const subStyleId = runesData.runesId[0].subStyleId;
    expect(runePage.subStyleId).toBe(subStyleId);
  });

  it("runePage.selectedPerkIds should be an array of Rune Parse Table Id's", async () => {
    for (let index = 0; index < runePage.selectedPerkIds.length; index++) {
      const runeId = runesData.runesId[0].selectedPerkIds[index];
      expect(runePage.selectedPerkIds[index]).toBe(runeId);
    }
  });

  it('runePage.current should be "true"', async () => {
    expect(runePage.current).toBe(true);
  });
});
