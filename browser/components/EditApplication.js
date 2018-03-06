import React from 'react'
import {Link} from 'react-router-dom'
import AdminActivity from './AdminActivity'
import {reformatDate} from '../utility'

export default ({
  values,
  errors,
  iAmAuthor,
  admin,
  customers,
  leases,
  count,
  handleByoLink,
  handleChange,
  handleNewLease,
  handleChangeInLease,
  handleRemoveLease,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine,
  handleRemoveMachine,
  handleChangeInCustomer,
  handleSave,
  handleSubmit,
  handleDelete,
  handleCheckbox,
  handleChangeCustomer,
  handleChangeInTerm,
  formatTerm,
  handleNotify,
  handleNote,
  handleChangeAction,
  handleActionDelete,
  handleSaveAction,
  handleSaveAndNotify,
  handleAdminMode,
  toggleAdminView,
  toggleLightbox
}) => (
  (admin && values.adminView) ?
  (
  <AdminActivity
    values={values}
    handleChange={handleChange}
    handleNote={handleNote}
    handleNotify={handleNotify}
    handleAdminMode={handleAdminMode}
    handleActionDelete={handleActionDelete}
    handleChangeAction={handleChangeAction}
    handleSaveAction={handleSaveAction}
    handleSaveAndNotify={handleSaveAndNotify}
    toggleAdminView={toggleAdminView}
    toggleLightbox={toggleLightbox}
    formatTerm={formatTerm}
  />
  )
  :
  (
  <div className="row edit-apps-page">

    <div className="col-sm-12 top">
      <div className="row">
        <div className="col-sm-12 pad-me">
          <Link to='/applications' id="back-button">‹ Back to Applications</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6"><h2>Editing Application</h2></div>
        {/* <div className="col-sm-3 top-buttons"><Link to='/applications' id="cancel-button" className="top">Back</Link></div> */}

        {(admin || values.status !== 'Working') ?
          <div className="col-sm-6 top-buttons" align="right">
            {(admin) ?
              <span id="cancel-button" className="top" onClick={toggleAdminView}>Cancel</span>
              :
              <Link to='/applications' id="cancel-button" className="top">Cancel</Link>
            }
            <button type="submit" id="save-button" className="top" onClick={handleSave}>Save</button>
          </div>
          :
          <div className="col-sm-6 top-buttons" align="right">
            <Link to='/applications' id="cancel-button" className="top">Back</Link>
          </div>
        }
      </div>
    </div>

    <div className="agent-box col-sm-3">
      <h3>Agent Information</h3>
      <div>
        <label>Name</label>
        {(values.rep) ? <p>{values.rep.fullName}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Email</label>
        {(values.rep) ? <p>{values.rep.email}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Phone</label>
        {(values.rep) ? <p>{values.rep.phone}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Dealer</label>
        {(values.rep && values.rep.dealer) ? <p>{values.rep.dealer.name}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Branch</label>
        {(values.rep && values.rep.branch) ? <p>{values.rep.branch.name}</p> : <p>&nbsp;</p>}
      </div>
      <div>
        <label>Manager</label>
        {(values.rep && values.rep.manager) ? <p>{values.rep.manager.fullName}</p> : <p>&nbsp;</p>}
      </div>
    </div>

    <div className="edit-base col-sm-8">
      <form onSubmit={handleSave} autoComplete="off">
        <div className="col-sm-12">
          <div className="rowed-items" id="date-started">
            <label>Date Submitted</label>
            <div className="field-box">
              <p>{values.date}</p>
            </div>
          </div>
          <div className="rowed-items">
            <label>Expiration Date</label>
            <div className="field-box">
              {/* {(admin) ?
                <input
                onChange={handleChange}
                name={'expiry'}
                value={values.expiry || ''}
                placeholder="MM-DD-YY"
                />
                :
                <p>{values.expiry || ''}</p>
              } */}
              {/* <p>{(values.actions && values.actions[0] && values.actions[0].sentToRep) ? values.actions[0].expiry : ''}</p> */}
              <p>{values.expiry || ''}</p>
            </div>
          </div>
          <div className="rowed-items status">
            <div>
              <label>Status</label>
            </div>
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
                  <option value="Hold">Hold</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                  <option value="Expired">Expired</option>
                </select>
                :
                <p>{values.status}</p>
              }
            </div>
          </div>
        </div>

        <div className="app-bg col-sm-12">
          <h3>Application Type</h3>
          <div className="row">
            <div className="col-sm-6">
              {(admin || values.status !== 'Working') ?
                <div className="radio-div type-rad-btns">
                  <input
                    type="radio"
                    id="type-0"
                    onChange={handleChange}
                    name="type"
                    value="New"
                    className={(values.type === 'New') ?
                      "on" : ""
                    }
                    checked={(values.type === 'New') ?
                      true : false
                    }
                  />
                  <label htmlFor="type-0">New Customer</label>

                  <input
                    type="radio"
                    id="type-1"
                    onChange={handleChange}
                    name="type"
                    value="Existing"
                    className={(values.type === 'Existing') ?
                      "on" : ""
                    }
                    checked={(values.type === 'Existing') ?
                      true : false
                    }
                  />
                  <label htmlFor="type-1">Existing Customer</label>
                </div>
                :
                <p>{values.type || ''}</p>
              }
            </div>
          </div>
          {(values.type === 'Existing') ?
            <div className="row">
              <div className="col-sm-6">
                <div className="field-label">
                  <label className="required">Customer</label>
                </div>
                <div className="field-box">
                  {(admin || values.status !== 'Working') ?
                    <input
                      onChange={function(e) {
                        handleChange(e)
                        handleChangeCustomer(e)
                      }}
                      name={'existingCustomer'}
                      value={values.existingCustomer || (values.customer) ? values.customer.name : '' || ''}
                      list="customers"
                    />
                    :
                    <p>{values.existingCustomer || ''}</p>
                  }
                </div>
              </div>
            </div>
            : null
          }

          {(values.type === 'Existing') ?
            <div className="row extra-space">
              <div className="col-sm-6">
                {(admin || values.status !== 'Working') ?
                  <div className="radio-div type-rad-btns">
                    <input
                      type="radio"
                      id="existingType-0"
                      onChange={handleChange}
                      name="existingType"
                      value="Addition"
                      className={(values.existingType === 'Addition') ?
                        "on" : ""
                      }
                      checked={(values.existingType === 'Addition') ?
                        true : false
                      }
                    />
                    <label htmlFor="existingType-0">Customer Addition</label>

                    <input
                      type="radio"
                      id="existingType-1"
                      onChange={handleChange}
                      name="existingType"
                      value="Upgrade"
                      className={(values.existingType === 'Upgrade') ?
                        "on" : ""
                      }
                      checked={(values.existingType === 'Upgrade') ?
                        true : false
                      }
                    />
                    <label htmlFor="existingType-1">Customer Upgrade</label>
                  </div>
                  :
                  <p>{values.existingType || ''}</p>
                }
              </div>
            </div>
            : null
          }


        {(values.leases && values.type === 'Existing' && values.existingType === 'Upgrade') ?
          <div className="row">
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


                          {(lease.buyoutId) ?
                            <Link to="/edit-buyout" id={lease.buyoutId} onClick={handleByoLink}>Buyout Opened</Link>
                            :
                            <span>
                              <input
                                type="checkbox"
                                id={`${index}-needQuote`}
                                onChange={handleCheckbox}
                                name={`${index}-needQuote`}
                                checked={lease.needQuote || false}
                              />
                              <label>Quote Needed</label>
                            </span>
                          }

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
        </div>

        <div className="app-bg col-sm-12">
          <h3>Customer Information</h3>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Customer</label>
              </div>
              <div className="field-box">
                {(admin || values.status !== 'Working') ?
                  <input
                    onChange={handleChangeCustomer}
                    name={'name'}
                    value={(values.customer) ? values.customer.name || '' : ''}
                    list="customers"
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
            <div className="col-sm-6">
              <div className="field-label">
                  <label className="required">Address</label>
                </div>
                <div className="field-box">
                  {(admin || values.status !== 'Working') ?
                    <input
                      onChange={handleChangeInCustomer}
                      name={'street'}
                      value={(values.customer) ? values.customer.street || '' : ''}
                    />
                    :
                    <p>{(values.customer) ? values.customer.street || '' : ''}</p>
                  }
                </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">City</label>
              </div>
              <div className="field-box">
                {(admin || values.status !== 'Working') ?
                  <input
                    onChange={handleChangeInCustomer}
                    name={'city'}
                    value={(values.customer) ? values.customer.city || '' : ''}
                  />
                  :
                  <p>{(values.customer) ? values.customer.city || '' : ''}</p>
                }
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">State</label>
              </div>
              <div className="field-box">
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
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Zip Code</label>
              </div>
              <div className="field-box">
                {(admin || values.status !== 'Working') ?
                  <input
                    onChange={handleChangeInCustomer}
                    name={'zip'}
                    className={(errors.zip) ? 'red' : ''}
                    value={(values.customer) ? values.customer.zip || '' : ''}
                  />
                  :
                  <p>{(values.customer) ? values.customer.zip || '' : ''}</p>
                }
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Phone</label>
              </div>
              <div className="field-box">
                {(admin || values.status !== 'Working') ?
                  <input
                    onChange={handleChangeInCustomer}
                    name={'phone'}
                    className={(errors.phone) ? 'red' : ''}
                    value={(values.customer) ? values.customer.phone || '' : ''}
                    placeholder="xxx-xxx-xxxx"
                  />
                  :
                  <p>{(values.customer) ? values.customer.phone || '' : ''}</p>
                }
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Customer Email</label>
              </div>
              <div className="field-box">
                {(admin || values.status !== 'Working') ?
                  <input 
                    onChange={handleChangeInCustomer}
                    name={'email'}
                    className={(errors.email) ? 'red' : ''}
                    value={(values.customer) ? values.customer.email || '' : ''}
                  />
                  :
                  <p>{(values.customer) ? values.customer.email || '' : ''}</p>
                }
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Tax ID</label>
              </div>
              <div className="field-box">
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
            </div>
          </div>

        </div>

        <div className="app-bg col-sm-12">
          <h3>Deal Information</h3>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Estimated Deal Size</label>
              </div>
              <div className="field-box monetary">
                {(admin || values.status !== 'Working') ?
                  <input
                    onChange={handleChange}
                    name={'amount'}
                    value={values.amount || ''}
                  />
                  :
                  <p>{values.amount || ''}</p>
                }
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Term</label>
              </div>
              <div className="col-sm-6 col-md-5 col-lg-4 no-gutters">
                <div className="field-box">
                  {(admin || values.status !== 'Working') ?
                    <select
                    id="term"
                    onChange={handleChange}
                    name="term"
                    value={(values.term) ? values.term.slice(0, 5) : ''}
                    >
                      <option value="63">63</option>
                      <option value="60">60</option>
                      <option value="48">48</option>
                      <option value="42">42</option>
                      <option value="39">39</option>
                      <option value="36">36</option>
                      <option value="24">24</option>
                      <option value="12">12</option>
                      <option value="co-te">Co-Term</option>
                      <option value="other">Other</option>
                    </select>
                    :
                    <p>{formatTerm(values.term) || ''}</p>
                  }
                </div>
              </div>
              <div className="col-sm-6 col-md-7 col-lg-8 no-gutters">
                <div className="field-box">
                  {(values.term && (values.term.slice(0, 5) === 'other' || values.term.slice(0, 5) === 'co-te')) ? 
                    (admin || values.status !== 'Working') ?
                      <input
                        onChange={handleChangeInTerm}
                        value={values.term.slice(5) || ''}
                      />
                      :
                      <p>{values.term.slice(5) || ''}</p>
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Advanced Payment</label>
              </div>

              {(admin || values.status !== 'Working') ?
                <div className="radio-div deal-rad-btns">
                  <input
                    type="radio"
                    id="advancedPayments-0"
                    onChange={handleChange}
                    name="advancedPayments"
                    value="0"
                    className={(values.advancedPayments === '0') ?
                      "on" : ""
                    }
                    checked={(values.advancedPayments === '0') ?
                      true : false
                    }
                  />
                  <label htmlFor="advancedPayments-0">0</label>

                  <input
                    type="radio"
                    id="advancedPayments-1"
                    onChange={handleChange}
                    name="advancedPayments"
                    value="1"
                    className={(values.advancedPayments === '1') ?
                      "on" : ""
                    }
                    checked={(values.advancedPayments === '1') ?
                    true : false
                  }
                  />
                  <label htmlFor="advancedPayments-1">1</label>

                  <input
                    type="radio"
                    id="advancedPayments-2"
                    onChange={handleChange}
                    name="advancedPayments"
                    value="2"
                    className={(values.advancedPayments === '2') ?
                      "on" : ""
                    }
                    checked={(values.advancedPayments === '2') ?
                    true : false
                  }
                  />
                  <label htmlFor="advancedPayments-2">2</label>
                </div>
                :
                <p>{values.advancedPayments || ''}</p>
              }

            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>End of Term</label>
              </div>

              {(admin || values.status !== 'Working') ?
                <div className="radio-div deal-rad-btns">
                  <input
                    type="radio"
                    id="endOfTerm-0"
                    onChange={handleChange}
                    name="endOfTerm"
                    value="FMV"
                    className={(values.endOfTerm === 'FMV') ?
                      "on" : ""
                    }
                    checked={(values.endOfTerm === 'FMV') ?
                      true : false
                    }
                  />
                  <label htmlFor="endOfTerm-0">FMV</label>

                  <input
                    type="radio"
                    id="endOfTerm-1"
                    onChange={handleChange}
                    name="endOfTerm"
                    value="1$ out"
                    className={(values.endOfTerm === '1$ out') ?
                      "on" : ""
                    }
                    checked={(values.endOfTerm === '1$ out') ?
                      true : false
                    }
                  />
                  <label htmlFor="endOfTerm-1">1$ out</label>

                  <input
                    type="radio"
                    id="endOfTerm-2"
                    onChange={handleChange}
                    name="endOfTerm"
                    value="9%"
                    className={(values.endOfTerm === '9%') ?
                      "on" : ""
                    }
                    checked={(values.endOfTerm === '9%') ?
                      true : false
                    }
                  />
                  <label htmlFor="endOfTerm-2">9%</label>
                </div>
                :
                <p>{values.endOfTerm || ''}</p>
              }

            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="field-label">
                <label>Comments</label>
              </div>
              <div className="field-desc">
                <textarea
                  onChange={handleChange}
                  name={'comments'}
                  value={values.comments || ''}
                  disabled={(admin && !iAmAuthor) ? true : false}
                />
              </div>
            </div>
          </div>
        </div>

        {(admin || values.status !== 'Working') ?
          <div className="col-sm-12 buttons" align="right">
            {(admin || values.status === 'Draft') ?
              <button onClick={handleDelete} id="delete-button">Delete</button>
              : null
            }
            {(admin) ?
              <span id="cancel-button" onClick={toggleAdminView}>Cancel</span>
              :
              <Link to='/applications' id="cancel-button">Cancel</Link>
            }
            <button type="submit" id="save-button">Save</button>
            {(values.status === 'Draft') ?
              <button onClick={handleSubmit} type="submit" id="submit-button">Submit</button>
              : null
            }
          </div>
          :
          <div className="col-sm-12 buttons" align="right">
            <Link to='/applications' id="cancel-button">Back</Link>
          </div>
        }
      </form>
    </div>
    
  </div>
  )
)