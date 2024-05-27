<template>
  <div class="button-flex-organiser" :data-label="props.setTitle">
    <div v-for="obj of props.setOptions" :key="obj" :class="`btn ${props.activeKey === obj ? 'active' : ''}`"
      @click.stop="setValue(obj)">{{ obj.toUpperCase() }}</div>
  </div>
</template>
<script setup>
const props = defineProps(['setOptions', 'activeKey', 'setTitle'])
const emit = defineEmits(['setActive'])

const setValue = (key) => {
  emit('setActive', key)
}
</script>
