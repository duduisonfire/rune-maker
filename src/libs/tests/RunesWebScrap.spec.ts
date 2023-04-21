import '@testing-library/jest-dom';
import RuneWebScrap from '../RunesWebScrap';

describe('RunesWebScrap Lib Tests', () => {
  it('should be get rune list from u.gg with length 11', async () => {
    const webScrap = new RuneWebScrap('aatrox', 'top');
    await webScrap.selectRunes();

    expect(webScrap.runeList.length).toBe(11);
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
