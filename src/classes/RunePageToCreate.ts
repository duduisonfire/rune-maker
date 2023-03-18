import ICreateRunePage from '../interfaces/ICreateRunePage';
import runesParseTable from '../libs/runesParseTable';

export default class RunePageToCreate implements ICreateRunePage {
  name: string;
  primaryStyleId: number;
  subStyleId: number;
  selectedPerkIds: number[];
  current: boolean;

  constructor(champion: string, runes: string[]) {
    this.name = champion;
    this.primaryStyleId = runesParseTable[runes[0]];
    this.subStyleId = runesParseTable[runes[1]];
    this.selectedPerkIds = [
      runesParseTable[runes[2]],
      runesParseTable[runes[3]],
      runesParseTable[runes[4]],
      runesParseTable[runes[5]],
      runesParseTable[runes[6]],
      runesParseTable[runes[7]],
      runesParseTable[runes[8]],
      runesParseTable[runes[9]],
      runesParseTable[runes[10]],
    ];

    this.current = true;
  }
}
