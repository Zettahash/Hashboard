// import { createApp } from 'vue'
// const app = createApp({})

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
    state.application[payload.item] = payload.value
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setWallet(state, payload) {
    state.wallet = payload
  },
  setData(state, payload) {
    state.data[payload.item] = payload.value
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
  setSnapshot(state, payload) {
    state.snapshot = payload
  },
  setSnapshotUser(state, payload) {
    state.snapshotUser = payload
  },
  setNotification(state, payload) {
    payload.className = payload.className ? payload.className : 'neutral'
    payload.active = true
    payload.time = Date.now()
    state.application.notifications.push(payload)
  },
  closeNotification(state, payload) {
    state.application.notifications[payload].active = false
  },
}
export default mutations
