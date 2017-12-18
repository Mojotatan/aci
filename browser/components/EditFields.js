import React from 'react'

export default ({controller, rows, handleChange, handleSubmit, handleCancel}) => (
  <div>
    {rows.map(row => {
      return (
        <form key={row} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name={row}
            placeholder={`${row}...`}
            value={rows[row] || ''}
          />
          <button>Cancel</button>
          <button type="submit">Save</button>
        </form>
      )
    })}
  </div>
)