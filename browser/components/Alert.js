import React from 'react'

export default ({alerts, handleClose}) => (
  <div className="alert-box">
    {alerts.map((alert, index) => (
      <div
        className={`${alert.color}-alert`}
        key={`alert-${index}`}
        onClick={handleClose}
      >
        <img className="left" src={`/assets/img/${(alert.color === 'red') ? 'Cross' : 'Check'}_Circle.svg`}/>
        {alert.message}
        <img className="right" src="/assets/img/Cross_(error).svg"/>
      </div>
    ))}
  </div>
)