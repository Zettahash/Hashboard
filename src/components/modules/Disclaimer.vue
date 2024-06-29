<template>

  <div class="disclaimer-modular">
    <h2><b-icon-exclamation-triangle /> Disclaimer</h2>
    <p>By using this application, you agree to the following: <br>
    </p>
    <ol>
      <li>the information provided is for general informational purposes only and does not constitute financial or
        professional advice.</li>
      <li>Cryptocurrency investments are highly volatile and risky, with no guaranteed outcomes or
        profits.</li>
      <li>We strive for accuracy but make no warranties regarding the completeness or reliability of the
        information.</li>
      <li>Users are responsible for their investment decisions and any resulting losses; the application
        providers are not liable for any damages.</li>
      <li>Security measures are in place, but absolute data security cannot be
        guaranteed.</li>
    </ol>
    <p>If you disagree with any part of this disclaimer, do not use the application.</p>
    <a class="btn" @click="iAgree">I agree</a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

// Setup Vuex store
const store = useStore();

// Getters from Vuex store
const application = computed(() => store.getters.application);

const iAgree = () => {
  store.commit('setDynamic', {
    item: 'disclaimerAgreed',
    value: true
  });
}
</script>

<style lang="scss" scoped>
@import "/src/assets/scss/_constants.scss";

.disclaimer-modular {
  z-index: 999;
  position: fixed;
  margin: auto;
  height: max-content;
  width: 600px;
  max-width: 80vw;
  padding: 30px;
  border-radius: 8px;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::after {
    content: '';
    background: var(--neutral-10);
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &::before {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background: var(--neutral-10);
    opacity: .75;
    content: "";
    top: 50%;
    left: 50%;
    z-index: -2;
    transform: translate(-50%, -50%);
  }

  @media (max-width: $x-small) {
    right: 0;
    z-index: 499;
    max-width: 90vw;
    width: 90vw;
    left: 0;
  }
}
</style>