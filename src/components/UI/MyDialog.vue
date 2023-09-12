<template>
  <Teleport to="#app">
    <div class="dialog" v-if="show" @click="hideDialog">
      <div class="dialog__content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog__content {
  width: 60%;
  min-width: 300px;
  min-height: 100px;
  padding: 20px;
  margin: auto;
  border-radius: 12px;
  background-color: #fff;
}
</style>
