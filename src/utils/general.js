const getIcon = function (str, folder) {
  if (!str) { return false }
  if (str.indexOf('https://') >= 0) {
    return str
  }
  let token = str.toLowerCase().replace(/-/g, '')
  folder = folder ? folder : '/src/assets/img/tokens/'
  try {
    return require(`${folder}${token}.png`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${token}.png`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${token}.svg`)
  } catch (e) { console.log(e) }
  try {
    let tokenAlpha = token.replace(/-/g, '')
    return require(`${folder}${tokenAlpha}.png`)
  } catch (e) { console.log(e) }
}

export { getIcon }