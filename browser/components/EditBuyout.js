import React from 'react'
import {Link} from 'react-router-dom'
import { WSASERVICE_NOT_FOUND } from 'constants';

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
  handleChangeCustomer,
  handleNewLease,
  handleChangeInLease,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine
}) => (
  <div className="row">
    <h2>Edit this byo</h2>

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
                checked={values.notifyRep}
              />
              <label>Notify Rep</label>
            </div>
            : null
          }
        </div>

        <div className="col-sm-12">
          {(admin || values.status === 'Draft') ?
            <div className="radio-div">
              <input
                type="radio"
                id="quote-0"
                onChange={handleChange}
                name="quote"
                value="Full"
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
          <h3>Lease Information</h3>
          <div className="col-sm-12 labels">
            <label>Lease Number</label>
            <label>Lease Company</label>
            <label>Lease Amount</label>
          </div>
          {values.leases.map((lease, index) => {
            return(
              <div key={`lease-${index}`} className="col-sm-12">
                <label>{index + 1}</label>
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChangeInLease}
                    id={`${index}-number`}
                    value={lease.number || ''}
                  />
                  :
                  <span>{lease.number || ''}</span>
                }
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChangeInLease}
                    id={`${index}-company`}
                    value={lease.company || ''}
                  />
                  :
                  <span>{lease.company || ''}</span>
                }
                {(admin || values.status === 'Draft') ?
                  <input
                    onChange={handleChangeInLease}
                    id={`${index}-amount`}
                    value={lease.amount || ''}
                  />
                  :
                  <span>{lease.amount || ''}</span>
                }
                {(values.quote === 'Partial') ?
                  <button id={`${index}-machines`} onClick={toggleMachines}>
                    {lease.displayMachines ?
                      'Hide Machines'
                      :
                      'Show Machines'
                    }
                  </button>
                  : null
                }
                {(values.quote === 'Partial' && lease.displayMachines) ?
                  <div className="col-sm-offset-2 col-sm-10">
                    <div className="col-sm-12 labels">
                      <label>Serial Number</label>
                      <label>Make</label>
                      <label>Model</label>
                      <label>Location</label>
                    </div>
                    {lease.machines.map((machine, mIndex) => {
                      return (
                        <div key={`lease-${index}-machine-${mIndex}`} className="col-sm-12">
                          {(admin || values.status === 'Draft') ?
                            <input
                              onChange={handleChangeInMachine}
                              id={`${index}-${mIndex}-serial`}
                              value={machine.serial || ''}
                            />
                            :
                            <p>{machine.serial}</p>
                          }
                          {(admin || values.status === 'Draft') ?
                            <input
                              onChange={handleChangeInMachine}
                              id={`${index}-${mIndex}-make`}
                              value={machine.make || ''}
                            />
                            :
                            <p>{machine.make}</p>
                          }
                          {(admin || values.status === 'Draft') ?
                            <input
                              onChange={handleChangeInMachine}
                              id={`${index}-${mIndex}-model`}
                              value={machine.model || ''}
                            />
                            :
                            <p>{machine.model}</p>
                          }
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
                      )
                    })}
                    <button id={`${index}-newMachine`} onClick={handleNewMachine}>Add Machine</button>
                  </div>
                  :
                  null
                }
              </div>
            )
          })
          }
          <button onClick={handleNewLease}>Add Lease</button>
        </div>

        <div className="col-sm-12">
          <label>Comments</label>
          <input
            onChange={handleChange}
            name={'comments'}
            value={values.comments || ''}
          />
        </div>

        <div className="col-sm-12">
          <Link to='/buyouts'><div>Cancel</div></Link>
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