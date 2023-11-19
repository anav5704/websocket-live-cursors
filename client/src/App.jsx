import { useState } from "react"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
    const [username, setUsername] = useState("")

    return username ? <Home username={username} /> : <Login onSubmit={setUsername} />

}

export default App
