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
            <h3>Please enter your username to continue</h3>
        <form onSubmit={(e) => handleSubmit(e)} >
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Continue</button>
        </form>
        <p>Developed by <a href="https://github.com/anav5704">Anav</a> @ <a href="https://procyon.website/">Procyon</a></p>
    </>
  )
}

export default Login