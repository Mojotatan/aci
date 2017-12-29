import React from 'react'

import {match} from '../utility'

export default ({controller, fields, dropdowns, rows, handleChange, handleSubmit, handleCancel, handleController, handleCreate, handleDelete}) => (
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
                placeholder={`${key}`}
                value={(controller == index) ? fields[key] || '' : row[key] || ''}
              />
            )
          })}
          {Object.keys(dropdowns).map(key => {
            if (controller == index) {
              return(
                <select
                  disabled = {!(controller == index)}
                  key={`${row.id}-${key}`}
                  onChange={(controller == index) ? handleChange : null}
                  name={`${index}-${key}`}
                  value={(controller == index) ? dropdowns[key].select || '' : match(dropdowns[key].match, row) || ''}
                >
                  <option value="" key={`${row.id}-${key}-none`}></option>
                  {dropdowns[key].values.map(val => {
                    return(
                      <option value={val} key={`${row.id}-${key}-${val}`}>{val}</option>
                    )
                  })}
                </select>
              )
            } else {
              return(
                <span key={`${row.id}-${key}`}>{match(dropdowns[key].match, row) || ''}</span>
              )
            }
          })}
          {(!controller) ?
            <button value={index} onClick={handleController}>Edit</button>
            : null
          }
          {(!controller) ?
            <button value={row.id} onClick={handleDelete}>Delete</button>
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