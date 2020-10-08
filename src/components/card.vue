<template>
    <div ref="card" v-bind:class="{'j-card-with-open-animation': !upsideDown, 'j-card': upsideDown}" v-bind:style="{ transform: ['translate(' + shoePosition.left + 'px, ' + shoePosition.top + 'px)'] }">
      <div class="j-card-back"></div>
      <div class="j-card-front" v-bind:class="`${suit.toLowerCase()}-${String(rank).toLowerCase()}`"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPosition } from "@/types/types";
import Animator from "@/components/animator.vue";
@Component({
  components: {Animator}
})
export default class JCard extends Vue {
  @Prop() private suit!: string;
  @Prop() private rank!: string;
  @Prop() private shoePosition!: IPosition;
  @Prop() private upsideDown!: boolean;

  appendAnimationClass() {
    return !this.upsideDown ? 'open-animation' : null;
  }

  mounted() {
/*    this.$refs.card.addEventListener("animationend", (event) => {
      console.log('animation done', event);
    }, false);*/
  }
}
</script>

<style lang="scss" scoped>

  @function getPNGAssetByName($asset-name) {
    @return url("./../assets/#{$asset-name}.png");
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
    background-color: transparent;
    width: 169px;
    height: 245px;
    position: absolute;
    user-select: none;
    transform-style: preserve-3d;
    animation-name: falling, laydown;
    animation-duration: 500ms, 500ms;
    animation-delay: 0ms, 500ms;
    animation-iteration-count: 1, 1;
    animation-fill-mode: forwards;
  }

  .j-card {
    background-color: transparent;
    width: 169px;
    height: 245px;
    position: absolute;
    user-select: none;
    transform-style: preserve-3d;
    animation-name: falling;
    animation-duration: 500ms;
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
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateY(180deg);
    background-repeat: no-repeat;
    background-position: center center;
  }

  $suits: diamond, heart, spade, club;
  $ranks: 2, 3, 4, 5, 6, 7, 8, 9, 10, ace, king, queen, jack;

  @each $suit in $suits {
    @each $rank in $ranks {
      .#{$suit}-#{$rank}  {
        background-image: getPNGAssetByName(#{$suit}_#{$rank});
      }
    }
  }

</style>
