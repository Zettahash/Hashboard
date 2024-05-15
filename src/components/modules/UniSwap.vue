<script setup>
import '@fontsource-variable/inter';
//@ts-ignore
import { SwapWidget } from '@uniswap/widgets'
//@ts-ignore
import { applyReactInVue } from 'veaury';
const UniswapWidget = applyReactInVue(SwapWidget)
</script>

<template>
  <div className="Uniswap">
    <UniswapWidget 
    defaultInputTokenAddress="NATIVE"
    defaultInputAmount="2"
    defaultOutputTokenAddress="0xb630D7388e3466Af4952B6E5D8Db63D828140e5d"
    ></UniswapWidget>
  </div>
</template>