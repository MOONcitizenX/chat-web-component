<script setup lang="ts">
import ChatMessageBox from './chat-message-box.vue'

interface BotTask {
  text: string
  response: string
  action: () => void
}

interface Props {
  botTasks: BotTask[]
  bgColor: string
  textColor: string
}

const props = defineProps<Props>()

const emits = defineEmits(['trigger-command'])

const handleTaskClick = (command: string) => {
  emits('trigger-command', command)
}
</script>

<template>
  <ul class="tasks-container">
    <ChatMessageBox
      v-for="(task, index) in botTasks"
      :key="index"
      @click="handleTaskClick(task.text)"
      type="bot"
      :text="task.text"
      :bgColor="bgColor"
      :textColor="textColor"
      class="chat-button"
    />
  </ul>
</template>
