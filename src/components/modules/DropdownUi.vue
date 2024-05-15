
<template>
  <div class="dropdown-wrapper" :wrapper-open="state.dropdown ? 'expanded' : 'collapsed'"
@click.stop="state.dropdown = true" :data-label="props.dropdownTitle">
<b-icon-caret-down-fill v-if="!state.dropdown" />
<b-icon-caret-up-fill v-if="state.dropdown" />

<ul>
  <template v-if="props.dropdownOptions">
    <li v-for="(key, index) of props.dropdownOptions" :key="index"
      :dropdown-selected="!props.activeKey ? (index == 0 ? 'true' : 'false') : (props.activeKey == key ? 'true' : 'false')"
      @click.stop="props.activeKey == key ? (state.dropdown = !state.dropdown) : (setDropdownValue(key), state.dropdown = false)">
      {{ key }}
    </li>
  </template>
  <template v-else>
    <li @click.stop="state.dropdown = false">No options available</li>
  </template>
</ul>
</div>
</template>
<script setup>
import { reactive } from 'vue'
const props = defineProps(['dropdownOptions', 'activeKey', 'dropdownTitle'])
const emit = defineEmits(['setActive'])

const setDropdownValue = (key) => {
    emit('setActive', key)
}
const state = reactive({
  dropdown: false,
})

document.body.addEventListener("click", ()=> state.dropdown = false)
</script>
