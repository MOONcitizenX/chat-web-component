<script setup lang="ts">
// import ChatBotWidget from './components/chat-bot-widget.ce.vue'
import { register } from './chat-widget'
register()
</script>

<template>
  <main class="wrapper"><chat-widget /></main>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
