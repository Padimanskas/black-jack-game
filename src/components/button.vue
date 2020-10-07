<template>
    <button @click="$emit('click')" class="j-button">
      <slot></slot>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class JButton extends Vue {}
</script>

<style lang="scss" scoped>

.j-button {
  margin-top: 400px;
  border: 1px solid blue;
}

</style>
