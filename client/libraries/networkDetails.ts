const networks =  {
  '1337': {
    name: 'Localhost',
    shortName: 'Localhost',
    description: '',
    id: '1337',
    hexId: '0x539',
    currency: {
      name: 'DEV',
      symbol: 'DEV',
      decimals: 18
    },
    rpc: ['http://127.0.0.1:8545/'],
    explorer: [],
  },
  '1297': {
    name: 'Bobabase Test Network',
    shortName: 'Bobabase',
    description: '',
    id: '1297',
    hexId: '0x511',
    currency: {
      name: 'GLMRDEV',
      symbol: 'DEV',
      decimals: 18
    },
    rpc: ['https://bobabase.boba.network'],
    explorer: ['https://blockexplorer.bobabase.boba.network']
  },
  '1287': {
    name: 'Moonbase Alpha',
    shortName: 'Moonbase',
    description: '',
    id: '1287',
    hexId: '0x507',
    currency: {
      name: 'Deprecated',
      symbol: 'ETH',
      decimals:18
    },
    rpc: ['https://rpc.api.moonbase.moonbeam.network'],
    explorer: ['https://moonbase.moonscan.io']
  },
}

export default networks