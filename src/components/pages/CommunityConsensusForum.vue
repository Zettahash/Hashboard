<template lang="">
  <div class="flex-overview forum-ui">
    <!-- <ForumFilters /> -->
    <div class="head-organiser">
    <h1>Welcome,</h1>
    <div class="hasher-name-organiser">
    <img :src="profileImg()" class="wallet-logo" />
    <h2>Hasher #{{hasherName()}}</h2>
    </div>
    </div>
    <div>
      <a class="btn" @click="newPost = true">New Post</a>
    </div>
    <NewPost v-if="newPost" @close-modal="newPost=false" @preview-modal="setPreviewPost"/>
    <PreviewPost v-if="previewPost" @close-preview-modal="previewPost=false" @close-modal="newPost=false" :payload="previewPost"/>
    <ForumTopics />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NewPost from '@/components/pages/Forum/NewPost.vue';
import PreviewPost from '@/components/pages/Forum/PreviewPost.vue';
import ForumTopics from '@/components/pages/Forum/ForumTopics.vue';
import { profileImg, hasherName} from '@/utils/forum'

export default {
  name: 'CommunityConsensusForum',
  data() {
    return {
      newPost: false,
      previewPost: false,
    }
  },
  components: { ForumTopics, NewPost, PreviewPost, },
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
    if (this.wallet) {
      this.$store.dispatch("fetchPosts", { id: this.wallet, store:this.$store })
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      wallet: 'wallet',
      forumPostsCache: 'forumPostsCache',
    }),
  },
  watch: {
    wallet(value) {
      if (value) {
        this.$store.dispatch("fetchPosts", { id: value, store:this.$store })
      }
    }
  },
  methods: {
    profileImg, hasherName,
    newPostUI() {
      this.newPost = true
    },
    closeNewPostUI() {
      this.newPost = false
    },
    setPreviewPost(payload) {
      this.previewPost = payload
    },
  }
}
</script>
<style lang="scss">
</style>