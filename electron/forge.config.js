module.exports = {
  packagerConfig: {
    name: 'BattleCry',
    ignore: [
        "/\.env"
    ],
    extraResource: [
      "../webapp/dist",
    ]
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        maintainer: 'Matthew R. Dangle',
        homepage: 'https://matthewrdangle.com'
      },
    },
  ],
};
