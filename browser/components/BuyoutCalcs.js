import React from 'react'

import {sum, product, round} from '../utility'

export default ({
  values,
  toggleCalcView,
  handleCalcs,
  toggleMachines,
  count
}) => (
  <div className="col-sm-9">
    <form>
      <div className="app-bg col-sm-12 calcs">
        <h3>Lease Details</h3>
        <div className="row">
          {/* <div className="col-sm-4">
            <div className="field-label">
              <label>Lessee Name</label>
            </div>
            <div className="field-box">
              <p>{values.customer.name}</p>
            </div>
          </div> */}
          <div className="col-sm-3">
            <div className="field-label">
              <label>Lease Company</label>
            </div>
            <div className="field-box">
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
              <input list="leaseCompanies" name="leaseCompany" value={values.calcs.leaseCompany || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>Lease Number</label>
            </div>
            <div className="field-box">
              <input name="leaseNumber" value={values.calcs.leaseNumber || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-sm-12">
            <div className="field-label">
              <label>Address</label>
            </div>
            <div className="field-box">
              <p>{values.customer.address}</p>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Lease Start Date</label>
            </div>
            <div className="field-box">
              <input name="startDate" value={values.calcs.startDate || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3">
            <div className="field-label">
              <label>Original Term</label>
            </div>
            <div className="field-box">
              <input name="originalTerm" value={values.calcs.originalTerm || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Lease Plan End Date</label>
            </div>
            <div className="field-box">
              <input name="endDate" value={values.calcs.endDate || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3">
            <div className="field-label">
              <label>Remaining Term</label>
            </div>
            <div className="field-box">
              <input name="remainingTerm" value={values.calcs.remainingTerm || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Current Equipment Payment</label>
            </div>
            <div className="field-box monetary">
              <input name="currentEquipmentPayment" value={values.calcs.currentEquipmentPayment || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Current Service/MA Payment</label>
            </div>
            <div className="field-box monetary">
              <input name="currentServicePayment" value={values.calcs.currentServicePayment || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box monetary">
              <input name="passThroughService" value={values.calcs.passThroughService || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3">
            <div className="field-label">
              <label>Total Base Payment</label>
            </div>
            <div className="field-box">
              <div>${sum(values.calcs.currentEquipmentPayment, values.calcs.currentServicePayment, values.calcs.passThroughService)}</div>
            </div>
          </div>
        </div>
      </div>


      <div className="app-bg col-sm-12">
        <h3>Company Numbers</h3>
        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Upgrade to Keep</label>
            </div>
            <div className="field-box monetary">
              <input name="companyUtk" value={values.calcs.companyUtk || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box monetary">
              <input name="companyBtk" value={values.calcs.companyBtk || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box monetary">
              <input name="companyUtr" value={values.calcs.companyUtr || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3 col-sm-offset-3">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box monetary">
              <input name="companyBtr" value={values.calcs.companyBtr || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>%</label>
            </div>
            <div className="field-box">
              <input name="percentage" value={values.calcs.percentage || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>Service Recovery Amount</label>
            </div>
            <div className="field-box">
              <div>${round(product(
                values.calcs.remainingTerm,
                values.calcs.currentServicePayment,
                values.calcs.percentage / 100
              ))}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box">
              <div>${round(product(values.calcs.remainingTerm, values.calcs.passThroughService))}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>MISC (SMUA)</label>
            </div>
            <div className="field-box monetary">
              <input name="smua" value={values.calcs.smua || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>
      </div>

      <div className="app-bg col-sm-12">
        <h3>Quotes</h3>
        <strong>Rep Numbers</strong>
        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Keep</label>
            </div>
            <div className="field-box">
              <div>${round(sum(
                values.calcs.companyUtk,
                product(values.calcs.remainingTerm, values.calcs.currentServicePayment, values.calcs.percentage / 100),
                product(values.calcs.remainingTerm, values.calcs.passThroughService),
                values.calcs.smua
              ))}</div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              <div>${round(sum(
                values.calcs.companyBtk,
                product(values.calcs.remainingTerm, values.calcs.currentServicePayment, values.calcs.percentage / 100),
                product(values.calcs.remainingTerm, values.calcs.passThroughService),
                values.calcs.smua
              ))}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box">
              <div>${round(sum(
                values.calcs.companyUtr,
                product(values.calcs.remainingTerm, values.calcs.currentServicePayment, values.calcs.percentage / 100),
                product(values.calcs.remainingTerm, values.calcs.passThroughService),
                values.calcs.smua
              ))}</div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <div>${round(sum(
                values.calcs.companyBtr,
                product(values.calcs.remainingTerm, values.calcs.currentServicePayment, values.calcs.percentage / 100),
                product(values.calcs.remainingTerm, values.calcs.passThroughService),
                values.calcs.smua
              ))}</div>
            </div>
          </div>
        </div>

        <strong>Customer Numbers</strong>
        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box monetary">
              <input name="customerBtk" value={values.calcs.customerBtk || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box monetary">
              <input name="customerBtr" value={values.calcs.customerBtr || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-bg breakdown col-sm-12">
        <div className="row">
          <div className="col-sm-4">
            <div>Invoice Breakdown</div>
          </div>
          <div className="col-sm-2">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            <input className="sm-input rightput" name="taxRate" value={values.calcs.taxRate || ''} onChange={handleCalcs} autoComplete="new-password" />
            <span>% Tax</span>
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Equipment Payment</div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.currentEquipmentPayment)}</div>            
          </div>
          <div className="col-sm-2">
            $<input className="sm-input" name="upfrontTax" value={values.calcs.upfrontTax || ''} onChange={handleCalcs} autoComplete="new-password" />
          </div>
          <div className="col-sm-2">
            <div>${round(sum(
              product(values.calcs.currentEquipmentPayment, values.calcs.taxRate / 100),
              product(values.calcs.upfrontTax, values.calcs.taxRate / 100)
            ))}</div>
          </div>
          <div className="col-sm-2">
            <div>${round(sum(
              values.calcs.currentEquipmentPayment,
              product(values.calcs.currentEquipmentPayment, values.calcs.taxRate / 100),
              values.calcs.upfrontTax,
              product(values.calcs.upfrontTax, values.calcs.taxRate / 100)
            ))}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Service/MA Payment</div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.currentServicePayment)}</div>
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.currentServicePayment)}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Fuel/Freight</div>
          </div>
          <div className="col-sm-2">
            $<input className="sm-input" name="fuelFreight" value={values.calcs.fuelFreight || ''} onChange={handleCalcs} autoComplete="new-password" />
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.fuelFreight)}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Late Charges</div>
          </div>
          <div className="col-sm-2">
            $<input className="sm-input" name="lateCharges" value={values.calcs.lateCharges || ''} onChange={handleCalcs} autoComplete="new-password" />
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.lateCharges)}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Misc. Items *See Notes</div>
          </div>
          <div className="col-sm-2">
            $<input className="sm-input" name="miscItems" value={values.calcs.miscItems || ''} onChange={handleCalcs} autoComplete="new-password" />
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div></div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.miscItems)}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-sm-offset-4">
            <div>${sum(
              values.calcs.currentEquipmentPayment,
              values.calcs.currentServicePayment,
              values.calcs.fuelFreight,
              values.calcs.lateCharges,
              values.calcs.miscItems
            )}</div>
          </div>
          <div className="col-sm-2">
            <div>${sum(values.calcs.upfrontTax)}</div>
          </div>
          <div className="col-sm-2">
            <div>${round(sum(
              product(values.calcs.currentEquipmentPayment, values.calcs.taxRate / 100),
              product(values.calcs.upfrontTax, values.calcs.taxRate / 100)
            ))}</div>
          </div>
          <div className="col-sm-2">
            <div>${round(sum(
              values.calcs.currentEquipmentPayment,
              product(values.calcs.currentEquipmentPayment, values.calcs.taxRate / 100),
              values.calcs.upfrontTax,
              product(values.calcs.upfrontTax, values.calcs.taxRate / 100),

              values.calcs.currentServicePayment,
              values.calcs.fuelFreight,
              values.calcs.lateCharges,
              values.calcs.miscItems
            ))}</div>
          </div>
        </div>
      </div>

      {(values.leases) ?
        <div className="app-bg col-sm-12">
          <h3>Equipment</h3>
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

      <div className="app-bg col-sm-12">
        <h3>Notes</h3>
        <div className="row">
          <div className="col-sm-12">
            <div className="field-desc">
              <textarea
              name="notes"
              value={values.calcs.notes || ''}
              onChange={handleCalcs} autoComplete="new-password"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
)