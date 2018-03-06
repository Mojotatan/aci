import React from 'react'

export default ({handleChange, handleSubmit, handleControl}) => (
  <div className="login col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
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
      <div className="bottom-buttons">
        <span align="left" onClick={handleControl}>I forgot my password</span>
        <button align="right" id="submit-button" type="submit">Login</button>
      </div>
    </form>
  </div>
)