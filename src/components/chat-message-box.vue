<script setup lang="ts">
interface Props {
  type: 'bot' | 'client'
  text: string
  bgColor: string
  textColor: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="message" :style="{ color: textColor, backgroundColor: bgColor }">
    {{ text }}
  </div>
</template>
