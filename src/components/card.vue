<template>
  <div class="card-container">
    <div class="j-card" v-for="(card, key) in cards" v-bind:key="key" v-bind:style="{ left: key * 30 + 'px' }"
         @click="changeCounter">
      <div class="j-card-back"></div>
      <div class="j-card-front"></div>
    </div>
    <div>{{dealerHits}}</div>
    <div>{{playerHits}}</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Component from 'vue-class-component';
import { PLAYER_DID_HIT, DEALER_DID_HIT } from '@/store/actions.type';


@Component({
  computed: {
    ...mapGetters(['dealerHits', 'playerHits'])
  }
})
class JCard extends Vue {

  counter = 0;
  cards = [{prop: 'some text 1'}];

  changeCounter() {
    this.counter++;
    this.cards.push({prop: 'some text ' + (this.counter + 1)});
    this.$store.commit(DEALER_DID_HIT, 'hello martians' + Math.random());
    this.$store.commit(PLAYER_DID_HIT, 'hello martians' + Math.random());
    return false;
  }
}

export default JCard;
</script>

<style lang="scss" scoped>



@keyframes falling {
  0% {
    transform: translateX(400px);
  }
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
    background-color: lightslategray;
    transform: rotateY(180deg);
  }

</style>
