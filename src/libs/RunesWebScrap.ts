import puppeteer from 'puppeteer-core';
import * as cheerio from 'cheerio';
import IRune from '../interfaces/IRune';
import IRuneWebScrap from '../interfaces/IRuneWebScrap';

export default class RuneWebScrap implements IRuneWebScrap {
  public runeList: string[] = [];

  constructor(public champion: string, public lane: string) {}

  private async getRuneWebPage() {
    const browser = await puppeteer.launch({ channel: 'chrome' });

    const browserPage = await browser.newPage();

    await browserPage.setRequestInterception(true);
    browserPage.on('request', (request) => {
      if (
        request.resourceType() === 'image' ||
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'media' ||
        request.resourceType() === 'other' ||
        request.resourceType() === 'font'
      )
        request.abort();
      else request.continue();
    });

    await browserPage.goto(`https://u.gg/lol/champions/${this.champion}/build/${this.lane}`, {
      waitUntil: 'domcontentloaded',
    });

    const runeWebPageContent = await browserPage.content();
    await browser.close();

    return runeWebPageContent;
  }

  async selectRunes() {
    const pageContent = await this.getRuneWebPage();
    const selector = cheerio.load(pageContent);

    const treeNameList = selector('.perk-style-title').contents();
    const majorRunesList = selector('.perk-active').contents();
    const minorsRunesList = selector('.shard-active').contents();

    for (let index = 0; index < 2; index++) {
      const treeName = treeNameList[index].data as string;
      this.runeList.push(treeName);
    }

    for (let index = 0; index < 6; index++) {
      const rune = majorRunesList[index] as unknown as IRune;
      let runeName = rune.attribs.alt;

      if (runeName.startsWith('The Keystone ') || runeName.startsWith('The Rune ')) {
        runeName = runeName.replace('The Keystone ', '');
        runeName = runeName.replace('The Rune ', '');
      }

      this.runeList.push(runeName);
    }

    for (let index = 0; index < 3; index++) {
      const rune = minorsRunesList[index] as unknown as IRune;
      let runeName = rune.attribs.alt;

      runeName = runeName.replace('The ', '');
      runeName = runeName.replace(' Shard', '');

      this.runeList.push(runeName);
    }
  }
}
