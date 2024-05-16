<script setup>
import { Chart} from 'vue-tradingview-widgets';
const props = defineProps(['width', 'height'])
const opts = {
      symbol: 'UNISWAP3ETH:ZHDUSDT',
  theme: 'dark',
  "chartOnly": false,
  "width": "100%",
  // "height": "100%",
  "locale": "en",
  "colorTheme": "dark",
  "autosize": true,
  "showVolume": false,
  "showMA": false,
  "hideDateRanges": false,
  "hideMarketStatus": false,
  "hideSymbolLogo": false,
  "scalePosition": "right",
  "scaleMode": "Normal",
  "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  "fontSize": "10",
  "noTimeScale": false,
  "valuesTracking": "1",
  "changeMode": "price-and-percent",
  "chartType": "area",
  "maLineColor": "#2962FF",
  "maLineWidth": 1,
  "maLength": 9,
  "backgroundColor": "rgba(0, 9, 28, 1)",
  "lineWidth": 2,
  "lineType": 0,
  "dateRanges": [
    "1d|1",
    "1m|30",
    "3m|60",
    "12m|1D",
    "60m|1W",
    "all|1M"
  ]
    }
</script>
<template>
  <Chart :options="opts" class="tv-chart ui-ele" :style="`width:${props.width}px;height:${props.height}px;max-height:500px;`"/>
</template>

<style lang="scss" scoped>
#vue-trading-view, .tv-chart{
  border-radius: 15px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px var(--neutral-5);
    position: relative;
    mix-blend-mode: screen;
    &::before{
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top:0;
      left:0;
      pointer-events: none;
      z-index: 1;
    box-shadow: inset 0 0 0 1px var(--neutral-5);
  border-radius: 15px;
    }
}
</style>