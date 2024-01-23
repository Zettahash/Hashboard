<template lang="html">
  <div class="flex-overview">
    <div class="ui-ele">

      <h1>Wallet Connected</h1>
      <div class="head-organiser">
        <div class="hasher-name-organiser">
          <img :src="profileImg()" class="wallet-logo" />
          <h2 :title="wallet">{{ walletShortName(wallet) }}</h2>
        </div>
      </div>
    </div>
    <div class="ui-ele align-bottom"><a :class="`btn disconnect ${disconnectButtonText}`"
        @click="disconnectOrCancel()">{{ disconnectButtonText }} <i :class="disconnectButtonIcon"></i></a></div>


    <div class="ui-ele containers-ui">
      <UserWalletsUI :holdings="holdings" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { profileImg, hasherName } from '@/utils/forum'
import { walletShortName } from '@/utils/strings'
import { getBalance, doDisconnect } from '@/utils/wallet'
import UserWalletsUI from '@/components/modules/UserWalletsUI.vue'

export default {
  data() {
    return {
      holdings: false,
      disconnecting: false,
      disconnectingCountdown: false,
      disconnectCountdown: 0,
      disconnectButtonText: 'Disconnect',
      disconnectButtonIcon: 'i-log-out',
    }
  },
  name: 'WalletManager',
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      snapshot: 'snapshot',
      snapshotUser: 'snapshotUser',
      wallet: 'wallet',
      forumProfile: 'forumProfile',
      rates: 'rates',
    }),
  },
  async mounted() {
    this.routeLoaded()
    this.getHoldings()
  },
  watch: {
    wallet() {
      this.getHoldings()
    },
  },
  components: {
    // ProtocolVotingLocations,
    UserWalletsUI,
  },
  methods: {
    profileImg, hasherName, walletShortName, getBalance, doDisconnect,
    disconnectOrCancel() {
      if (this.disconnecting) {
        clearInterval(this.disconnectingCountdown)
        clearTimeout(this.disconnecting)
        this.disconnectingCountdown = false
        this.disconnecting = false
        this.disconnectButtonText = 'Disconnect'
        this.disconnectButtonIcon = 'i-log-out'
        return
      }
      this.disconnectButtonText = `Cancel disconnect`
      this.disconnectButtonIcon = 'i-x'
      this.disconnecting = setTimeout(() => {
        this.doDisconnect()
      }, 5000)
    },
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    },
    async getHoldings() {
      let balances = []
      let curriencies = ['ETH', 'ZH', 'USDC', 'USDT']

      for (const cur of curriencies) {
        let balanceArray = await this.getBalance(cur)
        let template = {
          address: this.wallet,
          addressShort: this.walletShortName(this.wallet),
          badge: false,
          balance: balanceArray.balance,
          balanceFormatted: balanceArray.formatted,
          balanceUSD: Number(balanceArray.formatted) * this.rates[cur].priceUsd,
          balanceUSDRaw: Number(balanceArray.formatted) * this.rates[cur].priceUsd,
          change: this.rates[cur]['changePercent24Hr'],
          currency: cur,
          displayCurrency: this.rates[cur]['symbol'],
          group_id: "mainnet_balances",
          name: `Hasher ${this.walletShortName(this.wallet)} wallet`,
          timestamp: Date.now(),
        }
        balances.push(template)
      }
      this.holdings = balances
    },
  }
}
</script>
<style lang="scss" scoped>
.disconnect {
  color: var(--crimson);
  background: transparent;
  box-shadow: 0 0 0 1px;

  &:hover {
    color: var(--neutral-0);
    background: var(--crimson);
    box-shadow: 0 0 0 1px var(--crimson);
  }

  &.Cancel {
    overflow: hidden;
    position: relative;
    z-index: 1;
    color: var(--neutral-0);
    background: var(--crimson);
    box-shadow: 0 0 0 1px var(--dark-crimson);

    &::before {
      content: '';
      background: var(--dark-crimson);
      position:absolute;
      height:100%;
      width:100%;
      top:0;
      left:0;
      z-index:-1;
      animation: slide-disconnect 4000ms ease forwards 1;
      @keyframes slide-disconnect {
        to{
          transform:translateX(-100%);
        }
      }
    }
  }
}

.container {
  .head {
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
}</style>