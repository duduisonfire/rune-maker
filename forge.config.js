module.exports = {
  packagerConfig: {
    icon: './poro.ico',
  },
  rebuildConfig: {},
  makers: [
    {
      name: 'electron-forge-maker-appimage',
      config: {
        bin: 'rune-maker',
        homepage: './',
        name: 'Rune Maker',
        productName: 'Rune Maker',
        maintainer: 'Igor Tiburcio Cavalcanti',
        icon: './poro.ico',
      },
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Igor Tiburcio Cavalcanti',
        name: 'RuneMaker',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          bin: 'rune-maker',
          homepage: './',
          name: 'Rune Maker',
          productName: 'Rune Maker',
          maintainer: 'Igor Tiburcio Cavalcanti',
          icon: './poro.ico',
        },
      },
    },
  ],
};
