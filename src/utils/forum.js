import { minidenticon } from 'minidenticons'

const profileImg = function (wallet) {
  wallet = wallet ? wallet : this.$store.state.wallet
  let profile = this.$store.state.forumProfile
  
  if (profile.gravatar && (wallet == this.$store.state.wallet)) {
    return profile.gravatar
  }

  if (wallet.indexOf("https://")>=0) {
    return wallet
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(wallet))}`
}
const hasherName = function (wallet, profile) {
  wallet = wallet? wallet: this.$store.state.wallet
  profile = profile ? profile : this.$store.state.forumProfile.id

  if(!wallet || !profile){return '#####-?'}

  return `${wallet.substr(wallet.length - 6)}${profile || '?'}`
}

export { profileImg, hasherName}