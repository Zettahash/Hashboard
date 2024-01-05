let getters = {
  application: state => {
    return state.application
  },
  data: state => {
    return state.data
  },
  payload: state => {
    return state.payload
  },
  wallet: state => {
    return state.wallet
  },
  holdings: state => {
    return state.holdings
  },
  rates: state => {
    return state.rates
  },
  snapshot: state => {
    return state.snapshot
  },
  snapshotUser: state => {
    return state.snapshotUser
  },
}
export default getters
