/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import LeagueOfLegendsClientApi from '../LeagueOfLegendsClientApi';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import ISummonerData from '../../interfaces/ISummonerData';
import IGetRunePage from '../../interfaces/IGetRunePage';
import IMatchesData from '../../interfaces/IMatchesData';
import ICreateRunePage from '../../interfaces/ICreateRunePage';
import IChampionSelectRequest from '../../interfaces/IChampionSelectRequest';

describe('LeagueOfLegendsClintApi Lib Tests', () => {
  it('"LeagueOfLegendsClintApi.create()" should be return an LeagueOfLegendsClientApi Instance', () => {
    const lockfile = { port: '8876', password: '123456' };
    const lolClient = LeagueOfLegendsClientApi.create(lockfile);
    const isInstance = lolClient instanceof LeagueOfLegendsClientApi;

    expect(isInstance).toBe(true);
  });

  it('"handshakeRequest" should be return "true"', async () => {
    const mockAxios = {
      get(url: string) {
        return true;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const handshake = await lolClient.handshakeRequest();

    expect(handshake).toBe(true);
  });

  it('"handshakeRequest" should be return "false"', async () => {
    const mockAxios = {
      get(url: string) {
        throw new Error('error');
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const handshake = await lolClient.handshakeRequest();

    expect(handshake).toBe(false);
  });

  it('"requestSummonerData" should be return {accountId: 2345}', async () => {
    const mockAxios = {
      get(url: string) {
        const summonerData = { accountId: 2345 } as unknown as ISummonerData;
        const response = { data: summonerData } as AxiosResponse;
        return response;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = await lolClient.requestSummonerData();

    expect(mockResponse.accountId).toBe(2345);
  });

  it('"requestMatchesData" should be return {accountId: 222}', async () => {
    const mockAxios = {
      get(url: string) {
        const matchesData = { accountId: 222 } as IMatchesData;
        const response = { data: matchesData } as AxiosResponse;
        return response;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = await lolClient.requestMatchesData();

    expect(mockResponse.accountId).toBe(222);
  });

  it('"getCurrentRunePage" should be return {id: 2222}', async () => {
    const mockAxios = {
      get(url: string) {
        const runePageData = { id: 2222 } as IGetRunePage;
        const response = { data: runePageData } as AxiosResponse;
        return response;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = (await lolClient.getCurrentRunePage()) as IGetRunePage;

    expect(mockResponse.id).toBe(2222);
  });

  it('"getCurrentRunePage" should be return error message "test error"', async () => {
    const mockAxios = {
      get(url: string) {
        throw new Error('test error');
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = (await lolClient.getCurrentRunePage()) as unknown as AxiosError;

    expect(mockResponse.message).toBe('test error');
  });

  it('"deleteCurrentRunePage" should be return true', async () => {
    const mockAxios = {
      delete(url: string) {
        return;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponseData = await lolClient.deleteCurrentRunePage(22);

    expect(mockResponseData).toBe(true);
  });

  it('"deleteCurrentRunePage" should be return false', async () => {
    const mockAxios = {
      delete(url: string) {
        throw new Error('error test');
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponseData = await lolClient.deleteCurrentRunePage(22);

    expect(mockResponseData).toBe(false);
  });

  it('"createCurrentRunePage" should be return true', async () => {
    const mockAxios = {
      post(url: string) {
        return;
      },
    } as unknown as AxiosInstance;

    const runePage = { name: 'test' } as ICreateRunePage;
    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponseData = await lolClient.createCurrentRunePage(runePage);

    expect(mockResponseData).toBe(true);
  });

  it('"createCurrentRunePage" should be return false', async () => {
    const mockAxios = {
      post(url: string) {
        throw new Error('test error');
      },
    } as unknown as AxiosInstance;

    const runePage = { name: 'test' } as ICreateRunePage;
    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponseData = await lolClient.createCurrentRunePage(runePage);

    expect(mockResponseData).toBe(false);
  });

  it('"inChampionSelect" should be return response data "test"', async () => {
    const mockAxios = {
      get(url: string) {
        return { data: 'test' } as AxiosResponse;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = await lolClient.inChampionSelect();

    expect(mockResponse.data).toBe('test');
  });

  it('"currentChampion" should be return response data "test"', async () => {
    const mockAxios = {
      get(url: string) {
        return { data: 'test' } as AxiosResponse;
      },
    } as unknown as AxiosInstance;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const mockResponse = await lolClient.currentChampion();

    expect(mockResponse.data).toBe('test');
  });

  it('"getLane" should be a lane name', async () => {
    const mockAxios = {
      get(url: string) {
        return { data: 'test' } as AxiosResponse;
      },
    } as unknown as AxiosInstance;

    const championSelectStage = {
      localPlayerCellId: 3,
      myTeam: [
        {
          cellId: 1,
          assignedPosition: 'top',
        },
        {
          cellId: 2,
          assignedPosition: 'mid',
        },
        {
          cellId: 3,
          assignedPosition: 'jungle',
        },
        {
          cellId: 4,
          assignedPosition: 'bot',
        },
        {
          cellId: 5,
          assignedPosition: ' supp',
        },
      ],
    } as unknown as IChampionSelectRequest;

    const lolClient = new LeagueOfLegendsClientApi(mockAxios);
    const lane = await lolClient.getLane(championSelectStage);

    expect(lane).toBe('jungle');
  });
});
