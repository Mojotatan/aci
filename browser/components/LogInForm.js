import React from 'react'

export default ({handleChange, handleSubmit}) => (
  <div>
    <h2>Log in plz</h2>
    <form onSubmit={handleSubmit}>
      <input 
        onChange={handleChange}
        name="username"
        placeholder="username..."
      />
      <input 
        onChange={handleChange}
        name="password"
        placeholder="password..."
      />
      <button type="submit">Login</button>
    </form>
  </div>
)