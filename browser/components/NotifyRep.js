import React from 'react'

export default ({
  values, handleNotify, handleChange, handleAdminMode, cancelProtocol, handleAddAttachment, handleRemoveAttachment
}) => (
  <div className="row lightbox-content">
    <div id={cancelProtocol} className="exit-lightbox" onClick={handleAdminMode}>
      <img id={cancelProtocol} src="/assets/img/Cross_Reverse.svg" />
    </div>
    <div className="app-bg col-sm-12 no-gutters">
    
    {values.rep ?
      <div className="col-sm-12">
        <form onSubmit={handleNotify} autoComplete="off">
          <div className="row">
            <div className="col-sm-12">
              <h3>{`Notify ${values.rep.fullName || 'Rep'}`}</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="field-label">
                <label>To</label>
              </div>
              <div className="field-box">
                <p>{values.rep.email || ''}</p>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="field-label">
                <label>CC</label>
              </div>
              <div className="field-box">
                <input name="mailCC" onChange={handleChange} value={values.mailCC || ''} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="field-label">
                <label>Subject</label>
              </div>
              <div className="field-box">
                <input name="mailSubject" onChange={handleChange} value={values.mailSubject || ''} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="field-label">
                <label>Attachments</label>
              </div>
              <div className="field-box">
                <select
                name="focusedAttachment"
                value={values.focusedAttachment}
                onChange={handleChange}
                >
                  <option key={0} value="">Select a pdf to attach</option>
                  {values.pdfs.map((pdf, index) => (
                    <option key={index + 1} value={index}>{pdf.name}</option>
                  ))}
                </select>
                <span className="attach-btn" onClick={handleAddAttachment}>Add</span>
              </div>
              <div className="attache">
                {values.mailAttachments.map((attachment, index) => (
                  <div key={index}>
                    <span>{attachment.name}</span>
                    <span id={index} onClick={handleRemoveAttachment}>Remove</span>
                  </div>
                ))}
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
            <div className="col-sm-6" align="left">
              <span id={cancelProtocol} className="cancel-button" onClick={handleAdminMode}>Cancel</span>
            </div>
            <div className="col-sm-6" align="right">
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