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
  <div className="row">
    <h2>Edit this app</h2>

    <div className="col-sm-3">
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

    <div className="col-sm-6">
      <form onSubmit={handleSave}>
        <div className="col-sm-12">
          <div>
            <label>Date Started</label>
            <p>{values.date}</p>
          </div>
          <div>
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
          {(admin) ?
            <div>
              <input
                type="checkbox"
                onChange={handleCheckbox}
                name="notifyRep"
                // value={values.notifyRep}
              />
              <label>Notify Rep</label>
            </div>
            : null
          }
        </div>

        <div className="col-sm-12">
          <h3>Application Type</h3>

          {(admin || values.status === 'Draft') ?
            <div className="radio-div">
              <input
                type="radio"
                id="type-0"
                onChange={handleChange}
                name="type"
                value="New Customer"
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

        <div className="col-sm-12">
          <h3>Customer Information</h3>

          {(iAmAuthor && values.status === 'Draft') ?
            <div className="row">
              <div className="col-sm-12">
                <label>Load a Customer</label>
                <select
                  onChange={handleChangeCustomer}
                  name="customer"
                  value={(values.customer) ? values.customer.name || 'new' : 'new'}
                >
                  <option value="new" key="customer-new">New</option>
                  {customers.map((customer, index) => (
                    <option name={index} value={customer} key={`customer-${index}`}>{customer}</option>
                  ))}
                </select>
              </div>
            </div>
            :
            null
          }

          <div className="row">
            <div className="col-sm-6">
              <label>Customer</label>
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
            <div className="col-sm-6">
              <label>Address</label>
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
            <div className="col-sm-6">
              <label>City</label>
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
            <div className="col-sm-6">
              <label>State</label>
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
            <div className="col-sm-6">
              <label>Zip Code</label>
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
            <div className="col-sm-6">
              <label>Phone</label>
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
            <div className="col-sm-6">
              <label>Customer Email</label>
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

          <div className="row">
            <div className="col-sm-6">
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
          </div>

        </div>

        <div className="col-sm-12">
          <h3>Current Lease Company</h3>
          {(admin || values.status === 'Draft') ?
            <div className="radio-div">
              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="EverBank"
                checked={(values.currentLeaseCompany === 'EverBank') ?
                  true : false
                }
              />
              <label>EverBank</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="DLL"
                checked={(values.currentLeaseCompany === 'DLL') ?
                  true : false
                }
              />
              <label>DLL</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="Martin"
                checked={(values.currentLeaseCompany === 'Martin') ?
                  true : false
                }
              />
              <label>Martin</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="Balboa"
                checked={(values.currentLeaseCompany === 'Balboa') ?
                  true : false
                }
              />
              <label>Balboa</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="Wells Fargo"
                checked={(values.currentLeaseCompany === 'Wells Fargo') ?
                  true : false
                }
              />
              <label>Wells Fargo</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="CIT"
                checked={(values.currentLeaseCompany === 'CIT') ?
                  true : false
                }
              />
              <label>CIT</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="Leaf"
                checked={(values.currentLeaseCompany === 'Leaf') ?
                  true : false
                }
              />
              <label>Leaf</label>

              <input
                type="radio"
                id="currentLeaseCompany-0"
                onChange={handleChange}
                name="currentLeaseCompany"
                value="Other"
                checked={(
                  values.currentLeaseCompany !== 'EverBank'
                  && values.currentLeaseCompany !== 'DLL'
                  && values.currentLeaseCompany !== 'Martin'
                  && values.currentLeaseCompany !== 'Balboa'
                  && values.currentLeaseCompany !== 'Wells Fargo'
                  && values.currentLeaseCompany !== 'CIT'
                  && values.currentLeaseCompany !== 'Leaf'
                ) ?
                  true : false
                }
              />
              <label>Other</label>
              {(
                values.currentLeaseCompany !== 'EverBank'
                && values.currentLeaseCompany !== 'DLL'
                && values.currentLeaseCompany !== 'Martin'
                && values.currentLeaseCompany !== 'Balboa'
                && values.currentLeaseCompany !== 'Wells Fargo'
                && values.currentLeaseCompany !== 'CIT'
                && values.currentLeaseCompany !== 'Leaf'
              ) ?
                <input
                  onChange={handleChange}
                  name="currentLeaseCompany"
                  value={values.currentLeaseCompany}
                />
                : null
              }

            </div>
            :
            <p>{values.curentLeaseCompany || ''}</p>
          }

          <div className="row">
            <div className="col-sm-6">
              <label>ERP Number</label>
              {(admin || values.status === 'Draft') ?
                <input
                  onChange={handleChange}
                  name={'erp'}
                  value={values.erp || ''}
                />
                :
                <p>{values.comments || ''}</p>
              }
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <h3>Deal Information</h3>
          <div className="row">
            <div className="col-sm-6">
              <label>Deal Size</label>
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
            <div className="col-sm-6">
              <label>Term</label>
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
          <div className="row">
            <div className="col-sm-6">
              <label>Advanced Payment</label>

              {(admin || values.status === 'Draft') ?
                <div className="radio-div">
                  <input
                    type="radio"
                    id="advancedPayments-0"
                    onChange={handleChange}
                    name="advancedPayments"
                    value="0"
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
              <label>End of Term</label>

              {(admin || values.status === 'Draft') ?
                <div className="radio-div">
                  <input
                    type="radio"
                    id="endOfTerm-0"
                    onChange={handleChange}
                    name="endOfTerm"
                    value="FMV"
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

          {/* Admin only section of app */}
          {(admin) ?
            <div>
              <div className="row">
                <div className="col-sm-12">
                  <label>Comments</label>
                  <input
                    onChange={handleChange}
                    name={'comments'}
                    value={values.comments || ''}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <label>Approval Number</label>
                  <input
                    onChange={handleChange}
                    name={'approvalNumber'}
                    value={values.approvalNumber || ''}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Approval Date</label>
                  <input
                    onChange={handleChange}
                    name={'approvalDate'}
                    value={values.approvalDate || ''}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <label>Approval From</label>
                  <input
                    onChange={handleChange}
                    name={'approvalFrom'}
                    value={values.approvalFrom || ''}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <label>Total Funding</label>
                  <input
                    onChange={handleChange}
                    name={'funding'}
                    value={values.funding || ''}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Rep Rate</label>
                  <input
                    onChange={handleChange}
                    name={'repRate'}
                    value={values.repRate || ''}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 flex-container">
                  <div className="flex-item">
                    <label>EverBank</label>
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
                  <div className="flex-item">
                    <label>GE</label>
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
                  <div className="flex-item">
                    <label>CIT</label>
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
                  <div className="flex-item">
                    <label>UnifiFRED</label>
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
                  <div className="flex-item">
                    <label>DLL</label>
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
                  <div className="flex-item">
                    <label>USB</label>
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
                  <div className="flex-item">
                    <label>EMR</label>
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
            :
            null
          }
        </div>
        <div className="col-sm-12">
          <Link to='/applications'><div>Cancel</div></Link>
          <button type="submit">Save</button>
          {(values.status === 'Draft') ?
            <button onClick={handleSubmit} type="submit">Submit</button>
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