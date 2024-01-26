<template lang="html">
  <div class="forum-topics">
    <h2><template v-if="waiting"><a class="spinner"></a>&nbsp;&nbsp;</template>Comments</h2>
    <LoadingEle short="short" v-if="!topicsReplies" />
    <div v-for="(reply, index) of topicsReplies" :key="index" class="topic">



      <div class="hasher-name-organiser-post-view">
        <img :src="profileImg(reply.op_address)" class="wallet-logo" />
        <h2>Hasher #{{ hasherName(reply.op_address, reply.op_profile_id) }}</h2>
        <small>
          commented
          <timeago :datetime="Number(reply.timestamp)" />
        </small>
      </div>


      <div class="main">
        <p>{{ reply.body }}</p>
        <div class="tags">
          <div v-for="(tag, index) of reply.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div class="stats-organiser">

        <ForumVoteUI :reply="reply" />

        <!--  <div class="view-count"><i class="i-eye"></i> {{ Number(reply.view_count) }}</div>
        <div class="replies-count"><i class="i-message-square"></i> {{ Number(reply.reply_count) }}</div>
         -->
      </div>
    </div>
    <template v-if="topicsReplies.length == 0">
      <p><i>No replies yet. Be the first.</i></p>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName } from '@/utils/forum'
import LoadingEle from '@/components/interface/LoadingEle.vue'
import ForumVoteUI from '@/components/modules/ForumVoteUI.vue'
export default {
  name: 'TopicReplies',
  data() {
    return {
      waiting: true,
      topicsReplies: false,
      topics: ['General', 'Organization', 'Governance', 'Mining', 'Economics', 'Proposals']
    }
  },
  props: ['topic_id', 'wallet'],
  components: { LoadingEle, ForumVoteUI, },
  async mounted() {
    this.fetchAndSetReplies()
    this.intervalFetch = setInterval(() => {
        this.fetchAndSetReplies()
    }, 60000)
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      intervalFetch:false,
      forumPostRepliesWatcherFlag: 'forumPostRepliesWatcherFlag',
    }),
  },
  watch: {
    async forumPostRepliesWatcherFlag() {
      this.fetchAndSetReplies()
    },
  },
  methods: {
    profileImg, hasherName,
    async fetchAndSetReplies() {
      this.waiting = true
      const reply = await this.$store.dispatch("fetchPostReplies", { topic_id: this.topic_id, id: this.wallet, store: this.$store })
      this.topicsReplies = reply
      this.waiting = reply ? false : true
      return reply
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";
</style>
<style lang="scss" scoped>
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";

.forum-topics {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  .topic {
    display: grid;
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
      grid-template: 1fr auto/1fr;
      position: relative;

      p {
        margin: 0;
      }

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
      height: 40px;
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

  .date {
    width: 100%;
  }
}
</style>