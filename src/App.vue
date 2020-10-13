<template>
  <div id="app">
    <b-j-hand v-bind:score="dealerScore" v-bind:cards="dealerHits" v-bind:position="{top: 100, left: 600}"
              v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-hand v-bind:score="playerScore" v-bind:cards="playerHits" v-bind:position="{top: 500, left: 600}"
              v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-shoe ref="shoe"></b-j-shoe>
    <div class="button-container">
      <j-button v-if="turn === 'player' && !winner" v-on:click="hit">HIT</j-button>
      <j-button v-if="turn === 'player' && !winner" v-on:click="stay">STAY</j-button>
      <j-button v-on:click="newDeal">DEAL</j-button>
    </div>
    <div class="turn">TURN: {{ turn }}</div>
    <div class="winner">WINNER: {{ winner }}</div>
  </div>
</template>
<script>
import {JButton, BJHand, BJShoe} from "@/components";
import {
  NEW_DEAL,
  PLAYER_TURN,
  DEALER_TURN
} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  components: {BJHand, JButton, BJShoe},

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
      window.addEventListener('resize', this.getShoeLeft);
      window.addEventListener('resize', this.getShoeTop);
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
    window.removeEventListener('resize', this.getShoeLeft);
    window.removeEventListener('resize', this.getShoeTop);
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
