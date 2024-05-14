<script setup>
// import { reactive } from 'vue'
import PercentSemiCircle from '@/components/charts/PercentSemiCircle.vue'
// eslint-disable-next-line no-undef
const props = defineProps(['tileName', 'tileUnit', 'tileValueRelative', 'tileValue', 'chartData'])

function autoIcon(str) {
  return require(`@/assets/img/icons/${str.toLowerCase().replace(/ /g, "-")}.svg`)
}
const chartData = Array.isArray(props.chartData)?props.chartData:(props.chartData.indexOf('[')==0 && props.chartData.indexOf(']')==props.chartData.length-1?JSON.parse(props.chartData):[])
</script>

<template>
  <div :class="`tile fixed-half`">

    <div class="head">
      <div class="icon"><img :src="autoIcon(props.tileName)"></div>
      <h3>{{ props.tileName }}</h3>
    </div>

    <div class="tile-body">
      <PercentSemiCircle :chartValues="chartData" chartTitle="2,345" :chartUnit="tileUnit" />
      <div :class="`tile-value-wrapper ${props.tileValueRelative}`">
        <h2 class="animated-counter">{{ props.tileValue }}</h2>
        <div :class="`tile-value-units ${props.tileValueRelative}`">{{ tileUnit }}
          <template v-if="props.tileValueRelative == 'down'"><b-icon-arrow-down-right /></template>
          <template v-if="props.tileValueRelative == 'up'"><b-icon-arrow-up-right /></template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/constants';

.tile {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--neutral-5);
  backdrop-filter: blur(30px);
  background-color: var(--light-gauze-white);
  position: relative;
  width: max-content;
  width: calc(25% - 15px);
  height: 150px;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

  @media (max-width:$content) {
    width: calc(33.33% - 15px);
  }

  @media (max-width:$small) {
    width: calc(50% - 10px);
  }

  &.fixed-half {
    width: 50%;
    min-height: 300px;
    height: max-content;
    // position: absolute;
    position: relative;
    z-index: 2;
    @media (max-width:$small) {
    width: calc(100% - 10px);
  }
  }

  .head {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;
      background: var(--primary);
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;

      img {
        height: 10px;
        width: 10px;
        filter: invert(1);
        mix-blend-mode: screen;
        opacity: .7;
      }
    }

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: var(--neutral-2);
    }

    .filter-ui {
      cursor: pointer;
      padding-left: 20px;
      font-size: 20px;
      margin-left: auto;
      margin-right: 0;
      text-align: right;
      flex-shrink: 0;
      flex-grow: 1;
      justify-content: end;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

  .tile-body {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .tile-value-wrapper {
      display: flex;
      gap: 10px;
      align-items: baseline;

      &.up {
        --col: var(--aquamarine);
      }

      &.down {
        --col: var(--crimson);

        .tile-value-units {
          opacity: 1;
        }
      }

      .tile-value-units {
        font-size: 14px;
        color: var(--col);
        padding: 2px 4px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px;
        line-height: 1;
        opacity: .75;

        svg {
          height: .8rem;
        }
      }
    }
  }

  h2,
  h3,
  p {
    margin: 0;
  }
}
</style>