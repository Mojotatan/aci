import React from 'react'
import {Link} from 'react-router-dom'
import NotifyRep from './NotifyRep'
import AppLite from './AppLite'
import ByoLite from './ByoLite'
import BuyoutCalcs from './BuyoutCalcs'
import {reformatDate} from '../utility'

export default ({
  mode,
  values,
  token,
  count,
  handleChange,
  handleSave,
  handleNote,
  handleNotify,
  handleAdminMode,
  handleActionDelete,
  handleSaveAction,
  handleSaveAndNotify,
  handleChangeAction,
  toggleAdminView,
  toggleLightbox,
  toggleCalcView,
  handleCalcs,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine,
  handleRemoveMachine,
  formatTerm,
  handleChangeInPDFNote,
  handleDeletePDF,
  handleChoosePDF,
  handleUploadPDF
}) => (
  <div className="row edit-apps-page admin">

    {(values.lightbox) ?
    <div className="lightbox">
      <div className="shadowbox" onClick={toggleLightbox}></div>
      <div className="container">
        {(mode === 'app') ?
          <AppLite values={values} count={count} formatTerm={formatTerm} toggleLightbox={toggleLightbox} toggleMachines={toggleMachines} />
          :
          <ByoLite values={values} count={count} toggleLightbox={toggleLightbox} toggleMachines={toggleMachines} />
        }
      </div>
    </div>
    : null
    }

    <div className="col-sm-12 top">
    <div className="row">
        <div className="col-sm-12 pad-me">
          {(mode === 'app') ?
            <Link to='/applications' id="back-button">‹ Back to Applications</Link>
            :
            <Link to='/buyouts' id="back-button">‹ Back to Buyouts</Link>
          }
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6"><h2>Admin Portal</h2></div>
        {/* <div className="col-sm-3 top-buttons"><Link to='/applications' id="cancel-button" className="top">Back</Link></div> */}

          {(values.calcView) ?
          <div className="col-sm-6 top-buttons" align="right">
            <span id="cancel-button" className="top calcs" onClick={toggleCalcView}>Cancel</span>
            <button type="submit" id="save-button" className="top" onClick={handleSave}>Save</button>
          </div>
          :
          <div className="col-sm-6 top-buttons" align="right">
            {(mode === 'app') ?
              <Link to='/applications' id="cancel-button" className="top">Back</Link>
              :
              <Link to='/buyouts' id="cancel-button" className="top">Back</Link>
            }
          </div>
          }
      </div>
    </div>

    <div className="agent-box col-sm-3">
      <div className="agent-edit-box" onClick={toggleAdminView}>
        <img src="/assets/img/Edit.svg" />
      </div>

      <h3>{(mode === 'app') ? 'Application' : 'Buyout'} Information</h3>

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
      
      {(mode === 'app') ?
        <div>
          <label>Estimated Deal Size</label>
          {(values.amount) ? <p>{`$${values.amount}`}</p> : <p>&nbsp;</p>}
        </div>
        : null
      }
      {(mode === 'app') ?
        <div>
          <label>Agent Name</label>
          {(values.term) ? <p>{values.term}</p> : <p>&nbsp;</p>}
        </div>
        : null
      }
      {(mode === 'app') ?
        <div>
          <label>Advanced Payments</label>
          {(values.advancedPayments) ? <p>{values.advancedPayments}</p> : <p>&nbsp;</p>}
        </div>
        : null
      }
      {(mode === 'app') ?
        <div>
          <label>End of Term</label>
          {(values.endOfTerm) ? <p>{values.endOfTerm}</p> : <p>&nbsp;</p>}
        </div>
        : null
      }

      {(mode === 'app') ? <br /> : null}

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

    {
      (values.calcView) ?
      <BuyoutCalcs
        values={values}
        toggleCalcView={toggleCalcView}
        handleCalcs={handleCalcs}
        toggleMachines={toggleMachines}
        handleNewMachine={handleNewMachine}
        handleChangeInMachine={handleChangeInMachine}
        handleRemoveMachine={handleRemoveMachine}
        count={1}
      />
      :
      <div className="col-sm-9">
        {(mode === 'byo') ?
          <div className="row">
            <div className="col-sm-12 no-gutters">
              <div className="flux-table">
                <div className="flux-top">
                  <span className="flux-float col-sm-6" align="left"><h2>Leases</h2></span>
                  <div className="col-sm-12">
                    <div className="leaseNumber">Lease Number</div>
                    <div className="leaseCompany">Lease Company</div>
                    <div className="quote">Quote</div>
                    <div className="calcs"></div>
                  </div>
                </div>
                {(values.leases && values.leases.length > 0) ?
                  values.leases.map((lease, index) => (
                    <div key={lease.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                      <div className="retracted">
                        <div className="leaseNumber">{lease.number}</div>
                        <div className="leaseCompany">{lease.company}</div>
                        <div className="quote">{lease.quote}</div>
                        <div id={`lease-${index}`} className="calcs" onClick={toggleCalcView}>Calculations</div>
                      </div>
                    </div>
                  ))
                  : <div className="even"><div className="retracted"></div></div>
                }
              </div>
            </div>
          </div>
          : null
        }


        {(mode === 'app') ?
        // credit applications (only on apps)
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
          : null
        }
        
        {(values.action && values.adminMode === 'action') ?
        <div className="action lightbox">
        <div id="cancel" className="shadowbox" onClick={handleAdminMode}></div>
        <div className="container">

        <div className="row lightbox-content">
          <div id="cancel" className="exit-lightbox" onClick={handleAdminMode}>
            <img id="cancel" src="/assets/img/Cross_Reverse.svg" />
          </div>
          {/* <div className="col-sm-12 no-gutters"> */}
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
                    <datalist id="leaseCompanies">
                      <option value="EverBank"></option>
                      <option value="DLL"></option>
                      <option value="Wells"></option>
                      <option value="USB"></option>
                      <option value="CIT"></option>
                      <option value="Marlin"></option>
                      <option value="Balboa"></option>
                      <option value="EMR"></option>
                      <option value="Leaf"></option>
                      <option value="Great America"></option>
                      <option value="PNC"></option>
                    </datalist>
                      <input
                        onChange={handleChangeAction}
                        name="leasingCompany"
                        value={values.action.leasingCompany || ''}
                        list="leaseCompanies"
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
                          placeholder="mm/dd/yy"
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
          {/* </div> */}
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

        {//(mode === 'byo') ?
          // <div className="row">
          //   <div className="app-bg col-sm-12">
          //     <h3>PDFs</h3>
          //     <div className="row">
          //       <div className="col-sm-3">
          //         <div className="field-label">
          //           <label>PDF</label>
          //         </div>
          //       </div>
          //       <div className="col-sm-6">
          //         <div className="field-label">
          //           <label>Notes</label>
          //         </div>
          //       </div>
          //     </div>
          //   {(values.pdfs) ?
          //     <div className="pdfs">
          //       {values.pdfs.map(pdf => (
          //         <div key={`pdf-${pdf.id}`} className="row">
          //           <div className="col-sm-3">
          //             <div className="field-box">
          //               <p><a href={`/api/uploads/${pdf.id}/${pdf.name}?access_token=${token}`} download>{pdf.name}</a></p>
          //             </div>
          //           </div>
          //           <div className="col-sm-6">
          //             <div className="field-box">
          //               <p>{pdf.notes || ''}</p>
          //             </div>
          //           </div>
          //           <div className="col-sm-3" align="center">
          //             <div className="field-box">
          //               <button id={pdf.id} className="fields-button" onClick={handleDeletePDF}>Delete</button>
          //             </div>
          //           </div>
          //         </div>
          //       ))}
          //     </div>
          //     : null
          //   }
          //   </div>
          //   <div id="byo-desc" className="col-sm-12">
          //     <div className="row">
          //       <div className="col-sm-6">
          //         {/* <div className="field-label">
          //           <label>Upload new PDF</label>
          //         </div> */}
          //         <h3>Upload New PDF</h3>
          //         <div className="field-box">
          //           <form onSubmit={handleUploadPDF}>
          //             <div className="col-sm-12">
          //               <input className="upload-button" type="file" onChange={handleChoosePDF} accept="application/pdf" />
          //             </div>
          //             <div className="col-sm-12">
          //               <div className="field-label"><label>Note</label></div>
          //               <div className="field-box pdfs"><textarea onChange={handleChangeInPDFNote} value={values.note} /></div>
          //             </div>
          //             <div className="col-sm-12" align="right">
          //               <button id="save-button" type="submit">Submit</button>
          //             </div>
          //           </form>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          // : null
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
    }
  </div>
)