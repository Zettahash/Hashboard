import { minidenticon } from 'minidenticons'
import { useStore } from 'vuex'
import { computed } from 'vue'
import rawStore from '../store'


const profileImg = function (wallet) {
  const store = useStore()
  const walletStore = computed(() => store.state.wallet)
  const forumProfile = computed(() => store.state.forumProfile)
  wallet = wallet ? wallet : walletStore.value
  let profile = (forumProfile.value ? forumProfile.value : false)

  if ((profile && profile.gravatar) && (wallet == walletStore.value)) {
    return profile.gravatar
  }

  if (!wallet) { return '' }

  if (wallet.indexOf("https://") >= 0) {
    return wallet
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(wallet))}`
}
const hasherName = function (wallet, profile) {
  const store = useStore()
  const walletStore = computed(() => store.state.wallet)
  const forumProfile = computed(() => store.state.forumProfile)
  wallet = wallet ? wallet : walletStore.value
  profile = profile ? profile : (forumProfile.value ? forumProfile.value.id : false)

  if (!wallet || !profile) { return 'N/A' }

  return `${wallet.substr(wallet.length - 6)}${profile || '?'}`
}

const voteTopic = async function (property, direction) {
  const store = rawStore
  const walletStore = computed(() => store.state.wallet)
  const forumPostsCache = computed(() => store.state.forumPostsCache)
  let topic_id = Array.isArray(property) ? property[0] : property
  let comment_id = Array.isArray(property) ? property[1] : ''

  if (comment_id.length == 0) {
    let temp = []
    for (const item of forumPostsCache.value) {
      let tempItem = item
      if (item.topic_id === topic_id) {
        let voteValue = item.resultant_score ? item.resultant_score : 0
        if (tempItem.direction === direction) {
          tempItem.resultant_score = direction === 'up' ? voteValue - 1 : voteValue + 1
          tempItem.direction = 'NULL'
        } else {
          tempItem.resultant_score = direction === 'up' ? voteValue + 1 : voteValue - 1
          tempItem.direction = direction
        }

        tempItem.change = 'change'
      }
      temp.push(tempItem)
    }
    rawStore.commit('setForumPostsCache', { posts: temp })
  }


  let result = await rawStore.dispatch('vote', { topic_id: topic_id, comment_id: comment_id, direction: direction, address: walletStore.value });
  if (result.payload.error) {
    rawStore.commit("setNotification", {
      title: "Something went wrong with your vote",
      className: 'error',
      data: result.payload.error,
    })
    return
  }

}

const loadForumCache = function (address) {
  const forumPosts = computed(() => rawStore.state.forumPosts)
  let start = forumPosts.value.page * forumPosts.value.paginationLimit
  let end = start + forumPosts.value.paginationLimit
  rawStore.dispatch("fetchPosts", { id: address, store: rawStore, start: start, end: end })
}

const setProfile = async function (payload) {
  const walletStore = computed(() => rawStore.state.wallet)
  let result = await fetch(`${import.meta.env.VITE_MIDDLEWARE_URL}/forum/set-profile`, {
    method: 'post', headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ data: payload, address: walletStore.value })
  })
  let newPayload = await result.json()
  rawStore.commit("setForum", newPayload.payload?.profile)
}

export { profileImg, hasherName, voteTopic, loadForumCache, setProfile }