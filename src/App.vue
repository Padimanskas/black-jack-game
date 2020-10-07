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

  data: function(): void {
    return {
      shoeTop: 0,
      shoeLeft: 0,
    }
  },

  mounted(): void {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getShoeLeft);
      window.addEventListener('resize', this.getShoeTop);

      this.getShoeLeft();
      this.getShoeTop();
    })

  },

  methods: {
    getShoeLeft(): void {
      const { left } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeLeft = left;
    },

    getShoeTop(): void {
      const { top } = this.$refs.shoe.$el.getBoundingClientRect();
      this.shoeTop = top;
    },

    lrt: function (): void {
      this.$store.commit(DEALER_DID_HIT, 'hello martians' + Math.random());
    }
  },
  beforeDestroy(): void {
    window.removeEventListener('resize', this.getShoeLeft);
    window.removeEventListener('resize', this.getShoeTop);
  }
}
</script>
<style lang="scss">

body {
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  border: 1px solid red;
  box-sizing: border-box;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid green;
}
</style>
