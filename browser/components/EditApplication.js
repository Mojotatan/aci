import React from 'react'

export default ({values, handleChange, handleSubmit}) => (
  <div>
    <h2>Edit this app</h2>
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Save</button>
      <button onClick={function(e) {console.log('yaaay'); handleSubmit(e, 'new')}}>Submit</button>
    </form>
  </div>
)