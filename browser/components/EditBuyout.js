import React from 'react'
import {Link} from 'react-router-dom'
import { WSASERVICE_NOT_FOUND } from 'constants';

export default ({
  values,
  iAmAuthor,
  admin,
  customers,
  count,
  handleChange,
  handleChangeInCustomer,
  handleSave,
  handleSubmit,
  handleCheckbox,
  handleChangeCustomer,
  handleNewLease,
  handleChangeInLease,
  handleRemoveLease,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine,
  handleRemoveMachine
}) => (
  <div className="row edit-byo-page">
    
    <div className="col-sm-12 top">
      <div className="row">
        <div className="col-sm-6"><h2>Buyout</h2></div>
        {/* <div className="col-sm-6 top-buttons"><Link to='/buyouts' id="cancel-button">Back</Link></div> */}
        <div className="col-sm-6 top-buttons" align="right">
          <Link to='/buyouts' id="cancel-button">Cancel</Link>
          <button type="submit" id="save-button" onClick={handleSave}>Save</button>
        </div>
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
          {(values.rep) ? values.rep.dealer || values.dealer || '' : values.dealer || ''}
        </p>
      </div>
      <div>
        <label>Branch</label>
        <p>{(values.rep) ? values.rep.branch || values.branch || '' : values.branch || ''}</p>
      </div>
    </div>

    <div className="edit-base col-sm-8">
      <form onSubmit={handleSave}>
        <div className="col-sm-12">
          <div className="rowed-items" id="date-started">
            <label>Date Started</label>
            <p>{values.date}</p>
          </div>
          <div className="rowed-items">
            <label>Expires</label>
            <div className="field-box">
              {(admin) ?
                <input
                onChange={handleChange}
                name={'expiry'}
                value={values.expiry || ''}
                />
                :
                <p>{values.expiry || ''}</p>
              }
            </div>
          </div>
          <div className="rowed-items status">
            <label>Status</label>
            {(admin) ?
              <select
              onChange={handleChange}
              name="status"
              value={values.status}
              >
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Hold">Hold</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
                <option value="Expired">Expired</option>
              </select>
              :
              <p>{values.status}</p>
            }
          </div>
          {/* notify functionality moved to admin workflow */}
          {/* {(admin) ?
            <div className="rad-btns">
              <input
                type="checkbox"
                onChange={handleCheckbox}
                name="notifyRep"
                checked={values.notifyRep}
              />
              <label>Notify Rep</label>
            </div>
            : null
          } */}
        </div>

        <div className="col-sm-12">
          {(admin || values.status === 'Draft') ?
            <div className="radio-div type-rad-btns">
              <input
                type="radio"
                id="quote-0"
                onChange={handleChange}
                name="quote"
                value="Full"
                className={(values.quote === 'Full') ?
                  "on" : ""
                }
                checked={(values.quote === 'Full') ?
                  true : false
                }
              />
              <label htmlFor="quote-0">Full Quote</label>

              <input
                type="radio"
                id="quote-1"
                onChange={handleChange}
                name="quote"
                value="Partial"
                className={(values.quote === 'Partial') ?
                  "on" : ""
                }
                checked={(values.quote === 'Partial') ?
                  true : false
                }
              />
              <label htmlFor="quote-1">Partial Quote</label>
            </div>
            :
            <p>{`${values.quote} Quote` || ''}</p>
          }

        </div>

        <div className="app-bg col-sm-12">
          <h3>Customer Information</h3>

          {(iAmAuthor && values.status === 'Draft') ?
            <div className="row">
              <div className="col-sm-6 field-label">
                <label>Load a Customer</label>
                <select
                  onChange={handleChangeCustomer}
                  name="customer"
                  value={(values.customer) ? values.customer.name || 'new' : 'new'}
                >
                  <option value="new" key="customer-new">New</option>
                  {customers.map((customer, index) => (
                    (customer) ?
                    <option name={index} value={customer} key={`customer-${index}`}>{customer}</option>
                    : null
                  ))}
                </select>
              </div>
            </div>
            :
            null
          }

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Customer</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'name'}
                  value={(values.customer) ? values.customer.name || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.name || '' : ''}</p>
              }
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
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'street'}
                  value={(values.customer) ? values.customer.street || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.street || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">City</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'city'}
                  value={(values.customer) ? values.customer.city || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.city || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">State</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'state'}
                  value={(values.customer) ? values.customer.state || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.state || '' : ''}</p>
              }
            </div>
            <div className="col-sm-6 field-label">
              <label className="required">Zip Code</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'zip'}
                  value={(values.customer) ? values.customer.zip || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.zip || '' : ''}</p>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Phone</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChangeInCustomer}
                  name={'phone'}
                  value={(values.customer) ? values.customer.phone || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.phone || '' : ''}</p>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6 field-label">
              <label className="required">Customer Email</label>
              {(admin || values.status === 'Draft') ?
                <input 
                  onChange={handleChangeInCustomer}
                  name={'email'}
                  value={(values.customer) ? values.customer.email || '' : ''}
                />
                :
                <p>{(values.customer) ? values.customer.email || '' : ''}</p>
              }
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-6 field-label">
              <label>Tax ID</label>
              {(admin || values.status === 'Draft') ?
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

{/* Oh boy... */}
        {(values.leases) ?
        <div className="app-bg col-sm-12">
          <h3>Lease Information</h3>
          <div className="col-sm-12 labels lease-label">
            <div className="col-sm-10 col-sm-offset-1 no-gutters">
              <label className="col-sm-4" id="lease-margin">Lease Number</label>
              <label className="col-sm-4">Lease Company</label>
              <label className="col-sm-4">Lease Amount</label>
            </div>
          </div>
          {values.leases.map((lease, index) => {
            return ((!lease.delete) ?
              <div key={`lease-${index}`} className="col-sm-12 lease-input">
                <div className="col-sm-1"><label className="index-number">{count++}</label></div>
                <div className="col-sm-10 no-gutters">
                  <div className="col-sm-4">
                    {(admin || values.status === 'Draft') ?
                      <input
                        onChange={handleChangeInLease}
                        id={`${index}-number`}
                        value={lease.number || ''}
                      />
                      :
                      <span>{lease.number || ''}</span>
                    }
                  </div>
                  <div className="col-sm-4">
                    {(admin || values.status === 'Draft') ?
                      <input
                        onChange={handleChangeInLease}
                        id={`${index}-company`}
                        value={lease.company || ''}
                      />
                      :
                      <span>{lease.company || ''}</span>
                    }
                  </div>
                  {/* <div className="co" */}
                  <div className="col-sm-4 monetary">
                    {(admin || values.status === 'Draft') ?
                      <input
                        onChange={handleChangeInLease}
                        id={`${index}-amount`}
                        value={lease.amount || ''}
                      />
                      :
                      <span>{lease.amount || ''}</span>
                    }
                  </div>
                </div>
                <div className="col-sm-1">
                  {(admin || values.status === 'Draft') ?
                    <button value={index} onClick={handleRemoveLease} className="remove-button"></button>
                    :
                    null
                  }
                </div>
                <div className="col-sm-offset-1">
                  {(values.quote === 'Partial') ?
                    <button id={`${index}-machines`} onClick={toggleMachines} className="machine show-button" >
                      {lease.displayMachines ?
                        'Hide Machines'
                        :
                        'Show Machines'
                      }
                    </button>
                    : null
                  }
                </div>
                
                {(values.quote === 'Partial' && lease.displayMachines) ?
                  <div className="col-sm-12 no-gutters">
                    <div className="col-sm-12 no-gutters labels machine-label">
                      <div className="col-sm-10 col-sm-offset-1 no-gutters">
                        <label className="col-sm-3">Serial #</label>
                        <label className="col-sm-3">Make</label>
                        <label className="col-sm-3">Model</label>
                        <label className="col-sm-3">Location</label>
                      </div>
                    </div>
                    {lease.machines.map((machine, mIndex) => {
                      return ((!machine.delete) ?
                        <div key={`lease-${index}-machine-${mIndex}`} className="col-sm-12 no-gutters machine-input">
                          <div className="col-sm-offset-1 col-sm-10 no-gutters">
                            <div className="col-sm-3 condense-gutters">
                              {(admin || values.status === 'Draft') ?
                                <input
                                  onChange={handleChangeInMachine}
                                  id={`${index}-${mIndex}-serial`}
                                  value={machine.serial || ''}
                                />
                                :
                                <p>{machine.serial}</p>
                              }
                            </div>
                            <div className="col-sm-3 condense-gutters">
                              {(admin || values.status === 'Draft') ?
                                <input
                                  onChange={handleChangeInMachine}
                                  id={`${index}-${mIndex}-make`}
                                  value={machine.make || ''}
                                />
                                :
                                <p>{machine.make}</p>
                              }
                            </div>
                            <div className="col-sm-3 condense-gutters">
                              {(admin || values.status === 'Draft') ?
                                <input
                                  onChange={handleChangeInMachine}
                                  id={`${index}-${mIndex}-model`}
                                  value={machine.model || ''}
                                />
                                :
                                <p>{machine.model}</p>
                              }
                            </div>
                            <div className="col-sm-3 condense-gutters">
                              {(admin || values.status === 'Draft') ?
                                <input
                                  onChange={handleChangeInMachine}
                                  id={`${index}-${mIndex}-location`}
                                  value={machine.location || ''}
                                />
                                :
                                <p>{machine.location}</p>
                              }
                            </div>
                          </div>
                          <div className="col-sm-1">
                            {(admin || values.status === 'Draft') ?
                              <button value={`${index}-${mIndex}`} onClick={handleRemoveMachine} className="remove-button"></button>
                              :
                              null
                            }
                          </div>
                        </div>
                        : null
                      )
                    })}
                    <div className="col-sm-offset-1"><button id={`${index}-newMachine`} onClick={handleNewMachine} className="machine add-button">Add Machine</button></div>
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
          <button onClick={handleNewLease} className="add-lease-button">Add Lease</button>
        </div>
        : null
        }

        <div className="col-sm-12 field-desc" id="byo-desc">
          <label>Comments</label>
          <textarea
            onChange={handleChange}
            name={'comments'}
            value={values.comments || ''}
          />
        </div>

        <div className="col-sm-12 buttons" align="right">
          <Link to='/buyouts' id="cancel-button">Cancel</Link>
          <button type="submit" id="save-button">Save</button>
          {(values.status === 'Draft') ?
            <button onClick={handleSubmit} type="submit" id="submit-button">Submit</button>
            : null
          }
        </div>
      </form>
    </div>
  </div>
)