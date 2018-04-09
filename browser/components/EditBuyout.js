import React from 'react'
import {Link} from 'react-router-dom'

export default ({
  values,
  errors,
  token,
  iAmAuthor,
  admin,
  customers,
  leases,
  count,
  handleAppLink,
  handleChange,
  handleChangeInCustomer,
  handleSave,
  handleSubmit,
  handleDelete,
  handleChangeCustomer,
  handleNewLease,
  handleChangeInLease,
  handleRemoveLease,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine,
  handleRemoveMachine,
  handleChangeInPDFNote,
  handleDeletePDF,
  handleChoosePDF,
  handleUploadPDF
}) => (
  <div className="row edit-byo-page">
    
    <div className="col-sm-12 top">
      <div className="row">
        <div className="col-sm-12 pad-me">
          <Link to='/buyouts' id="back-button">‹ Back to Buyouts</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6"><h2>Editing Buyout</h2></div>
        {/* <div className="col-sm-6 top-buttons"><Link to='/buyouts' id="cancel-button">Back</Link></div> */}

        {(admin || values.status !== 'Working') ?
          <div className="col-sm-6 top-buttons" align="right">
            <Link to='/buyouts' id="cancel-button" className="top">Cancel</Link>
            <button type="submit" id="save-button" className="top" onClick={handleSave}>Save</button>
          </div>
          :
          <div className="col-sm-6 top-buttons" align="right">
            <Link to='/buyouts' id="cancel-button" className="top">Back</Link>
          </div>
        }
      </div>
    </div>

    <div className="agent-box col-sm-3">
      <h3>Agent Information</h3>
      <div>
        <label>Agent Name</label>
        <p>{(values.rep) ? values.rep.fullName : ''}</p>
      </div>
      <div>
        <label>Email</label>
        <p>{(values.rep) ? values.rep.email : ''}</p>
      </div>
      <div>
        <label>Phone</label>
        <p>{(values.rep) ? values.rep.phone : ''}</p>
      </div>
      <div>
        <label>Dealer</label>
        <p>
          {(values.rep && values.rep.dealer) ? values.rep.dealer.name || '' : ''}
        </p>
      </div>
      <div>
        <label>Branch</label>
        <p>{(values.rep && values.rep.branch) ? values.rep.branch.name || '' : ''}</p>
      </div>
      <div>
        <label>Manager</label>
        <p>{(values.rep && values.rep.manager) ? values.rep.manager.fullName || '' : ''}</p>
      </div>
    </div>

    <div className="edit-base col-sm-8">
      <form onSubmit={handleSave} autoComplete="off">
        <div className="col-sm-12">
          <div className="rowed-items" id="date-started">
            <label>Date Started</label>
            <div className="field-box">
              <p>{values.date}</p>
            </div>
          </div>
          <div className="rowed-items">
            <label>Expiration Date</label>
            <div className="field-box">
              {(admin) ?
                <input
                onChange={handleChange}
                name={'expiry'}
                value={values.expiry || ''}
                placeholder="MM-DD-YY"
                autoComplete="new-password"
                />
                :
                <p>{values.expiry || ''}</p>
              }
            </div>
          </div>
          <div className="rowed-items status">
            <label>Status</label>
            <div className="field-box">
              {(admin) ?
                <select
                onChange={handleChange}
                name="status"
                value={values.status}
                >
                  <option value="Draft">Draft</option>
                  <option value="New">New</option>
                  <option value="Working">Working</option>
                  <option value="Complete">Complete</option>
                  <option value="Expired">Expired</option>
                </select>
                :
                <p>{values.status}</p>
              }
            </div>
          </div>
          {(values.appId) ?
            <div className="rowed-items">
              <div className="field-box">
                <Link to="/edit-application" id={values.appId} onClick={handleAppLink}>Created for an Application</Link>
              </div>
            </div>
          : null
          }
        </div>


{/* Oh boy... */}
        {(values.leases) ?
        <div className="app-bg col-sm-12">
          <h3>Lease Information</h3>
          <div className="col-sm-12 labels lease-label">
            {(admin || values.status !== 'Working') ?
              <div className="col-sm-10 col-sm-offset-1 no-gutters">
                <label className="col-sm-6" id="lease-margin">Lease Number</label>
                <label className="col-sm-6">Lease Company</label>
              </div>
              :
              <div className="col-sm-10 col-sm-offset-1 no-gutters">
                <label className="col-sm-5" id="lease-margin">Lease Number</label>
                <label className="col-sm-5">Lease Company</label>
              </div>
            }
          </div>
          {/* Autofill for Lease Company */}
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
            {leases.map(name => (
              <option key={name} value={name}></option>
            ))}
          </datalist>
          {values.leases.map((lease, index) => {
            return ((!lease.delete) ?
              <div key={`lease-${index}`} className="col-sm-12 lease-input">
                <div className="col-sm-1"><label className="index-number">{count++}</label></div>
                <div className="col-sm-10 field-row no-gutters">
                  {(admin || values.status !== 'Working') ?
                    <div className="col-sm-6">
                      <input
                        onChange={handleChangeInLease}
                        id={`${index}-number`}
                        value={lease.number || ''}
                        autoComplete="new-password"
                      />
                    </div>
                    :
                    <div className="col-sm-5">
                      <span>{lease.number || ''}</span>
                    </div>
                  }
                  {(admin || values.status !== 'Working') ?
                    <div className="col-sm-6">
                      <input
                        onChange={handleChangeInLease}
                        id={`${index}-company`}
                        value={lease.company || ''}
                        list="leaseCompanies"
                        autoComplete="new-password"
                      />
                    </div>
                    :
                    <div className="col-sm-5">
                      <span>{lease.company || ''}</span>
                    </div>
                  }
                  {(admin || values.status !== 'Working') ?
                    null
                    :
                    <div className="col-sm-2">
                      <span>{`${lease.quote} Quote` || ''}</span>
                    </div>
                  }
                </div>
                <div className="col-sm-1">
                  {(admin || values.status !== 'Working') ?
                    <button value={index} onClick={handleRemoveLease} className="remove-button"></button>
                    :
                    null
                  }
                </div>
                <div className="col-sm-10 col-sm-offset-1 no-gutters">
                  <div className="col-sm-4">
                    {(lease.quote === 'Partial') ?
                    <button id={`${index}-machines`} onClick={toggleMachines} className="machine show-button" >
                      {lease.displayMachines ?
                        'Hide Machines'
                        :
                        'Show Machines'
                      }
                    </button>
                    : ''
                    }
                  </div>
                  <div className="col-sm-8">
                    {(admin || values.status !== 'Working') ?
                      <div className="radio-div type-rad-btns">
                        <input
                          type="radio"
                          id={`${index}-quote-0`}
                          onChange={handleChangeInLease}
                          name={`${index}-quote`}
                          value="Full"
                          className={(lease.quote === 'Full') ?
                            "on" : ""
                          }
                          checked={(lease.quote === 'Full') ?
                            true : false
                          }
                        />
                        <label htmlFor={`${index}-quote-0`}>Full Quote</label>

                        <input
                          type="radio"
                          id={`${index}-quote-1`}
                          onChange={handleChangeInLease}
                          name={`${index}-quote`}
                          value="Partial"
                          className={(lease.quote === 'Partial') ?
                            "on" : ""
                          }
                          checked={(lease.quote === 'Partial') ?
                            true : false
                          }
                        />
                        <label htmlFor={`${index}-quote-1`}>Partial Quote</label>
                      </div>
                      :
                      null
                    }
                  </div>
                </div>
                
                {(lease.quote === 'Partial' && lease.displayMachines) ?
                  <div className="col-sm-12 no-gutters">
                    <div className="col-sm-12 no-gutters labels machine-label">
                      <label className="col-sm-2 col-sm-offset-1 condense-gutters">Serial #</label>
                      <label className="col-sm-2 condense-gutters">Make</label>
                      <label className="col-sm-2 condense-gutters">Model</label>
                      <label className="col-sm-2 condense-gutters">Location</label>
                      <label className="col-sm-2 condense-gutters">Action</label>
                    </div>
                    {lease.machines.map((machine, mIndex) => {
                      return ((!machine.delete) ?
                        <div key={`lease-${index}-machine-${mIndex}`} className="col-sm-12 no-gutters machine-input">
                          <div className="col-sm-2 col-sm-offset-1 condense-gutters">
                            {(admin || values.status !== 'Working') ?
                              <input
                                onChange={handleChangeInMachine}
                                id={`${index}-${mIndex}-serial`}
                                value={machine.serial || ''}
                                autoComplete="new-password"
                              />
                              :
                              <p>{machine.serial}</p>
                            }
                          </div>
                          <div className="col-sm-2 condense-gutters">
                            {(admin || values.status !== 'Working') ?
                              <input
                                onChange={handleChangeInMachine}
                                id={`${index}-${mIndex}-make`}
                                value={machine.make || ''}
                                autoComplete="new-password"
                              />
                              :
                              <p>{machine.make}</p>
                            }
                          </div>
                          <div className="col-sm-2 condense-gutters">
                            {(admin || values.status !== 'Working') ?
                              <input
                                onChange={handleChangeInMachine}
                                id={`${index}-${mIndex}-model`}
                                value={machine.model || ''}
                                autoComplete="new-password"
                              />
                              :
                              <p>{machine.model}</p>
                            }
                          </div>
                          <div className="col-sm-2 condense-gutters">
                            {(admin || values.status !== 'Working') ?
                              <input
                                onChange={handleChangeInMachine}
                                id={`${index}-${mIndex}-location`}
                                value={machine.location || ''}
                                autoComplete="new-password"
                              />
                              :
                              <p>{machine.location}</p>
                            }
                          </div>
                          <div className="col-sm-2 condense-gutters">
                            {(admin || values.status !== 'Working') ?
                              <select
                              onChange={handleChangeInMachine}
                              id={`${index}-${mIndex}-action`}
                              value={machine.action || ''}
                              autoComplete="new-password"
                              >
                                <option value="Release">Release</option>
                                <option value="Upgrade to Keep">Upgrade to Keep</option>
                                <option value="Upgrade to Return">Upgrade to Return</option>
                                <option value="Buyout to Keep">Buyout to Keep</option>
                                <option value="Buyout to Return">Buyout to Return</option>
                                <option value="Leave on Lease">Leave on Lease</option>
                              </select>
                              :
                              <p>{machine.action}</p>
                            }
                          </div>
                          <div className="col-sm-1">
                            {(admin || values.status !== 'Working') ?
                              <button value={`${index}-${mIndex}`} onClick={handleRemoveMachine} className="remove-button"></button>
                              :
                              null
                            }
                          </div>
                        </div>
                        : null
                      )
                    })}
                    {(admin || values.status !== 'Working') ?
                      <div className="col-sm-offset-1"><button id={`${index}-newMachine`} onClick={handleNewMachine} className="machine add-button">Add Machine</button></div>
                      : null
                    }
                  </div>
                  :
                  null
                }
              </div>
              :
              null
              )
          })
          }
          {(admin || values.status !== 'Working') ?
            <button onClick={handleNewLease} className="add-lease-button">Add Lease</button>
            : null
          }
        </div>
        : null
        }


        <div className="app-bg col-sm-12">
          <h3>Customer Information</h3>

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Customer</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeCustomer}
                  name={'name'}
                  value={(values.customer) ? values.customer.name || '' : ''}
                  list="customers"
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.name || '' : ''}</p>
              }
              <datalist id="customers">
                {customers.map((customer, index) => (
                  <option name={index} value={customer} key={`customer-${index}`}>{customer}</option>
                ))}
              </datalist>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-6">
              <label>First Name</label>
              <input />
              <label>Last Name</label>
              <input />
            </div>
          </div> */}

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Address</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'street'}
                  value={(values.customer) ? values.customer.street || '' : ''}
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.street || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">City</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'city'}
                  value={(values.customer) ? values.customer.city || '' : ''}
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.city || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">State</label>
              {(admin || values.status !== 'Working') ?
                // <input
                //   onChange={handleChangeInCustomer}
                //   name={'state'}
                //   value={(values.customer) ? values.customer.state || '' : ''}
                // />
                <select
                  onChange={handleChangeInCustomer}
                  name={'state'}
                  value={(values.customer) ? values.customer.state || '' : ''}
                  className="state"
                >
                  {['', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map(state => (
                    <option value={state} key={state}>{state}</option>
                  ))}
                </select>
                :
                <p>{(values.customer) ? values.customer.state || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">Zip Code</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'zip'}
                  className={(errors.zip) ? 'red' : ''}
                  value={(values.customer) ? values.customer.zip || '' : ''}
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.zip || '' : ''}</p>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Phone</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'phone'}
                  className={(errors.phone) ? 'red' : ''}
                  value={(values.customer) ? values.customer.phone || '' : ''}
                  placeholder="xxx-xxx-xxxx"
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.phone || '' : ''}</p>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 field-label">
              <label>Customer Email</label>
              {(admin || values.status !== 'Working') ?
                <input 
                  onChange={handleChangeInCustomer}
                  name={'email'}
                  className={(errors.email) ? 'red' : ''}
                  value={(values.customer) ? values.customer.email || '' : ''}
                  autoComplete="new-password"
                />
                :
                <p>{(values.customer) ? values.customer.email || '' : ''}</p>
              }
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-6 field-label">
              <label>Tax ID</label>
              {(admin || values.status !== 'Working') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'taxID'}
                  value={(values.customer) ? values.customer.taxID || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.taxID || '' : ''}</p>
              }
            </div>
          </div> */}

        </div>

        <div className="col-sm-12 field-desc" id="byo-desc">
          <label>Comments</label>
          <textarea
            onChange={handleChange}
            name={'comments'}
            value={values.comments || ''}
          />
        </div>

        {(admin || values.status !== 'Working') ?
          <div className="col-sm-12 buttons" align="right">
            {(admin || values.status === 'Draft') ?
              <button onClick={handleDelete} id="delete-button">Delete</button>
              : null
            }
            <Link to='/buyouts' id="cancel-button">Cancel</Link>
            <button type="submit" id="save-button">Save</button>
            {(values.status === 'Draft') ?
              <button onClick={handleSubmit} type="submit" id="submit-button">Submit</button>
              : null
            }
          </div>
          :
          <div className="col-sm-12 buttons" align="right">
            <Link to='/buyouts' id="cancel-button">Back</Link>
          </div>
        }
      </form>
    </div>

    {(admin) ?
      <div className="col-sm-12 admin">
        <div className="row">
          <div className="app-bg col-sm-12">
            <h3>PDFs</h3>
            <div className="row">
              <div className="col-sm-3">
                <div className="field-label">
                  <label>PDF</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="field-label">
                  <label>Notes</label>
                </div>
              </div>
            </div>
          {(values.pdfs) ?
            <div className="pdfs">
              {values.pdfs.map(pdf => (
                <div key={`pdf-${pdf.id}`} className="row">
                  <div className="col-sm-3">
                    <div className="field-box">
                      <a href={`/api/uploads/${pdf.id}/${pdf.name}?access_token=${token}`} download>{pdf.name}</a>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-box">
                      <p>{pdf.notes || ''}</p>
                    </div>
                  </div>
                  <div className="col-sm-3" align="center">
                    <div className="field-box">
                      <button id={pdf.id} className="fields-button" onClick={handleDeletePDF}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            : null
          }
          </div>
          <div id="byo-desc" className="col-sm-12">
            <div className="row">
              <div className="col-sm-6">
                {/* <div className="field-label">
                  <label>Upload new PDF</label>
                </div> */}
                <h3>Upload New PDF</h3>
                <div className="field-box">
                  <form onSubmit={handleUploadPDF}>
                    <div className="col-sm-12">
                      <input className="upload-button" type="file" onChange={handleChoosePDF} accept="application/pdf" />
                    </div>
                    <div className="col-sm-12">
                      <div className="field-label"><label>Note</label></div>
                      <div className="field-box pdfs"><textarea onChange={handleChangeInPDFNote} value={values.note} /></div>
                    </div>
                    <div className="col-sm-12" align="right">
                      <button id="save-button" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      : null
    }

  </div>
)