export default interface IGameData {
  gameCreation: number;
  gameCreationDate: string;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participantIdentities: [
    {
      participantId: number;
      player: {
        accountId: number;
        currentAccountId: number;
        currentPlatformId: string;
        matchHistoryUri: string;
        platformId: string;
        profileIcon: number;
        summonerId: number;
        summonerName: string;
      };
    },
  ];
  participants: [
    {
      championId: number;
      highestAchievedSeasonTier: string;
      participantId: number;
      spell1Id: number;
      spell2Id: number;
      stats: {
        assists: number;
        causedEarlySurrender: true;
        champLevel: number;
        combatPlayerScore: number;
        damageDealtToObjectives: number;
        damageDealtToTurrets: number;
        damageSelfMitigated: number;
        deaths: number;
        doubleKills: number;
        earlySurrenderAccomplice: true;
        firstBloodAssist: true;
        firstBloodKill: true;
        firstInhibitorAssist: true;
        firstInhibitorKill: true;
        firstTowerAssist: true;
        firstTowerKill: true;
        gameEndedInEarlySurrender: true;
        gameEndedInSurrender: true;
        goldEarned: number;
        goldSpent: number;
        inhibitorKills: number;
        itemnumber: number;
        item0: number;
        item1: number;
        item2: number;
        item3: number;
        item4: number;
        item5: number;
        item6: number;
        killingSprees: number;
        kills: number;
        largestCriticalStrike: number;
        largestKillingSpree: number;
        largestMultiKill: number;
        longestTimeSpentLiving: number;
        magicDamageDealt: number;
        magicDamageDealtToChampions: number;
        magicalDamageTaken: number;
        neutralMinionsKilled: number;
        neutralMinionsKilledEnemyJungle: number;
        neutralMinionsKilledTeamJungle: number;
        objectivePlayerScore: number;
        participantId: number;
        pentaKills: number;
        perknumber: number;
        perknumberVar1: number;
        perknumberVar2: number;
        perknumberVar3: number;
        perk1: number;
        perk1Var1: number;
        perk1Var2: number;
        perk1Var3: number;
        perk2: number;
        perk2Var1: number;
        perk2Var2: number;
        perk2Var3: number;
        perk3: number;
        perk3Var1: number;
        perk3Var2: number;
        perk3Var3: number;
        perk4: number;
        perk4Var1: number;
        perk4Var2: number;
        perk4Var3: number;
        perk5: number;
        perk5Var1: number;
        perk5Var2: number;
        perk5Var3: number;
        perkPrimaryStyle: number;
        perkSubStyle: number;
        physicalDamageDealt: number;
        physicalDamageDealtToChampions: number;
        physicalDamageTaken: number;
        playerScorenumber: number;
        playerScore1: number;
        playerScore2: number;
        playerScore3: number;
        playerScore4: number;
        playerScore5: number;
        playerScore6: number;
        playerScore7: number;
        playerScore8: number;
        playerScore9: number;
        quadraKills: number;
        sightWardsBoughtInGame: number;
        teamEarlySurrendered: true;
        timeCCingOthers: number;
        totalDamageDealt: number;
        totalDamageDealtToChampions: number;
        totalDamageTaken: number;
        totalHeal: number;
        totalMinionsKilled: number;
        totalPlayerScore: number;
        totalScoreRank: number;
        totalTimeCrowdControlDealt: number;
        totalUnitsHealed: number;
        tripleKills: number;
        trueDamageDealt: number;
        trueDamageDealtToChampions: number;
        trueDamageTaken: number;
        turretKills: number;
        unrealKills: number;
        visionScore: number;
        visionWardsBoughtInGame: number;
        wardsKilled: number;
        wardsPlaced: number;
        win: true;
      };
      teamId: number;
      timeline: {
        creepsPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        csDiffPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        damageTakenDiffPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        damageTakenPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        goldPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        lane: string;
        participantId: number;
        role: string;
        xpDiffPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
        xpPerMinDeltas: {
          additionalProp1: number;
          additionalProp2: number;
          additionalProp3: number;
        };
      };
    },
  ];
  platformId: string;
  queueId: number;
  seasonId: number;
  teams: [
    {
      bans: [
        {
          championId: number;
          pickTurn: number;
        },
      ];
      baronKills: number;
      dominionVictoryScore: number;
      dragonKills: number;
      firstBaron: true;
      firstBlood: true;
      firstDargon: true;
      firstInhibitor: true;
      firstTower: true;
      inhibitorKills: number;
      riftHeraldKills: number;
      teamId: number;
      towerKills: number;
      vilemawKills: number;
      win: string;
    },
  ];
}
