<template lang="html">
  <div class="forum-topics">
    <h2><template v-if="waiting"><a class="spinner"></a>&nbsp;&nbsp;</template>Comments</h2>
    <LoadingEle short="true" v-if="!topicsReplies" />
    <div v-for="(reply, index) of topicsReplies" :key="index" class="reply">



      <div class="hasher-name-organiser-reply-view">
        <img :src="profileImg(reply.op_address)" class="wallet-logo" />
        <h2>Hasher #{{ hasherName(reply.op_address, reply.op_profile_id) }}</h2>
        <small>
          commented
          <timeago :datetime="Number(reply.timestamp)" />
        </small>
      </div>


      <div class="main">
        <div v-html="decodeURIComponent(reply.body)"></div>
        <div class="tags">
          <div v-for="(tag, index) of reply.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
      <div class="stats-organiser">

        <ForumVoteUI :reply="reply" />
      </div>

      
    </div>
      <a v-if="topicsReplies.length>0 && !newReplyAfter" class="btn left" @click="$emit('newReply')">Add a comment</a>
    <template v-if="topicsReplies.length == 0">
      <p><i>No replies yet. Be the first.</i></p>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName } from '@/utils/forum.js'
import LoadingEle from '@/components/interface/LoadingEle.vue'
import ForumVoteUI from '@/components/modules/ForumVoteUI.vue'
export default {
  name: 'TopicReplies',
  data() {
    return {
      waiting: true,
      topicsReplies: false,
    }
  },
  props: ['topic_id', 'wallet', 'newReplyAfter'],
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
      setTimeout(() => { this.waiting = reply ? false : true },1000)
      return reply
    }
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
  gap: 30px;
  margin-top: 30px;

  .reply {
    display: grid;
    gap: 15px;
    border-radius: $radius1;
    transition: 200ms ease;
    box-shadow: 0 0 0 1px var(--neutral-6);
    align-items: center;
    position: relative;

    &::after{
      content: '';
      height: 30px;
      width: 2px;
      background: var(--neutral-6);
      position:absolute;
      bottom:-30px;
      left: 30px;
    }


    .main {
      flex-shrink: 0;
      flex-grow: 1;
      display: grid;
      grid-template: 1fr auto/1fr;
      position: relative;
      padding-left: 15px; padding-right: 15px

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

  }

}

.stats-organiser {
  display: flex;
  gap: 5px 20px;
  flex-wrap: wrap;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 15px;

  .date {
    width: 100%;
  }
}

.hasher-name-organiser-reply-view {
  display: grid;
  gap: 2px 10px;
  align-items: center;
  padding: 10px 15px 10px 15px;
  box-shadow: 0 1px 0 0 var(--neutral-6);
  grid-template-columns: auto 1fr;

  h2 {
    margin: 0;
    grid-column: 2/3;
    grid-row: 1/2;
    font-size: 1.2rem;
    color: var(--neutral-4);
  }

  small {
    grid-column: 2/3;
    grid-row: 2/3;
    color: var(--neutral-5);
    font-size: 0.7rem;
  }

  .wallet-logo {
    height: 2rem;
    grid-column: 1/2;
    grid-row: 1/3;
  }
}
</style>