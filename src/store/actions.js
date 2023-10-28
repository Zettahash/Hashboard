/* eslint-disable */


const actions = {
  init({ context, getters, dispatch, commit, rootGetters }) {



    for (const [key, value] of Object.entries(localStorage)) {
      commit("setDynamic", {
        item: key,
        value: value
      })
    }
    // dispatch('fetchLincoin', { commit, dispatch, getters, context, rootGetters })
    dispatch('fetchCombinedDataPayload', { commit, dispatch, getters, context, rootGetters })

    commit("setDynamic", {
      item: 'name',
      value: process.env.VUE_APP_APPLICATION_NAME
    })

    commit('setDynamic', { item: 'applicationLoaded', value: true })
    dispatch('responsiveUI', { commit})

  },

  fetchLincoin({ commit, dispatch, getters, context, rootGetters }) {
    commit("setData", { item: 'synchronisationStatus', value: "syncing" })


    let endpoint = "https://zettahash_hashboard_middleware.zetta-735.workers.dev"
    try {
      fetch(`${endpoint}/api/get-data`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setPayload", data.payload)
          // layerTwoWorkers(item.name, data, commit)
          commit("setData", { item: 'synchronisation', value: Date.now() })
          commit("setData", { item: 'synchronisationStatus', value: false })
        })
    } catch (e) {
      commit("setData", { item: 'synchronisationStatus', value: "error" })
    }

    let c = commit
    let d = dispatch
    let g = getters
    let co = context
    let rg = rootGetters
    let parentTimeout = false
    let secondaryTimeout = false

    clearTimeout(parentTimeout)
    clearTimeout(secondaryTimeout)
    parentTimeout = setTimeout(() => {
      secondaryTimeout = setTimeout(() => {
        dispatch('fetchLincoin', { c, d, g, co, rg })
      }, 120000)
    }, 2000)

  },
  fetchCombinedDataPayload({ commit, dispatch, getters, context, rootGetters }) {
    commit("setData", { item: 'synchronisationStatus', value: "syncing" })
    let endpoint = "https://zettahash_hashboard_middleware.zetta-735.workers.dev"
    try {
      fetch(`${endpoint}/api/combined-request-btc-eth-exr-lincoin`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setHoldingsBTC", data.payload.btc)
          commit("setHoldingsETH", data.payload.eth)
          commit("setRates", data.payload.exr)
          commit("setPayload", data.payload.lincoin)

          commit("setData", { item: 'synchronisation', value: Date.now() })
          commit("setData", { item: 'assets', value: Date.now() })
          commit("setData", { item: 'synchronisationStatus', value: false })
        })
    } catch (e) {
      commit("setData", { item: 'synchronisationStatus', value: "error" })
    }

    let c = commit
    let d = dispatch
    let g = getters
    let co = context
    let rg = rootGetters
    let parentTimeout = false
    let secondaryTimeout = false

    clearTimeout(parentTimeout)
    clearTimeout(secondaryTimeout)
    parentTimeout = setTimeout(() => {
      secondaryTimeout = setTimeout(() => {
        // dispatch('fetchLincoin', { c, d, g, co, rg })
        dispatch('fetchCombinedDataPayload', { c, d, g, co, rg })
      }, 120000)
    }, 2000)

  },
  responsiveUI({ commit }) {
    if (window.innerWidth <= 1200) {
      commit("setDynamic", {
        item: 'uiSidebarCollapse',
        value: true
      })
    }
    let c = commit
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1200) {
        c("setDynamic", {
          item: 'uiSidebarCollapse',
          value: true
        })
      }
    })
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