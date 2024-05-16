<script setup>
//@ts-ignore
import { providers } from 'ethers'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { SwapWidget } from '@uniswap/widgets'
//@ts-ignore
import { applyReactInVue } from 'veaury';
const store = useStore()
const application = computed(() => store.state.application)
const walletProvider = application.value.walletConnectModal.getWalletProvider()
const provider = new providers.Web3Provider(walletProvider)

const UniswapWidget = applyReactInVue(SwapWidget)
const tokenList = 'https://zettahash-hashboard-middleware.vercel.app/api/get-uniswap'
const alchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY
const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
</script>

<template>
  <div className="Uniswap" class="uniswap">
    <UniswapWidget defaultInputTokenAddress="NATIVE" defaultInputAmount="1"
      defaultOutputTokenAddress="0xb630D7388e3466Af4952B6E5D8Db63D828140e5d" :provider="provider" :tokenList="tokenList"
      locale="en-GB" :jsonRpcEndpoint="rpcUrl"></UniswapWidget>
  </div>
</template>

<style lang="scss">
.uniswap{
  width: calc(50% - 20px);
  background: var(--neutral-8);
  border-radius: 15px !important;
  box-shadow: inset 0 0 0 1px var(--neutral-5);
  display: flex;
  justify-content: center;
  overflow: hidden;
  [class*="WidgetWrapper"]{
  background-color: transparent ;

  }
[class*="WidgetWrapper"],[class*="Modal"],[class*="Popover"],[class*="ErrorView"]{
  border-radius: 15px !important;
  background-color: var(--neutral-8) ;
  border-radius: 0px !important;
  box-shadow: 0 !important;
  border:0 !important;
  width: 100%;
  padding: 20px 40px;
}
[class*="Input"]{
  background-color: var(--neutral-5) ;
}
[class*="TokenButton"], [class*="Underlayer"]{
  background-color: var(--neutral-4) !important;
}
[class*="BaseButton"],[class*="button-small"]{
  background-color: transparent;
  border: none;
}
[class*="button-large"]{
  background-color: var(--neutral-3) ;
}
*,input{
  color: var(--neutral-1) !important;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: var(--neutral-4);
    border-radius: 8px;
    min-height: 20px;
  color: var(--neutral-1);
    padding: 5px;
}
.button-small{
    height: 1.1rem;
}
}
</style>