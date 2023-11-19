import { useState } from "react"
import Login from "./pages/login"
import Home from "./pages/Home"

function App() {
    const [username, setUsername] = useState("")

    return username ? <Home username={username} /> : <Login onSubmit={setUsername} />

}

export default App
