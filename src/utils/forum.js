import { minidenticon } from 'minidenticons'

const profileImg = function (wallet) {
  wallet = wallet ? wallet : this.$store.state.wallet
  let profile = (this.$store.state.forumProfile ? this.$store.state.forumProfile : false)

  if (profile.gravatar && (wallet == this.$store.state.wallet)) {
    return profile.gravatar
  }

  if (!wallet) { return '' }

  if (wallet.indexOf("https://") >= 0) {
    return wallet
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(wallet))}`
}
const hasherName = function (wallet, profile) {
  wallet = wallet ? wallet : this.$store.state.wallet
  profile = profile ? profile : (this.$store.state.forumProfile ? this.$store.state.forumProfile.id : false)

  if (!wallet || !profile) { return 'N/A' }

  return `${wallet.substr(wallet.length - 6)}${profile || '?'}`
}

const voteTopic = async function (property, direction) {
  let topic_id = Array.isArray(property) ? property[0] : property
  let comment_id = Array.isArray(property) ? property[1] : ''

  if (comment_id.length == 0) {
    let temp = []
    for (const item of this.$store.state.forumPostsCache) {
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
    this.$store.commit('setForumPostsCache', { posts: temp })
  }


  let result = await this.$store.dispatch('vote', { topic_id: topic_id, comment_id: comment_id, direction: direction, address: this.$store.state.wallet });
  if (result.payload.error) {
    this.$store.commit("setNotification", {
      title: "Something went wrong with your vote",
      className: 'error',
      data: result.payload.error,
    })
    return
  }

}

const loadForumCache = function (address) {
  let start = this.$store.state.forumPosts.page * this.$store.state.forumPosts.paginationLimit
  let end = start + this.$store.state.forumPosts.paginationLimit
  this.$store.dispatch("fetchPosts", { id: address, store: this.$store, start: start, end: end })
}

const setProfile = async function (payload) {
  let wallet = this.$store.state.wallet
  let result = await fetch(`http://localhost:3000/forum/set-profile`, {
    method: 'post', headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ data: payload, address: wallet })
  })
  let newPayload = await result.json()
  this.$store.commit("setForum", newPayload.payload?.profile)
}

export { profileImg, hasherName, voteTopic, loadForumCache, setProfile }