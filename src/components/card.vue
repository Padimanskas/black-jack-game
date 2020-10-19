<template>
  <div v-bind:class="{'j-card-with-open-animation': !upsideDown, 'j-card': upsideDown}"
       v-bind:style="{ transform: ['translate(' + shoePosition.left + 'px, ' + shoePosition.top + 'px)'] }">
    <div class="j-card-back"></div>
    <div class="j-card-front" v-bind:class="`${suit.toLowerCase()}-${String(rank).toLowerCase()}`"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPosition } from "@/types/types";

@Component
export default class BJCard extends Vue {
  @Prop() private suit!: string;
  @Prop() private rank!: string;
  @Prop() private shoePosition!: IPosition;
  @Prop() private upsideDown!: boolean;

  appendAnimationClass(): string | null {
    return !this.upsideDown ? 'open-animation' : null;
  }
}
</script>

<style lang="scss" scoped>

  $suits: diamond, heart, spade, club;
  $ranks: 2, 3, 4, 5, 6, 7, 8, 9, 10, ace, king, queen, jack;

  @mixin card {
    background-color: transparent;
    width: 169px;
    height: 245px;
    position: absolute;
    user-select: none;
    transform-style: preserve-3d;
    animation-fill-mode: forwards;
  }

  @function getPNGAssetByName($asset-name) {
    @return url("./../assets/#{$asset-name}.png");
  }

  @each $suit in $suits {
    @each $rank in $ranks {
      .#{$suit}-#{$rank} {
        background-image: getPNGAssetByName(#{$suit}_#{$rank});
      }
    }
  }

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

  .j-card-with-open-animation {
    @include card;
    animation-name: falling, laydown;
    animation-duration: 300ms, 300ms;
    animation-delay: 0ms, 300ms;
    animation-iteration-count: 1, 1;
  }

  .j-card {
    @include card;
    animation-name: falling;
    animation-duration: 300ms;
    animation-delay: 0ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .j-card-front, .j-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .j-card-back {
    background-image: getPNGAssetByName("back");
  }

  .j-card-front {
    transform: rotateY(180deg);
    background-repeat: no-repeat;
    background-position: center center;
  }



</style>
