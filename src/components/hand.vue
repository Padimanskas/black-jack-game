<template>
  <div class="card-container">
    <j-card v-for="(card, key) in dealerHits" v-bind:key="key" v-bind:style="{ marginLeft: key * 30 + 'px' }" v-bind:rank="card.rank"
            v-bind:suit="card.suit" v-bind:shoe-position="{ top: shoePosition.top, left: shoePosition.left - (key * 30) }"></j-card>
    <div>{{ dealerHits }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { JCard } from '@/components';
import {ICard, IPosition} from '@/types/types';
import { mapGetters } from "vuex";

@Component({
  components: {
    JCard
  },
  computed: {
    ...mapGetters(['dealerHits', 'playerHits'])
  }
})
export default class BJHand extends Vue {
  @Prop() private cards: ICard[] = [];
  @Prop() private shoePosition!: IPosition;
}
</script>

<style lang="scss" scoped>

  .card-container {
    //position: absolute;
    border: 1px solid red;
    width: 200px;
    height: 200px;
  }

</style>
