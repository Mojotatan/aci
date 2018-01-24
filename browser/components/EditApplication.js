import React from 'react'
import {Link} from 'react-router-dom'

export default ({
  values,
  iAmAuthor,
  admin,
  customers,
  handleChange,
  handleChangeInCustomer,
  handleSave,
  handleSubmit,
  handleCheckbox,
  handleChangeCustomer
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

        </div>

        <div className="app-bg col-sm-12">
          <h3>Lease Information</h3>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Current Lease Company</label>
              </div>
              <div className="field-box">
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChange}
                    name="currentLeaseCompany"
                    value={values.currentLeaseCompany || ''}
                  />
                  :
                  <p>{values.curentLeaseCompany || ''}</p>
                }
              </div>
            </div>

            <div className="col-sm-6">
              <div className="field-label">
                <label>Lease Number</label>
              </div>
              <div className="field-box">
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChange}
                    name={'leaseNumber'}
                    value={values.leaseNumber || ''}
                  />
                  :
                  <p>{values.leaseNumber || ''}</p>
                }
              </div>
            </div>
          </div>
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
              <div className="field-box">
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChange}
                    name={'term'}
                    value={values.term || ''}
                  />
                  :
                  <p>{values.term || ''}</p>
                }
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

              <div className="row">
                <div className="col-sm-12 flex-container">
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>EverBank</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="status"
                        value={values.status}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>GE</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="ge"
                        value={values.ge}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>CIT</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="cit"
                        value={values.cit}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>UnifiFRED</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="unifiFred"
                        value={values.unifiFred}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>DLL</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="dll"
                        value={values.dll}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>USB</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="usb"
                        value={values.usb}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-item rowed-items">
                    <div className="field-label">
                      <label>EMR</label>
                    </div>
                    <div className="field-dropd">
                      <select
                        onChange={handleChange}
                        name="emr"
                        value={values.emr}
                      >
                        <option value=""></option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                        <option value="P">P</option>
                      </select>
                    </div>
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
      {/* {(admin) ?
        <form onSubmit={function(e) {e.preventDefault()}} action="fileupload" method="post" encType="multipart/form-data">
          <input type="file" name="filetoupload" />
          <input type="submit" />
        </form>
        : null
      } */}
    </div>
  </div>
)