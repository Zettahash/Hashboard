import { createApp } from 'vue'
const app = createApp({})

let mutations = {
  setDynamic(state, payload) {
    switch (true) {
      case (payload.item === "web3"):
      case (payload.item === "ethereum"):
      case (payload.item === "test"):
      case (payload.item.indexOf('ui') === 0):
        localStorage.setItem(payload.item, payload.value)
        break;
      default:
    }
app.set(state.application, [payload.item], payload.value)
  },
  test(state, payload) {
    state.metamaskWallet.testParam = payload
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setWallet(state, payload) {
    state.wallet = payload
  },
  setData(state, payload) {
app.set(state.data, [payload.item], payload.value)
  },
  setHoldingsBTC(state, payload) {
    state.holdings.btc = payload
  },
  setHoldingsETH(state, payload) {
    state.holdings.eth = payload
  },
  setRates(state, payload) {
    state.rates = payload
  },
}
export default mutations
