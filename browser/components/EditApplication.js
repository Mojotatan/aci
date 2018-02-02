import React from 'react'
import {Link} from 'react-router-dom'
import {reformatDate} from '../utility'

export default ({
  values,
  iAmAuthor,
  admin,
  customers,
  count,
  handleChange,
  handleNewLease,
  handleChangeInLease,
  handleRemoveLease,
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
  handleActionDelete
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
                placeholder="MM-DD-YY"
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
              {(values.existingType === 'Upgrade') ?
                <div className="col-sm-6">
                  <div className="radio-div type-rad-btns">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      name="needQuote"
                      checked={values.needQuote}
                    />
                    <label>Quote Needed</label>
                  </div>
                </div>
                : null
              }
            </div>
            : null
          }


        {(values.leases && values.type === 'Existing' && values.existingType === 'Upgrade') ?
          <div className="row">
            <div className="col-sm-12 labels lease-label">
              <div className="col-sm-10 col-sm-offset-1 no-gutters">
                <label className="col-sm-6" id="lease-margin">Lease Number</label>
                <label className="col-sm-6">Lease Company</label>
              </div>
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
            </datalist>
            {values.leases.map((lease, index) => {
              return ((!lease.delete) ?
                <div key={`lease-${index}`} className="col-sm-12 lease-input">
                  <div className="col-sm-1"><label className="index-number">{count++}</label></div>
                  <div className="col-sm-10 field-row no-gutters">
                    <div className="col-sm-6">
                      {(admin || values.status !== 'Working') ?
                        <input
                          onChange={handleChangeInLease}
                          id={`${index}-number`}
                          value={lease.number || ''}
                        />
                        :
                        <span>{lease.number || ''}</span>
                      }
                    </div>
                    <div className="col-sm-6">
                      {(admin || values.status !== 'Working') ?
                        <input
                          onChange={handleChangeInLease}
                          id={`${index}-company`}
                          value={lease.company || ''}
                          list="leaseCompanies"
                        />
                        :
                        <span>{lease.company || ''}</span>
                      }
                    </div>
                  </div>
                  <div className="col-sm-1">
                    {(admin || values.status !== 'Working') ?
                      <button value={index} onClick={handleRemoveLease} className="remove-button"></button>
                      :
                      null
                    }
                  </div>
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
                {(admin || values.status !== 'Working') ?
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
                {(admin || values.status !== 'Working') ?
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
                {(admin || values.status !== 'Working') ?
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
                <label>Estimated Deal Size</label>
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

          {/* Admin only section of app */}
          {/* awaiting rework */}
          {/* {(admin) ?
            <div>

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
          {(admin || values.status === 'Draft') ?
            <button onClick={handleDelete} id="delete-button">Delete</button>
            : null
          }
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
        <div className="row mid-gutter">
          {/* <div className="rowed-items status">
            <div>
              <label>Update Status</label>
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
          </div> */}
          <div className="col-sm-6">
            <div className="app-bg col-sm-12">
              <form>
                <div className="row">
                  <div className="col-sm-12">
                    <h3>New</h3>
                  </div>
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

          {values.rep ?
            <div className="col-sm-6">
              <div className="app-bg col-sm-12">
                <form onSubmit={handleNotify}>
                  <div className="row">
                    <div className="col-sm-12">
                      <h3>{`Notify ${values.rep.fullName || 'Rep'}`}</h3>
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
                      <button
                        className={`send-button${(values.mailDisabled) ? ' disabled' : ''}`}
                        disabled={values.mailDisabled}
                      >Send</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
            : <p>ERROR: There is no rep associated with this app</p>
          }
        </div>
        <div className="row">
          <div className="col-sm-12 no-gutters">
            <div className="flux-table app-table">
              <div className="flux-top">
                <div>
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
              </div>
              
              {(values.actions && values.actions.length > 0) ?
                values.actions.map((action, index) => (
                  <div key={action.id} className={(index % 2 === 0) ? 'even' : 'odd'}>
                    <div className={(action.show) ? 'retracted extended' : 'retracted'}>
                      <div className="thicc">{action.activity || ''}</div>
                      <div className="thicc">{action.admin.email || ''}</div>
                      <div>{reformatDate(action.date) || ''}</div>
                      <div className="thicc">{action.leasingCompany || ''}</div>
                      <div className="thicc">{action.appNumber || ''}</div>
                      <div>{action.status || ''}</div>
                      <div id={index} onClick={handleNote} className="edit">{(action.show) ? 'Hide' : 'View'}</div>
                      <div className="edit" onClick={handleChangeAction}>Edit</div>
                      <div className="edit" onClick={handleActionDelete}>Delete</div>
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
      </div>
      :
      null
    }
  </div>
)