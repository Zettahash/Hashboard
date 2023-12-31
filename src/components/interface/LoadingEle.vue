<template lang="">
  <div class="parent-flex">
    <div v-for="n in 3" class="loading small" :key="'small-' + n"></div>
    <div v-for="n in 2" class="loading" :key="'' + n"></div>
  </div>
</template>
<script>
export default {
  name: 'LoadingEle'
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';

.parent-flex {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0;

  .loading {
    background: var(--neutral-1);
    align-content: start;
    box-shadow: 0 0 0 0px var(--neutral-10);
    // transform: translateY(20px)scale(.9);
    padding: 24px;
    border-radius: .75rem;
    animation: loading 2s ease forwards infinite;
    background: var(--neutral-9);
    align-content: start;
    max-width: unset;
    min-width: unset;
    justify-items: start;
    height: 100px;
    grid-template: auto auto auto/auto 1fr;
    width: 100%;
    min-height:20vh;

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
      0% {
        opacity: .5
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: .5
      }
    }



  }
}</style>