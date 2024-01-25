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

  if (!wallet || !profile) { return '#####-?' }

  return `${wallet.substr(wallet.length - 6)}${profile || '?'}`
}

const voteTopic = async function (property, direction) {
  let topic_id = Array.isArray(property) ? property[0] : property
  let comment_id = Array.isArray(property) ? property[1] : ''
  let result = await this.$store.dispatch('vote', { topic_id: topic_id, comment_id: comment_id, direction: direction, address: this.$store.state.wallet });
  if (result.payload.error) {
    this.$store.commit("setNotification", {
      title: "Something went wrong",
      className: 'error',
      data: result.payload.error,
    })
    return
  }
  // if (result.payload.message) {
  //   this.$store.commit("setNotification", {
  //     title: "Looks good",
  //     className: 'good',
  //     data: result.payload.message,
  //   })
  // }
  let temp = []
  for (const item of this.$store.state.forumPostsCache) {
    let tempItem = item
    if (item.topic_id === topic_id) {
      let voteValue = item.resultant_score ? item.resultant_score : 0
      voteValue = direction === 'up' ? voteValue + 1 : voteValue - 1
      tempItem.resultant_score = voteValue
      tempItem.direction = direction
    }
    temp.push(tempItem)
  }
  this.$store.commit('setForumPostsCache', temp)
}

export { profileImg, hasherName, voteTopic }