import { useState } from 'react'
import websocket from 'react-use-websocket'

const socketUrl = 'ws://127.0.0.1:8000/ws/test'

const Server = () => {
    const [message, setMessage] = useState('')
    const [inputValue, setInputValue] = useState('')]

    const { sendJsonMessage } = websocket(socketUrl, {
        onOpen: () => console.log('Connected'),
        onMessage: (message) => setMessage(message.data),
        onClose: () => console.log('Disconnected'),
    })

    const sendInputValue = () => {
        const message = { text: inputValue }
        sendJsonMessage(message)
        setInputValue('')
    }

    return (
        <div>
            <input value={inputValue} type='text'onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={sendInputValue}>Send</button>
            <div>Received Data: {message} </div>
        </div>
    )
}

export default Server;