import React from 'react'

import {match} from '../utility'

export default ({controller, fields, dropdowns, rows, handleChange, handleSubmit, handleCancel, handleController, handleCreate, handleDelete}) => (
  <div className="edit-fields-box">
    {rows.map((row, index) => {
      return (
        <form key={row.id} onSubmit={handleSubmit}>
          <table className="app-table-edit col-sm-12">
            <tbody>
              <tr className={`tr-padding ${(index % 2 === 0) ? 'even' : 'odd'} ${!(controller == index) ? ' ' : 'highlighted'}`} >
                  {Object.keys(fields).map(key => {
                    return(
                      <td key={`${row.id}-${key}`}>
                        <input
                          disabled = {!(controller == index)}
                          onChange={handleChange}
                          name={`${index}-${key}`}
                          placeholder={`${key}`}
                          value={(controller == index) ? fields[key] || '' : row[key] || ''}
                          className={!(controller == index) ? 'clear' : 'white'}
                        />
                      </td>
                    )
                  })}
                  {Object.keys(dropdowns).map(key => {
                    return(
                      <td key={`${row.id}-${key}`}>
                        <select
                          disabled = {!(controller == index)}
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
                      <button value={index} onClick={handleController} className ="fields-button">Edit</button>
                    </td>
                    : null
                  }
                  {(!controller) ?
                    <td>
                      <button value={row.id} onClick={handleDelete} className ="fields-button right-margin">Delete</button>
                    </td>
                    : null
                  }
                  {(controller == index) ?
                    <td>
                      <button onClick={handleCancel} className ="fields-button">Cancel</button>
                    </td>
                    : null
                  }
                  {(controller == index) ?
                    <td>
                      <button type="submit" className ="fields-button right-margin">Save</button>
                    </td>
                    : null
                  }
              </tr>
            </tbody>
          </table>
        </form>
      )
    })}
    {(!controller) ?
      <button onClick={handleCreate} className="new-button">New</button>
      : null
    }
  </div>
)