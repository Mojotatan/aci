import React from 'react'

export default ({errors, handleClose}) => (
  <div className="alert-box">
    {errors.map((err, index) => (
      <div
        className={`${err.color}-alert`}
        key={`alert-${index}`}
        onClick={handleClose}
      >
        <img className="left" src={`/assets/img/${(err.color === 'red') ? 'Cross' : 'Check'}_Circle.svg`}/>
        {err.message}
        <img className="right" src="/assets/img/Cross_(Error).svg"/>
      </div>
    ))}
  </div>
)