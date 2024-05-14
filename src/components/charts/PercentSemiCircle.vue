<script setup>
// eslint-disable-next-line no-undef
const props = defineProps(['chartValues', 'chartTitle', 'chartUnit'])

</script>

<template>
  <div class="chart-container">
    <div class="chart-item" v-for="(item, index) of props.chartValues" :key="index"
      :style="`transform: rotate(${((item / 100) * 180) - 90}deg)`"></div>
    <div class="chart-text-org">
      <h2>{{ props.chartTitle }}</h2>
      <p>{{ props.chartUnit }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  width: 100%;
  aspect-ratio: 2/1;
  justify-content: center;
  align-items: baseline;
  position: relative;
  overflow: hidden;

  .chart-item {
    position: absolute;
    width: calc(100% - 40px);
    aspect-ratio: 1/1;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    margin: auto;
    border-radius: 100%;
    border-style: solid;
    border-width: 20px;
    border-left-color: transparent;
    border-bottom-color: transparent;
    $colours: var(--risd-blue), var(--turquoise), var(--crimson);

    @for $i from 1 through length($colours) {
      &:nth-of-type(#{(length($colours)+1)-$i}) {
        border-right-color: nth($colours, $i);
        border-top-color: nth($colours, $i);
        box-shadow: inset 0 0 60px -30px nth($colours, $i);
      }
    }
  }
  .chart-text-org{
    position: absolute;
    display: flex;
    flex-direction: column;
    gap:5px;
    bottom: 0;
    margin: auto;
    left:0;
    right:0;
    width: max-content;
    justify-content: center;
    align-items: center;
    h2{
      font-size: 3rem;
    }
    h2,p{margin: 0;}
  }
}
</style>