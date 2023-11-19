import React, { useState } from 'react'

const Login = ({ onSubmit }) => {
    const [username, setUsername] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(username)
    }

  return (
    <>
        <h1>Live Cursors</h1>
        <form onSubmit={(e) => handleSubmit(e)} >
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Continue</button>
        </form>
    </>
  )
}

export default Login