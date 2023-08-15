<script setup lang="ts">
interface Props {
  inputValue: string
  placeholder: string
  textColor: string
  bgColor: string
}

const props = defineProps<Props>()

const emits = defineEmits(['update:inputValue', 'send:command'])

const updateInputValue = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target) {
    emits('update:inputValue', target.value)
  }
}

const sendCommand = () => {
  if (props.inputValue.length) {
    emits('send:command', props.inputValue)
  }
}
</script>

<template>
  <label for="chat-bot-input" class="chat-input-label">
    <input
      id="chat-bot-input"
      class="chat-input"
      type="text"
      :value="inputValue"
      @input="updateInputValue"
      @keyup.enter="sendCommand"
      :placeholder="placeholder"
      :style="{
        border: `1px solid ${bgColor}`,
        backgroundColor: bgColor,
        color: textColor
      }"
    />
    <span class="chat-input-chevron" @click="sendCommand">&gt;</span>
  </label>
</template>
