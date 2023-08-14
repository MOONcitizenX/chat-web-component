import { defineCustomElement } from 'vue'
import ChatBotWidget from './components/chat-bot-widget.ce.vue'

export const ChatWidget = defineCustomElement(ChatBotWidget)

export function register(tagname = 'chat-widget') {
  customElements.define(tagname, ChatWidget)
}
