import React from 'react'

export default ({controller, fields, dropdowns, rows, handleChange, handleSubmit, handleCancel, handleController, handleCreate}) => (
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
          {Object.keys(dropdowns).map(key => {
            let match = (arr, obj) => {
              if (!obj) return ''
              else if (arr.length === 1) return obj[arr[0]]
              else return match(arr.slice(1), obj[arr[0]])
            }
            return(
              <select
                disabled = {!(controller == index)}
                key={`${row.id}-${key}`}
                onChange={handleChange}
                name={`${index}-${key}`}
                value={(controller == index) ? dropdowns[key].select : match(dropdowns[key].match, row) || ''}
              >
                <option value="" key={`${row.id}-${key}-none`}></option>
                {dropdowns[key].values.map(val => {
                  return(
                    <option value={val} key={`${row.id}-${key}-${val}`}>{val}</option>
                  )
                })}
              </select>
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
    {(!controller) ?
      <button onClick={handleCreate}>New</button>
      : null
    }
  </div>
)