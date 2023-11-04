/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MatchBox from '.';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

const player = {
  championId: 266,
  stats: {
    win: true,
    kills: 10,
    deaths: 3,
    assists: 12,
  },
} as unknown as IPlayerPosGameStats;

const playerLose = {
  championId: 266,
  stats: {
    win: false,
    kills: 10,
    deaths: 3,
    assists: 12,
  },
} as unknown as IPlayerPosGameStats;

const props = {
  version: '13.7.1',
  player: player,
  gameMode: 'NEXUSBLITZ',
  gameDuration: 120,
  gameDate: '2021-01-01',
};

const propsLose = {
  version: '13.7.1',
  player: playerLose,
  gameMode: 'NEXUSBLITZ',
  gameDuration: 120,
  gameDate: '2021-01-01',
};

describe('<MatchBox />', () => {
  it('Render a matchbox win', () => {
    render(<MatchBox {...props} />);

    const matchBox = screen.getByTestId('matchbox-container');
    const matchBoxResult = screen.getByRole('heading', { name: 'VICTORY' });

    expect(matchBox.classList.contains('bg-[#1E2B5E]')).toBe(true);
    expect(matchBoxResult).toBeInTheDocument();
  });
  it('Render a matchbox loss', () => {
    render(<MatchBox {...propsLose} />);

    const matchBox = screen.getByTestId('matchbox-container');
    const matchBoxResult = screen.getByRole('heading', { name: 'DEFEAT' });

    expect(matchBox.classList.contains('bg-[#3E223B]')).toBe(true);
    expect(matchBoxResult).toBeInTheDocument();
  });

  it('Render player stats', () => {
    render(<MatchBox {...props} />);

    const matchBoxKills = screen.getByRole('heading', { name: '10' });
    expect(matchBoxKills).toBeInTheDocument();

    const matchBoxAssists = screen.getByRole('heading', { name: '12' });
    expect(matchBoxAssists).toBeInTheDocument();

    const matchBoxDeaths = screen.getByRole('heading', { name: '3' });
    expect(matchBoxDeaths.classList.contains('text-red-600')).toBe(true);
  });

  it('should be render a matchbox with correctly champion photo', async () => {
    render(<MatchBox {...props} />);

    await waitFor(() => {
      const matchBoxChampionPhoto = screen.getByRole('img', { name: 'Champion' });
      expect(matchBoxChampionPhoto).toHaveProperty(
        'src',
        'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/champion/Aatrox.png',
      );
    });
  });
});
