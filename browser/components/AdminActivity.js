import React from 'react'
import {Link} from 'react-router-dom'
import NotifyRep from './NotifyRep'
import AppLite from './AppLite'
import {reformatDate} from '../utility'

export default ({
  values,
  handleChange,
  handleNote,
  handleNotify,
  handleAdminMode,
  handleActionDelete,
  handleSaveAction,
  handleSaveAndNotify,
  handleChangeAction,
  toggleAdminView,
  toggleLightbox,
  formatTerm
}) => (
  <div className="row edit-apps-page admin">

    {(values.lightbox) ?
    <div className="lightbox">
      <div className="shadowbox" onClick={toggleLightbox}></div>
      <div className="container">
        <AppLite values={values} formatTerm={formatTerm} toggleLightbox={toggleLightbox} />
      </div>
    </div>
    : null
    }

    <div className="col-sm-12 top">
    <div className="row">
        <div className="col-sm-12 pad-me">
          <Link to='/applications' id="back-button">‹ Back to Applications</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6"><h2>Admin Portal</h2></div>
        {/* <div className="col-sm-3 top-buttons"><Link to='/applications' id="cancel-button" className="top">Back</Link></div> */}

          <div className="col-sm-6 top-buttons" align="right">
            <Link to='/applications' id="cancel-button" className="top">Back</Link>
          </div>
      </div>
    </div>

    <div className="agent-box col-sm-3">
      <div className="agent-edit-box" onClick={toggleAdminView}>
        <img src="/assets/img/Edit.svg" />
      </div>

      <h3>Application Information</h3>

      <br />

      <div>
        {(values.type) ? <p>{`${values.type} Customer`}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        {(values.comments) ? <p>Comments Entered</p> : <p>&nbsp;</p>}
      </div>

      <br className="ultra-special"/>
      
      <div>
        <label>Customer Name</label>
        {(values.customer) ? <p>{values.customer.name}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Customer Address</label>
        {(values.customer) ? <p>{values.customer.address}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Customer Phone</label>
        {(values.customer) ? <p>{values.customer.phone}</p> : <p>&nbsp;</p>}
      </div>

      <br />

      <div>
        <label>Estimated Deal Size</label>
        {(values.amount) ? <p>{`$${values.amount}`}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Agent Name</label>
        {(values.term) ? <p>{values.term}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Advanced Payments</label>
        {(values.advancedPayments) ? <p>{values.advancedPayments}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>End of Term</label>
        {(values.endOfTerm) ? <p>{values.endOfTerm}</p> : <p>&nbsp;</p>}
      </div>

      <br />

      <div>
        <label>Agent Name</label>
        {(values.rep) ? <p>{values.rep.fullName}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Agent Email</label>
        {(values.rep) ? <p>{values.rep.email}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Agent Phone</label>
        {(values.rep) ? <p>{values.rep.phone}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Agent Dealer</label>
        {(values.rep && values.rep.dealer) ? <p>{values.rep.dealer.name}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Agent Branch</label>
        {(values.rep && values.rep.branch) ? <p>{values.rep.branch.name}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Manager</label>
        {(values.rep && values.rep.manager) ? <p>{values.rep.manager.fullName}</p> : <p>&nbsp;</p>}
      </div>

      <br />

      <div className="full-width">
        <span className="edit" onClick={toggleAdminView}>Edit</span>
        <span className="edit" onClick={toggleLightbox}>View</span>
      </div>
    </div>

    <div className="col-sm-9">
      <div className="row">
        <div className="col-sm-12 no-gutters">
          <div className="flux-table">
            <div className="flux-top">
              {/* <div className="flux-top-block">
                <span className="flux-float"><h2>Credit Applications</h2></span>
                <span className="newapp">
                  {(!values.adminMode) ?
                    <button id="app-button" className="app-button" onClick={handleAdminMode}>New Application</button>
                    : null
                  }
                </span>
              </div> */}
              <span className="flux-float col-sm-6" align="left"><h2>Credit Applications</h2></span>
              <span className="flux-float col-sm-6" align="right">
                {(!values.adminMode) ?
                  <button id="app-button" className="app-button" onClick={handleAdminMode}>New Application</button>
                  : null
                }
              </span>
              <div className="col-sm-12">
                <div className="user">User</div>
                <div className="date">Date</div>
                <div className="leasingCompany">Leasing Company</div>
                <div className="appNumber">Application Number</div>
                <div className="status">Status</div>
                {/* <div>Notes</div> */}
                <div className="edit"></div>
                <div className="edit"></div>
              </div>
            </div>
            
            {(values.actions && values.actions.length > 0) ?
              values.actions.map((action, index) => (
                <div key={action.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                  <div className={(action.show) ? 'retracted extended' : 'retracted'}>
                    <div className="user">{action.admin.email || ''}</div>
                    <div className="date">{action.date || ''}</div>
                    <div className="leasingCompany">{action.leasingCompany || ''}</div>
                    <div className="appNumber">{action.appNumber || ''}</div>
                    <div className={`status ${action.status}`}>{action.status || ''}</div>
                    {/* <div id={index} onClick={handleNote} className="edit">{(action.show) ? 'Hide' : 'View'}</div> */}
                    <img id={`edit-${index}`} className="edit" onClick={handleAdminMode} src="/assets/img/Edit.svg" />
                    <img id={index} className="edit" onClick={handleActionDelete} src="/assets/img/Delete.svg" />
                    {/* <div className={(action.show) ? 'notes retracted extended' : 'notes retracted' }><div>{action.notes || ''}</div></div> */}
                  </div>
                </div>
              ))
              :
                <div className="even"><div className="retracted"></div></div>
            }
          </div>
        </div>
      </div>
      
      {(values.action && values.adminMode === 'action') ?
      <div className="action lightbox">
      <div id="cancel" className="shadowbox" onClick={handleAdminMode}></div>
      <div className="container">

      <div className="row lightbox-content">
        <div id="cancel" className="exit-lightbox" onClick={handleAdminMode}>
          <img src="/assets/img/Cross_Reverse.svg" />
        </div>
        <div className="col-sm-12 no-gutters">
          <div className="app-bg col-sm-12">
            <form onSubmit={handleSaveAction} autoComplete="off">
              <div className="row">
                <div className="col-sm-12">
                  <h3>{(values.action.id === 'new') ? 'New Credit Application' : 'Edit Credit Application'}</h3>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Activity</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChangeAction}
                      name="activity"
                      value={values.action.activity || ''}
                    />
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Leasing Company</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChangeAction}
                      name="leasingCompany"
                      value={values.action.leasingCompany || ''}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Application Number</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChangeAction}
                      name="appNumber"
                      value={values.action.appNumber || ''}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <div className="field-label">
                    <label>Status</label>
                  </div>
                  <div className="field-box">
                    <select
                    onChange={handleChangeAction}
                    name="status"
                    className="state"
                    value={values.action.status || ''}
                    >
                      <option value="Working">Working</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Approved">Approved</option>
                      <option value="Hold">Hold</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>

                {(values.action.status === 'Approved') ?
                  <div className="col-sm-3">
                    <div className="field-label">
                      <label>Expiration Date</label>
                    </div>
                    <div className="field-box">
                      <input
                        onChange={handleChangeAction}
                        name="expiry"
                        value={values.action.expiry || ''}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  : null
                }

              {(values.action.status === 'Approved') ?
                  <div className="col-sm-6">
                    <div className="field-label">
                      <label>Legal Name</label>
                    </div>
                    <div className="field-box">
                      <input
                        onChange={handleChangeAction}
                        name="legalName"
                        value={values.action.legalName || ''}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                : null
              }
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="field-label">
                    <label>Notes</label>
                  </div>
                  <div className="field-desc">
                    <textarea
                      onChange={handleChangeAction}
                      name="notes"
                      value={values.action.notes || ''}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <span id="cancel-button" onClick={handleAdminMode}>Cancel</span>
                </div>
                <div className="col-sm-4" align="right">
                  <button className="send-button">Save</button>
                </div>
                <div className="col-sm-4" align="right">
                  <button className="super send-button" onClick={handleSaveAndNotify}>Save and Notify Rep</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      </div>
      </div>
      : null
      }

    
      {(values.adminMode === 'notify') ?
        <div className="notify lightbox">
          <div className="shadowbox" onClick={toggleLightbox}></div>
          <div className="container">
            <NotifyRep
            values={values}
            handleChange={handleChange}
            handleNotify={handleNotify}
            handleAdminMode={handleAdminMode}
            />
          </div>
        </div>
        : null
      }


      {/* log */}
      <div className="row app-bg log">
        <div className="col-sm-12">
          <h3>Activity Log</h3>
        </div>
        {(values.logs) ?
          <div className="col-sm-12">
            {values.logs.map((log, index) => (
              <div key={log.id} className="log-entry">
                <div>
                  {log.activity.split('<b>').map((words, index) => {
                    if (index !== 1) {
                      return (<span key={index}>{words}</span>)
                    } else {
                      return (<strong key={index}>{words}</strong>)
                    }
                  })}
                </div>
                <div className="log-date">{reformatDate(log.date)}</div>
              </div>
            ))}
          </div>
          : null
        }
      </div>

    </div>
  </div>
)