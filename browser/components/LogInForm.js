import React from 'react'

export default ({handleChange, handleSubmit}) => (
  <div className="col-sm-8 col-sm-offset-2">
    <form className="field-label" onSubmit={handleSubmit}>
      <div className="app-bg">
        <h3>Agent Login</h3>
        <div><label>Username</label></div>
        <input 
          onChange={handleChange}
          name="username"
          placeholder="username..."
        />
        <div><label>Password</label></div>
        <input 
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="password..."
        />
      </div>
      <br />
      <button align="right" id="submit-button" type="submit">Login</button>
    </form>
  </div>
)