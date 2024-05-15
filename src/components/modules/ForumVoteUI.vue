<template lang="html">
  <div v-if="parent" :class="`vote-score ${parent.direction}`"><i
      :class="`i-up-short-${parent.direction == 'up' ? 'solid' : 'stroke'} ${parent.change}`"
      @click.stop="vote(parent.topic_id, 'up')"></i>
    <span :class="`score-${parent.direction}`">{{ score(parent.resultant_score, parent.direction) }}</span>
    <i :class="`i-down-short-${parent.direction == 'down' ? 'solid' : 'stroke'} ${parent.change}`"
      @click.stop="vote(parent.topic_id, 'down')"></i>
  </div>
</template>
<script>
import { voteTopic } from '@/utils/forum.js'

export default {
  name: 'ForumVoteUI',
  props: ['topic', 'reply',],
  data() { return { replyObject: this.reply || false, } },
  methods: {
    voteTopic,
    vote(id, direction) {
      let obj = this.replyObject ? [id, this.replyObject.comment_id] : id
      if (this.replyObject) {
        if (this.replyObject.direction === direction) {
          this.replyObject.resultant_score = direction === 'up' ? this.replyObject.resultant_score - 1 : this.replyObject.resultant_score + 1
          this.replyObject.direction = 'NULL'
        }
        else {
          this.replyObject.resultant_score = direction === 'up' ? this.replyObject.resultant_score + 1 : this.replyObject.resultant_score - 1
          this.replyObject.direction = direction
        }
        this.replyObject.change = 'change'
      }
      this.voteTopic(obj, direction)
    },
    score(result, direction) {
      if (direction && direction.length > 0 && direction !== 'NULL') {
        return Number(result || '0')
      }
      return 'Vote'
    },
  },
  computed: {
    parent() {
      return this.topic ? this.topic : (this.replyObject ? this.replyObject : false)
    }
  },
}
</script>
<style lang="scss"></style>