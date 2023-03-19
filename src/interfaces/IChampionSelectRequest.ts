export default interface IChampionSelectRequest {
  actions: [
    [
      {
        actorCellId: number;
        championId: number;
        completed: boolean;
        id: number;
        isAllyAction: boolean;
        isInProgress: boolean;
        pickTurn: number;
        type: string;
      },
    ],
  ];
  allowBattleBoost: boolean;
  allowDuplicatePicks: boolean;
  allowLockedEvents: boolean;
  allowRerolling: boolean;
  allowSkinSelection: boolean;
  bans: {
    myTeamBans: unknown[];
    numBans: number;
    theirTeamBans: unknown[];
  };
  benchChampions: unknown[];
  benchEnabled: boolean;
  boostableSkinCount: number;
  chatDetails: {
    multiUserChatId: string;
    multiUserChatJWT: string;
    multiUserChatPassword: string;
  };
  counter: number;
  entitledFeatureState: {
    additionalRerolls: number;
    unlockedSkinIds: unknown[];
  };
  gameId: number;
  hasSimultaneousBans: boolean;
  hasSimultaneousPicks: boolean;
  isCustomGame: boolean;
  isSpectating: boolean;
  localPlayerCellId: number;
  lockedEventIndex: number;
  myTeam: [
    {
      assignedPosition: string;
      cellId: number;
      championId: number;
      championPickIntent: number;
      entitledFeatureType: string;
      nameVisibilityType: string;
      obfuscatedPuuid: string;
      obfuscatedSummonerId: number;
      puuid: string;
      selectedSkinId: number;
      spell1Id: number;
      spell2Id: number;
      summonerId: number;
      team: number;
      wardSkinId: number;
    },
  ];
  pickOrderSwaps: unknown[];
  recoveryCounter: number;
  rerollsRemaining: number;
  skipChampionSelect: boolean;
  theirTeam: unknown[];
  timer: {
    adjustedTimeLeftInPhase: number;
    internalNowInEpochMs: number;
    isInfinite: boolean;
    phase: string;
    totalTimeInPhase: number;
  };
  trades: unknown[];
}
