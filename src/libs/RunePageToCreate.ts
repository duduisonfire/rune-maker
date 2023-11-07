import ICreateRunePage from '../interfaces/ICreateRunePage';
import IRunePage from '../interfaces/IRunePage';

export default class RunePageToCreate implements ICreateRunePage {
  name: string;
  primaryStyleId: number;
  subStyleId: number;
  selectedPerkIds: number[];
  current: boolean;

  constructor(runes: IRunePage, index: number) {
    this.name = runes.champion;
    this.primaryStyleId = runes.runesId[index].primaryStyleId;
    this.subStyleId = runes.runesId[index].subStyleId;
    this.selectedPerkIds = runes.runesId[index].selectedPerkIds;
    this.current = true;
  }
}
