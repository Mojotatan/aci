import React from 'react'
import {Link} from 'react-router-dom'
import {reformatDate} from '../utility'

export default ({
  values,
  iAmAuthor,
  admin,
  customers,
  handleChange,
  handleRemoveLease,
  handleChangeInLease,
  handleAddLease,
  handleChangeInCustomer,
  handleSave,
  handleSubmit,
  handleCheckbox,
  handleChangeCustomer,
  handleChangeInTerm,
  handleNote,
  formatTerm
}) => (
  <div className="row edit-apps-page">

    <div className="col-sm-12 top">
      <div className="row">
        <div className="col-sm-6"><h2>Application</h2></div>
        {/* <div className="col-sm-3 top-buttons"><Link to='/applications' id="cancel-button" className="top">Back</Link></div> */}
        <div className="col-sm-6 top-buttons" align="right">
          <Link to='/applications' id="cancel-button" className="top">Cancel</Link>
          <button type="submit" id="save-button" className="top" onClick={handleSave}>Save</button>
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
            <p>{reformatDate(values.date)}</p>
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
            <div>
              <label>Status</label>
            </div>
            <div>
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
          {/* Notify functionality moved to admin workflow section*/}
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

        <div className="app-bg col-sm-12">
          <h3>Application Type</h3>
          <div className="row">
            <div className="col-sm-12">
              {(admin || values.status === 'Draft') ?
                <div className="radio-div type-rad-btns">
                  <input
                    type="radio"
                    id="type-0"
                    onChange={handleChange}
                    name="type"
                    value="New Customer"
                    className={(values.type === 'New Customer') ?
                      "on" : ""
                    }
                    checked={(values.type === 'New Customer') ?
                      true : false
                    }
                  />
                  <label htmlFor="type-0">New Customer</label>

                  <input
                    type="radio"
                    id="type-1"
                    onChange={handleChange}
                    name="type"
                    value="Existing Customer Addition"
                    className={(values.type === 'Existing Customer Addition') ?
                      "on" : ""
                    }
                    checked={(values.type === 'Existing Customer Addition') ?
                      true : false
                    }
                  />
                  <label htmlFor="type-1">Existing Customer Addition</label>

                  <input
                    type="radio"
                    id="type-2"
                    onChange={handleChange}
                    name="type"
                    value="Existing Customer Upgrade"
                    className={(values.type === 'Existing Customer Upgrade') ?
                      "on" : ""
                    }
                    checked={(values.type === 'Existing Customer Upgrade') ?
                      true : false
                    }
                  />
                  <label htmlFor="type-2">Existing Customer Upgrade</label>
                </div>
                :
                <p>{values.type || ''}</p>
              }
            </div>
          </div>

          {(values.type === 'Existing Customer Upgrade' && values.leaseCompany && values.leaseNumber) ?
            <div className="row leeses-pieces">
              <div className="col-sm-12">
                <div className="col-sm-5 col-sm-offset-1"><label>Lease Number</label></div>
                <div className="col-sm-5"><label>Lease Company</label></div>
              </div>
            {values.leaseCompany.map((lease, index) => (
              <div className="col-sm-12 lease" key={`lease-${index}`}>
                <div className="col-sm-1">
                  <label className="index-number">{index + 1}</label>
                </div>
                <div className="col-sm-5">
                  <div className="field-box">
                    {(admin || values.status === 'Draft') ?
                      <input
                        onChange={handleChangeInLease}
                        name={`leaseNumber-${index}`}
                        value={values.leaseNumber[index] || ''}
                      />
                      :
                      <p>{values.leaseNumber[index] || ''}</p>
                    }
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="field-box">
                    {(admin || values.status === 'Draft') ?
                      <input
                        onChange={handleChangeInLease}
                        name={`leaseCompany-${index}`}
                        value={lease || ''}
                        list="leaseCompanies"
                      />
                      :
                      <p>{lease || ''}</p>
                    }
                  </div>
                </div>
                <div className="col-sm-1"><button onClick={handleRemoveLease} name={index} className="remove-button"></button></div>
              </div>
            ))}
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
              </datalist>
              <div className="col-sm-12">
                <div className="col-sm-offset-1">
                  <button onClick={handleAddLease} className="add-lease-button">Add Lease</button>
                </div>
              </div>
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
                {(admin || values.status === 'Draft') ?
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
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">City</label>
              </div>
              <div className="field-box">
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
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">State</label>
              </div>
              <div className="field-box">
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
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Zip Code</label>
              </div>
              <div className="field-box">
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
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Phone</label>
              </div>
              <div className="field-box">
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
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label className="required">Customer Email</label>
              </div>
              <div className="field-box">
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
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Tax ID</label>
              </div>
              <div className="field-box">
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
            </div>
          </div>

        </div>

        <div className="app-bg col-sm-12">
          <h3>Deal Information</h3>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Deal Size</label>
              </div>
              <div className="field-box monetary">
                {(admin || values.status === 'Draft') ?
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
                  {(admin || values.status === 'Draft') ?
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
                    (admin || values.status === 'Draft') ?
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

              {(admin || values.status === 'Draft') ?
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

              {(admin || values.status === 'Draft') ?
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

          {/* Admin only section of app */}
          {/* awaiting rework */}
          {/* {(admin) ?
            <div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Approval Number</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChange}
                      name={'approvalNumber'}
                      value={values.approvalNumber || ''}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Approval Date</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChange}
                      name={'approvalDate'}
                      value={values.approvalDate || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="field-label">
                    <label>Approval From</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChange}
                      name={'approvalFrom'}
                      value={values.approvalFrom || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Total Funding</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChange}
                      name={'funding'}
                      value={values.funding || ''}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Rep Rate</label>
                  </div>
                  <div className="field-box">
                    <input
                      onChange={handleChange}
                      name={'repRate'}
                      value={values.repRate || ''}
                    />
                  </div>
                </div>
              </div>

            </div>
            :
            null
          } */}

        </div>

        <div className="col-sm-12 buttons" align="right">
          <Link to='/applications' id="cancel-button">Cancel</Link>
          <button type="submit" id="save-button">Save</button>
          {(values.status === 'Draft') ?
            <button onClick={handleSubmit} type="submit" id="submit-button">Submit</button>
            : null
          }
        </div>
      </form>
    </div>

    {/* Admin Only */}
    {(admin) ?
      <div className="col-sm-12 admin">
        <div className="col-sm-12 top">
          <h2>Admin Activity</h2>
        </div>
        {/* <div className="row">
          <div className="col-sm-12">
            <div className="rowed-items status">
              <div>
                <label>Status</label>
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="app-bg col-sm-8 col-sm-offset-2">
            <form>
              <div className="col-sm-12">
                <h3>New</h3>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Leasing Company</label>
                  </div>
                  <div className="field-box">
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Application Number</label>
                  </div>
                  <div className="field-box">
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="field-label">
                    <label>Status</label>
                  </div>
                  <div className="field-box">
                  </div>
                </div>
              </div>
              {/* Conditional fields based on status */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="field-label">
                    <label>Notes</label>
                  </div>
                  <div className="field-box">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 no-gutters">
            <div className="flux-table app-table">
              <div className="flux-top">
                <div className="thicc">Activity</div>
                <div className="thicc">User</div>
                <div>Date</div>
                <div className="thicc">Leasing Company</div>
                <div className="thicc">Application Number</div>
                <div>Status</div>
                <div>Notes</div>
                <div></div>
                <div></div>
              </div>
              {values.actions.map((action, index) => (
                <div key={action.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                  <div className="thicc">{action.activity || ''}</div>
                  <div className="thicc">{action.admin.email || ''}</div>
                  <div>{reformatDate(action.date) || ''}</div>
                  <div className="thicc">{action.leasingCompany || ''}</div>
                  <div className="thicc">{action.appNumber || ''}</div>
                  <div>{action.status || ''}</div>
                  <div id={index} onClick={handleNote} className='edit'>{(action.show) ? 'Hide' : 'View'}</div>
                  <div className='edit'>Edit</div>
                  <div className='edit'>Delete</div>
                  {(action.show) ? <div className="notes">{action.notes || ''}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      :
      null
    }
  </div>
)