import ICreateRunePage from '../interfaces/ICreateRunePage';
import IRuneWebScrap from '../interfaces/IRuneWebScrap';
import runesParseTable from './runesParseTable';
export default class RunePageToCreate implements ICreateRunePage {
  name: string;
  primaryStyleId: number;
  subStyleId: number;
  selectedPerkIds: number[] = [];
  current: boolean;

  constructor(runes: IRuneWebScrap) {
    this.name = runes.champion;
    this.primaryStyleId = runesParseTable[runes.runeList[0]];
    this.subStyleId = runesParseTable[runes.runeList[1]];

    for (let index = 2; index < 11; index++) {
      this.selectedPerkIds.push(runesParseTable[runes.runeList[index]]);
    }

    this.current = true;
  }
}
