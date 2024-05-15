<template lang="html">
  <div class="parent-flex" v-if="!stop">
    <template v-if="short">
      <div v-for="n in 3" class="loading short" :key="'' + n"></div>
    </template>
    <template v-else>
      <template v-if="long">
        <div v-for="n in 4" class="loading" :key="'' + n"></div>
      </template>
      <template v-else>
        <div v-for="n in 3" class="loading small" :key="'small-' + n"></div>
        <div v-for="n in 2" class="loading" :key="'' + n"></div>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'LoadingEle',
  props: {
    stop: Boolean,
    short: Boolean,
    long: Boolean,

  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/constants';

.parent-flex {
  width: $ui-width;
  max-width: 80vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0;

  .loading {
    align-content: start;
    border-radius: $radius1;
    background-color: var(--neutral-8);
    max-width: unset;
    min-width: unset;
    height: 100px;
    width: 100%;
    min-height: 10vh;
    position: relative;
    overflow: hidden;

    &.short {
      height: 50px;
      min-height: unset;
    }

    &:after {
      content: '';
      background-image: linear-gradient(90deg, transparent, var(--neutral-5), transparent);
      position: absolute;
      height: 100%;
      width: 200%;
      top: 0;
      left: -50%;
      z-index: 2;
      opacity: .3;
      animation: loading 1000ms ease forwards infinite;

    }

    @media (max-width: $content) {
      width: calc(((100vw - 80px) / 3) - 20px);
    }

    @media (max-width: $medium) {
      width: calc(((100vw - 80px) / 2) - 20px);
    }

    @media (max-width: $small) {
      width: calc(((100vw - 80px) / 2) - 20px);
    }

    @media (max-width: $x-small) {
      width: calc(((100vw - 80px)) - 20px);
    }

    &.small {
      width: calc(25% - 15px);

      @media (max-width: $content) {
        width: calc(25% - 20px);
      }

      @media (max-width: $medium) {
        width: calc(33% - 15px);
      }

      @media (max-width: $small) {
        width: calc(50% - 10px);
      }

      @media (max-width: $x-small) {
        width: 100%;
      }
    }

    @keyframes loading {
      @for $i from 0 through 100 {
        #{$i * 1%} {
          transform: translateX(#{$i * 1%});
        }
      }
    }



  }
}
</style>