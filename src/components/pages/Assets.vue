<template lang="html">
  <div class="flex-overview demo">
    <div class="head-organiser">

      <h1>Assets</h1>
      <p></p>
    </div>
    <div v-for="(item, index) of physicalAssets" :class="`item ${item.class?item.class:''}`" :key="index" :title="item.model">
      <div class="product">
        <img :src="getIcon(item.image_url)">
        <div class="info">
          <h2>{{ item.manufacturer }}</h2>
          <h3>{{ item.series }}</h3>
          <h4>{{ item.model }}</h4>
        </div>
      </div>
      <table class="details">
        <thead>
          <tr>
            <td>Location</td>
            <td>Serial</td>
            <td>Hashrate</td>
            <td>Power</td>
            <td>Efficiency</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div> <img :src="require(`/src/assets/img/flags/${item.location_country_code.toLowerCase()}.svg`)"> {{
                item.location }}</div>
            </td>
            <td>
              <div>{{ item.serial }}</div>
            </td>
            <td>
              <div>{{ item.hashrate }}</div>
            </td>
            <td>
              <div>{{ item.power }}</div>
            </td>
            <td>
              <div>{{ item.efficiency }}</div>
            </td>
            <td>
              <div>{{ item.quantity }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-overlay">
        <img class="icon" :src="require('/src/assets/img/zh-circle.svg')">
        <p>We're working on this section.</p>
        <p>Visit <router-link :to="{ name: 'consensus' }" class="link">Consensus</router-link> for updates.</p>
      </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import { getIcon } from '@/utils/general'


export default {
  components: {
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Assets',
  data() {
    return {

      samplePayload: [
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S21',
          rating: '200T',
          data: '1582',
          graph: {
            data: [4, 10, 6, 2, 12, 10, 22],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19j XP',
          rating: '151T',
          data: '3850',
          graph: {
            data: [5, 2, 9, 2, 12, 9, 9],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19 XP',
          rating: '141T',
          data: '2892',
          graph: {
            data: [1, 12, 1, 100, 70, 100],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
        {
          size: 'asset-complicated wide',
          manufacturer: 'Bitmain',
          model: 'S19k Pro',
          rating: '120T',
          data: '1682',
          graph: {
            data: [1, 12, 1, 100, 70, 100],
            colour: "#0062ff",
          },
          url: 'heatsink'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      application: 'application',
      data: 'data',
      payload: 'payload',
      physical_assets: 'physicalAssets',
    }),
    physicalAssets() {
      let assets = this.physical_assets
      let tmpAssets = [
        { "manufacturer": "Bitmain", "series": "Antminer", "model": "S21K Pro", "quantity": "10", "serial": "N9TT-9G0A-B7FQ-RANC", "hashrate": "200TH/s", "power": "3500w", "efficiency": "23J/T", "location": "Alaska", "location_country_code": "US", "purchase_price": "$0.00", "image_url": "https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg", "data": null, "timestamp": null, "class": "demo-item" },
        { "manufacturer": "Bitmain", "series": "Antminer", "model": "S21K Pro", "quantity": "100", "serial": "QK6A-JI6S-7ETR-0A6C", "hashrate": "200TH/s", "power": "3500w", "efficiency": "23J/T", "location": "Reykjavik", "location_country_code": "IS", "purchase_price": "$0.00", "image_url": "https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg", "data": null, "timestamp": null, "class": "demo-item" },
        { "manufacturer": "Bitmain", "series": "Antminer", "model": "S21K Pro", "quantity": "10", "serial": "SXFP-CHYK-ONI6-S89U", "hashrate": "200TH/s", "power": "3500w", "efficiency": "23J/T", "location": "Kópavogur", "location_country_code": "IS", "purchase_price": "$0.00", "image_url": "https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg", "data": null, "timestamp": null, "class": "demo-item" },
        { "manufacturer": "Bitmain", "series": "Antminer", "model": "S21K Pro", "quantity": "10", "serial": "XNSS-HSJW-3NGU-8XTJ", "hashrate": "200TH/s", "power": "3500w", "efficiency": "23J/T", "location": "Bern", "location_country_code": "CH", "purchase_price": "$0.00", "image_url": "https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg", "data": null, "timestamp": null, "class": "demo-item" },
        { "manufacturer": "Bitmain", "series": "Antminer", "model": "S21K Pro", "quantity": "20", "serial": "NHLE-L6MI-4GE4-ETEV", "hashrate": "200TH/s", "power": "3500w", "efficiency": "23J/T", "location": "California", "location_country_code": "US", "purchase_price": "$0.00", "image_url": "https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg", "data": null, "timestamp": null, "class": "demo-item" },
        {"manufacturer":"Bitmain","series":"Antminer","model":"S21K Pro","quantity":"15","serial":"6ETI-UIL2-9WAX-XHYO","hashrate":"200TH/s","power":"3500w","efficiency":"23J/T","location":"Beijing","location_country_code":"CN","purchase_price":"$0.00","image_url":"https://file.bitmain.com/shop-image-storage/product/2023/09/27/14/c9685fac-d3b9-478c-9922-6c390f45bd5f_540.jpg","data":null,"timestamp":null,"class":"demo-item"},
      ]
      if (tmpAssets.length > 0) { for (const a of tmpAssets) { assets.push(a) } }
      return assets
    },
  },
  mounted() {
    this.routeLoaded()
  },
  methods: {
    getIcon,
    routeLoaded() {
      this.$store.commit('setDynamic', {
        item: 'routerLoaded',
        value: true
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
@import '@/assets/scss/ui';
.demo .item{
  animation: toBlur 2s 1500ms ease forwards 1;
}

@keyframes toBlur {
  100% {
    filter: blur(10px);
  }
}
@keyframes toAppear {
  100% {
    opacity: 1;
  }
}
.icon {
  height: 80px;
  width: auto;
  margin: 20px auto;
  display: block;
}
.text-overlay {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  width: max-content;
  padding: 10px 30px 10px 30px;
  border-radius: 20px;
  opacity: 0;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  animation: toAppear 2s 1500ms ease forwards 1;
}
.item{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  gap: 30px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 0 1px var(--neutral-6);
  align-items: center;
  width: 100%;
}
.product {
  display: grid;
  grid-template: repeat(3, auto) / auto 1fr;
  gap: 10px;
  *{margin:0;}
  img {
    width: auto;
    max-width: 100px;
    height: auto;
    max-height: 100px;
    grid-row: 1/4;
    grid-column: 1/2;
    border-radius: 4px;
  }
}

.details {
  flex-shrink: 0;
  flex-grow:1;
  // margin-bottom: auto;
  thead {
    td {
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--neutral-3);
      // padding: 5px 5px 0 5px;
    }
  }

  tbody {
    td {
      >div {
        display: flex;
        gap: 5px;
        padding: 5px;
      }
    }
  }

  img {
    height: 1rem;
  }
}
</style>