export default interface IGetRunePage {
  autoModifiedSelections: [];
  current: boolean;
  id: number;
  isActive: boolean;
  isDeletable: boolean;
  isEditable: boolean;
  isRecommendationOverride: boolean;
  isTemporary: boolean;
  isValid: boolean;
  lastModified: number;
  name: string;
  order: number;
  primaryStyleId: number;
  recommendationChampionId: number;
  recommendationIndex: number;
  runeRecommendationId: '';
  selectedPerkIds: number;
  subStyleId: number;
}
