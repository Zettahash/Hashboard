<template lang="html">
  <div class="flex-overview forum-ui column">
    <router-link :to="{ name: 'consensus' }" class="btn-link neutral subtle"><i class="i-arrow-left"></i>
      Back</router-link>

    <div class="post" v-if="thisTopic">
      <div class="hasher-name-organiser-post-view">
        <img :src="profileImg(thisTopic.op_address)" class="wallet-logo" />
        <h2>Hasher #{{ hasherName(thisTopic.op_address, thisTopic.op_profile_id) }}</h2>
        <small>
          <timeago :datetime="Number(thisTopic.timestamp)" />
        </small>
      </div>



      <div class="main topic-view">
        <div class="tags">
          <div class="tag category">{{ thisTopic.categories }}</div>
          <div v-for="(tag, index) of thisTopic.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
        <div class="post-formatted">
        <h1>{{thisTopic.topic}}</h1>
        <div v-html="decodeURIComponent(thisTopic.body)"></div>
        </div>
        <div class="stats-organiser" v-if="thisTopic">
          <ForumVoteUI :topic="thisTopic" />
          <div class="view-count"><i class="i-eye"></i> {{ Number(thisTopic.view_count) + 1 }}</div>
          <div class="replies-count"><i class="i-message-square"></i> {{ Number(thisTopic.reply_count) }}</div>
        </div>
        <div class="reply-button-holder">
          <a class="btn" v-if="!newReply" @click="newReply = true; newReplyAfter = false">Add a comment</a>
        </div>
      </div>
    </div>
    <div ref="newPostEle"></div>
    <NewComment v-if="newReply" @close-modal="newReply = false" @preview-modal="setPreviewPost" :topic="thisTopic.topic"
      :topic_id="topic_id" :wallet="wallet" />

    <TopicReplies :newReplyAfter="newReplyAfter" :topic_id="topic_id" :wallet="wallet"
      @new-reply="newReplyAfter = true; newReply = false" />

    <NewComment v-if="newReplyAfter" @close-modal="newReplyAfter = false" @preview-modal="setPreviewPost"
      :topic="thisTopic.topic" :topic_id="topic_id" :wallet="wallet" />

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName } from '@/utils/forum'
import NewComment from './NewComment.vue'
import TopicReplies from './TopicReplies.vue'
import { ref } from "vue";
import ForumVoteUI from '@/components/modules/ForumVoteUI.vue'

export default {
  name: 'ViewTopic',
  components: { NewComment, TopicReplies, ForumVoteUI },
  data() {
    return {
      newReply: false,
      newReplyAfter: false,
      topic_id: this.$route.params.topic_id,
    }
  },
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
    this.$store.dispatch("viewPost", { id: this.topic_id, address: this.wallet, store: this.$store })
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      forumPostsCache: 'forumPostsCache',
      wallet: 'wallet',
    }),
    thisTopic() {
      let post = false
      if (!this.forumPostsCache) { return false }
      for (const topic of this.forumPostsCache) {
        if (Number(topic.topic_id) === Number(this.topic_id)) {
          post = topic
          break
        }
      }
      return post
    },
  },
  watch: {
    newReply(value) {
      if (value == true) {
        const newPostEle = ref < HTMLElement | null > (null);

        // refs set with a v-for are returned as an array
        newPostEle.value?.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
  methods: {
    hasherName,
    profileImg,
    markdownPreprocess() {
      return String(`# ${this.thisTopic.topic}\n\n${this.thisTopic.body}`)
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";

.stats-organiser {
  display: flex;
  margin: 30px 0;
  gap: 20px;
  align-items: center;
}

.reply-button-holder {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>