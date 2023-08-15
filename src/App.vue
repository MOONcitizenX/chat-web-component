<script setup lang="ts">
import { register } from './chat-widget'
register('chat-bot-widget')
</script>

<template>
  <main class="wrapper">
    <chat-bot-widget />
  </main>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: relative;
}
.wrapper {
  position: absolute;

  top: 0;
  left: 0;
}
</style>
