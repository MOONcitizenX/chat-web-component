<script setup lang="ts">
import { register } from './chat-widget'
register('chat-bot-widget')

const tasks = [
  {
    text: '1 задание',
    response: 'Хорошо, я сделаю 1 задание. Что еще могу сделать?',
    action: () => {
      console.log('1 task')
    }
  },
  {
    text: '2 задание',
    response: 'Хорошо, я сделаю 2 задание. Что еще могу сделать?',
    action: () => {
      console.log('2 task')
    }
  },
  {
    text: '3 задание',
    response: 'Хорошо, я сделаю 3 задание. Что еще могу сделать?',
    action: () => {
      console.log('3 task')
    }
  }
]
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
      :botTasks="tasks"
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
