let state = {
  application: {
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
  },
  data: {},
  payload: false,
  wallet: false,
  holdings: { btc: false, eth: false },
  rates:false,
  test: false
}
export default state