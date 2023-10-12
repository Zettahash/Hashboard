/* eslint-disable */


const actions = {
  init({ context, getters, dispatch, commit, rootGetters }) {



    for (const [key, value] of Object.entries(localStorage)) {
      commit("setDynamic", {
        item: key,
        value: value
      })
    }

    // let db = dispatch('backendAPI', { commit, dispatch })
    dispatch('fetchLincoin', { commit, dispatch, getters, context, rootGetters })

    commit("setDynamic", {
      item: 'name',
      value: process.env.VUE_APP_APPLICATION_NAME
    })

    commit('setDynamic', { item: 'applicationLoaded', value: true })

  },

  fetchLincoin({ commit, dispatch, getters, context, rootGetters }) {
    commit("setData", { item: 'synchronisationStatus', value: "syncing" })
    const today = new Date()
    const month = today.getMonth()
    today.setMonth(month - 1)
    const lastWeekDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    let ISODatePrevWeek = lastWeekDate.toISOString().split('T')[0]
    let ISODatePrevMonth = today.toISOString().split('T')[0]
    let ISODateNow = new Date().toISOString().split('T')[0]


    let developerKey = "developer.apikey.010aeaefb7c5054b0356ddeeb9d1ed09"
    let requests = [
      { name: 'hashrate', endpoint: "https://app.lincoin.com/res/openapi/v1/hashrate?coin=btc" },
      { name: 'hashrateChart', endpoint: "https://app.lincoin.com/res/openapi/v1/hashrate/chart?coin=btc" },
      { name: 'hashrateWorker', endpoint: 'https://app.lincoin.com/res/openapi/v1/hashrate/worker?coin=btc' },
      { name: 'hashrateHistory', endpoint: `https://app.lincoin.com/res/openapi/v1/hashrate/history?coin=btc&start_date=${ISODatePrevWeek}&end_date=${ISODateNow}` },
      { name: 'prof1itHistory', endpoint: `https://app.lincoin.com/res/openapi/v1/profit/history?coin=btc&start_date=${ISODatePrevWeek}&end_date=${ISODateNow}` },
      { name: 'profitSummary', endpoint: 'https://app.lincoin.com/res/openapi/v1/profit?coin=btc' },
      { name: 'paymentHistory', endpoint: 'https://app.lincoin.com/res/openapi/v1/wallet/payment/history?coin=btc' }
    ]
    let requestsWorkersL2 = [
      { name: 'worker', endpoint: `https://app.lincoin.com/res/openapi/v1/worker?worker_id=$workerid&coin=btc` },
      { name: 'workerHashrateChart', endpoint: `https://app.lincoin.com/res/openapi/v1/hashrate/worker/$workerid/chart?coin=btc` }
    ]
    for (const item of requests) {
      try {
        fetch(item.endpoint, {
          method: 'get',
          headers: { "X-API-KEY": developerKey, "accept": "*/*" },
        })
          .then(result => { return result.json() }).then(data => {
            commit("setData", { item: item.name, value: data.data })
            layerTwoWorkers(item.name, data, commit)
          })
      } catch (e) {
        commit("setData", { item: 'synchronisationStatus', value: "error" })
      }
    }
    function layerTwoWorkers(name, data, commit) {
      if (name === 'hashrateWorker')
        for (const req of requestsWorkersL2) {
          let array = []
          for (const worker of data.data) {
            fetch(req.endpoint.replace('$workerid', worker.worker_name), {
              method: 'get', headers: { "X-API-KEY": developerKey },
            }).then(result => { return result.json() }).then(data => { array.push(data.data); })
          }
          commit("setData", { item: req.name, value: array })
        }
    }

    commit("setData", { item: 'synchronisation', value: Date.now() })


    let c = commit
    let d = dispatch
    let g = getters
    let co = context
    let rg = rootGetters

    setTimeout(() => {
      commit("setData", { item: 'synchronisationStatus', value: false })
      setTimeout(() => {
        dispatch('fetchLincoin', { c, d, g, co, rg })
      }, 60000)
    }, 2000)

  },
  async backendAPI({ commit }, url) {
    // Default options are marked with *
    const requestURL = `https://api.flat18.co.uk/zettahash/`
    let query = await fetch(requestURL, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({ data: url })
    })
    // commit('setDynamic', { item: 'applicationLoaded', value: true })

    return { data: await query }

  },
  test(payload) {
    console.log(payload)
  },

}

export default actions