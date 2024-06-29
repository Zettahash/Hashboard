<template lang="html">
  <div class="flex-overview demo">
    <div class="full-width-header"></div>
    <div class="page-inner">
      <img class="icon" src="/src/assets/img/zh-circle.svg">

      <h1>Welcome to #Hashboard</h1>
      <p>ZH/ZHD Token-holders get access to the #Hashboard and can participate in the DAO Governance.</p>

      <div class="modal-relative centre" v-if="!application.zhHolderBool">
        <template v-if="message === 'needZH'">
          <h1><i class="i-alert-circle"></i> Notice</h1>
          <p>Only Holders of the ZH/ZHD token may participate on this platform.<br>
            Email <a href="mailto:zetta@zettahash.org" class="link">zetta@zettahash.org</a> for more information.</p>
          <p>You can disconnect this wallet, {{ walletShortName(wallet) }}, and try another account.</p>
          <p><a class="btn-link error" @click="doDisconnect">Disconnect {{ walletShortName(wallet) }} <i class="i-log-out"></i></a></p>
        </template>
        <template v-if="message === 'waiting'">
          <h1><a class="spinner"></a> Connecting...</h1>
          <p>Checking for wallet connection...</p>
        </template>
        <template v-if="message === 'needAcc'">
          <h1><i class="i-alert-circle"></i> Welcome</h1>
          <p>Connect your wallet to get started.</p>
          <p class="centred-connect-btn">
            <WalletConnector />
          </p>
          <p>
            <template v-if="wallet">
              <a class="btn-link error" @click="reset">Reset wallet connection</a>
            </template>
          </p>
        </template>
      </div>

      <div class="container">
        <div class="section">
          <h2>Here's what you can do on #Hashboard:</h2>
          <div class="flex-shortcuts">
            <router-link :to="{ name: 'mining' }" class="tile">
              <img src="/static/img/image.webp">
              <div class="text-container">
                <div class="icon"><b-icon-activity /></div>
                <h3>View Mining Stats</h3>
                <p>Get detailed metrics on hash rates, energy consumption, and profitability of Zettahash operations.</p>
                <p v-if="!wallet">Connect your wallet to get started.</p>
              </div>
            </router-link>

            <router-link :to="{ name: 'dao-treasury' }" class="tile">
              <img src="/static/img/2image.webp">
              <div class="text-container">
                <div class="icon"><b-icon-bank-2 /></div>
                <h3>Check ETH & ERC-20 Wallet balances</h3>
                <p>Get a clear view of balances and addresses to ensuring accountability and financial management within the Zettahash ecosystem.</p>
                <p v-if="!wallet">Connect your wallet to get started.</p>
              </div>
            </router-link>

            <router-link :to="{ name: 'market' }" class="tile">
              <img src="/static/img/3image.webp">
              <div class="text-container">
                <div class="icon"><b-icon-currency-exchange /></div>
                <h3>Explore Market Data and Exchange ZHD</h3>
                <p>Explore market trends, and price movements of ZHD and make informed investment decisions.</p>
                <p v-if="!wallet">Connect your wallet to get started.</p>
              </div>
            </router-link>

            <router-link :to="{ name: 'vote' }" class="tile">
              <img src="/static/img/1image.webp">
              <div class="text-container">
                <div class="icon"><b-icon-lightning-charge-fill /></div>
                <h3>Explore Proposals from Snapshot</h3>
                <p>Stay informed about governance decisions and actively participate in the decision-making process by reviewing and voting on key initiatives.</p>
                <p v-if="!wallet">Connect your wallet to get started.</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import WalletConnector from '@/components/interface/WalletConnector.vue';
import { walletShortName } from '@/utils/strings.js';
import { doDisconnect } from '@/utils/wallet';
const { proxy } = getCurrentInstance();

// Setup Vuex store
const store = useStore();

// Reactive data
const timeout = ref(false);
const timeoutFunction = ref(false);

// Getters from Vuex store
const application = computed(() => store.getters.application);
const wallet = computed(() => store.getters.wallet);

// Computed properties
const message = computed(() => {
  if (!timeout.value) return 'waiting';
  if (!application.value.walletConnected) return 'needAcc';
  if (!application.value.zhHolderBool) return 'needZH';
  return '?';
});

// Methods
const reset = () => {
  doDisconnect();
};

watch(() => application.value.zhHolderBool, (value) => {
  if (value === true) {
    clearTimeout(timeoutFunction.value);
    timeoutFunction.value = false;
  }
});

watch(() => message.value, (value) => {
  switch (value) {
    case 'needAcc':
  proxy.$toast("Connect your wallet to get started with Hashboard", {theme: 'dark', autoClose: false, type: 'error'});
  break;
      default:
  }
});

onMounted(() => {
  window.payWallThis = { application, timeout, timeoutFunction };
  timeoutFunction.value = setTimeout(() => {
    if (!application.value.zhHolderBool) {
      timeout.value = true;
      window.payWallThis = { application, timeout, timeoutFunction };
      proxy.$toast("You'll need to hold ZHD or ZH to access Hashboard", {theme: 'dark', autoClose: false, type: 'error'});

    }
  }, 8000);
});
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/constants';

.section {
  box-shadow: 0 0 0 1px var(--neutral-4);
  border-radius: $radius1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: max-content;
  padding: 20px;
  gap: 10px;

  h2 {
    margin-top: 0;
    text-align: center;
  }
}

.flex-shortcuts {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;

  a {
    display: grid;
    grid-template: 1fr / 1fr 3fr;
    padding: 20px;
    border-radius: 8px;
    background-color: var(--neutral-6);
    background-image: radial-gradient(ellipse at top right, var(--neutral-4), transparent), radial-gradient(ellipse at bottom left, var(--neutral-6), transparent);
    align-content: center;
    gap: 20px;
    transition: 200ms ease;

    &:hover {
      background: var(--brandeis-blue);
    }

    img {
      mix-blend-mode: luminosity;
      width: 200px;
      border-radius: 4px;
    }

    .text-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: left;
      justify-content: start;
      align-items: flex-start;

      h3,
      p {
        text-align: left;
        margin: 0;
      }
      h3 {
        font-size: 24px;
      }

      .icon {
        height: auto;
        width: auto;
        margin: 0 auto 0 0;

        svg {
          height: 50px;
          width: 50px;
        }
      }
    }
  }
}

.modal-relative {
  margin: 40px auto;
  height: max-content;
  width: 500px;
  max-width: 80vw;
  padding: 30px;
  border-radius: $radius1;
  background: var(--neutral-10);
  position: relative;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

h1 {
  justify-content: center;
  align-items: center;
}

.icon {
  height: 80px;
  width: auto;
  margin: 20px auto;
  display: block;
}

p {
  max-width: calc($ui-width / 2);
  margin: 20px auto;
  display: block;
  text-align: center;
}

.centred-connect-btn {
  width: max-content;
  margin: 20px auto;
  a{
    // margin: 20px auto;
    padding: 5px 25px;}
}
</style>