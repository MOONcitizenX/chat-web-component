<script setup lang="ts">
import { reactive, ref, onMounted, type VNodeRef, watch } from 'vue'

import ChatInputBox from './chat-input-box.vue'
import ChatMessageBox from './chat-message-box.vue'
import ChatTasks from './chat-tasks.vue'

interface BotTask {
  text: string
  response: string
  action: () => void
}

interface Props {
  headerText?: string
  placeholder?: string
  botBgColor?: string
  botTextColor?: string
  clientBgColor?: string
  clientTextColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  headerText: 'Чат',
  placeholder: 'Введите команду',
  botBgColor: '#d978bd',
  botTextColor: '#1d161d',
  clientBgColor: '#e5e6c1',
  clientTextColor: '#1d161d'
})

const botTasks: BotTask[] = [
  {
    text: 'Заказать пиццу',
    response: 'Хорошо, я закажу пиццу. Что еще могу сделать?',
    action: () => {}
  },
  {
    text: 'Установить будильник',
    response: 'Хорошо, я установлю будильник. Что еще могу сделать?',
    action: () => {}
  },
  {
    text: 'Вывести погоду',
    response: 'Хорошо, я выведу погоду. Что еще могу сделать?',
    action: () => {}
  }
]

interface ChatMessage {
  type: 'bot' | 'client'
  text: string
}

const chatHistory = reactive<(ChatMessage | BotTask[])[]>([
  {
    type: 'bot',
    text: 'Привет! Что я могу для Вас сделать?'
  }
])

const updateChatHistory = (chatMessage: ChatMessage) => {
  const multipleSentences = chatMessage.text.split('.')
  if (multipleSentences.length > 1) {
    multipleSentences.forEach((mes) => {
      const singleSentence = {
        type: chatMessage.type,
        text: mes
      }
      chatHistory.push(singleSentence)
    })
  } else {
    chatHistory.push(chatMessage)
  }
}

const handleClientMessage = (text: string) => {
  const task = botTasks.find((t) => t.text.toLowerCase() === text.toLowerCase())
  if (task) {
    handleTaskChoice(task.text)
    inputValue.value = ''
    return
  } else {
    const clientMessage = {
      type: 'client',
      text
    } satisfies ChatMessage
    updateChatHistory(clientMessage)
    inputValue.value = ''
    const botResponse = {
      type: 'bot',
      text: 'Извините, такой задачи у меня нет. Чем могу помочь?'
    } satisfies ChatMessage
    setTimeout(() => {
      updateChatHistory(botResponse)
      setTimeout(() => {
        chatHistory.push(botTasks)
      }, 300)
    }, 500)
  }
}

const isChatOpen = ref<boolean>(false)

const toggleIsChatOpen = () => {
  isChatOpen.value = !isChatOpen.value
}

const inputValue = ref<string>('')
const updateInputValue = (val: string) => {
  inputValue.value = val
}

const bottomOfChat = ref<VNodeRef | null>(null)

