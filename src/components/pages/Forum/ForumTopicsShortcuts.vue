<template lang="html">
  <div :class="`forum-category-shortcuts ${categoriesOpen}`" @click="categoriesOpen = !categoriesOpen">

    <a @click.stop="loadForumCacheByCategory(false)" :class="`${!activeCategory || activeCategory=='All'?'active':''} visible`">
      <div class="image all"></div>
      <h2 class="title all">All ({{ totalPosts }})</h2>
    </a>

    <a v-for="(item, index) of forumTopicsOrdered" :key="index" @click.stop="loadForumCacheByCategory(item.toLowerCase())"
      :class="`${activeCategory==item.toLowerCase()?'active':''} ${index >= 4 ? 'hidden' : (countPerCategory(item) > 0 ? 'visible' : (activeCategory==item.toLowerCase()?'visible':'hidden'))}`">
      <div :class="`image ${item.toLowerCase()}`"></div>
      <h2 :class="`title ${item.toLowerCase()}`">{{ item }} ({{ countPerCategory(item) }})</h2>
    </a>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ForumTopicsShortcuts',
  data() {
    return {
      categoriesOpen: false,
      activeCategory: false,
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
    forumTopicsOrdered() {
      let tmp = this.forumTopics.names
      let self = this
      tmp.sort((a, b) => { return self.countPerCategory(a) > self.countPerCategory(b) ? 0 : 1 })
      return tmp
    },
    totalPosts() {
      let tmp = 0
      if (!this.forumTopics.quantities) { return tmp }
      for (const item of this.forumTopics.quantities) {
          tmp += item.total
      }
      return tmp
    },
  },
  methods: {
    countPerCategory(category) {
      let tmp = 0
      if (!this.forumTopics.quantities) { return tmp }
      for (const item of this.forumTopics.quantities) {
        if (item.categories === category.toLowerCase()) {
          tmp = item.total
          break
        }
      }
      return tmp
    },
    loadForumCacheByCategory(category) {
      localStorage.setItem("activeCategory", category)
      this.activeCategory = category
      this.$store.commit('setForumPostsCache', { posts: { results: false } }) 
      let start = this.forumPosts.page * this.forumPosts.paginationLimit
      let end = start + this.forumPosts.paginationLimit
      this.$store.dispatch("fetchPosts", { id: this.wallet, store: this.$store, start: start, end: end, category: category })
    },
  },
  mounted() {
    this.activeCategory = localStorage.getItem("activeCategory") ?  localStorage.getItem("activeCategory") : 'All'
  },
}
</script>
<style lang="scss" scoped>
.forum-category-shortcuts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  &::after {
      content: 'Collapse categories';
      width: 100%;
      color: var(--neutral-4);
      cursor: pointer;

      &:hover {
        color: var(--primary);
      }
    }
  &.false {
    &::after {
      content: 'Show all categories';
    }

    .hidden {
      display: none;

      a {
        transform: scale(0);
      }
    }
  }

  a {
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 0 1px var(--neutral-6);
    display: block;
    cursor: pointer;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 200ms ease;

    &:hover, &.active {
      color: var(--primary);
      box-shadow: 0 0 0 1px var(--primary);
    }

    .title {
      display: flex;
      gap: 10px;
      margin: 0;

      &.general {
        &::before {
          content: '#️⃣';
        }
      }

      &.organization {
        &::before {
          content: '⭐️';
        }
      }

      &.proposals {
        &::before {
          content: '🗳️';
        }
      }

      &.economics {
        &::before {
          content: '💰';
        }
      }

      &.mining {
        &::before {
          content: '⛏️';
        }
      }

      &.governance {
        &::before {
          content: '⚖️';
        }
      }

      &.all {
        &::before {
          content: '⚡️';
        }
      }
    }
  }
}
</style>