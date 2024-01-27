<template lang="html">
  <div class="proposal">
    <div class="head">
      <router-link :to="{ name: 'protocol-about' }" class="space-id">
        <div class="img-wrapper"><img radius="100" :src="`${snapshot.space.data.space.avatar.replace(`ipfs://`, `https://snapshot.4everland.link/ipfs/`)}`" /></div>
        <span class="name">{{ proposal.space.name }}</span>
        <span class="id">{{ proposal.space.id }}</span>
      </router-link>

      <span :class="`state ${proposal.state}`">{{ proposal.state }}</span>
    </div>

    <div class="contents">
      <a :href="`https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`" target="_blank"
        class="link-to-snapshot">
        <h2>{{ proposal.title }} <i class="i-external-link"></i></h2>
      </a>

      <vue-markdown :class="`proposal-body ${expanded ? 'expanded' : ''}`" @click="expanded = true" :source="body" />

      <div class="results">
        <div class="result" v-for="(sc, index) of score" :key="`sc-${index}`" :style="`--pc:${sc.percent}%;`">
          <span class="name"><template v-if="proposal.state == 'closed'"><i class="i-check"
                v-if="sc.leader"></i></template>
            {{ sc.name }}</span>
          <span class="value">{{ sc.valueFormatted }} {{ snapshot.space.data.space.symbol }}</span>
          <span class="pc">{{ sc.percent }}%</span>
        </div>
      </div>
      <div class="elapsed-time">
        <span class="" v-if="proposal.start">Started
          <timeago :datetime="proposal.start * 1000" />
        </span>
        <span class="" v-if="proposal.end">Ended
          <timeago :datetime="proposal.end * 1000" />
        </span>

      </div>
    </div>

  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown-render'
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Proposal",
  data() {
    return {
      expanded: false,
    }
  },
  props: {
    proposal: Array,
  },
  components: {
    VueMarkdown,
  },
  mounted() {

  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
    }),
    score() {
      let arr = {}
      let total = 0
      let temp = []
      let scoresObj = this.proposal.scores
      for (const s of scoresObj) {
        total += Number(s)
        temp.push(s)
      }
      temp.sort((a, b) => { return b - a })
      let highest = temp[0]
      for (let i = 0; i < scoresObj.length; i++) {
        let choice = this.proposal.choices[i]
        let pc = ((Number(scoresObj[i]) / total) * 100).toFixed(2)
        let leader = Number(scoresObj[i]) == highest ? true : false
        arr[choice] = { name: choice, percent: pc, value: scoresObj[i], valueFormatted: scoresObj[i].toLocaleString('en-GB'), leader: leader }
      }
      return arr
    },
    body() {
      return String(this.proposal.body).replace(/]\(ipfs:\/\//g, `](https://snapshot.4everland.link/ipfs/`)
    },
  },
}
</script>
<style lang="scss">
.proposal {
  display: grid;
  gap: 20px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 0 0 1px var(--neutral-5);

  .head {
    display: flex;
    justify-content: space-between;

    .space-id {
      display: grid;
      grid-template: auto 1fr / auto 1fr;
      gap: 5px 10px;

      .ipfs-wrapper {
        grid-column: 1/2;
        grid-row: 1/3;
        margin: auto;
        border-radius: 100px;
      }

      .name {
        grid-column: 2/3;
        grid-row: 1/2;
        font-size: 20px;
        font-weight: 600;
      }

      .id {
        grid-column: 2/3;
        grid-row: 2/3;
      }
    }

    .state {
      padding: 5px 20px;
      border-radius: 100px;
      text-transform: capitalize;
      font-weight: 600;
      margin-bottom: auto;
      color: var(--neutral-0);

      &.closed {
        background-color: var(--light-crimson);
      }

      &.active {
        background-color: var(--light-moss);
      }
    }
  }

  .contents {
    display: grid;
    gap: 20px;

    .link-to-snapshot {
      h2 {
        margin: 0;
        font-size: 1.75rem;
        transition: 100ms ease;

        &:hover {
          color: var(--secondary);
        }
      }
    }

    .proposal-body {

      position: relative;
      z-index: 1;
      color: var(--neutral-2);
      transition: 100ms ease;

      &:not(.expanded) {
        max-height: 200px;
        overflow: hidden;
        cursor: pointer;

        &::before {
          content: '';
          position: absolute;
          height: 66%;
          width: 100%;
          bottom: 0;
          left: 0;
          top: auto;
          background: linear-gradient(to bottom, transparent, var(--neutral-8));
          z-index: 2;
          transition: 100ms ease;
        }

        &:hover {

          color: var(--neutral-0);

          &::before {
            opacity: .5;
          }
        }
      }

      :first-child {
        margin-top: 0;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    .results {
      display: grid;
      gap: 5px;

      .result {
        display: grid;
        grid-template: 1fr / auto auto 1fr;
        gap: 10px;
        padding: 15px;
        align-items: center;
        position: relative;
        z-index: 1;
        border-radius: 8px;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          border-radius: 8px;
          background: var(--neutral-6);
          z-index: -1;
          right: 100%;
          transform: translateX(var(--pc));
        }

        .pc {
          text-align: right;
        }
      }
    }

    .elapsed-time {
      display: grid;
      gap: 5px;
      opacity: .4;
      font-size: .8rem;
    }
  }
}

.ipfs-wrapper {
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    height: 100% !important;
    width: auto !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>