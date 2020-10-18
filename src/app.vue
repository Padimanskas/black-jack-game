<template>
  <div id="app">
    <b-j-hand v-bind:cards="dealerHits" v-bind:style="{ top: '100px'}"
              v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-hand v-bind:cards="playerHits" v-bind:style="{ top: '500px'}"
              v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-shoe ref="shoe"></b-j-shoe>
    <div class="button-container">
      <b-j-button v-if="turn === 'player' && !winner" v-on:click="hit">HIT</b-j-button>
      <b-j-button v-if="turn === 'player' && !winner" v-on:click="stay">STAY</b-j-button>
      <b-j-button v-on:click="newDeal">DEAL</b-j-button>
    </div>
    <div class="turn">TURN: {{ turn }}</div>
    <div class="winner">WINNER: {{ winner }}</div>
    <div class="winner">PLAYER SCORE: {{ playerScore }}</div>
    <div class="winner">DEALER SCORE: {{ dealerScore }}</div>
  </div>
</template>
<script>
import {BJButton, BJHand, BJShoe} from "@/components";
import {
  NEW_DEAL,
  PLAYER_TURN,
  DEALER_TURN
} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  components: {BJHand, BJButton, BJShoe},

  computed: {
    ...mapGetters(['dealerHits', 'playerHits', 'playerScore', 'dealerScore', 'turn', 'winner'])
  },

  data() {
    return {
      shoeTop: 0,
      shoeLeft: 0,
    }
  },

  mounted() {
    this.$nextTick(function () {
      addEventListener('resize', this.getShoeLeft);
      addEventListener('resize', this.getShoeTop);
      this.getShoeLeft();
      this.getShoeTop();
    });

    this.$store.dispatch(NEW_DEAL);
  },

  methods: {
    getShoeLeft() {
      const {left} = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeLeft = left;
    },

    getShoeTop() {
      const {top} = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeTop = top;
    },

    newDeal() {
      this.$store.dispatch(NEW_DEAL);
    },

    hit() {
      this.$store.dispatch(PLAYER_TURN);
    },

    stay() {
      this.$store.dispatch(DEALER_TURN);
    }
  },
  beforeDestroy() {
    removeEventListener('resize', this.getShoeLeft);
    removeEventListener('resize', this.getShoeTop);
  }
}
</script>
<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("./assets/bg.png");
  background-repeat: repeat;
  z-index: -2;
}
.turn, .winner {
  font-family: Arial;
  font-size: 150%;
  color: white;
}
</style>
