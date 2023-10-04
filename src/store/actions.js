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
  async onRequest({ context }) {
    // Create a prepared statement with our query
    const account_identifier = '3d4bf33eb59b5091e0c3ba68ddbcb3c2'
    const database_identifier='91ff20eb-0b59-4b25-99df-a876929d92a1'
    const requestURL = `https://api.cloudflare.com/client/v4/accounts/${account_identifier}/d1/database/${database_identifier}/query`
    let query = await fetch(requestURL, {
      method: 'post',
      mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        'X-Auth-Key':'fce902f03bae264f98365050775918009166a',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'

      },
      body: JSON.stringify({
        // name: "zettahash",
        // params:[],
        sql: "SELECT * FROM users;"
      })
    })
    // commit('setDynamic', { item: 'applicationLoaded', value: true })

    return { data: await query }
  },
}

export default actions