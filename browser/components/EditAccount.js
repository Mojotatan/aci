import React from 'react'

export default ({values, handleChange, handleSubmit}) => (
  <div>
    <h2>Edit yo account</h2>
    <form onSubmit={handleSubmit}>
      {/* <input 
        onChange={handleChange}
        name="username"
        placeholder="username..."
      />
      <input 
        onChange={handleChange}
        name="password"
        placeholder="password..."
      /> */}
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
    </form>
  </div>
)