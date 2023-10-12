import Vue from 'vue'
let mutations = {
  setDynamic(state, payload) {
    switch (payload.item) {
      case "web3":
      case "ethereum":
      case "test":
        case (payload.item.indexOf('ui')==0):
        localStorage.setItem(payload.item, payload.value)
        break;
      default:
    }
    Vue.set(state.application, [payload.item], payload.value)
  },
  test(state, payload) {
    state.metamaskWallet.testParam = payload
  },
  setData(state, payload) {
    Vue.set(state.data, [payload.item], payload.value)
  },
}
export default mutations
