<script setup>
// eslint-disable-next-line no-undef
const props = defineProps(['chartValues', 'chartTitle', 'chartUnit', 'chartLegend'])
let chartValuesProcessed = []
if (props.chartValues.reduce((a, b) => Number(a) + Number(b)) === 100) {
  chartValuesProcessed = props.chartValues
} else {
  let total = props.chartValues.reduce((a, b) => Number(a) + Number(b))
  for (const num of props.chartValues) {
    chartValuesProcessed.push(Math.round((num / total) * 100))
  }
  chartValuesProcessed
}
const displayValue = (props.chartValues.reduce((a, b) => Number(a) + Number(b)) )/props.chartValues.length
</script>

<template>
  <div class="chart-container-wrapper">
    <div class="chart-container">
      <div class="chart-item" v-for="(item, index) of chartValuesProcessed" :key="index"
        :style="`transform: rotate(${((-180 / (Number(item) / 100)) - 45)}deg)`"></div>
      <div class="chart-text-org">
        <h2>{{ displayValue }}</h2>
        <p>{{ props.chartUnit }}</p>
      </div>
    </div>
    <div class="legend" v-if="props.chartLegend">
      <div v-for="(item, index) of chartValuesProcessed" :key="index" class="swatch-parent">
        <div class="colour-swatch"></div> {{ props.chartLegend[index] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    $colours: var(--risd-blue), var(--turquoise), var(--crimson);
.colour-swatch {
  display: inline-block;
  height: 1rem;
  width: 1rem;
  margin-right: .5rem;
  border-radius: 1rem;
  transform:translateY(2px)
}
.swatch-parent {
  line-height: 1.5rem;
  @for $i from 1 through length($colours) {
      &:nth-of-type(#{(length($colours)+1)-$i}) {
        .colour-swatch{
        background-color: nth($colours, $i);
        box-shadow: 0 0 5px -1px nth($colours, $i);
      }}
    }
}

.chart-container {
  display: flex;
  width: calc(100% - 80px);
  margin: 20px 40px;
  aspect-ratio: 2/1;
  justify-content: center;
  align-items: baseline;
  position: relative;
  overflow: hidden;

  .chart-item {
    position: absolute;
    width: 100%;
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

    @for $i from 1 through length($colours) {
      &:nth-of-type(#{(length($colours)+1)-$i}) {
        border-right-color: nth($colours, $i);
        border-top-color: nth($colours, $i);
        box-shadow: inset 0 0 60px -30px nth($colours, $i);
      }
    }
  }

  .chart-text-org {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5px;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    width: max-content;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 3rem;
    }

    h2,
    p {
      margin: 0;
    }
  }
}
</style>