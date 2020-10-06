<template>
  <div id="app">
    <j-card></j-card>
  </div>
</template>
<script>
import { JCard } from "@/components";
export default {
  components: { JCard }
}
</script>
<style lang="scss" scoped>

#app {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  border: 1px solid red;
}

</style>
