/* eslint-disable */


const actions = {
  init({ context, getters, dispatch, commit, rootGetters }) {



    for (const [key, value] of Object.entries(localStorage)) {
      commit("setDynamic", {
        item: key,
        value: value
      })
    }

    let db = dispatch('onRequest', { commit, dispatch })
    console.log(db)

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
      async onRequest({context}) {
      // Create a prepared statement with our query
      const ps = context.env.ZETTAHASH_D1.prepare('SELECT * from users');
      const data = await ps.first();
        let response = Response.json(data)
        console.log(AuthenticatorResponse)
      return response
    },
}

export default actions