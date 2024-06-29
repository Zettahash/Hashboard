<template lang="html">
  <div :class="`sidebar collapse-${uiSidebarCollapse}`" @scroll="unlabelify">
    <template v-if="uiSidebarCollapse !== 'false'">
      <div class="shortcuts">
        <Zed />
        <SidebarToggle />
        <WalletConnector @mouseenter="labelify" @mouseleave="unlabelify" />
      </div>
      <div class="shortcuts">
        <label>Hashboard</label>
        <router-link
          :to="{ name: 'mining' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-activity />
          <span>Mining</span>
        </router-link>
        <router-link
          :to="{ name: 'consensus' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-chat-left-text-fill />
          <span>Consensus</span>
        </router-link>
        <router-link
          :class="routeClass('vote')"
          :to="{ name: 'vote' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-lightning-charge-fill />
          <span>Vote</span>
        </router-link>
        <a
          :class="routeClass('treasury')"
          @click="dropdownToggle('treasury')"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-bank-2 />
          <span>Treasury</span>
        </a>
        <ul v-if="dropdown.treasury">
          <li>
            <router-link
              @click="dropdownToggle('treasury')"
              :to="{ name: 'dao-treasury' }"
              @mouseenter="labelify"
              @mouseleave="unlabelify"
            >
              <b-icon-wallet-fill />
              <span>Treasury Wallets</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'hedgey-vesting' }"
              @mouseenter="labelify"
              @mouseleave="unlabelify"
            >
              <img src="/src/assets/img/providers/65ec83064e64d3fad5f53b5d_h..png" class="icon" />
              <span>Hedgey App</span>
            </router-link>
          </li>
        </ul>
        <router-link
          :to="{ name: 'assets' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-nvme-fill />
          <span>Assets</span>
        </router-link>
        <router-link
          :to="{ name: 'market' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-currency-exchange />
          <span>Market</span>
        </router-link>
      </div>
      <div class="shortcuts">
        <label>Management</label>
        <router-link
          v-if="wallet"
          :to="{ name: 'wallet' }"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <img :src="profileImg(wallet)" class="wallet-icon" />
          <span>Wallet - {{ walletShortName(wallet) }}</span>
        </router-link>
        <a
          v-if="wallet && !application.zhHolderBool"
          @click="doDisconnect"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-box-arrow-right />
          <span>Disconnect</span>
        </a>
        <WalletConnector @mouseenter="labelify" @mouseleave="unlabelify" />
        <a
          :class="`sync-status ${data.synchronisationStatus}`"
          @click="store.dispatch('expressFetch')"
          @mouseenter="labelify"
          @mouseleave="unlabelify"
        >
          <b-icon-arrow-repeat class="b-icon refresh" />
          <b-icon-check-circle-fill class="b-icon check" />
          <b-icon-exclamation-triangle-fill class="b-icon alert" />
          <span v-if="!data.synchronisationStatus">Hashboard synced</span>
          <span v-if="data.synchronisationStatus == 'syncing'">Syncing...</span>
          <span v-if="data.synchronisationStatus == 'error'">
            Sync errors detected
          </span>
        </a>
      </div>
      <div class="shortcuts">
        <label>Shortcuts</label>
        <a
          @mouseenter="labelify"
          @mouseleave="unlabelify"
          href="https://zettahash.org"
        >
          <i class="i-hash"></i>
          <span>Zettahash home</span>
        </a>
      </div>
    </template>
    <div class="version shortcuts">
      <a>
        {{ version[0] }}-beta
        <span>{{ version[1] }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useDisconnect } from '@web3modal/ethers5/vue';
import Zed from '@/components/interface/Zed.vue';
import WalletConnector from './WalletConnector.vue';
import SidebarToggle from '@/components/interface/SidebarToggle.vue';
import { profileImg, hasherName } from '@/utils/forum.js';
import { walletShortName } from '@/utils/strings.js';
import { getIcon } from '@/utils/general.js';

const store = useStore();
const route = useRoute();
const { disconnect } = useDisconnect();

const dropdown = ref({
  hashboard: false,
  treasury: false,
  beneficiary: false,
  pool: false,
  consensus: false,
});

const uiSidebarCollapse = computed(() => {
  let stage = 2;
  if (window.innerWidth < 700) {
    stage--;
  }
  if (store.getters.application.uiSidebarCollapse) {
    stage--;
  }
  return stage == 0 ? false : stage;
});

const version = computed(() => {
  if (store.getters.application.version) {
    let arr = [];
    arr.push(String(store.getters.application.version).split('-')[0]);
    arr.push(String(store.getters.application.version).split(arr[0])[1]);
    return arr;
  }
  return [];
});

const application = computed(() => store.getters.application);
const wallet = computed(() => store.getters.wallet);
const data = computed(() => store.getters.data);

const doDisconnect = () => {
  store.commit('setWallet', false);
  disconnect();
};

const routeClass = (parent, depth = 0) => {
  let caret = Object.keys(dropdown.value).indexOf(parent) > -1 ? 'caret' : '';
  let className = `${caret} shortcut `;
  if (route.meta.breadcrumbs) {
    let breadcrumbs = route.meta.breadcrumbs;
    if (breadcrumbs.indexOf(parent) == depth) {
      className += 'active ';
      if (Object.keys(dropdown.value).indexOf(parent) > -1) {
        dropdown.value[parent] = true;
      }
    }
  }
  if (dropdown.value[parent]) {
    className += 'dropdown-open';
  }
  return className;
};

const dropdownToggle = (item, depth = 0) => {
  if (depth == 0) {
    for (const key of Object.keys(dropdown.value)) {
      if (key != item) {
        dropdown.value[key] = false;
      }
    }
  }
  dropdown.value[item] = !dropdown.value[item];
};

const labelify = (event) => {
  let label = event.target.querySelector('span').innerHTML;
  unlabelify();
  if (document.querySelector('.sidebar').classList.contains('collapse-1')) {
    let temp = document.createElement('div');
    temp.classList.add('temp-label-sidebar');
    temp.setAttribute('style', `transform:translate(${event.clientX}px, ${event.clientY}px)`);
    temp.innerHTML = label;
    document.body.append(temp);
  }
};

const unlabelify = () => {
  if (document.querySelector('.temp-label-sidebar')) {
    document.querySelector('.temp-label-sidebar').remove();
  }
};

onMounted(() => {
  window.addEventListener('scroll', unlabelify);
});

watch(() => route.name, () => {
  if (window.innerWidth < 700) {
    store.commit('setDynamic', {
      item: 'uiSidebarCollapse',
      value: true,
    });
  }
});
</script>

<style lang="scss">
.temp-label-sidebar {
  position: absolute;
  top: 0;
  left: calc(1rem + 5px);
  z-index: 301;
  background: var(--neutral-10);
  box-shadow: 0 0 0 1px var(--neutral-6);
  padding: 2px 5px;
  border-radius: 3px;
}

@import '/src/assets/scss/constants';
@import '/src/assets/scss/sidebar';

.wallet-icon {
  background: var(--neutral-10);
  border-radius: 100px;
}
</style>