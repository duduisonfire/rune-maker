module.exports = {
  packagerConfig: {
    icon: './poro.ico',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Igor Tiburcio Cavalcanti',
        exe: `Rune Maker.exe`,
        name: 'Rune Maker',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          bin: 'rune-maker',
          maintainer: 'Igor Tiburcio Cavalcanti',
          icon: './poro.ico',
        },
      },
    },
  ],
};
