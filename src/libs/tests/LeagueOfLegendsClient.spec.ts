/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import LeagueOfLegendsClient from '../LeagueOfLegendsClient';

describe('LeagueOfLegendsClient Lib Tests', () => {
  it('"LeagueOfLegendsClientInstance" should be return an axios instance', () => {
    const lolClient = new LeagueOfLegendsClient({ port: '8876', password: '123456' });
    const lolAxiosInstance = lolClient.LeagueOfLegendsClientInstance();
    const spy = jest.spyOn(lolAxiosInstance, 'get');
    lolAxiosInstance.get('');

    expect(spy).toBeCalled();
  });
});
