<template>
  <div id="app">
    <b-j-hand v-bind:score="dealerScore" v-bind:cards="dealerHits" v-bind:position="{top: 100, left: 600}" v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-hand v-bind:score="playerScore" v-bind:cards="playerHits" v-bind:position="{top: 500, left: 600}" v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-shoe ref="shoe"></b-j-shoe>
    <j-button v-on:click="addDealer">Add card to dealer</j-button>
    <j-button v-on:click="addPlayer">Add card to player</j-button>
    <j-button v-on:click="newBet">New bet</j-button>
    <j-button v-on:click="clear">Clear hits</j-button>
    <j-button v-on:click="openAllCards">Open all cards</j-button>
  </div>
</template>
<script>
import { JButton, BJHand, BJShoe } from "@/components";
import {CLEAR_HITS, CLEAR_SCORE, DEALER_DID_HIT, OPEN_ALL_CARDS, PLAYER_DID_HIT} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  components: { BJHand, JButton, BJShoe },

  computed: {
    ...mapGetters(['dealerHits', 'playerHits', 'playerScore', 'dealerScore'])
  },

  data() {
    return {
      shoeTop: 0,
      shoeLeft: 0,
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getShoeLeft);
      window.addEventListener('resize', this.getShoeTop);

      this.getShoeLeft();
      this.getShoeTop();
    })

  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
        console.log(state, mutation);
    });
  },

  methods: {
    getShoeLeft() {
      const { left } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeLeft = left;
    },

    getShoeTop() {
      const { top } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeTop = top;
    },

    addDealer () {
      this.$store.commit(DEALER_DID_HIT, {suit: 'CLUB', rank: 2});
    },

    addPlayer () {
      this.$store.commit(PLAYER_DID_HIT, {suit: 'DIAMOND', rank: 'ACE'});
    },

    newBet() {

      Promise.resolve()
          .then(() => {
            setTimeout(() => this.$store.commit(DEALER_DID_HIT, {}), 0)
          })
          .then(() =>  {
            setTimeout(() => this.$store.commit(PLAYER_DID_HIT, {}), 500)
          })
          .then(() =>  {
            setTimeout(() => this.$store.commit(DEALER_DID_HIT, {upsideDown: true}), 1000)
          })
    .then(() =>  {
      setTimeout(() => this.$store.commit(PLAYER_DID_HIT, {}), 1500)
      });

      //await setTimeout(() => this.$store.commit(DEALER_DID_HIT, {suit: 'CLUB', rank: 2}), 1000);
      //await setTimeout(() => this.$store.commit(PLAYER_DID_HIT, {suit: 'DIAMOND', rank: 'ACE'}), 1000);
    },
    clear() {
      this.$store.commit(CLEAR_HITS);
      this.$store.commit(CLEAR_SCORE);
    },
    openAllCards() {
      this.$store.commit(OPEN_ALL_CARDS);
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
</style>
