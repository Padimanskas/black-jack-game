<template>
  <transition name="animator" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:before-leave="beforeLeave">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
export default {
  name: "animator",
  methods: {
    beforeLeave (el) {
      console.log(el);
    },
    beforeEnter (el) {
      console.log(el);
    },
    afterEnter (el) {
      console.log(el);
    }
  }
}
</script>

<style scoped>

</style>
