import { defineCustomElement } from 'vue'
import ChatBotWidget from './components/chat-bot-widget.ce.vue'

export const ChatWidget = defineCustomElement(ChatBotWidget)

export function register(tagname = 'chat-widget') {
  if (customElements.get(tagname)) {
    return
  }
  customElements.define(tagname, ChatWidget)
}
