function FormLogin ({ handleLogin, username, password, setPassword, setUsername}) {
  return (
    <form onSubmit={handleLogin}>
    <div>
      <label>
        Username:
        <input 
          type='text'
          value={username}
          onChange={({ target })=> setUsername(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        Password:
        <input 
          type='password'
          value={password}
          onChange={({ target })=> setPassword(target.value)}
        />
        </label>
    </div>

    <button type='submit'>Login</button>
  </form>
  )
}

export default FormLogin
