/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '.';
import IPlayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
import React from 'react';

const player = {
  stats: {
    item0: 0,
    item1: 0,
    item2: 0,
    item3: 7050,
    item4: 7050,
    item5: 7050,
    item6: 7050,
  },
} as unknown as IPlayerPosGameStats;

const mockStorageAllItem = {
  7050: {
    name: 'Gangplank Placeholder',
    description: '',
    colloq: '',
    plaintext: 'New Gangplank interface coming soon!',
    stacks: 0,
    consumed: true,
    consumeOnFull: true,
    inStore: false,
    requiredChampion: 'Gangplank',
    hideFromAll: true,
    image: {
      full: '7050.png',
      sprite: 'item4.png',
      group: 'item',
      x: 96,
      y: 144,
      w: 48,
      h: 48,
    },
    gold: {
      base: 0,
      purchasable: false,
      total: 0,
      sell: 0,
    },
    tags: [],
    maps: {
      '11': true,
      '12': true,
      '21': true,
      '22': false,
      '30': true,
    },
    stats: {},
  },
};

describe('<ItemList />', () => {
  it('should be render an item list with your photos', () => {
    localStorage.setItem('allItems', JSON.stringify(mockStorageAllItem));

    render(<ItemList player={player} />);

    const itemList = screen.getAllByRole('img', { name: 'Item' });

    for (let index = 0; index < itemList.length; index++) {
      expect(itemList[index]).toBeInTheDocument();
    }
  });

  it('should be render an item list with your respective correctly photo', () => {
    localStorage.setItem('allItems', JSON.stringify(mockStorageAllItem));

    render(<ItemList player={player} />);

    const itemList = screen.getAllByRole('img', { name: 'Item' });

    for (let index = 0; index < itemList.length; index++) {
      expect(itemList[index]).toHaveProperty(
        'src',
        'https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/item/7050.png',
      );
    }
  });
});
