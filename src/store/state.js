let state = {
  application: {
    notifications: [],
    version: false,
    applicationLoaded: false,
    wallet: false,
    name: false,
    //UI States
    routerLoaded: false,
    uiSidebarCollapse: false,
    uiDemoValues: false,
    uiListSearchTerm: '',
    uiView: 'grid',
    uiThemeDark: true,
    zhHolderBool: false,
    zhBalance: false,
    walletConnected: false,
    activeFarm: 'lincoin',
  },
  data: {},
  payload: false,
  wallet: false,
  holdings: { btc: false, eth: false },
  rates: false,
  snapshot: false,
  snapshotUser: false,
  test: false
}
export default state