import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import LincoinAccountant from '@/components/pages/Farms/Lincoin/Accountant.vue'
import LincoinManager from '@/components/pages/Farms/Lincoin/Manager.vue'
import OceanManager from '@/components/pages/Farms/Ocean/Manager.vue'
import PrivateSale from '@/components/pages/PrivateSale.vue'
import MattermostRouter from '@/components/pages/MattermostRouter.vue'
import MiningLandingPage from '@/components/pages/MiningLandingPage.vue'
import LandingPage from '@/components/pages/LandingPage.vue'
import Vote from '@/components/pages/Vote.vue'
import LedgerWalletsHoldings from '@/components/pages/LedgerWalletsHoldings.vue'
import Market from '@/components/pages/Market.vue'
import SafeTreasury from '@/components/pages/Treasury/Safe/Treasury.vue'
import SpecterTreasury from '@/components/pages/Treasury/Specter/Treasury.vue'
import DAOTreasury from '@/components/pages/Treasury/Treasury.vue'
import HedgeyVesting from '@/components/pages/Treasury/Hedgey/HedgeyVesting.vue'
import Assets from '@/components/pages/Assets.vue'

import VoteProtocolTreasury from '@/components/pages/Vote/VoteProtocolTreasury.vue'
import Proposals from '@/components/pages/Vote/Proposals.vue'
import AboutVoteProtocol from '@/components/pages/Vote/AboutVoteProtocol.vue'


import ViewTopic from '@/components/pages/Forum/ViewTopic.vue'
import NewPostWrapper from '@/components/pages/Forum/NewPostWrapper.vue'
import ProfileManager from '@/components/pages/ProfileManager.vue'
import WalletManager from '@/components/pages/WalletManager.vue'


const app = createApp({})

const title = import.meta.env.VITE_APPLICATION_NAME

const routes = [
  
  {
    path: '/',
    name: 'hashboard',
    component: LandingPage,
    meta: {
      title: '#Hashboard | ' + title,
      breadcrumbs: ['hashboard'],
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
    path: '/mining',
    name: 'mining',
    component: MiningLandingPage,
    meta: {
      title: 'Mining & Energy | ' + title,
      breadcrumbs: ['hashboard', 'mining'],
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
    path: '/mining-output',
    name: 'lincoin-manager',
    component: LincoinManager,
    children: [
      {
        path: "/mining/lincoin",
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
      breadcrumbs: ['hashboard', 'mining', 'lincoin', 'manager'],
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
    path: '/mining/lincoin/accountant',
    name: 'lincoin-accountant',
    component: LincoinAccountant,
    meta: {
      title: 'Lincoin Accountant | ' + title,
      breadcrumbs: ['hashboard', 'mining', 'lincoin', 'accountant'],
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
    component: MattermostRouter,
    meta: {
      title: 'Consensus on our subreddit | ' + title,
      breadcrumbs: ['consensus'],
      metaTags: [
        {
          name: 'description',
          content: 'Placeholder'
        },
        {
          property: 'og:description',
          content: 'Placeholder',
        }
      ]
    }
  },
  {
    path: '/consensus/new',
    name: 'new-topic',
    component: NewPostWrapper,
    meta: {
      title: 'New Topic | ' + title,
      breadcrumbs: ['consensus', 'new'],
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
    path: '/consensus/topic/:topic_id(.*)',
    name: 'view-topic',
    component: ViewTopic,
    meta: {
      title: 'View Topic | ' + title,
      breadcrumbs: ['consensus', 'topic', 'view'],
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
    path: '/vote/:spaceId/details',
    name: 'protocol-about',
    component: AboutVoteProtocol,
    meta: {
      title: 'About | ' + title,
      breadcrumbs: ['vote','details'],
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
    path: '/treasury',
    name: 'dao-treasury',
    component: DAOTreasury,
    meta: {
      title: 'DAO Treasury | ' + title,
      breadcrumbs: ['treasury'],
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
    path: '/treasury/hedgey-vesting/',
    name: 'hedgey-vesting',
    component: HedgeyVesting,
    children: [
      {
        path: ":walletActive",
        component: HedgeyVesting,
      },
    ],
    meta: {
      title: 'Hedgey Vesting | ' + title,
      breadcrumbs: ['treasury','hedgey-vesting'],
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
    path: '/profile',
    name: 'profile',
    component: ProfileManager,
    meta: {
      title: 'Profile | ' + title,
      breadcrumbs: ['profile'],
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
    path: '/wallet',
    name: 'wallet',
    component: WalletManager,
    meta: {
      title: 'Wallet | ' + title,
      breadcrumbs: ['wallet'],
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
  history: createWebHistory(),
  mode: 'history',
  base: import.meta.env.BASE_URL,
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