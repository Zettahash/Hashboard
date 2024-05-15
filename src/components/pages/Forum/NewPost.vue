<template lang="html">
  <div class="form new-post ui-ele">
    <div class="head-organiser">

      <a @click="cancelStage++" class="cancel">{{ cancelText }}</a>
      <h2>New Post</h2>
    </div>

    <div :class="`form-section ${postTitleNotice}`" :error="postTitleDataDifference">
      <label>Title</label>
      <input v-model="postTitle" />
    </div>
    <div :class="`form-section ${postBodyNotice}`" :error="postBodyDataDifference">
      <label>Body</label>
      <div class="editor-wrapper">
        <quill-editor :options="editorOption" :disabled="false"
          @change="postBody = $event.html; postBodyText = $event.text"></quill-editor>
      </div>
    </div>
    <div class="form-section">
      <label>Category & tags</label>
      <div class="form-flex">
        <select v-model="category">
          <option v-for="topic of forumTopics.names" :key="topic" :value="topic.toLocaleLowerCase()">{{ topic }}</option>
        </select>
        <div :class="`tags ${tagsInput.length > 0 || tags.length > 0 ? 'active' : ''}`">
          <div v-for="(tag, index) of tags" :key="index" @click="removeTag(index)" class="tag">{{ tag }}</div>
          <input v-model="tagsInput" @keyup.enter="setTag" />
        </div>

      </div>
    </div>
    <div class="form-section">
      <a class="btn-link" @click="preview = true">Preview</a>
    </div>
  </div>
</template>
<script setup>
</script>
<script>
import { mapGetters } from 'vuex';
// import { quillEditor } from 'vue3-quill'

export default {
  name: 'NewPost',
  components: {
    // quillEditor,
  },
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
      height: '100px',
      textAreaInput: 0,
      preview: false,
      cancelStage: 0,
      cancelText: 'Cancel',
      postTitle: '',
      postTitleDataDifference: '',
      postTitleNotice: 'neutral',
      postBody: '',
      postBodyText: '',
      postBodyDataDifference: '',
      postBodyNotice: 'neutral',
      category: 'general',
      tagsInput: '',
      tags: [],
    }
  },
  watch: {
    textAreaInput() {
      this.height = 0
      this.height = `${this.$refs.textArea.scrollHeight}px`
    },
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
        const bytes = (new TextEncoder().encode(this.postBody)).length
        let flag = 0
        if (this.postTitle.length < this.application.postTextCharacterMin) {
          this.postTitleNotice = 'error'
          this.postTitleDataDifference = `Add ${this.application.postTextCharacterMin - this.postTitle.length} characters.`
          flag++
        }
        if (this.postTitle.length > this.application.postTitleCharacterLimit) {
          this.postTitleNotice = 'error2'
          this.postTitleDataDifference = `Remove ${this.postTitle.length - this.application.postTitleCharacterLimit} characters.`
          flag++
        }
        if ((bytes < this.application.postTextBytesMin) || (this.postBodyText.length < this.application.postTextCharacterMin)) {
          this.postBodyNotice = 'error3'
          this.postBodyDataDifference = `Add ${this.application.postTextCharacterMin - this.postBodyText.length} characters.`
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
          this.$emit('previewModal', this.payload())
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
      forumTopics: 'forumTopics',
    }),
  },
  methods: {
    updateContent(e) {
      console.log(e)
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
        postTitle: this.postTitle,
        postBody: this.postBody,
        category: this.category,
        tags: this.tags,
      }
    },
  }
}
</script>
<style lang="scss">
@import "/src/assets/scss/_quill.scss";
</style>
<style lang="scss" scoped>
@import "/src/assets/scss/_constants.scss";

.btn-link {
  width: max-content;
  margin-right: auto;
  cursor: pointer;
}

.new-post {
  position: absolute;
  width: $small;
  max-width: 80vw;
  height: max-content;
  display: grid;
  border-radius: $radius1;
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
    border-radius: $radius1;
    box-shadow: 0 0 0 1px var(--neutral-6);
  }

  &::after {
    content: '';
    position: fixed;
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

    &[class*='error'] {

      input,
      textarea {
        box-shadow: 0 0 0 1px var(--crimson);
      }

      &::after {
        color: var(--crimson);
        font-size: .75rem;
      }
    }

    &.error {
      &::after {
        content: 'This field requires at least 10 characters of text. ' attr(error);
      }
    }

    &.error2 {
      &::after {
        content: 'This field is limited to 1000 characters. ' attr(error);
      }
    }

    &.error3 {
      &::after {
        content: 'This field requires at least 10 characters of text. ' attr(error);
      }
    }

    &.error4 {
      &::after {
        content: 'This field is limited to 20,000 characters. ' attr(error);
      }
    }

    &.error5 {
      &::after {
        content: 'Posts are limited to 95 KB. ' attr(error);
      }
    }

    .input,
    input,
    textarea,
    select {
      background: var(--neutral-9);
      box-shadow: 0 0 0 1px var(--neutral-6);
      border: 0;
      padding: 10px 20px;
      color: var(--neutral-0);
      font-size: 1rem;
      border-radius: $radius2;
      line-height: 1.5;
      font-family: $sans-serif;

      &:focus {
        outline: none;
        background: var(--neutral-9);
        box-shadow: 0 0 0 1px var(--primary);

      }
    }

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
    align-items: baseline;
  }

  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    background: var(--neutral-9);
    box-shadow: 0 0 0 1px var(--neutral-6);
    border-radius: $radius2;
    padding: 10px 10px;
    gap: 10px;

    input {
      &:focus {
        box-shadow: none;
        border-radius: unset;
      }
    }

    &.active {
      background: var(--neutral-9);

    }

    .tag {
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--blue-4);
      color: var(--secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;

      &:hover {
        &::after {
          content: "\ea11";
          font-family: "ico" !important;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -moz-osx-font-smoothing: grayscale;
          transform: translateX(5px);
        }
      }
    }

    input {
      padding: 0;
      box-shadow: unset;
      background: transparent;

      &:focus {
        background: transparent;
      }
    }
  }
}
</style>