interface IRune {
  id: number;
  key: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

interface ISlot {
  runes: IRune[];
}
interface IAllRunes {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: ISlot[];
}

export { IAllRunes, ISlot, IRune };
