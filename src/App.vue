<template>
  <div id="app">
    <SideBar />

    <div :class="pageContentsClass" :data-zhHolder="application.zhHolderBool ? 'yes' : 'no'" @click="collapseSidebar()">
      <Notifications />
      <template v-if="application.zhHolderBool || (routeIsAllowedWithoutHoldingZH && wallet)">
        <router-view></router-view>
      </template>
      <template v-else>
        <LandingPage />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SideBar from './components/interface/SideBar.vue';
import LandingPage from './components/pages/LandingPage.vue';
import Notifications from './components/modules/Notifications.vue';

// Setup Vuex store
const store = useStore();
const route = useRoute();

// Reactive references and computed properties
const application = computed(() => store.getters.application);
const wallet = computed(() => store.getters.wallet);

const routerLoaded = computed(() => application.value.routerLoaded);
const uiSidebarCollapse = computed(() => application.value.uiSidebarCollapse);

const pageContentsClass = computed(() => {
  let className = 'page-contents';
  if (routerLoaded.value) {
    className += ' loaded';
  } else {
    className += ' not-loaded';
  }
  if (!uiSidebarCollapse.value && window.innerWidth <= 700) {
    className += ' blur';
  }
  return className;
});


const routeIsAllowedWithoutHoldingZH = computed(() => {
  const allowedUnauthenticatedRoutes = ['beneficiary'];
  return allowedUnauthenticatedRoutes.includes(route.name);
});

// Methods
const collapseSidebar = () => {
  if (window.innerWidth < 1250) {
    store.commit('setDynamic', {
      item: 'uiSidebarCollapse',
      value: true
    });
  }
};

// Watchers
watch(
  () => route.name,
  () => {
    store.commit('setDynamic', {
      item: 'routerLoaded',
      value: false
    });
  }
);

// Lifecycle hooks
onMounted(() => {
  const umami = document.createElement('script');
  umami.setAttribute('src', 'https://eu.umami.is/script.js');
  umami.setAttribute('data-website-id', '2e3126f1-0704-4e97-ab66-393d6bb08f06');
  document.head.appendChild(umami);
});
</script>

<style lang="scss">
@import "/src/assets/scss/styles.scss";
</style>