const scrollToBottom = () => {
  setTimeout(() => {
    if (bottomOfChat.value) {
      bottomOfChat.value.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

const inProgress = ref<boolean>(false)

const handleTaskChoice = (command: string) => {
  if (inProgress.value) return
  const task = botTasks.find((t) => t.text === command)
  if (task) {
    inProgress.value = true
    task.action()
    const clientMessage = {
      type: 'client',
      text: command
    } satisfies ChatMessage
    updateChatHistory(clientMessage)
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: task.response
      } satisfies ChatMessage
      updateChatHistory(botResponse)
      setTimeout(() => {
        chatHistory.push(botTasks)
      }, 300)
      setTimeout(() => {
        inProgress.value = false
      }, 300)
    }, 500)
  }
}

onMounted(() => {
  chatHistory.push(botTasks)
})

watch(chatHistory, scrollToBottom)

watch(isChatOpen, scrollToBottom)
</script>

<template>
  <div
    class="chat-bot-wrapper"
    :class="{
      open: isChatOpen
    }"
  >
    <button
      v-if="!isChatOpen"
      class="toggle-chat-button"
      @click="toggleIsChatOpen"
      :style="{ backgroundColor: botBgColor }"
    >
      <div class="chat-button__cross"></div>
    </button>
    <div v-else class="chat-bot-container">
      <div class="chat-header" :style="{ backgroundColor: botBgColor }">
        <h3 class="chat-header__text" :style="{ color: botTextColor }">
          {{ headerText }}
        </h3>
        <button
          class="toggle-chat-button close"
          :class="{ open: isChatOpen }"
          @click="toggleIsChatOpen"
        >
          <div class="chat-button__cross"></div>
        </button>
      </div>
      <div
        class="chat-window"
        v-if="isChatOpen"
        :style="{ border: `2px solid ${botBgColor}` }"
      >
        <transition name="messages">
          <div class="chat-messages">
            <TransitionGroup name="messages">
              <li
                v-for="(item, index) in chatHistory"
                :key="index"
                :class="{
                  bot: !Array.isArray(item) && item.type === 'bot',
                  client: !Array.isArray(item) && item.type === 'client'
                }"
              >
                <ChatMessageBox
                  v-if="!Array.isArray(item)"
                  :text="item.text"
                  :type="item.type"
                  :bgColor="item.type === 'bot' ? botBgColor : clientBgColor"
                  :textColor="
                    item.type === 'bot' ? botTextColor : clientTextColor
                  "
                />
                <ChatTasks
                  v-else
                  :botTasks="item"
                  :bgColor="botBgColor"
                  :textColor="botTextColor"
                  @trigger-command="handleTaskChoice"
                />
              </li>
            </TransitionGroup>
            <div class="bottom-of-chat" ref="bottomOfChat"></div>
          </div>
        </transition>
        <ChatInputBox
          :bgColor="botBgColor"
          :textColor="botTextColor"
          :inputValue="inputValue"
          :placeholder="placeholder"
          @send:command="handleClientMessage"
          @update:input-value="updateInputValue"
        />
      </div>
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ul,
ol,
li {
  list-style: none;
}
.chat-bot-wrapper {
  padding: 10px;
  width: fit-content;
  height: auto;
}

.chat-bot-wrapper.open {
  min-width: 400px;
}

.toggle-chat-button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  border: none;

  position: relative;
  transition: transform 0.4s ease;
}

.toggle-chat-button:hover {
  transform: rotate(180deg);
}

.toggle-chat-button.close {
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
}
.toggle-chat-button.close:hover {
  transform: rotate(235deg);
}

.chat-button__cross {
  position: relative;
  width: 50%;
  height: 50%;
}

.chat-button__cross::before,
.chat-button__cross::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;

  width: 100%;
  height: 2px;
  background-color: #000;

  transform: translate(-50%, -50%);
}

.chat-button__cross::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.chat-bot-container {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}

.chat-header {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 6px 12px;
  text-align: left;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header__text {
  font-size: 2rem;
}

.chat-header__chevron {
  padding: 0 6px;

  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.chat-window {
  width: 100%;
  height: 400px;
  padding: 10px 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  /* overflow: hidden; */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: transform 0.3s ease-in;
}

.chat-messages {
  padding-top: 10px;
  padding-right: 17px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;

  transition: opacity 0.3s ease-in-out;
}

.chat-messages li {
  widows: 100%;
}

.chat-messages .bot {
  align-self: flex-start;
}

.chat-messages .client {
  align-self: flex-end;
}

.messages-enter-active,
.messages-leave-active {
  transition: all 0.5s ease;
}
.messages-enter-from,
.messages-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.chat-input {
  width: 100%;
  padding: 4px 8px;
  border-radius: 4px;
}

.chat-input-label {
  position: relative;
}
.chat-input-chevron {
  text-align: center;
  padding-bottom: 2px;

  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;
}

.tasks-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
}

.message {
  position: relative;

  width: fit-content;
  widows: 100%;
  padding: 4px 8px;

  border-radius: 10px;
}

.chat-button {
  cursor: pointer;
  box-shadow: 2px 2px 4px #181818;
  border-radius: 4px;

  transition: box-shadow 0.2s ease-in-out;
}

.chat-button:hover,
.chat-button:active {
  box-shadow: 1px 1px 2px #181818;
}

.task {
  width: fit-content;
}
</style>
