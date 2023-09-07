import ICreateRunePage from '../interfaces/ICreateRunePage';
import IRunePage from '../interfaces/IRunePage';

export default class RunePageToCreate implements ICreateRunePage {
  name: string;
  primaryStyleId: number;
  subStyleId: number;
  selectedPerkIds: number[];
  current: boolean;

  constructor(runes: IRunePage) {
    this.name = runes.champion;
    this.primaryStyleId = runes.runesId.primaryStyleId;
    this.subStyleId = runes.runesId.subStyleId;
    this.selectedPerkIds = runes.runesId.selectedPerkIds;
    this.current = true;
  }
}
