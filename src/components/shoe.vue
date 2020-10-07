<template>
  <div class="shoe"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BJShoe extends Vue {}
</script>

<style lang="scss" scoped>
  .shoe {
    position: absolute;
    width: 184px;
    height: 261px;
    top: 50%;
    right: 10%;
    transform: translate(10%, -50%);
    background-image: url("./../assets/shoe.png");
    background-position: center center;
    background-repeat: no-repeat;
    z-index: -1;
  }
</style>
