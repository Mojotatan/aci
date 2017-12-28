import React from 'react'

export default ({errors, handleClose}) => (
  <div className="alert-box">
    {errors.map((err, index) => (
      <div
        className={`${err.color}-alert`}
        key={`alert-${index}`}
        onClick={handleClose}
      >
        {err.message}
      </div>
    ))}
  </div>
)