import { useState } from 'react'
import websocket from 'react-use-websocket'

const socketUrl = 'ws://127.0.0.1:8000/ws/test'

const MessageInterface = () => {
    const [newMessage, setNewMessage] = useState<string[]>([])
    const [message, setMessage] = useState('')

    const { sendJsonMessage } = websocket(socketUrl, {
        onOpen: () => console.log('Connected'),
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            setNewMessage((prev) => [...prev, data.new_message])
        },
        onError: (error) => console.log('Error', error),
        onClose: () => console.log('Disconnected'),
    })

    return (
        <div>
            {newMessage.map((message, index) => {
                return (
                    <div key={index}>
                        <p>{message}</p>
                    </div>
                )
            })}

            <form>
                <label>
                    Enter message: 
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
            </form>
            <button onClick={() => { sendJsonMessage({type: "message", message}) }}>Send Message</button>
        </div>
    )
}

export default MessageInterface;