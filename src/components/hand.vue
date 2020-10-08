<template>
  <div class="card-container" v-bind:style="{ top: position.top + 'px', left: position.left + 'px' }">
    <j-card v-for="(card, key) in cards" v-bind:key="key" v-bind:style="{ marginLeft: `${key * 30}px` }" v-bind:rank="card.rank"
            v-bind:suit="card.suit" v-bind:shoe-position="{ top: shoePosition.top - position.top, left: shoePosition.left - position.left - key * 30 }"
    v-bind:upside-down="card.upsideDown"></j-card>
    <p class="score">{{name}} score: {{ score }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { JCard } from '@/components';
import { ICard, IPosition } from '@/types/types';

@Component({
  components: {
    JCard
  }
})
export default class BJHand extends Vue {
  @Prop() private cards!: ICard[];
  @Prop() private position!: IPosition;
  @Prop() private shoePosition!: IPosition;
  @Prop() private score!: string;
  @Prop() private name!: string;
}
</script>

<style lang="scss" scoped>

  .card-container {
    position: absolute;
    border: 5px solid gold;
    border-radius: 10px;
    width: 180px;
    height: 260px;
    padding-top: 10px;
    padding-left: 10px;

    .score {
      margin-left: 300px;
      color: #fff;
      font-size: 30pt;
      font-family: Arial, Tahoma, Verdana, Sans-serif;
    }
  }



</style>
