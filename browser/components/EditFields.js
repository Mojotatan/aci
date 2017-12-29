import React from 'react'

import {match} from '../utility'

export default ({controller, fields, dropdowns, rows, handleChange, handleSubmit, handleCancel, handleController, handleCreate, handleDelete}) => (
  <div className="edit-fields-box">
    <table className="app-table">
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr className={`${(index % 2 === 0) ? 'even' : 'odd'} ${!(controller == index) ? ' ' : 'highlighted'}`} >
              <form key={row.id} onSubmit={handleSubmit}>
                {Object.keys(fields).map(key => {
                  return(
                    <td>
                      <input
                        disabled = {!(controller == index)}
                        key={`${row.id}-${key}`}
                        onChange={handleChange}
                        name={`${index}-${key}`}
                        placeholder={`${key}`}
                        value={(controller == index) ? fields[key] || '' : row[key] || ''}
                        className={`${key} ${!(controller == index) ? 'clear' : 'white'}`} 
                      />
                    </td>
                  )
                })}
                {Object.keys(dropdowns).map(key => {
                  return(
                    <td>
                      <select
                        disabled = {!(controller == index)}
                        key={`${row.id}-${key}`}
                        onChange={handleChange}
                        name={`${index}-${key}`}
                        value={(controller == index) ? dropdowns[key].select || '' : match(dropdowns[key].match, row) || ''}
                        className={!(controller == index) ? 'clear' : 'white-dpd'}
                      >
                      
                        <option value="" key={`${row.id}-${key}-none`}></option>
                        {dropdowns[key].values.map(val => {
                          return(
                            <option value={val} key={`${row.id}-${key}-${val}`}>{val}</option>
                          )
                        })}
                      </select>
                    </td>
                  )
                })}
                {(!controller) ?
                  <td>
                    <button value={index} onClick={handleController}>Edit</button>
                  </td>
                  : null
                }
                {(!controller) ?
                  <td>
                    <button value={row.id} onClick={handleDelete}>Delete</button>
                  </td>
                  : null
                }
                {(controller == index) ?
                  <td>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                  : null
                }
                {(controller == index) ?
                  <td>
                    <button type="submit">Save</button>
                  </td>
                  : null
                }
              </form>
            </tr>
          )
        })}
        </tbody>
    </table>
        {(!controller) ?
          <button onClick={handleCreate}>New</button>
          : null
        }
  </div>
)