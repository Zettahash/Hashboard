<template lang="html">
  <div :class="`inline-information ${payload.className}`" @click="dataToggle = !dataToggle">
    <h2>{{ payload.title }}</h2>
    <template v-if="payload.data">
      <div class="dropdown-toggle">
        <b-icon-chevron-compact-right v-if="!dataToggle" />
        <b-icon-chevron-compact-down v-if="dataToggle" />
      </div>

      <p v-if="dataToggle">{{ payload.data }}</p>
    </template>
  </div>
</template>
<script>
export default {
    data() {
      return { dataToggle: false, }
    },
    props: {
      payload: Array
    }
  }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/constants';
.inline-information {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  align-items: center;
  box-shadow: 0 0 0 1px;
  padding: 15px 0 15px 15px;
  border-radius: $radius3;
  margin-top: 20px;
  width: calc($ui-width - 40px);
  max-width: calc(80vw - 40px);
  cursor: pointer;
  .dropdown-toggle{
    grid-column: 2/3;
    grid-row: 1/3;
    padding: 0 15px 0 10px;
    height: 100%;
  }
  h2{
    grid-column: 1/2;
    grid-row: 1/2;
    font-weight: 600;
    font-size: 15px;
    margin: 0;
  }
  p{
    grid-column: 1/2;
    grid-row: 2/3;
    margin: 0;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>