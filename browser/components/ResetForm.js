import React from 'react'

export default ({handleChange, handleSubmit, handleControl}) => (
  <div className="login col-sm-8 col-sm-offset-2">
    <form className="field-label" onSubmit={handleSubmit}>
      <div className="app-bg">
        <h3>Account Recovery</h3>
        <div><label>Email</label></div>
        <input 
          onChange={handleChange}
          name="username"
          placeholder="email..."
        />
      </div>
      <br />
      <div className="bottom-buttons">
        <span align="left" onClick={handleControl}>{'< Back'}</span>
        <button align="right" id="submit-button" type="submit">Submit</button>
      </div>
    </form>
  </div>
)