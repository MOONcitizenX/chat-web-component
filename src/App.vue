<script setup lang="ts">
import { register } from './chat-widget'
register('chat-bot-widget')
</script>

<template>
  <main class="wrapper">
    <chat-bot-widget
      headerText="My chat bot"
      botBgColor="#89C7E0"
      botTextColor="#33373D"
      clientBgColor="#DAE9B0"
      clientTextColor="#12272A"
      placeholder="My placeholder"
    />
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
