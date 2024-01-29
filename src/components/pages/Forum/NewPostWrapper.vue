<template lang="">
  <div class="flex-overview forum-ui">
    <NewPost v-if="newPost" @close-modal="newPost=false" @preview-modal="setPreviewPost"/>
    <PreviewPost v-if="previewPost" @close-preview-modal="previewPost=false" @close-modal="newPost=false" :payload="previewPost"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NewPost from '@/components/pages/Forum/NewPost.vue';
import PreviewPost from '@/components/pages/Forum/PreviewPost.vue';
export default {
  name: 'NewPostWrapper',
  data() {
    return {
      newPost: true,
      previewPost: false,
    }
  },
  components: { NewPost, PreviewPost, },
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
    }),
  },
  watch: {
    wallet(value) {
      if (value) {
        this.$store.dispatch("fetchPosts", { id: value, store:this.$store })
      }
    },
    newPost(value) {
      if (!value) {
      this.$router.push({ name: 'consensus' })
        
      }
    },
  },
  methods: {
    newPostUI() {
      this.newPost = true
    },
    closeNewPostUI() {
      this.newPost = false
      this.$router.push({ name: 'consensus' })
    },
    setPreviewPost(payload) {
      this.previewPost = payload
    },
  }
}
</script>
<style lang="scss">
</style>