<script setup lang="ts">
interface Props {
  text: string
  textColor: string
  bgColor: string
}

const props = defineProps<Props>()

const emits = defineEmits(['send:command'])

const sendCommand = () => {
  emits('send:command', props.text)
}
</script>

<template>
  <div class="task" @click="sendCommand">{{ text }}</div>
</template>
