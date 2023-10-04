/* eslint-disable */


const actions = {
  init({ context, getters, dispatch, commit, rootGetters }) {



    for (const [key, value] of Object.entries(localStorage)) {
      commit("setDynamic", {
        item: key,
        value: value
      })
    }

    // let db = dispatch('backendAPI', { commit, dispatch })

    commit("setDynamic", {
      item: 'name',
      value: process.env.VUE_APP_APPLICATION_NAME
    })

    commit('setDynamic', { item: 'applicationLoaded', value: true })

  },
  async backendAPI({ commit }, url) {
    // Default options are marked with *
    const requestURL = `https://api.flat18.co.uk/zettahash/`
    let query = await fetch(requestURL, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({ data: url })
    })
    // commit('setDynamic', { item: 'applicationLoaded', value: true })

    return { data: await query }

  },
  test(payload) {
    console.log(payload)
  },

}

export default actions