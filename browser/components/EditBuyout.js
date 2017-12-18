import React from 'react'
import {Link} from 'react-router-dom'

export default ({values, handleChange, handleSave, handleSubmit}) => (
  <div>
    <h2>Edit this byo</h2>
    <form onSubmit={handleSave}>
      {Object.keys(values).map(key => {
        return (
          <input
            key={key}
            onChange={handleChange}
            name={key}
            placeholder={`${key}...`}
            value={values[key] || ''}
          />
        )
      })}
      <Link to='/buyouts'><button>Cancel</button></Link>
      <button type="submit">Save</button>
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  </div>
)