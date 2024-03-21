const getIcon = function (str, folder) {
  if (!str) { return false }
  if (str.indexOf('https://') >= 0) {
    return str
  } else if (Array.isArray(str)) { folder = str[1]; str = str[0]; console.log(str, folder); }
  let token = str.toLowerCase().replace(/-/g, '')
  folder = folder ? folder : '/src/assets/img/tokens/'
  try {
    return require(`${folder}${token}`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${token}.jpg`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${token}.jpeg`)
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

const c2c = function (event) {
  // for (const c2c of document.querySelectorAll(".click-to-copy")) {
  //   c2c.addEventListener("click", (event) => {
  let self = event.target
      let text = self.hasAttribute('data-copy') ? self.getAttribute('data-copy') : self.innerHTML
      let temp = document.createElement('input')
      let originalText = self.innerHTML
      self.innerHTML = `${originalText} copied to clipboard ✅`
      temp.classList.add("temp-input")
      document.body.append(temp)
      temp.value = text
      temp.select()
      document.execCommand("copy")
      document.querySelector('.temp-input').remove()
      setTimeout(() => { self.innerHTML = `${originalText}` }, 2500)
  //   })
  // }
}

export { getIcon, c2c }