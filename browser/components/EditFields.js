import React from 'react'

import {match, cleanHeader} from '../utility'

// Fair warning, this code is ugly... turn back now with your sanity
export default ({uniClass, controller, fields, dropdowns, uploads, rows, handleChange, handleChoosePDF, handleSubmit, handleCancel, handleController, handleCreate, handleDelete, handleSort, reverse, sort}) => (
  <div className={`edit-fields-box ${uniClass}`}>
    <div className="app-table-edit col-sm-12 no-gutters">
      <div className={`app-header-bottom${(reverse) ? ' reverse' : ''}`}>
        {[...Object.keys(fields), ...Object.keys(dropdowns), ...Object.keys(uploads)].map(key => {
          return(
            <span key={key} id={key}
            className={(sort.join('-') === key) ? 'sorting' : 'sortable'}
            onClick={handleSort}>
              {cleanHeader(key)}
            </span>
          )
        })}
        <span></span>
        <span></span>
      </div>
    </div>
    {rows.map((row, index) => {
      return (
        <form key={row.id} className="col-sm-12 no-gutters" onSubmit={handleSubmit} autoComplete="off">
          <div className="app-table-edit col-sm-12 no-gutters">
              <div className={`${(index % 2 === 0) ? 'even' : 'odd'} ${!(controller == index) ? ' ' : 'highlighted'}`} >
                  {Object.keys(fields).map(key => {
                    return(
                      <span key={`${row.id}-${key}`}>
                        <input
                          disabled={!(controller == index)}
                          onChange={handleChange}
                          name={`${index}-${key}`}
                          placeholder={`${key}`}
                          value={(controller == index) ? fields[key] || '' : row[key] || ''}
                          className={`${key} ${!(controller == index) ? 'clear' : 'white'}`}
                          autoComplete="new-password"
                        />
                      </span>
                    )
                  })}
                  {Object.keys(dropdowns).map(key => {
                    return (controller == index) ?
                    (
                      <span key={`${row.id}-${key}`}>
                        <select
                          disabled={!(controller == index)}
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
                      </span>
                    )
                    :
                    (
                      <span key={`${row.id}-${key}`}>
                        <input
                          disabled={true}
                          name={`${index}-${key}`}
                          value={match(dropdowns[key].match, row) || ''}
                          className={'clear'}
                          autoComplete="new-password"
                        />
                      </span>
                    )
                  })}
                  {Object.keys(uploads).map(key => {
                    return (controller == index) ?
                    (
                      <span key={`${row.id}-${key}`} className="upload">
                        <input className="upload-button" type="file" onChange={handleChoosePDF} accept="image/*" />
                      </span>
                    )
                    :
                    (
                      <span key={`${row.id}-${key}`} className="upload">
                        {(row[key]) ?
                          <img src={'/assets/logo/' + row[key]} />
                          : null
                        }
                      </span>
                    )
                  })}
                  {(!controller) ?
                    <span className="tail-end">
                      <button value={index} onClick={handleController} className ="fields-button">Edit</button>
                    </span>
                    : null
                  }
                  {(!controller) ?
                    <span className="tail-end">
                      <button value={row.id} onClick={handleDelete} className ="fields-button right-margin">Delete</button>
                    </span>
                    : null
                  }
                  {(controller) ?
                    <span className="tail-end">
                      {(controller == index) ?
                        <button onClick={handleCancel} className ="fields-button">Cancel</button>
                        : null
                      }
                    </span>
                    : null
                  }
                  {(controller) ?
                    <span className="tail-end">
                      {(controller == index) ?
                        <button type="submit" className ="fields-button right-margin">Save</button>
                        : null
                      }
                    </span>
                    : null
                  }
              </div>
          </div>
        </form>
      )
    })}
    {(!controller) ?
      <button onClick={handleCreate} className="new-button">New</button>
      : <div className="bottom-guard"></div>
    }
  </div>
)