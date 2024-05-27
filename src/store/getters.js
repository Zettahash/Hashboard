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
  forumProfile: state => {
    return state.forumProfile
  },
  forumPostsCache: state => {
    return state.forumPostsCache
  },
  forumPosts: state => {
    return state.forumPosts
  },
  forumPostRepliesWatcherFlag: state => {
    return state.forumPostRepliesWatcherFlag
  },
  ens: state => {
    return state.ens
  },
  physicalAssets: state => {
    return state.physical_assets
  },
  forumTopics: state => {
    return state.application.forumTopics
  },
  graphQL: state => {
    return state.graphQL
  },
  snapshotSpaces: state => {
    return state.snapshotSpaces
  },
  ethHoldings: state => {
    if (!state.holdings) { return false }
    let masterPayload = []
    let arr = {}
    try {
      const instances = state.holdings.eth
      const rates = state.rates
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(instances)) {
        let obj = {}
        let balance = Number(value.balance)
        let type = false
        let unit = String(value.currency).toLowerCase()
        switch (unit) {
          case 'btc':
            balance = balance > 0 ? Number(balance) / 100000000 : balance
            balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
            type = "Bitcoin"
            break;
          case 'eth':
            balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
            break;
          case 'usd-t':
          case 'usdt':
            balance = balance > 0 ? Number(balance) * 1000000000000 : balance
            balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
            type = "ERC-20"
            break;
          case 'usd-c':
          case 'usdc':
            balance = balance > 0 ? Number(balance) * 1000000000000 : balance
            balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
            type = "ERC-20"
            break;
          case 'zh':
          case 'zhd':
            balance = balance > 1 ? balance.toFixed(6) : balance.toFixed(8)
            type = "ERC-20"
            break;
          default:
        }
        obj.displayCurrency = String(value.currency).replace(/-/g, '')
        obj.badge = type
        obj.balanceFormatted = Number(balance) < 1000 ? (Number(balance) == 0 ? 0 : balance) : Number(balance).toLocaleString('en-GB')
        obj.balance = Number(obj.balance)
        obj.addressShort = value.address ? value.address.substr(0, 5) + '...' + value.address.substr(value.address.length - 5) : ''
        for (const [key, val] of Object.entries(value)) { obj[key] = val }

        if (rates && rates[obj.displayCurrency]) {
          obj.balanceUSD = Number((balance * Number(rates[obj.displayCurrency].priceUsd)).toFixed(2)).toLocaleString('en-GB')
          obj.balanceUSDRaw = Number(balance * Number(rates[obj.displayCurrency].priceUsd))
          obj.change = Number(rates[obj.displayCurrency].changePercent24Hr).toFixed(2)
        }
        masterPayload.push(obj)
      }

      for (const item of masterPayload) {
        if (!item.group_id) { continue }
        let group = item.group_id
        if (!arr[group]) { arr[group] = [] }
        arr[group].push(item)
      }
    } catch (e) { console.log("Waiting for holdings to initiate.", e) }
    return { holdings: masterPayload, grouped: arr }
  },
  systemCurrencies: state => {
    const result = {}
    if (Array.isArray(state.application.systemCurrencies)) {
      for (const cur of state.application.systemCurrencies) {
        if (cur.system_token && !cur.disabled) {
          const key = cur.name.toLowerCase()
          result[key] = { contract: cur.contract, name: cur.name }
        }
      }
    }
    return result
  }
}
export default getters
