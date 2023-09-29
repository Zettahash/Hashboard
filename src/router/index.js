import Vue from 'vue'
import VueRouter from 'vue-router'

import Overview from '@/components/pages/Overview'
import PrivateSale from '@/components/pages/PrivateSale'
import CommunityConsensusForum from '@/components/pages/CommunityConsensusForum'
import Mining from '@/components/pages/Mining'
import LedgerWalletsHoldings from '@/components/pages/LedgerWalletsHoldings'
import Market from '@/components/pages/Market'
import Accountability from '@/components/pages/Accountability'
import Assets from '@/components/pages/Assets'

// -Private Sale: will be important so that they can purchase the ZH token. We use the BTCPay that we have hosted on Voltage.

// -Community Consensus Forum: Will need to have this developed. Standard forum with poll voting header. Community will have login profile, etc.

// -Live Hashrate: Will look like a mining pool interface where we can pull in API info from existing mining pool providers

// -Ledger - Wallets and Holdings: We can pull real time api from Etherscan.io / blockchain.com to show real time BTC, ETH, USDT holdings. We also want to be able to upload redacted bank statements.

// -Market: This is to show realtime ZH exchange trading. We are not creating an exchange though. Just pull data from coinmarketcap or another exchange.

// -Accountability: Will be the different site locations. Like a world map.

// -Assets should show historical revenue and profits. This can actually be combined with the Live Hashrate page.

Vue.use(VueRouter)

const title = process.env.VUE_APP_APPLICATION_NAME

const routes = [
  {
    path: '/',
    name: 'overview',
    component: Overview,
    meta: {
      title: 'Overview | ' + title,
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
    path: '/community-consensus-forum',
    name: 'community-consensus-forum',
    component: CommunityConsensusForum,
    meta: {
      title: 'Community Consensus Forum | ' + title,
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
    component: Mining,
    meta: {
      title: 'Mining | ' + title,
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
    path: '/accountability',
    name: 'accountability',
    component: Accountability,
    meta: {
      title: 'Accountability | ' + title,
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {


// This goes through the matched routes from last to first, finding the closest route with a title.
// eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

// Find the nearest route element with meta tags.
const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
// const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

// If a route with a title was found, set the document (page) title to that value.
if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

// Remove any stale meta tags from the document using the key attribute we set below.
Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

// Skip rendering meta tags if there are none.
if(!nearestWithMeta) return next();

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