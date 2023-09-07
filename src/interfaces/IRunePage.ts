export default interface IRunePage {
  champion: string;
  lane: string;
  runes: string[];
  runesId: {
    primaryStyleId: number;
    subStyleId: number;
    selectedPerkIds: number[];
  };
}
