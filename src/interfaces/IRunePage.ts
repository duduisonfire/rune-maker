export default interface IRunePage {
  champion: string;
  lane: string;
  runes: string[][];
  runesId: {
    runePageTitle: string;
    primaryStyleId: number;
    subStyleId: number;
    selectedPerkIds: number[];
  }[];
}
