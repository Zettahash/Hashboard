/* eslint-disable */

const endpoint = process.env.VUE_APP_MIDDLEWARE_URL
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
    // dispatch('initProfile', { commit, dispatch, getters, context, rootGetters })

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
  expressFetch({ commit }) {
    try {
      fetch(`${endpoint}/api/get-data-express`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          if (data.payload) {
            try {
              commit("setHoldingsBTC", data.payload.btc)
              commit("setHoldingsETH", data.payload.eth)
              commit("setRates", data.payload.exr)
              // commit("setPayload", data.payload.lincoin)
            } catch (e) {
            }
          }
        })
    } catch (e) {
    }
  },
  fetchCombinedDataPayload({ commit, dispatch, getters, context, rootGetters }) {
    commit("setData", { item: 'synchronisationStatus', value: "syncing" })
    try {
      fetch(`${endpoint}/api/combined-request-btc-eth-exr`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setHoldingsBTC", data.payload.btc)
          commit("setHoldingsETH", data.payload.eth)
          commit("setRates", data.payload.exr)
          // commit("setPayload", data.payload.lincoin)

          commit("setData", { item: 'synchronisation', value: Date.now() })
          commit("setData", { item: 'assets', value: Date.now() })
          commit("setData", { item: 'synchronisationStatus', value: false })
        })
    } catch (e) {
      commit("setData", { item: 'synchronisationStatus', value: "error" })
    }

    try {
      fetch(`${endpoint}/api/query-snapshot`, { method: 'get' })
        .then(result => { return result.json() }).then(data => {
          commit("setSnapshot", data.payload)
          // commit("setPayload", data.payload.lincoin)

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
      }, 900000)
    }, 2000)

  },
  getSnapshotUser({ commit, dispatch, getters, context, rootGetters }, payload) {
    try {
      fetch(`${endpoint}/api/query-snapshot-user/query=address:${payload.address}`, { method: 'get' })
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
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ address: payload.address }))
    })
      .then(result => { return result.json() }).then(data => {
        payload.store.commit("setForum", data.payload?.id)
        payload.store.dispatch("fetchPosts", { id: payload.address, store: payload.store })
      })
  },
  async submitPost({ commit, dispatch, getters, context, rootGetters }, payload) {
    let encodedPost = encodeStr(JSON.stringify(payload.post))
    let post = await fetch(`${endpoint}/forum/new-post`, {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ post: payload.post, address: payload.id }))
    })
    return post.json()
  },
  async fetchPosts({ commit, dispatch, getters, context, rootGetters }, payload) {
    let posts = await fetch(`${endpoint}/forum/fetch-posts`, {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ limit: { start: 0, end: 50 }, address: payload.id }))
    })
    let postsPayload = await posts.json()
    if (postsPayload.payload.posts) { payload.store.commit('setForumPostsCache', postsPayload.payload.posts) }
  },
  async viewPost({ commit, dispatch, getters, context, rootGetters }, payload) {
    await fetch(`${endpoint}/forum/increment-view`, {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ id:payload.id, address: payload.address }))
    })
  },
  async submitReply({ commit, dispatch, getters, context, rootGetters }, payload) {
    let encodedPost = encodeStr(JSON.stringify(payload.post))
    let post = await fetch(`${endpoint}/forum/new-reply`, {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ post: payload.post, address: payload.id }))
    })
    return post.json()
  },
  async fetchPostReplies({ commit, dispatch, getters, context, rootGetters }, payload) {
    let posts = await fetch(`${endpoint}/forum/fetch-post-replies`, {
      method: 'post', headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
      body: encodeURI(JSON.stringify({ limit: { start: 0, end: 50 }, address: payload.id, topic_id: payload.topic_id }))
    })
    let postsPayload = await posts.json()
    if (postsPayload.payload.replies) { return postsPayload.payload.replies }
    else{return {error: 'Failed to fetch comments.'}}
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