import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// import Overview from '@/components/pages/Overview'
import LincoinAccountant from '@/components/pages/Farms/Lincoin/Accountant'
import LincoinManager from '@/components/pages/Farms/Lincoin/Manager'
import OceanManager from '@/components/pages/Farms/Ocean/Manager'
import PrivateSale from '@/components/pages/PrivateSale'
import CommunityConsensusForum from '@/components/pages/CommunityConsensusForum'
import Vote from '@/components/pages/Vote'
import LedgerWalletsHoldings from '@/components/pages/LedgerWalletsHoldings'
import Market from '@/components/pages/Market'
import SafeTreasury from '@/components/pages/Treasury/Safe/Treasury'
import SpecterTreasury from '@/components/pages/Treasury/Specter/Treasury'

import Holdings from '@/components/pages/Holdings'
import Assets from '@/components/pages/Assets'

import VoteProtocolTreasury from '@/components/pages/Vote/VoteProtocolTreasury'
import Proposals from '@/components/pages/Vote/Proposals'
import AboutVoteProtocol from '@/components/pages/Vote/AboutVoteProtocol'


// -Private Sale: will be important so that they can purchase the ZH token. We use the BTCPay that we have hosted on Voltage.

// -Community Consensus Forum: Will need to have this developed. Standard forum with poll voting header. Community will have login profile, etc.

// -Live Hashrate: Will look like a vote pool interface where we can pull in API info from existing vote pool providers

// -Ledger - Wallets and Holdings: We can pull real time api from Etherscan.io / blockchain.com to show real time BTC, ETH, USDT holdings. We also want to be able to upload redacted bank statements.

// -Market: This is to show realtime ZH exchange trading. We are not creating an exchange though. Just pull data from coinmarketcap or another exchange.

// -Treasury: Will be the different site locations. Like a world map.

// -Assets should show historical revenue and profits. This can actually be combined with the Live Hashrate page.
const app = createApp({})

const title = process.env.VUE_APP_APPLICATION_NAME

const routes = [
  {
    path: '/',
    name: 'lincoin-manager',
    component: LincoinManager,
    children: [
      {
        path: "/lincoin",
        name: "lincoin-manager",
        component: LincoinManager,
        meta: {
          title: 'Lincoin Manager | ' + title,
          breadcrumbs: ['hashboard', 'lincoin', 'manager'],
        }
      },
      {
        path: "/lincoin/manager",
        name: "lincoin-manager",
        component: LincoinManager,
        meta: {
          title: 'Lincoin Manager | ' + title,
          breadcrumbs: ['hashboard', 'lincoin', 'manager'],
        }
      },
    ],
    meta: {
      title: 'Lincoin Manager | ' + title,
      breadcrumbs: ['hashboard', 'lincoin', 'manager'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/lincoin/accountant',
    name: 'lincoin-accountant',
    component: LincoinAccountant,
    meta: {
      title: 'Lincoin Accountant | ' + title,
      breadcrumbs: ['hashboard', 'lincoin', 'accountant'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/ocean/manager',
    name: 'ocean-manager',
    component: OceanManager,
    meta: {
      title: 'Ocean Manager | ' + title,
      breadcrumbs: ['hashboard', 'ocean', 'manager'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/private-sale',
    name: 'private-sale',
    component: PrivateSale,
    meta: {
      title: 'Private Sale | ' + title,
      breadcrumbs: ['private-sale'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/consensus',
    name: 'consensus',
    component: CommunityConsensusForum,
    meta: {
      title: 'Consensus | ' + title,
      breadcrumbs: ['consensus'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote,
    meta: {
      title: 'Vote | ' + title,
      breadcrumbs: ['vote'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },

  {
    path: '/vote/protocol/proposals',
    name: 'protocol-proposals',
    component: Proposals,
    meta: {
      title: 'Proposals | ' + title,
      breadcrumbs: ['vote','protocol','proposals'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },

  {
    path: '/vote/protocol/about',
    name: 'protocol-about',
    component: AboutVoteProtocol,
    meta: {
      title: 'About | ' + title,
      breadcrumbs: ['vote','protocol','about'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },

  {
    path: '/vote/protocol/treasury',
    name: 'protocol-treasury',
    component: VoteProtocolTreasury,
    meta: {
      title: 'Treasury | ' + title,
      breadcrumbs: ['vote','protocol','treasury'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },

  {
    path: '/ledger-wallets-holdings',
    name: 'ledger-wallets-holdings',
    component: LedgerWalletsHoldings,
    meta: {
      title: 'Ledger - Wallets and Holdings | ' + title,
      breadcrumbs: ['ledger-wallet-holdings'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/market',
    name: 'market',
    component: Market,
    meta: {
      title: 'Market | ' + title,
      breadcrumbs: ['market'],
      metaTags: [
        {
          name: 'description',
          content: 'Market'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/treasury/safe/treasury',
    name: 'safe',
    component: SafeTreasury,
    meta: {
      title: 'Safe - Treasury | ' + title,
      breadcrumbs: ['treasury', 'safe', 'treasury'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/treasury/specter/treasury',
    name: 'specter',
    component: SpecterTreasury,
    meta: {
      title: 'Specter - Treasury | ' + title,
      breadcrumbs: ['treasury', 'specter', 'treasury'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets,
    meta: {
      title: 'Assets | ' + title,
      breadcrumbs: ['assets'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
  {
    path: '/holdings',
    name: 'holdings',
    component: Holdings,
    meta: {
      title: 'Holdings | ' + title,
      breadcrumbs: ['holdings'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder'
        }
      ]
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
app.use(router)

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {


  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router