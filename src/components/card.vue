<template>
  <div class="j-card" v-bind:style="{ transform: ['translate(' + shoePosition.left + 'px, ' + shoePosition.top + 'px)'] }">
    <div class="j-card-back"></div>
    <div class="j-card-front">{{ rank }} - {{ suit }} - {{ shoePosition }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPosition } from "@/types/types";

@Component
export default class JCard extends Vue {
  @Prop() private suit!: string;
  @Prop() private rank!: string;
  @Prop() private shoePosition!: IPosition;
}
</script>

<style lang="scss" scoped>

  @keyframes falling {
    100% {
      transform: translateX(0);
    }
  }

  @keyframes laydown {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(180deg);
    }
  }

  .j-card {
    background-color: transparent;
    width: 130px;
    height: 200px;
    position: absolute;
    user-select: none;
    transform-style: preserve-3d;
    animation-name: falling, laydown;
    animation-duration: 500ms, 500ms;
    animation-delay: 0ms, 500ms;
    animation-iteration-count: 1, 1;
    animation-fill-mode: forwards;

  }

  .j-card-front, .j-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid;
  }

  .j-card-back {
    background-color: blueviolet;
  }

  .j-card-front {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightslategray;
    transform: rotateY(180deg);
  }

</style>
