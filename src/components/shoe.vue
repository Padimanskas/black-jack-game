<template>
  <div class="shoe"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BJShoe extends Vue {}
</script>

<style lang="scss" scoped>
  .shoe {
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid red;
    top: 50%;
    right: 10%;
    transform: translate(10%, -50%);
  }
</style>
