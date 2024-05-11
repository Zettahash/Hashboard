<template lang="html">
  <div class="form new-post ui-ele">
    <div class="head-organiser">
      <a @click="cancelStage++" class="cancel">{{ cancelText }}</a>
      <h2><b>Commenting on</b><span>{{ topic }}</span></h2>
    </div>
    <div :class="`form-section ${postBodyNotice}`" :error="postBodyDataDifference">
      <label>Comment</label>
      <div class="editor-wrapper">
        <quill-editor :options="editorOption" :disabled="false" @change="postBody=$event.html; postBodyText=$event.text"></quill-editor>
      </div>
    </div>
    <div class="form-section">
      <label>Tags</label>
      <div class="form-flex">
        <div :class="`tags ${tagsInput.length > 0 || tags.length > 0 ? 'active' : ''}`">
          <div v-for="(tag, index) of tags" :key="index" @click="removeTag(index)" class="tag">{{ tag }}</div>
          <input v-model="tagsInput" @keyup.enter="setTag" />
        </div>

      </div>
    </div>
    <div class="form-section">
      <a class="btn-link" @click="preview = true">Reply</a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { quillEditor } from 'vue3-quill'

export default {
  name: 'NewComment',
  components:{quillEditor},
  data() {
    return {
      editorOption: {
        placeholder: 'Body contents',
        theme: 'snow',
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'image'],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
          ['blockquote', 'code-block', 'link'],
          [{ 'color': [] }, 'clean'],
          ],
        },
      },
      postBodyText: '',
      preview: false,
      cancelStage: 0,
      cancelText: 'Cancel',
      postTitle: '',
      postTitleDataDifference: '',
      postTitleNotice: 'neutral',
      postBody: '',
      postBodyDataDifference: '',
      postBodyNotice: 'neutral',
      category: 'general',
      tagsInput: '',
      tags: [],
    }
  },
  props: ['topic', 'topic_id', 'wallet'],
  watch: {
    cancelStage(value) {
      if (value == 2) { this.$emit('closeModal') }
      if (value == 1) {
        this.cancelText = 'Confirm cancel'
      } else {
        this.cancelText = 'Cancel'
      }
    },
    postTitle() {
      this.cancelStage = 0
      this.postTitleNotice = 'neutral'
    },
    postBody() {
      this.cancelStage = 0
      this.postBodyNotice = 'neutral'
    },
    category() { this.cancelStage = 0 },
    preview(value) {
      if (value) {
        let flag = 0
        const bytes = (new TextEncoder().encode(this.postBody)).length
        console.log(bytes, this.postBodyText.length)
        if ((bytes < this.application.postTextBytesMin) || (this.postBodyText.length < this.application.postTextCharacterMin)) {
          this.postBodyNotice = 'error3'
          this.postBodyDataDifference = `Add ${(this.application.postTextCharacterMin - this.postBodyText.length) || this.application.postTextCharacterMin} characters.`
          flag++
        }
        if (this.postBodyText.length > this.application.postBodyCharacterLimit) {
          this.postBodyNotice = 'error4'
          this.postBodyDataDifference = `Remove ${this.postBodyText.length - this.application.postBodyCharacterLimit} characters.`
          flag++
        }
        if (bytes > this.application.postBodyByteLimit) {
          this.postBodyNotice = 'error5'
          this.postBodyDataDifference = `Reduce by ${bytes - this.application.postBodyByteLimit} bytes or utilise external links for your content.`
          flag++
        }
        if (flag == 0) {
          this.reply()
        }
        this.preview = false
      }
    },
  },
  mounted() {

  },
  computed: {
    ...mapGetters({
      application: 'application',
      forumProfile: 'forumProfile',
    }),
  },
  methods: {
    async reply() {
      let tmpPost = {
        topic_id: this.topic_id,
        postBody: encodeURIComponent(this.postBody),
        tags: this.tags,
      }
      let result = await this.$store.dispatch('submitReply', { post: tmpPost, id: this.wallet });
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
        this.$store.commit("setForumPostRepliesWatcherFlag", Date.now())
      }
    },
    setTag() {
      if (this.tagsInput.trim().length > 0) {
        this.tags.push(this.tagsInput)
        this.tagsInput = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    payload() {
      return {
        topic_id: this.topic_id,
        postBody: this.postBody,
        tags: this.tags,
      }
    },
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_quill.scss";
</style>
<style lang="scss" scoped>
@import "@/assets/scss/_constants.scss";
@import "@/assets/scss/form.scss";

.btn-link {
  width: max-content;
  margin-right: auto;
  cursor: pointer;
}


</style>