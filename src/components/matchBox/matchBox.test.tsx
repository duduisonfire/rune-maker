/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
    item0: 0,
    item1: 0,
    item2: 0,
    item3: 7050,
    item4: 7050,
    item5: 7050,
    item6: 7050,
  },
} as unknown as IPLayerPosGameStats;

describe('<ItemList />', () => {
  it('should be render a result border color green', () => {
    render(<MatchBox version="13.7.1" player={player} />);

    const itemList = screen.getAllByRole('img', { name: 'Item' });

    for (let index = 0; index < itemList.length; index++) {
      expect(itemList[index]).toBeInTheDocument();
    }
  });
});
