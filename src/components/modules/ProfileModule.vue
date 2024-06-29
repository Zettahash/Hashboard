<template lang="html">
    <div class="ui-ele">
      <div class="head-organiser">
        <h1>Hi,</h1>
        <div class="hasher-name-organiser">
          <img :src="profileImg()" class="wallet-logo" />
          <h2>
            <template v-if="ensEnabled && ens.name">{{ ens.name }}</template>
            <template v-else>Hasher #{{ hasherName() }}</template></h2>
        </div>
      </div>

      <p>You can manage available profile settings here or manage your connected wallet below.</p>
      <div class="containers-ui">
        <div class="container compact" v-if="ens.name">
          <div class="head">
            ENS
          </div>

          <div class="contents">
            <p>We found the following name associated with your address:<br>
              <b>{{ ens.name }}</b>
            </p>
            <div class="break"></div>
          </div>
          <div class="head"><span>Use <b>{{ ens.name }}</b> instead of #{{ hasherName() }}, as your display name.<br><small class="notice"><i class="i-alert-triangle"></i> Some layouts will continue to display "Hasher #{{ hasherName() }}".</small></span>
            <a @click="toggleUseENS()"><i :class="`switch-indicator ${(ensEnabled ? 'on' : 'off')} ${state.ensSwitchWorking?'working':''}`"></i></a>
          </div>
        </div>
        <div class="container compact" v-else>
          <div class="head">
            <span><i class="i-alert-circle"></i> ENS options not available for your address.</span>
          </div>
        </div>
      </div>


      <div class="containers-ui">
        <div class="container compact">
          <div class="head">
            Disclaimer
          </div>
          <div class="head"><span>Disclaimer <b>{{ application.disclaimerAgreed?'Accepted':' NOT ACCEPTED' }}</b><br><small class="notice"><i class="i-alert-triangle"></i> You have {{ application.disclaimerAgreed?'':'not' }} accepted the application disclaimer on this device.</small></span>
            <a @click="toggleDisclaimerAccepted()"><i :class="`switch-indicator ${(application.disclaimerAgreed ? 'on' : 'off')}`"></i></a>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { profileImg, hasherName, setProfile } from '@/utils/forum.js';
import { providers } from 'ethers';

const store = useStore();

const application = computed(() => store.getters.application);
const wallet = computed(() => store.getters.wallet);
const forumProfile = computed(() => store.getters.forumProfile);
const ens = computed(() => store.getters.ens);

const ensEnabled = computed(() => {
  if (!forumProfile.value) return false;
  if (String(forumProfile.value.data).indexOf('noens') >= 0) return false;
  return forumProfile.value.ens === ens.value.name ? true : false;
});

onMounted(async () => {
  routeLoaded();
  const walletProvider = application.value.walletConnectModal.getWalletProvider();
  const ethersProvider = new providers.Web3Provider(walletProvider);
  let ensName = await ethersProvider.lookupAddress(wallet.value);
  if (ensName) {
    store.commit("setENS", { name: ensName });

    const resolver = await ethersProvider.getResolver(ensName);
    const avatar = await resolver.getAvatar();
    const avatarMetaData = await resolver.getText(avatar);
    console.log(`Avatar Metadata: ${avatarMetaData}`);
  }
});

const state = reactive({
  ensSwitchWorking:false,
})
watch(ensEnabled, () => {
  state.ensSwitchWorking = false
    });
const toggleUseENS = () => {
  state.ensSwitchWorking = true
  let ensValue = ensEnabled.value ? 'noens' : 'ens';
  setProfile(ensValue);
};

const toggleDisclaimerAccepted = () => {
  store.commit('setDynamic', {
    item: 'disclaimerAgreed',
    value: !application.value.disclaimerAgreed
  });
}

const routeLoaded = () => {
  store.commit('setDynamic', {
    item: 'routerLoaded',
    value: true
  });
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  gap: 10px;

  .head {
    align-items: center;

    .state {
      margin-bottom: unset !important;
      background: var(--neutral-10) !important;
      padding: 10px 20px !important;
      display: flex;
      align-items: center;
      width: 140px;
      justify-content: center;
      cursor: pointer;

      &::after {
        content: attr(data-text);
      }

      i {
        color: var(--moss);
        line-height: 1;
        margin-right: 5px;
      }

      &:hover {
        background: var(--primary) !important;
      }

      &.following {
        &:hover {
          box-shadow: 0 0 0 1px var(--crimson);
          background: transparent !important;
          color: var(--crimson);

          i {
            display: none;
          }

          &::after {
            content: 'Leave';
            color: var(--crimson);
          }
        }
      }
    }
  }

  .break {
    height: 1px;
    width: 100%;
    display: block;
    background: var(--neutral-6);
    margin-bottom: 10px;
  }
  p{line-height: 1.6;}
  small{
    &.notice{
      color: var(--neutral-4);
    }
  }
}</style>