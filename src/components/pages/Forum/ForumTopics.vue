<template lang="html">
  <div class="forum-topics">
    <LoadingEle short="true" v-if="!forumPostsCache"/>
    <template v-if="forumPostsCache">
    <div v-for="(topic, index) of forumPostsCache" @click="$router.push({ path: `/consensus/topic/${topic.topic_id}` })"
      :key="index" class="topic">
      <img :src="profileImg(topic.op_address)" class="profile-logo"
        :title="`Original Poster: Hasher #${hasherName(topic.op_address, topic.op_profile_id)}`" />
      <div class="main">
        <h3>{{ topic.topic }}</h3>
        <div class="tags">
          <div class="tag category">{{ topic.categories }}</div>
          <div v-for="(tag, index) of topic.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div class="stats-organiser">
        <ForumVoteUI :topic="topic"/>
        <div class="view-count"><i class="i-eye"></i> {{ Number(topic.view_count) }}</div>
        <div class="replies-count"><i class="i-message-square"></i> {{ Number(topic.reply_count) }}</div>
        <div class="date">posted
          <timeago :datetime="Number(topic.timestamp)" />
        </div>
      </div>
    </div></template>
    <template v-if="forumPostsCache.length==0">
      <p><i>No posts yet.</i></p>
    </template>
    <template v-else>
      <ForumPagination />
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoadingEle from '@/components/interface/LoadingEle.vue'
import { profileImg, hasherName } from '@/utils/forum.js'
import ForumVoteUI from '@/components/modules/ForumVoteUI.vue'
import ForumPagination from '@/components/modules/ForumPagination.vue'

export default {
  name: 'ForumTopics',
  data() {
    return {
    }
  },
  components:{LoadingEle, ForumVoteUI, ForumPagination},
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
    profileImg, hasherName,
  }
}
</script>
<style lang="scss">
@import "/src/assets/scss/_constants.scss";
@import "/src/assets/scss/_forum.scss";
</style>
<style lang="scss" scoped>
@import "/src/assets/scss/_constants.scss";
@import "/src/assets/scss/_forum.scss";

.forum-topics {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  .topic {
    display: flex;
    gap: 15px;
    border-radius: $radius1;
    transition: 200ms ease;
    padding: 20px;
    box-shadow: 0 0 0 1px var(--neutral-6);
    cursor: pointer;
    align-items: center;

  @media (max-width:$x-small) {
    display:grid;
    grid-template: 1fr auto / 1fr auto;
    .main{
      grid-column: 1/3;
      grid-row:2/3;
    }
    .stats-organiser{
      grid-column: 2/3;
      grid-row:1/2;
    }
  }
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

}

.stats-organiser {
  display: flex;
  gap: 5px 20px;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 0;
  justify-content: end;
  text-align: right;
  .vote-score{
    display: flex;
    gap: 10px;
  }
  .date{
    width: 100%;
  }
}
</style>