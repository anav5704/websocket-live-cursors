import { useEffect, useRef } from "react"
import { Cursor } from "../components/Cursor"
import useWebSocket from "react-use-websocket"
import throttle from "lodash.throttle"

const renderCursors = (users) => {
    if(!users) return null
    return Object.keys(users).map((uuid) => {
        const user = users[uuid]
        return <Cursor key={uuid} username={user.username} point={[user.state.x, user.state.y]} />
    })
}

const Home = ({ username }) => {
    const wsUrl = "ws://localhost:3000"
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrl, {
        queryParams: { username }
    })

    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, 50))

    useEffect(() => {
        sendJsonMessage({
            x: 0,
            y: 0,
        })
        window.addEventListener("mousemove", (e) => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY,
            })
        })
    }, [])

    if (lastJsonMessage) {
        return (
            <>
                {renderCursors(lastJsonMessage)}
            </>
        )
    }
}

export default Home