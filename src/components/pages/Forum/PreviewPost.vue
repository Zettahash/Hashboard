<template lang="html">
  <div class="form new-post ui-ele">
    <div class="head-organiser">

      <div class="cancel-container">
        <a @click="$emit('closePreviewModal')" class="btn-link neutral">Edit <i class="i-edit-3"></i></a>
        <a @click="cancelStage++" class="cancel">{{ cancelText }}</a>
      </div>
      <h2>Post preview</h2>
    </div>

    <div class="post">
      <div class="hasher-name-organiser-post-view">
        <img :src="profileImg()" class="wallet-logo" />
        <h2>Hasher #{{ hasherName() }}</h2>
        <small>on {{ new Date() }}</small>
      </div>
      <!-- <vue-markdown class="post-formatted" :source="markdownPreprocess()" /> -->
      <div class="post-formatted">
      <h1>{{payload.postTitle}}</h1>
      <div v-html="payload.postBody"></div>
      </div>

      <div class="form-section">
        <label>Category & tags</label>
        <div class="tags">
          <div class="tag category">{{ payload.category }}</div>
          <div v-for="(tag, index) of payload.tags" :key="index" class="tag">{{ tag }}</div>
        </div>
      </div>
    </div>
    <div class="form-section">
      <a class="btn-link" @click="post">Post now</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import VueMarkdown from 'vue-markdown-render'
import { profileImg, hasherName} from '@/utils/forum'
export default {
  name: 'PreviewPost',
  data() {
    return {
      cancelStage: 0,
      cancelText: 'Cancel',
    }
  },
  props: ['payload',],
  components: {
    // VueMarkdown,
  },
  watch: {
    cancelStage(value) {
      if (value == 2) {
        this.$emit('closeModal')
        this.$emit('closePreviewModal')
      }
      if (value == 1) {
        this.cancelText = 'Confirm cancel'
      } else {
        this.cancelText = 'Cancel'
      }
    },
  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
      wallet: 'wallet',
    }),
  },
  methods: {
    profileImg,hasherName,
    markdownPreprocess() {
      return String(`# ${this.payload.postTitle}\n\n${this.payload.postBody}`)
    },
    async post() {
      let tmpPost = this.payload
      tmpPost.postBody = encodeURIComponent(tmpPost.postBody)
      let result = await this.$store.dispatch('submitPost', { post: tmpPost, id: this.wallet });
      if (result.payload.error) {
        this.$store.commit("setNotification", {
          title: "Something went wrong",
          className: 'error',
          data: result.payload.error,
        })
        return
      }
      if (result.payload.message) {
        this.$store.commit("setNotification", {
          title: "Looks good",
          className: 'good',
          data: result.payload.message,
        })
        this.$emit('closeModal')
        this.$emit('closePreviewModal')
        this.$store.dispatch("fetchPosts", { id: this.wallet, store: this.$store })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/_forum.scss";



.post {
  box-shadow: 0 0 0 1px var(--neutral-6);
  border-radius: 15px;
  max-height: 500px;
  overflow: auto;
  padding: 20px;
  background: var(--neutral-9);

  .post-formatted {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}

.btn-link {
  width: max-content;
  margin-right: auto;
  cursor: pointer;
}

.cancel-container {
  display: flex;
  gap: 10px;

}

.new-post {
  position: absolute;
  width: $small;
  max-width: 80vw;
  height: max-content;
  display: grid;
  border-radius: 15px;
  gap: 20px;
  padding: 20px;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--neutral-9);
    z-index: -1;
    border-radius: 15px;
    box-shadow: 0 0 0 1px var(--neutral-6);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100vh;
    width: 100vw;
    transform: translate(-50%, -50%);
    background: var(--gauze);
    z-index: -2;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  h2 {
    margin-top: 0;
  }

  .form-section {
    display: grid;
    gap: 5px;

    label {
      text-transform: uppercase;
      font-size: .75rem;
      font-weight: 800;
      margin-left: 5px;
      color: var(--neutral-4);
    }
  }

  .form-flex {
    display: flex;
    gap: 20px;
  }

}
</style>