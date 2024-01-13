<template lang="html">
  <div class="forum-topics">
    <router-link v-for="(topic, index) of forumPostsCache" :to="{ path: `/consensus/topic/${topic.topic_id}` }"
      :key="index" class="topic">
      <img :src="profileImg(topic.op_address)" class="profile-logo"
        :title="`Original Poster: Hasher #${opName(topic.op_address, topic.op_profile_id)}`" />
      <div class="main">
        <h3>{{ topic.topic }}</h3>
        <div class="tags">
          <div class="tag category">{{ topic.categories }}</div>
          <div v-for="(tag, index) of topic.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div class="stats-organiser">
        <div class="view-count"><i class="i-eye"></i> {{ Number(topic.view_count) }}</div>
        <div class="replies-count"><i class="i-message-square"></i> {{ Number(topic.reply_count) }}</div>
        <div class="date">posted
          <timeago :datetime="Number(topic.timestamp)" />
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { minidenticon } from 'minidenticons'
export default {
  name: 'ForumTopics',
  data() {
    return {
      topics: ['General', 'Organization', 'Governance', 'Mining', 'Economics', 'Proposals']
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      forumPostsCache: 'forumPostsCache',
    }),
  },
  methods: {
    opName(address, id) {
      return `${address.substr(address.length - 6)}${id}`
    },
    profileImg(address) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(address))}`
    },
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";

.forum-topics {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  .topic {
    display: flex;
    gap: 15px;
    border-radius: 20px;
    transition: 200ms ease;
    padding: 20px;
    box-shadow: 0 0 0 1px var(--neutral-6);
    cursor: pointer;
    align-items: center;

    &:hover {
      box-shadow: 0 0 0 1px var(--neutral-4);

    }

    .main {
      flex-shrink: 0;
      flex-grow: 1;
      display: grid;
      grid-template: 1.5rem 1fr / 1fr;
      position: relative;

      h3 {
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tags {
        grid-row: 2/3;
        padding-left: 0;
        font-size: .9rem;
      }
    }

    .date {
      color: var(--neutral-5);
      font-size: .9rem;
    }

    .profile-logo {
      height: 60px;
      aspect-ratio: 1/1;
      background: var(--neutral-10);
      border-radius: 100px;
    }
  }

}</style>