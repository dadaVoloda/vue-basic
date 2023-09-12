<template>
  <input
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'my-input',
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
  border: 1px solid darkolivegreen;
}
</style>
