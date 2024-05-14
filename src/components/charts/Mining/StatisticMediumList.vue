<script setup>
import DropdownUi from '@/components/modules/DropdownUi.vue'
// eslint-disable-next-line no-undef
const props = defineProps(['tileName', 'tileUnit', 'tileValueRelative', 'tileValue', 'filterOptions'])

function autoIcon(str) {
  return require(`@/assets/img/icons/${str.toLowerCase().replace(/ /g, "-")}.svg`)
}
</script>

<template>
  <div :class="`tile fixed-half`">

    <div class="head">
      <div class="icon"><img :src="autoIcon(props.tileName)"></div>
      <h3>{{ props.tileName }}</h3>
      <a class="filter-ui" v-if="props.filterOptions">
        <DropdownUi v-for="(item, index) of props.filterOptions" :key="index" :dropdownTitle="item.title" :dropdownOptions="item.options" :activeKey="item.options[0]" />
      </a>
    </div>

    <div class="tile-body">
      <ul>
        <li>
          <div class="item">
            <div class="badge">Received</div>
            <div class="link">0x</div>
            <div class="value"><b-icon-currency-bitcoin /> 0.0011292</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="badge">Received</div>
            <div class="link">0x</div>
            <div class="value"><b-icon-currency-bitcoin /> 0.0013292</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="badge">Received</div>
            <div class="link">0x</div>
            <div class="value"><b-icon-currency-bitcoin /> 0.0011292</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="badge">Received</div>
            <div class="link">0x</div>
            <div class="value"><b-icon-currency-bitcoin /> 0.0011292</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="badge">Received</div>
            <div class="link">0x</div>
            <div class="value"><b-icon-currency-bitcoin /> 0.0011292</div>
          </div>
        </li>
      </ul>
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


  @media (max-width:$small) {
    width: calc(100% - 10px);
  }

  &.fixed-half {
    width: calc(50% - 10px);
    min-height: 300px;
    height: max-content;
    position: relative;
    z-index: 2;
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
    
    .item {
    display: flex;
    gap: 10px;
    padding: 10px 20px;
    opacity: .5;

    &:hover{opacity: 1;}
}

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