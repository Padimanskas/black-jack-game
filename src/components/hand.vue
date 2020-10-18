<template>
  <div ref="cardContainer" class="card-container">
    <b-j-card v-for="(card, key) in cards" v-bind:key="key" v-bind:style="{ marginLeft: `${key * 30}px` }"
            v-bind:rank="card.rank"
            v-bind:suit="card.suit"
            v-bind:shoe-position="{ top: shoePosition.top - handTop, left: shoePosition.left - handLeft - key * 30 }"
            v-bind:upside-down="card.upsideDown"></b-j-card>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {BJCard} from '@/components';
import {ICard, IPosition} from '@/types/types';

@Component({
  components: {
    BJCard
  }
})
export default class BJHand extends Vue {
  @Prop() private cards!: ICard[];
  @Prop() private position!: IPosition;
  @Prop() private shoePosition!: IPosition;

  handTop = 0;
  handLeft = 0;

  mounted(): void {

    this.$nextTick(function () {
      window.addEventListener('resize', this.getHandLeft);
      window.addEventListener('resize', this.getHandTop);
      this.getHandLeft();
      this.getHandTop();
    });

    const {top, left} = this.$el.getBoundingClientRect();

    this.handTop = top;
    this.handLeft = left;
  }

  getHandLeft(): void {
    this.handLeft = this.$el.getBoundingClientRect()['left'];
  }

  getHandTop(): void {
    this.handTop = this.$el.getBoundingClientRect()['top'];
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  position: absolute;
  right: 70%;
  transform: translateX(-70%);
}
</style>
