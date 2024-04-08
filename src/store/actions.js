/* eslint-disable */

const endpoint = "https://zettahash-hashboard-middleware.vercel.app"//process.env.VUE_APP_MIDDLEWARE_URL
import { encodeStr } from '@/utils/strings.js'

const actions = {
  init({ context, getters, dispatch, commit, rootGetters }) {


    commit("setDynamic", {
      item: 'version',
      value: process.env.VUE_APP_GIT_HASH
    })
    for (const [key, value] of Object.entries(localStorage)) {
      commit("setDynamic", {
        item: key,
        value: value
      })
    }
    // dispatch('fetchLincoin', { commit, dispatch, getters, context, rootGetters })
    dispatch('expressFetch', { commit })
    dispatch('fetchCombinedDataPayload', { commit, dispatch, getters, context, rootGetters })

    commit("setDynamic", {
      item: 'name',
      value: process.env.VUE_APP_APPLICATION_NAME
    })

    commit('setDynamic', { item: 'applicationLoaded', value: true })
    dispatch('responsiveUI', { commit })

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
      commit("setNotification", {
        title: "Synchronisation did not complete",
        className: 'error',
        data: "Features which rely on exchange data may not be available.",
      })
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
  expressFetch({ commit }) {
    try {
      fetch(`${endpoint}/api/get-data-express`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          if (data.payload) {
            try {
              commit("setHoldingsBTC", data.payload.btc.response)
            } catch (e) { }
            try {
              commit("setHoldingsETH", data.payload.eth.response)
            } catch (e) { }
            try {
              commit("setRates", data.payload.cached_exchange_rates)
            } catch (e) { }
            try {
              commit("setPhysicalAssets", data.payload.physical_assets)
              // commit("setPayload", data.payload.lincoin)
            } catch (e) { }
          }
        })
    } catch (e) {
      commit("setNotification", {
        title: "Something went wrong",
        className: 'error',
        data: e,
      })
    }
  },
  async fetchCombinedDataPayload({ commit, dispatch, getters, context, rootGetters }) {
    commit("setData", { item: 'synchronisationStatus', value: "syncing" })
    let c = commit
    let d = dispatch
    let g = getters
    let co = context
    let rg = rootGetters
    let errors = 0
    let success = 0
    try {
      await fetch(`${endpoint}/api/combined-request-btc-eth-exr`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setHoldingsBTC", data.payload.btc)
          commit("setHoldingsETH", data.payload.eth)
          commit("setRates", data.payload.exr.cached_exchange_rates)
          success++
        })
    } catch (e) {
      errors++
    }

    try {
      await fetch(`${endpoint}/api/query-snapshot`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setSnapshot", data.payload)
          success++
        })
    } catch (e) {
      success++
    }

    try {
      dispatch('fetchPosts', { c, d, g, co, rg }, { id: g.wallet })

    } catch (e) {
      console.log(e)
      success++
    }

    if (errors > 0) {
      commit("setData", { item: 'synchronisationStatus', value: "error" })
      console.log("Unable to fetch all balance data. Some balances may not reflect their true value.")
    } else {
      commit("setData", { item: 'synchronisation', value: Date.now() })
      commit("setData", { item: 'assets', value: Date.now() })
      commit("setData", { item: 'synchronisationStatus', value: false })
    }

    let parentTimeout = false
    let secondaryTimeout = false

    clearTimeout(parentTimeout)
    clearTimeout(secondaryTimeout)
    parentTimeout = setTimeout(() => {
      secondaryTimeout = setTimeout(() => {
        // dispatch('fetchLincoin', { c, d, g, co, rg })
        dispatch('fetchCombinedDataPayload', { c, d, g, co, rg })
      }, 900000)
    }, 2000)

  },
  getSnapshotUser({ commit, dispatch, getters, context, rootGetters }, payload) {
    try {
      fetch(`${endpoint}/api/query-snapshot-user/?address:${payload.address}`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          payload.store.commit("setSnapshotUser", data.payload)
        })
    } catch (e) {
      // console.log(e)
    }
  },
  initProfile({ commit, dispatch, getters, context, rootGetters }, payload) {
    fetch(`${endpoint}/forum/init`, {
      // mode: "no-cors",
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ address: payload.address })
    })
      .then(result => { return result.json() }).then(data => {
        payload.store.commit("setForum", data.payload?.profile)
        // payload.store.commit("setENS", { systemUseENS: data.payload?.profile?.ens })
        payload.store.dispatch("fetchPosts", { id: payload.address, store: payload.store })
      })
  },
  async submitPost({ commit, dispatch, getters, context, rootGetters }, payload) {
    let encodedPost = encodeStr(JSON.stringify(payload.post))
    let post = await fetch(`${endpoint}/forum/new-post`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ post: payload.post, address: payload.id })
    })
    return post.json()
  },
  async fetchPosts({ commit, dispatch, getters, context, rootGetters }, payload) {
    let start = payload.start ? payload.start : 0
    let end = payload.end ? payload.end : 50
    let category = payload.category ? payload.category : false
    let posts = await fetch(`${endpoint}/forum/fetch-posts`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ limit: { start: start, end: end }, address: payload.id, category:category })
    })
    let postsPayload = await posts.json()
    if (postsPayload.payload.posts) {
      if (payload.store) { payload.store.commit('setForumPostsCache', postsPayload.payload) }
      else if (commit) { commit('setForumPostsCache', postsPayload.payload) }
    }
  },
  async viewPost({ commit, dispatch, getters, context, rootGetters }, payload) {
    await fetch(`${endpoint}/forum/increment-view`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ id: payload.id, address: payload.address })
    })
  },
  async vote({ commit, dispatch, getters, context, rootGetters }, payload) {
    const request = await fetch(`${endpoint}/forum/vote`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ direction: payload.direction, topic_id: payload.topic_id, comment_id: payload.comment_id, address: payload.address })
    })
    let response = await request.json()
    if (response.payload) { return response }
    else { return { error: 'Failed to submit vote.' } }
  },
  async submitReply({ commit, dispatch, getters, context, rootGetters }, payload) {
    let encodedPost = encodeStr(JSON.stringify(payload.post))
    let post = await fetch(`${endpoint}/forum/new-reply`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ post: payload.post, address: payload.id })
    })
    return post.json()
  },
  async fetchPostReplies({ commit, dispatch, getters, context, rootGetters }, payload) {
    let posts = await fetch(`${endpoint}/forum/fetch-post-replies`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ limit: { start: 0, end: 50 }, address: payload.id, topic_id: payload.topic_id })
    })
    let postsPayload = await posts.json()
    if (postsPayload.payload.replies) { return postsPayload.payload.replies }
    else { return { error: 'Failed to fetch comments.' } }
  },
  async snapshotUnfollow({ commit, dispatch, getters, context, rootGetters }, payload) {
    let request = await fetch(`${endpoint}/snapshot/unfollow`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ address: payload.address })
    })
    let response = await request.json()
    if (response.payload) { return response.payload }
    else { return { error: 'Failed to fetch comments.' } }
  },
  async fetchHedgeyVesting({ commit, dispatch, getters, context, rootGetters }, payload) {
    let response = await fetch(`${endpoint}/vesting/hedgey`, {
      method: 'post', headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ address: payload.id })
    })
    let responsePayload = await response.json()
    return responsePayload
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