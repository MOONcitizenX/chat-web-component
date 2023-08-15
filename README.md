# Тестовое задание чат-бот

### Ветки

- `main` - как выглядит без пропсов: [Deploy](https://default-no-props.netlify.app/)
- `with-props`как выглядит с пропсами: [Deploy](https://with-props.netlify.app/)
- `web-component` ветка для билда веб-компонента

### Как пользоваться веб-компонентом

##### Code

Данный код нужно вставить в `body` вашего html файла.
В корневой папке приложения нужно положить `index.js` файл полученный из билда в ветке `web-component`

    <chat-widget></chat-widget>

    <script  type="module">
        import { register } from  "./index.js";
        register();
    </script>

Функция `register` принимает аргументом `tag`. Дефолтное значение - `chat-widget`.
Чтобы изменить тэг веб-компонента, зарегистрируйте его под другим именем и используйте это имя в качестве тэга. Рекомендуется использовать как минимум двусоставное имя во избежание конфликтов. Например `chat-bot-widget`.

##### Props

Чат-бот-виджет принимает следующие пропсы:

    header-text:  string
    // default = 'Чат'

    placeholder:  string\
    // default = 'Введите команду'

    bot-bg-color:  string
    // default = '#d978bd'

    bot-text-color:  string
    // default = #1d161d'

    client-bg-color:  string
    // default = '#e5e6c1'

    client-text-color:  string
    // default = '#1d161d'

Пример использования пропсов:

    <chat-widget
        header-text="My chat bot"
        bot-bg-color="#89C7E0"
        bot-text-color="#33373D"
        client-bg-color="#DAE9B0"
        client-text-color="#12272A"
        placeholder="My placeholder"
    />
