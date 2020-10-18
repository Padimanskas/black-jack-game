<template>
    <button @click="$emit('click')" class="j-button">
      <slot></slot>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BJButton extends Vue {}
</script>

<style lang="scss" scoped>

.j-button {
width: 100px;
  height: 40px;
}

</style>
