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
      <ForumTopicsShortcuts />
    <div class="head-span-flex">
      <div class="tabs-switcher" data-label="Sorting">
        <div :class="`tab ${activeTab=='latest'?'active':''}`" @click="activeTab='latest'">Latest</div>
        <div :class="`tab ${activeTab=='popular'?'active':''}`" @click="activeTab='popular'">Votes</div>
        <div :class="`tab ${activeTab=='views'?'active':''}`" @click="activeTab='views'">Views</div>
        <div :class="`tab ${activeTab=='comments'?'active':''}`" @click="activeTab='comments'">Comments</div>
      </div>
      <a class="btn" @click="newPost = true"><i class="i-plus"></i> New Post</a>
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
import ForumTopicsShortcuts from '@/components/pages/Forum/ForumTopicsShortcuts.vue';
import { profileImg, hasherName } from '@/utils/forum'

export default {
  name: 'CommunityConsensusForum',
  data() {
    return {
      newPost: false,
      previewPost: false,
      activeTab: 'latest',
    }
  },
  components: { ForumTopics, NewPost, PreviewPost, ForumTopicsShortcuts, },
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
    if (this.wallet && !this.forumPostsCache) {
      this.loadForumCache()
    }
    if (localStorage.getItem('forumActiveTab')) {
      this.activeTab = localStorage.getItem('forumActiveTab')
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      wallet: 'wallet',
      forumPosts: 'forumPosts',
      forumPostsCache: 'forumPostsCache',
      forumTopics: 'forumTopics',
    }),
  },
  watch: {
    wallet(value) {
      if (value) {
        this.loadForumCache()
      }
    },
    activeTab(value) {
      localStorage.setItem('forumActiveTab', value)
      this.reorderView()
    },
  },
  methods: {
    profileImg, hasherName,
    reorderView() {
      let tab = this.activeTab
      let tmp = this.forumPostsCache
      if(!tmp){return}
      switch (tab) {
        case 'latest':
          tmp.sort((a, b) => { return a.timestamp > b.timestamp ? 0 : 1 })
          break;
        case 'popular':
          tmp.sort((a, b) => { return a.resultant_score > b.resultant_score ? 0 : 1 })
          break;
        case 'views':
          tmp.sort((a, b) => { return Number(a.view_count) > Number(b.view_count) ? 0 : 1 })
          break;
          case 'comments':
          tmp.sort((a, b) => { return Number(a.reply_count ? a.reply_count : 0) > Number(b.reply_count ? b.reply_count : 0) ? 0 : 1 })
          break;
        default:
      }
      this.$store.dispatch("setForumPostsCache", { posts: tmp })
      //   setForumPostsCache(state, payload) {
      // state.forumPostsCache = payload.posts
    },
    loadForumCache() {
      let start = this.forumPosts.page * this.forumPosts.paginationLimit
      let end = start + this.forumPosts.paginationLimit
      this.$store.dispatch("fetchPosts", { id: this.wallet, store: this.$store, start: start, end: end })
    },
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
<style lang="scss"></style>