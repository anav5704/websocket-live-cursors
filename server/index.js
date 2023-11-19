import { WebSocketServer } from "ws"
import { v4 as uuidv4 } from "uuid"
import http from "http"
import url from "url"

const PORT = 3000   

const server =  http.createServer()
const wsServer = new WebSocketServer({ server: server })

const connnections = {}
const users = {}

const broadcastUpdate = () => {
    Object.keys(connnections).forEach((uuid) => {
        const connection = connnections[uuid]
        const message = JSON.stringify(users)
        connection.send(message)
    })
}

const handleMessage  = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state = message

    broadcastUpdate()
}

const handleClose  = (uuid) => {
    delete connnections[uuid]
    delete users[uuid]

    broadcastUpdate()
}

wsServer.on("connection", (connection, request) => {
    const uuid = uuidv4()
    const { username } = url.parse(request.url, true).query

    connnections[uuid] = connection
    users[uuid] = {
        username,
        state: { }
    }

    connection.on("message", (message) => handleMessage(message, uuid))
    connection.on("close", () => handleClose(uuid))
})

server.listen(PORT, () => {
    console.log(`Server running ono port ${PORT}`)
})

