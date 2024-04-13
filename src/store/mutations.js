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
  setForum(state, payload) {
    state.forumProfile = payload
  },
  setForumPostsCache(state, payload) {
    state.forumPostsCache = payload.posts.results
    state.forumPosts.total = payload.posts.total ? payload.posts.total :  (state.forumPosts && state.forumPosts.total ? state.forumPosts.total : 0)
    state.application.forumTopics.quantities = payload.posts.totalPerCategory ? payload.posts.totalPerCategory : state.application.forumTopics.quantities
  },
  setForumPosts(state, payload) {
    state.forumPosts.total = payload.total ? payload.total : (state.forumPosts && state.forumPosts.total ? state.forumPosts.total : 0)
    state.forumPosts.page = payload.page ? payload.page : state.forumPosts.page
  },
  setENS(state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state.ens[key] = value
    }
  },
  setForumPostRepliesWatcherFlag(state, payload) {
    state.forumPostRepliesWatcherFlag = payload
  },
  setPhysicalAssets(state, payload) {
    state.physical_assets = payload
  },
  setGraphQL(state, payload) {
    state.graphQL.graphQL = payload
  },
  setGraphQLDynamic(state, payload) {
    state.graphQL.graphQLDynamic = payload
  },
  setHedgeyGraphQL(state, payload) {
    state.graphQL.hedgeyGraphQL = payload
  },
  setSnapshotSpaces(state, payload) {
    state.snapshotSpaces = payload
  },
}

export default mutations
