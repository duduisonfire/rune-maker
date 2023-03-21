import ICreateRunePage from '../interfaces/ICreateRunePage';
import runesParseTable from '../libs/runesParseTable';

export default class RunePageToCreate implements ICreateRunePage {
  name: string;
  primaryStyleId: number;
  subStyleId: number;
  selectedPerkIds: number[] = [];
  current: boolean;

  constructor(champion: string, runes: string[]) {
    this.name = champion;
    this.primaryStyleId = runesParseTable[runes[0]];
    this.subStyleId = runesParseTable[runes[1]];

    for (let index = 2; index < 11; index++) {
      this.selectedPerkIds.push(runesParseTable[runes[index]]);
    }

    this.current = true;
  }
}
