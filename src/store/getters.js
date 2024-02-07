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
}
export default getters
