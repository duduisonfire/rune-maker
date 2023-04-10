import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemList from '.';
import IPLayerPosGameStats from '../../interfaces/IPlayerPosGameStats';
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
} as unknown as IPLayerPosGameStats;

describe('<ItemList />', () => {
  it('should be render an item list with your photos', () => {
    render(<ItemList player={player} />);

    const itemList = screen.getAllByRole('img', { name: 'Item' });

    for (let index = 0; index < itemList.length; index++) {
      expect(itemList[index]).toBeInTheDocument();
    }
  });

  it('should be render an item with your respective correctly photo', () => {
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
