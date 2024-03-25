const getIcon = function (img, folder) {
  if (!img) { return false }
  if (img.indexOf('https://') >= 0) {
    return img
  } else if (Array.isArray(img)) { folder = img[1]; img = img[0]; }
  let imgName = img.toLowerCase().replace(/-/g, '')
  folder = folder ? folder : '@/assets/img/tokens/'
  try {
    return require(`${folder}${imgName}`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${imgName}.jpg`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${imgName}.jpeg`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${imgName}.png`)
  } catch (e) { console.log(e) }
  try {
    return require(`${folder}${imgName}.svg`)
  } catch (e) { console.log(e) }
  try {
    let imgNameAlpha = imgName.replace(/-/g, '')
    return require(`${folder}${imgNameAlpha}.png`)
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

const scrollTo = function(ele) {
  const [el] = ele;
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export { getIcon, c2c, scrollTo }