import '@testing-library/jest-dom';
import RuneWebScrap from '../RunesWebScrap';

describe('RunesWebScrap Lib Tests', () => {
  it('should be get rune list from u.gg', async () => {
    const webScrap = new RuneWebScrap('aatrox', 'top');
    await webScrap.selectRunes();

    expect(webScrap.runeList[0]).toBe('Precision');
    expect(webScrap.runeList[1]).toBe('Resolve');
    expect(webScrap.runeList[2]).toBe('Conqueror');
    expect(webScrap.runeList[3]).toBe('Triumph');
    expect(webScrap.runeList[4]).toBe('Legend: Tenacity');
    expect(webScrap.runeList[5]).toBe('Last Stand');
    expect(webScrap.runeList[6]).toBe('Second Wind');
    expect(webScrap.runeList[7]).toBe('Revitalize');
    expect(webScrap.runeList[8]).toBe('Adaptive Force');
    expect(webScrap.runeList[9]).toBe('Adaptive Force');
    expect(webScrap.runeList[10]).toBe('Magic Resist');
  });

  it('RuneWebScrap.runeList should be an array with length "11"', async () => {
    const webScrap = new RuneWebScrap('aatrox', 'top');
    await webScrap.selectRunes();

    expect(webScrap.runeList.length).toBe(11);
  });

  it('RuneWebScrap.champion should be "aatrox"', async () => {
    const webScrap = new RuneWebScrap('aatrox', 'top');
    await webScrap.selectRunes();

    expect(webScrap.champion).toBe('aatrox');
  });

  it('RuneWebScrap.lane should be "top"', async () => {
    const webScrap = new RuneWebScrap('aatrox', 'top');
    await webScrap.selectRunes();

    expect(webScrap.lane).toBe('top');
  });
});
