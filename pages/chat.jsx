import React from 'react'
import { Main } from '../components /Main'
import chatStyles from '../styles/chat.module.css'

export default function Chat() {
    const locale = 'ru-Ru'

    const options = {
        day: 'numeric',
        year: 'numeric',
        month: 'short'
    }

    const currentDate = new Intl.DateTimeFormat(locale, options).format()

    const soket = React.useRef()
    const [connection, setConnection] = React.useState(false)
    const [userName, setUserName] = React.useState('')
    const [userMessage, setUserMessage] = React.useState([])
    const [messageValue, setMessageValue] = React.useState('')

    function connect() {
        soket.current = new WebSocket('ws://localhost:4000')

        soket.current.onopen = () => {
            console.log('Сокет подключился')
            const message = {
                event: 'connection',
                id: Date.now() + 12,
                date: currentDate,
                username: userName,
            }
            soket.current.send(JSON.stringify(message))
            setConnection(true)
        }

        soket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setUserMessage(prevState => [message, ...prevState])
        }

        soket.current.onclose = () => {
            console.log('Soket закрылся')
        }

        soket.current.onerror = () => {
            console.log('Произошла ошибка с сокетом')
        }
    }

    function sendMessage() {
        const message = {
            event: 'connection',
            id: Date.now() + 12,
            date: currentDate,
            username: userName,
            message: messageValue
        }
        soket.current.send(JSON.stringify(message))
        setMessageValue('')
    }

    return (
        <Main title="Chat">
            <section className={chatStyles.chat}>
                <h1 className={chatStyles.chat__title}>Chat</h1>
                <div className={chatStyles.chat__container}>
                    {!connection
                        ?
                        <>
                            <input className={chatStyles.chat__container_authInput} value={userName} name="userName" onChange={e => setUserName(e.target.value)} type="text" placeholder="Введите ваше имя" />
                            <button className={chatStyles.chat__container_authButton} onClick={connect}>Войти</button>
                        </>
                        :
                        <>
                            <input className={chatStyles.chat__container_sendInput} value={messageValue} name="messageValue" onChange={e => setMessageValue(e.target.value)} type="text" placeholder="Введите сообщение" />
                            <button className={chatStyles.chat__container_sendButton} onClick={sendMessage}>Отправить сообщение</button>
                            {userMessage.map(messgae => {
                                return (
                                    <div className={chatStyles.chat__item} key={messgae.id}>
                                        <span className={chatStyles.chat__item_title}>{messgae.username}</span>
                                        {<h2 className={chatStyles.chat__item_text}>{messgae.message ? messgae.message : 'Привет!'}</h2>}
                                        <span className={chatStyles.chat__item_date}>{messgae.date}</span>
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            </section>
        </Main>
    )


}
