/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MatchBox from '.';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';

const player = {
  championId: 266,
  stats: {
    win: true,
    kills: 10,
    deaths: 3,
    assists: 12,
  },
} as unknown as IPLayerPosGameStats;

describe('<MatchBox />', () => {
  it('should be render a matchbox with border color green', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBox = screen.getByTitle('matchbox-container');
    expect(matchBox.classList.contains('border-green-400')).toBe(true);
  });

  it('should be render a matchbox with VICTORY text', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBoxResult = screen.getByRole('heading', { name: 'VICTORY' });
    expect(matchBoxResult).toBeInTheDocument();
  });

  it('should be render a matchbox with 10 kills', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBoxKills = screen.getByRole('heading', { name: '10' });
    expect(matchBoxKills).toBeInTheDocument();
  });

  it('should be render a matchbox with 3 deaths', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBoxDeaths = screen.getByRole('heading', { name: '3' });
    expect(matchBoxDeaths).toBeInTheDocument();
  });

  it('should be render a matchbox with 12 assists', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBoxAssists = screen.getByRole('heading', { name: '12' });
    expect(matchBoxAssists).toBeInTheDocument();
  });

  it('should be render a matchbox with deaths text color red', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const matchBoxDeaths = screen.getByRole('heading', { name: '3' });
    expect(matchBoxDeaths.classList.contains('text-red-600')).toBe(true);
  });

  it('should be render a matchbox with correctly champion photo', async () => {
    render(<MatchBox version="13.7.1" player={player} />);

    await waitFor(() => {
      const matchBoxChampionPhoto = screen.getByRole('img', { name: 'Champion' });
      expect(matchBoxChampionPhoto).toHaveProperty(
        'src',
        'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/champion/Aatrox.png',
      );
    });
  });
});
