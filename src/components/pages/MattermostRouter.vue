<template lang="html">
  <div class="flex-overview">
    <div class="bg-overlay"> <img class="bg" :src="'/src/assets/img/spiral.webp'"></div>
    <div class="modal centre">
      <img class="icon" :src="'/src/assets/img/zh-circle.svg'">
      <h1>Zettahash Consensus</h1>
      <p v-if="error==false">Automatically redirecting you to our Zettahash Telegram Group<br><br><i class="spinner"></i></p>
      <p v-if="error!=false">
      <span>{{ error }}</span>
      <br><br><a class="btn" href="https://t.me/+_cUvJBA5G6E1ZTY8" target="_blank">Consensus <i
            class="i-arrow-right"></i></a></p>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';


export default {
  name: 'MattermostRouter',
  data() {
    return {
      error: false,
    }
  },
  components: {},
  mounted() {
    this.$store.commit('setDynamic', {
      item: 'routerLoaded',
      value: true
    })
    let self = this
    setTimeout(() => {
      let newWin = window.open('https://t.me/+_cUvJBA5G6E1ZTY8', '_blank')

      if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
        //POPUP BLOCKED
        self.error="Browser blocked popup. Use the button below instead."
      } else {
        self.error="See you on Telegram"
        newWin.focus()
      }
    }, 2000)
  },
  computed: {
    ...mapGetters({
      application: 'application',
    }),
  },
  watch: {

  },
  methods: {

  }
}
</script>
<style lang="scss">
@import 'src/assets/scss/constants';

.modal {
  margin: auto;
  height: max-content;
  width: 600px;
  max-width: 80vw;
  padding: 30px;
  border-radius: $radius1;
  background: transparent;
  backdrop-filter: blur(20px);
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &.centre {
    text-align: center;
  }

  .icon {
    height: 100px;
    width: auto;
  }

  h1 {
    justify-content: center;
  }

  p {
    margin-bottom: 0;
  }
}


.bg-overlay {
  height: 100%;
  min-height: $content;
  aspect-ratio: 1/1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    z-index: 2;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    height: auto;
    width: 100%;
    z-index: 1;
    transform: rotate(15deg);
  }

  @keyframes slow-orbit {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>