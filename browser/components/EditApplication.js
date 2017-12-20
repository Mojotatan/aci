import React from 'react'
import {Link} from 'react-router-dom'

export default ({values, handleChange, handleSave, handleSubmit}) => (
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
        <p>values.rep.fullName</p>
      </div>
      <div>
        <label>Branch</label>
        <p>values.rep.fullName</p>
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
            <div>{values.status}</div>
          </div>
        </div>

        <div className="col-sm-12">
          <h3>Application Type</h3>

          <div>
            <label htmlFor="type-0">New Customer</label>
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

            <label htmlFor="type-1">Existing Customer Addition</label>
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

            <label htmlFor="type-2">Existing Customer Upgrade</label>
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
          </div>

        </div>

        <div className="col-sm-12">
          <h3>Customer Information</h3>

          <div className="row">
            <div className="col-sm-6">
              <label>Customer</label>
              <input
                onChange={handleChange}
                // name={'amount'}
                value={(values.customer) ? values.customer.name : ''}
              />
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
            <div className="col-sm-12">
              <label>Address</label>
              <input />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label>Phone</label>
              <input
                onChange={handleChange}
                // name={'amount'}
                value={(values.customer) ? values.customer.phone : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label>Customer Email</label>
              <input 
                onChange={handleChange}
                // name={'amount'}
                value={(values.customer) ? values.customer.email : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label>Tax ID</label>
              <input
                onChange={handleChange}
                // name={'amount'}
                value={(values.customer) ? values.customer.taxID : ''}
              />
            </div>
          </div>

        </div>

        <div className="col-sm-12">
          <h3>Current Lease Company</h3>
          {/* radio buttons suck */}

          <div className="row">
            <div className="col-sm-6">
              <label>ERP Number</label>
              <input
                onChange={handleChange}
                name={'erp'}
                value={values.erp || ''}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <h3>Deal Information</h3>
          <div className="row">
            <div className="col-sm-6">
              <label>Deal Size</label>
              <input
                onChange={handleChange}
                name={'amount'}
                value={values.amount || ''}
              />
            </div>
            <div className="col-sm-6">
              <label>Term</label>
              <input
                onChange={handleChange}
                name={'term'}
                value={values.term || ''}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label>Advanced Payment</label>

              <div>
                <label htmlFor="advancedPayments-0">0</label>
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

                <label htmlFor="advancedPayments-1">1</label>
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

                <label htmlFor="advancedPayments-2">2</label>
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
              </div>

            </div>
            <div className="col-sm-6">
              <label>End of Term</label>

              <div>
                <label htmlFor="endOfTerm-0">FMV</label>
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

                <label htmlFor="endOfTerm-1">1$ out</label>
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

                <label htmlFor="endOfTerm-2">9%</label>
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
              </div>

            </div>
          </div>
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
        </div>
        {/* {Object.keys(values).map(key => {
          return (
            <input
              key={key}
              onChange={handleChange}
              name={key}
              placeholder={`${key}...`}
              value={values[key] || ''}
            />
          )
        })} */}
        <div className="row">
          <Link to='/applications'><button>Cancel</button></Link>
          <button type="submit">Save</button>
          <button onClick={handleSubmit} type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
)