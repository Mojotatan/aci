import React from 'react'

export default ({values, count, formatTerm, toggleLightbox, toggleMachines}) => (
  <div className="col-sm-8 col-sm-offset-2 lightbox-content">
    <div className="og exit-lightbox" onClick={toggleLightbox}>
      <img src="/assets/img/Cross_Reverse.svg" />
    </div>
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
          <p>{values.expiry || ''}</p>
        </div>
      </div>
      <div className="rowed-items status">
        <div>
          <label>Status</label>
        </div>
        <div className="field-box">
          <p>{values.status}</p>
        </div>
      </div>
    </div>

    <div className="app-bg col-sm-12">
      <h3>Application Type</h3>
      <div className="row">
        <div className="col-sm-6">
          <p>{values.type || ''}</p>
        </div>
      </div>
      {(values.type === 'Existing') ?
        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label className="required">Customer</label>
            </div>
            <div className="field-box">
              <p>{values.existingCustomer || ''}</p>
            </div>
          </div>
        </div>
        : null
      }

      {(values.type === 'Existing') ?
        <div className="row extra-space">
          <div className="col-sm-6">
            <p>{values.existingType || ''}</p>
          </div>
        </div>
        : null
      }


    {(values.leases && values.type === 'Existing' && values.existingType === 'Upgrade') ?
      <div className="row">
        <div className="col-sm-12 labels lease-label">
          <div className="col-sm-10 col-sm-offset-1 no-gutters">
            <label className="col-sm-5" id="lease-margin">Lease Number</label>
            <label className="col-sm-5">Lease Company</label>
          </div>
        </div>
        {values.leases.map((lease, index) => {
          return ((!lease.delete) ?
            <div key={`lease-${index}`} className="col-sm-12 lease-input">
              <div className="col-sm-1"><label className="index-number">{count++}</label></div>
              <div className="col-sm-10 field-row no-gutters">
                <div className="col-sm-5">
                  <span>{lease.number || ''}</span>
                </div>
                <div className="col-sm-5">
                  <span>{lease.company || ''}</span>
                </div>
                <div className="col-sm-2">
                  <span className="oneline">{`${lease.quote} Quote` || ''}</span>
                </div>
              </div>
              <div className="col-sm-1">
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
                          <p>{machine.serial}</p>
                        </div>
                        <div className="col-sm-2 condense-gutters">
                          <p>{machine.make}</p>
                        </div>
                        <div className="col-sm-2 condense-gutters">
                          <p>{machine.model}</p>
                        </div>
                        <div className="col-sm-2 condense-gutters">
                          <p>{machine.location}</p>
                        </div>
                        <div className="col-sm-2 condense-gutters">
                          <p>{machine.action}</p>
                        </div>
                        <div className="col-sm-1">
                        </div>
                      </div>
                      : null
                    )
                  })}
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
            <p>{(values.customer) ? values.customer.name || '' : ''}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="field-label">
              <label className="required">Address</label>
            </div>
            <div className="field-box">
              <p>{(values.customer) ? values.customer.street || '' : ''}</p>
            </div>
        </div>
        <div className="col-sm-6">
          <div className="field-label">
            <label className="required">City</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.city || '' : ''}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="field-label">
            <label className="required">State</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.state || '' : ''}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="field-label">
            <label className="required">Zip Code</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.zip || '' : ''}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="field-label">
            <label className="required">Phone</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.phone || '' : ''}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="field-label">
            <label>Customer Email</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.email || '' : ''}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="field-label">
            <label>Tax ID</label>
          </div>
          <div className="field-box">
            <p>{(values.customer) ? values.customer.taxID || '' : ''}</p>
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
            <p>{values.amount || ''}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="field-label">
            <label>Term</label>
          </div>
          <div className="col-sm-6 col-md-5 col-lg-4 no-gutters">
            <div className="field-box">
              <p>{formatTerm(values.term) || ''}</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-7 col-lg-8 no-gutters">
            <div className="field-box">
              {(values.term && (values.term.slice(0, 5) === 'other' || values.term.slice(0, 5) === 'co-te')) ? 
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

          <p>{values.advancedPayments || ''}</p>

        </div>
        <div className="col-sm-6">
          <div className="field-label">
            <label>End of Term</label>
          </div>

          <p>{values.endOfTerm || ''}</p>

        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="field-label">
            <label>Comments</label>
          </div>
          <div className="field-desc">
            <textarea
              value={values.comments || ''}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>

  </div>
        
)