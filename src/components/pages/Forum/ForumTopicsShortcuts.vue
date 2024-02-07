<template lang="html">
  <div :class="`forum-category-shortcuts ${categoriesOpen}`" @click="categoriesOpen = true">
    <a v-for="(item, index) of forumTopicsOrdered" :key="index"
      :class="`${index >= 4 ? 'hidden' : (countPerCategory(item) > 0 ? 'visible' : 'hidden')}`">
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
  }
}
</script>
<style lang="scss" scoped>
.forum-category-shortcuts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  &.false {
    &::after {
      content: 'Show all categories';
      width: 100%;
      color: var(--neutral-4);
      cursor: pointer;

      &:hover {
        color: var(--primary);
      }
    }

    .hidden {
      display: none;
    }
  }

  a {
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 0 1px var(--neutral-6);
    display: block;
    cursor: pointer;
    &:hover {
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
    }
  }
}</style>