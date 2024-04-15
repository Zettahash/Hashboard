<!--
Example to use:
this.$store.commit('setNotification', {
  index: 1,
  title: 'Heading',
  data: 'Message',
  active: true
})
-->

<template lang="">
<div class="notifications">
    <div v-for="(notification, index) of notificationsActive" @click="close(notification.index)" :z="notification.index" :key="index" :class="notification.className + ' notification'" :style="stackStyle(notification.index, index)">
      <span class="title">{{notification.title}}</span>
      <span class="data">{{notification.data}}</span>
      <!-- <span class="time">{{notification.time}}</span> -->
    </div>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Notifications",
  computed: {
    ...mapGetters({
      application: "application",
    }),
    notificationsActive() {
      let array = [],
        index = 0;
      for (const n of this.application.notifications) {
        n.index = index
        if (n.active && n.active !== 'false') {
          array.push(n)
        }
        index++
      }
      return array
    }
  },
  methods: {
    close(index) {
      this.$store.commit("closeNotification", index)
    },
    //CLASS NAMES ARE warn, error, good and neutral/default/empty
    // test(className) {
    //   this.$store.commit("setNotification", {
    //     title: "Test Notification",
    //     data: "This is a sample data payload for a notification",
    //   })
    // },
    stackStyle(index, stack) {
      let length = this.notificationsActive.length,
        numb = stack + 1
      if (length - numb == 2) {
        return `z-index:${index}; top: 1px; transform: scale(.9)translateY(-3px);opacity: 1;`
      }
      if (length - numb == 1) {
        return `z-index:${index}; top: 10px; transform: scale(.95)translateY(0);opacity: 1;`
      }
      if (length - numb == 0) {
        return `z-index:${index}; top: 20px; transform: scale(1)translateY(0);opacity: 1;`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_constants.scss";

.notifications {
  position: fixed;
  top: 60px;
  right: 15px;
  left: auto;
  margin: auto;
  width: $x-small * .8;
  max-width: 70vw;
  z-index: 9999;
  @media (max-width: $x-small) {
    right: 0;
  z-index: 499;
  max-width: 90vw;
  width: 90vw;
  left: 0;
  }

  .notification {
    color: var(--neutral-1);
    display: grid;
    grid-auto-flow: row;
    gap: 10px;
    padding: 20px 25px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px 0px var(--neutral-10);
    position: absolute;
    transition: .2s linear;
    cursor: pointer;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    top: 0px;
    transform: scale(.9)translateY(-110%);
    opacity: 0;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      transition: 0.2s ease;
    }

    &::before {
      background: var(--neutral-10);
      z-index: -2;
    }

    &::after {
      background: var(--primary-dark);
      z-index: -1;
      opacity: .3;
    }

    &.good {
      &::after {
        background: var(--dark-moss);
      }
    }

    &.warn {
      &::after {
        background: var(--amber);
      }
    }

    &.error {
      &::after {
        background: var(--dark-crimson);
      }

    }

    .data {
      line-break: anywhere;
    }

    .title {
      display: grid;
      grid-template-columns: 1fr auto;
      font-size: 1.3rem;
      font-weight: bold;

      &::after {
        content: "\ea11";
        font-family: "ico" !important;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -moz-osx-font-smoothing: grayscale;
        transition: 0.2s ease;
        transform: translate(.85rem, -.65rem);
        height: 1.5rem;
        width: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        border-radius: 8px;
      }
    }

    &:hover {
      .title {
        &::after {
          color: var(--neutral-10);
          background: var(--crimson);
        }
      }

      &::after {
        opacity: 1 !important;
      }
    }

    &:last-of-type {
      &::after {
        opacity: .85;
      }
    }

    &:nth-last-of-type(2) {
      &::after {
        opacity: .6;
      }
    }
  }
}
</style>
