import React from 'react'

export default ({
  values, handleNotify, handleChange
}) => (
  <div className="row mid-gutter">
    <div className="app-bg col-sm-12 no-gutters">
      <div className="col-sm-6">
        <div className="row">
          <div className="col-sm-12">
            <h3>{`Notify ${values.rep.fullName || 'Rep'}`}</h3>
          </div>
        </div>
        <div className="row">
          THE FIELDS AND SUCH
        </div>
      </div>
    
    {values.rep ?
      <div className="col-sm-6">
        <form onSubmit={handleNotify}>
          <div className="row">
            <div className="col-sm-12">
              <h3>Email to be Sent</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>To</label>
              </div>
              <div className="field-box">
                <p>{values.rep.email || ''}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>CC</label>
              </div>
              <div className="field-box">
                <input name="mailCC" onChange={handleChange} value={values.mailCC || ''} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="field-label">
                <label>Subject</label>
              </div>
              <div className="field-box">
                <input name="mailSubject" onChange={handleChange} value={values.mailSubject || ''}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="field-label">
                <label>Message</label>
              </div>
              <div className="field-desc">
                <textarea name="mailBody" onChange={handleChange} value={values.mailBody || ''}></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12" align="right">
              <span id="cancel-button">Cancel</span>
              <button
                className={`send-button${(values.mailDisabled) ? ' disabled' : ''}`}
                disabled={values.mailDisabled}
              >Send</button>
            </div>
          </div>

        </form>
      </div>
      : <p>ERROR: There is no rep associated with this app</p>
    }
    </div>
  </div>
)