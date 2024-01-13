<template lang="html">
  <div class="flex-overview forum-ui">
    <div class="post" v-if="thisTopic">
    <div class="hasher-name-organiser-post-view">
        <img :src="profileImg(thisTopic.op_address)" class="wallet-logo" />
        <h2>Hasher #{{ opName(thisTopic.op_address, thisTopic.op_profile_id) }}</h2>
        <small><timeago :datetime="Number(thisTopic.timestamp)" /></small>
      </div>


      <div class="main">
        <h3>{{ thisTopic.topic }}</h3>
        <div class="tags">
          <div class="tag category">{{ thisTopic.categories }}</div>
          <div v-for="(tag, index) of thisTopic.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div class="view-count"><i class="i-eye"></i> {{ Number(thisTopic.view_count) + 1 }}</div>
      <vue-markdown class="post-formatted" :source="markdownPreprocess()" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { minidenticon } from 'minidenticons'
import VueMarkdown from 'vue-markdown-render'
export default {
  name: 'ViewTopic',
  components:{VueMarkdown},
  data() {
    return {
      topic_id: this.$route.params.topic_id,
      topics: ['General', 'Organization', 'Governance', 'Mining', 'Economics', 'Proposals']
    }
  },
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
    this.$store.dispatch("viewPost", { id: this.topic_id, address:this.wallet, store: this.$store })
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      forumPostsCache: 'forumPostsCache',
      wallet: 'wallet',
    }),
    thisTopic() {
      let post = false
      if(!this.forumPostsCache){return false}
      for (const topic of this.forumPostsCache) {
        if (Number(topic.topic_id) === Number(this.topic_id)) {
          post = topic
          break
        }
      }
      return post
    },
  },
  methods: {
    opName(address, id) {
      return `${address.substr(address.length - 6)}${id}`
    },
    profileImg(address) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(address))}`
    },
    markdownPreprocess() {
      return String(`# ${this.thisTopic.topic}\n\n${this.thisTopic.body}`)
    },
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";

</style>