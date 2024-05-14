<script setup>
import VueTradingView from 'vue-trading-view/src/vue-trading-view'
import {defineProps} from 'vue'
const props = defineProps(['width', 'height'])
const opts = {
      symbol: 'UNISWAP3ETH:ZHDUSDT',
  theme: 'dark',
  // "symbols": [
  //   [
  //     "UNISWAP3ETH:ZHDUSDT|1D"
  //   ]
  // ],
  "chartOnly": false,
  "width": "100%",
  "height": "100%",
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
  <VueTradingView :options="opts" :style="`width:${props.width}px;height:${props.height}px;max-height:500px;`"/>
</template>