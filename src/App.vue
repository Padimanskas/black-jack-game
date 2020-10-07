<template>
  <div id="app">
    <b-j-hand v-bind:shoe-position="{top: shoeTop, left: shoeLeft}"></b-j-hand>
    <b-j-shoe ref="shoe"></b-j-shoe>
    <j-button v-on:click="lrt">Add card</j-button>
  </div>
</template>
<script>
import { JButton, BJHand, BJShoe } from "@/components";
import { DEALER_DID_HIT } from "@/store/actions.type";
export default {
  components: { BJHand, JButton, BJShoe },

  data: function() {
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

  methods: {
    getShoeLeft() {
      const { left } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeLeft = left;
    },

    getShoeTop() {
      const { top } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeTop = top;
    },

    lrt: function () {
      this.$store.commit(DEALER_DID_HIT, {suit: 'CLUB', rank: 2});
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
  //background-image: url("./assets/bg.png");
  background-repeat: repeat;
  z-index: -2;

}
</style>
