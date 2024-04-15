<template lang="html" class="hello">
    <a :class="`sidebar-toggle collapse-${uiSidebarCollapse}`" @click.stop="toggleSidebarCollapse(!application.uiSidebarCollapse)">
  <b-icon-arrow-bar-right class="arrow-right"/>
  <b-icon-arrow-bar-left class="arrow-left"/>
    <!-- <i class="i-arrow-right-circle"></i> -->
    <!-- <i class="i-chevron-left"></i> -->
    <span v-if="uiSidebarCollapse">Collapse sidebar</span>
    <span v-else>Expand Sidebar</span>
  </a>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SidebarToggle',
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
    }),
    dark() {
      return this.application.uiThemeDark
    },
    width() {
      return window.innerWidth
    },
    uiSidebarCollapse() {
      let stage = 2
      if (window.outerWidth < 700) { stage-- }
      if (this.application.uiSidebarCollapse) { stage-- }
      return stage == 0 ? false : stage
    },
  },
  mounted() {
    if (window.innerWidth < 800) {
      this.toggleSidebarCollapse(true)
    }
  },
  methods: {
    toggleSidebarCollapse(bool) {
      this.$store.commit('setDynamic', {
        item: 'uiSidebarCollapse',
        value: bool
      })
    },
    toggleDemoValues() {
      this.$store.commit('setDynamic', {
        item: 'uiDemoValues',
        value: !this.application.uiDemoValues
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/constants';
  .sidebar-toggle {
  color: var(--neutral-2);
  transition: 200ms ease;
  cursor: pointer;
  @media (max-width: $x-small) {
    position: relative;
    grid-column: 1/2;
    top: unset;
    transform: unset;
  }
  &:hover {
    i {
      &::before {
        color: var(--white);
      }
    }
  }
  [class*="arrow-left"],
  [class*="arrow-right"],
  .i-arrow-right-circle,
  .i-chevron-left {
    display: none;
    &::before {
      border-radius: 100px;
    }
  }
  &:not(.collapse-false) {
  [class*="arrow-right"]{
    color: var(--secondary);
  }
    i{&::before {
        color: var(--secondary);
        background-color: var(--neutral-9);
        padding: 2px;
      }}
    // transform: translate(calc($sidebar - 50%), 20px);
    @media (max-width: $x-small) {
      transform: unset;
    }
  }
  &.collapse-false {
  [class*="arrow-right"],
    .i-arrow-right-circle {
      display: block;
    }
  }
  &.collapse-2 {
  [class*="arrow-left"],
  .i-chevron-left {
      display: block;
    }
  }
  &.collapse-1 {
    // transform: translate(calc(54px + 50%), 20px);
    // font-size: 24px;
    @media (max-width: $x-small) {
      transform: unset;
    // font-size: 30px;
    }
  [class*="arrow-left"],
  .i-chevron-left {
      display: block;
      @media (min-width:700px) {
        display: none;
      }
    }
  [class*="arrow-right"],
  .i-arrow-right-circle {
      display: none;
      @media (min-width:700px) {
        display: block;
      }
    }
    i {
      transform: translate(-.5px, -1px);
    }
  }
}
</style>