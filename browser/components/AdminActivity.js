import React from 'react'
import {Link} from 'react-router-dom'
import NotifyRep from './NotifyRep'
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
  toggleLightbox
}) => (
  <div className="row edit-apps-page admin">

    {(values.lightbox) ?
    <div className="lightbox">
      <div className="shadowbox" onClick={toggleLightbox}></div>
      <div className="container">
        <div className="col-sm-8 col-sm-offset-2 lightbox-content"></div>
      </div>
    </div>
    : null
    }

    <div className="col-sm-12 top">
      <div className="row">
        <div className="col-sm-6"><h2>Admin Activity</h2></div>
        {/* <div className="col-sm-3 top-buttons"><Link to='/applications' id="cancel-button" className="top">Back</Link></div> */}

          <div className="col-sm-6 top-buttons" align="right">
            <Link to='/applications' id="cancel-button" className="top">Back</Link>
          </div>
      </div>
    </div>

    <div className="agent-box col-sm-3">
      <h3>Application Information</h3>
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
        {(values.amount) ? <p>{values.amount}</p> : <p>&nbsp;</p>}
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
      
      <div>
        {(values.type) ? <p>{`${values.type} Customer`}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        {(values.comments) ? <p>Comments Entered</p> : <p>&nbsp;</p>}
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
              <div>
                {/* <div className="thicc">Activity</div> */}
                <div className="thicc">User</div>
                <div>Date</div>
                <div className="thicc">Leasing Company</div>
                <div className="thicc">Application Number</div>
                <div>Status</div>
                <div>Notes</div>
                <div></div>
                <div></div>
              </div>
            </div>
            
            {(values.actions && values.actions.length > 0) ?
              values.actions.map((action, index) => (
                <div key={action.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                  <div className={(action.show) ? 'retracted extended' : 'retracted'}>
                    {/* <div className="thicc">{action.activity || ''}</div> */}
                    <div className="thicc">{action.admin.email || ''}</div>
                    <div>{action.date || ''}</div>
                    <div className="thicc">{action.leasingCompany || ''}</div>
                    <div className="thicc">{action.appNumber || ''}</div>
                    <div>{action.status || ''}</div>
                    <div id={index} onClick={handleNote} className="edit">{(action.show) ? 'Hide' : 'View'}</div>
                    <div id={`edit-${index}`} className="edit" onClick={handleAdminMode}>Edit</div>
                    <div id={index} className="edit" onClick={handleActionDelete}>Delete</div>
                    <div className={(action.show) ? 'notes retracted extended' : 'notes retracted' }><div>{action.notes || ''}</div></div>
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
      <div className="row mid-gutter">
        <div className="col-sm-6">
          <div className="app-bg col-sm-12">
            <form onSubmit={handleSaveAction}>
              <div className="row">
                <div className="col-sm-12">
                  <h3>{(values.action.id === 'new') ? 'New Activity' : 'Edit Activity'}</h3>
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
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Status</label>
                  </div>
                  <div className="field-box">
                    <select
                    onChange={handleChangeAction}
                    name="status"
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
                  <div className="col-sm-6">
                    <div className="field-label">
                      <label>Expiry</label>
                    </div>
                    <div className="field-box col-sm-6 no-gutters">
                      <input
                        onChange={handleChangeAction}
                        name="expiry"
                        value={values.action.expiry || ''}
                      />
                    </div>
                  </div>
                  : null
                }
              </div>
              {/* Conditional fields based on status */}
              {(values.action.status === 'Approved') ?
                <div className="row">
                  <div className="col-sm-12">
                    <div className="field-label">
                      <label>Legal Name</label>
                    </div>
                    <div className="field-box">
                      <input
                        onChange={handleChangeAction}
                        name="legalName"
                        value={values.action.legalName || ''}
                      />
                    </div>
                  </div>
                </div>
                : null
              }
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
                <div className="col-sm-12" align="right">
                  <span id="cancel-button" onClick={handleAdminMode}>Cancel</span>
                  <button className="send-button">Save</button>
                  <button className="send-button" onClick={handleSaveAndNotify}>Save and Notify Rep</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      : null
      }

      {(!values.adminMode) ?
        <div className="row">
          <div className="col-sm-12">
            <br />
            <button id="submit-button" onClick={handleAdminMode}>New</button>
          </div>
        </div>
        : null
      }

    
      {(values.adminMode === 'notify') ?
        <NotifyRep
          values={values}
          handleChange={handleChange}
          handleNotify={handleNotify}
        />
        : null
      }


      {/* log */}
      <div className="row log">
        <div className="col-sm-12 no-gutters">
          <h3>Activity Logs</h3>
        </div>
        <div className="col-sm-12 no-gutters">
          <div className="flux-table app-table">
            <div className="flux-top">
              <div>
                <div className="">Date</div>
                <div className="thicc">User</div>
                <div className="ultra">Activity</div>
              </div>
            </div>
            
            {(values.logs && values.logs.length > 0) ?
              values.logs.map((log, index) => (
                <div key={log.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                  <div className="retracted">
                    <div className="">{reformatDate(log.date) || ''}</div>
                    <div className="thicc">{log.admin.email || ''}</div>
                    <div className="ultra">{log.activity || ''}</div>
                  </div>
                </div>
              ))
              :
                <div className="even"><div className="retracted"></div></div>
            }
          </div>
        </div>
      </div>

    </div>
  </div>
)