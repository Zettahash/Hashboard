const getIcon = function (str) {
  if (!str) { return false }
  let token = str.toLowerCase().replace(/-/g, '')
  try {
    return require(`/src/assets/img/tokens/${token}.png`)
  } catch (e) { console.log(e) }
  try {
    return require(`/src/assets/img/tokens/${token}.svg`)
  } catch (e) { console.log(e) }
  try {
    let tokenAlpha = token.replace(/-/g, '')
    return require(`/src/assets/img/tokens/${tokenAlpha}.png`)
  } catch (e) { console.log(e) }
}

export { getIcon }