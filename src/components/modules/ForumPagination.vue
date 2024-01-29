<template lang="html">
  <div class="flex-overview forum-ui pagination">

    <a v-if="forumPosts.page > 0" :class="`btn`" @click="fetchPosts(1)"><i class="i-chevrons-left"></i></a>
    <template v-if="forumPosts.total > forumPosts.paginationLimit">
    <a v-for="index in pagesAhead" :key="index" :class="`btn ${(forumPosts.page + 1) == index ? 'active' : ''}`"
      @click="fetchPosts(index)">{{ index }}</a></template>
    <a v-if="forumPosts.page < pagesAhead && (pagesAhead > 1)" :class="`btn`" @click="fetchPosts(pagesAhead)"><i
        class="i-chevrons-right"></i></a>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ForumPagination',
  data() {
    return {
      newPost: false,
      previewPost: false,
      start: false,
      end: false,
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      wallet: 'wallet',
      forumPostsCache: 'forumPostsCache',
      forumPosts: 'forumPosts',
    }),
    pagesAhead() {
      return Math.ceil(this.forumPosts.total / this.forumPosts.paginationLimit)
    },
  },
  watch: {

  },
  methods: {
    fetchPosts(index) {
      let start = (index - 1) * this.forumPosts.paginationLimit
      this.start = start < 0 ? 0 : start
      this.end = start + this.forumPosts.paginationLimit
      this.$store.commit("setForumPosts", { page: index })
      this.$store.commit("setForumPostsCache", { posts: false })
      this.$store.dispatch("fetchPosts", { id: this.wallet, store: this.$store, start: this.start, end: this.end })
    },
  }
}
</script>
<style lang="scss">
.pagination {
  .btn {
    padding: 5px 8px;
    border-radius: 100px;
    background: transparent;

    &.active {
      background: var(--primary);

    }

    &:hover {
      background: var(--neutral-6);
      text-shadow: unset;
    }
  }
}</style>