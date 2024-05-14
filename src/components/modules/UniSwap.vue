<script setup>
import { SwapWidget } from '@uniswap/widgets'
import { applyReactInVue } from 'veaury';
const UniswapWidget = applyReactInVue(SwapWidget)

const tokenList = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
</script>

<template>
  <div className="Uniswap">
    <!-- <SwapWidget token="ZHD" /> -->
    <UniswapWidget 
    :tokenList="tokenList"
    defaultInputTokenAddress="NATIVE"
    defaultInputAmount="2"
    defaultOutputTokenAddress="0xb630D7388e3466Af4952B6E5D8Db63D828140e5d"
    ></UniswapWidget>
  </div>
</template>