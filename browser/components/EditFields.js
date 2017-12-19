import React from 'react'

export default ({controller, fields, rows, handleChange, handleSubmit, handleCancel, handleController}) => (
  <div>
    {rows.map((row, index) => {
      return (
        <form key={row.id} onSubmit={handleSubmit}>
          {Object.keys(fields).map(key => {
            return(
              <input
                disabled = {!(controller == index)}
                key={`${row.id}-${key}`}
                onChange={handleChange}
                name={`${index}-${key}`}
                placeholder={`${key}...`}
                value={(controller == index) ? fields[key] : row[key] || ''}
              />
            )
          })}
          {(!controller) ?
            <button value={index} onClick={handleController}>Edit</button>
            : null
          }
          {(controller == index) ?
            <button onClick={handleCancel}>Cancel</button>
            : null
          }
          {(controller == index) ?
            <button type="submit">Save</button>
            : null
          }
        </form>
      )
    })}
  </div>
)