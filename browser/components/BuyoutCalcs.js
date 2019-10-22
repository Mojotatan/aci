import React from 'react'

import {sum, product, round} from '../utility'

export default ({
  values,
  // toggleCalcView,
  handleCalcs,
  toggleMachines,
  handleNewMachine,
  handleChangeInMachine,
  handleRemoveMachine
}) => {
  let lease = values.leases[values.calcTarget]
  let workbook = lease.workbook
  return (
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
                <label>Lease Number</label>
              </div>
              <div className="field-box">
                {/* <input name="leaseNumber" value={workbook.leaseNumber || ''} onChange={handleCalcs} autoComplete="new-password" /> */}
                <div>{lease.number}</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="field-label">
                <label>Lease Company</label>
              </div>
              <div className="field-box">
                {/* <datalist id="leaseCompanies">
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
                </datalist> */}
                {/* <input list="leaseCompanies" name="leaseCompany" value={workbook.leaseCompany || ''} onChange={handleCalcs} autoComplete="new-password" /> */}
                <div>{lease.company}</div>
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
                <input name="startDate" value={workbook.startDate || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
              <div className="field-label">
                <label>Original Term</label>
              </div>
              <div className="field-box">
                <input name="originalTerm" value={workbook.originalTerm || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Lease Plan End Date</label>
              </div>
              <div className="field-box">
                <input name="endDate" value={workbook.endDate || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
              <div className="field-label">
                <label>Remaining Term</label>
              </div>
              <div className="field-box">
                <input name="remainingTerm" value={workbook.remainingTerm || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Current Equipment Payment</label>
              </div>
              <div className="field-box monetary">
                <input name="currentEquipmentPayment" value={workbook.currentEquipmentPayment || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Current Service/MA Payment</label>
              </div>
              <div className="field-box monetary">
                <input name="currentServicePayment" value={workbook.currentServicePayment || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Pass Through Service</label>
              </div>
              <div className="field-box monetary">
                <input name="passThroughService" value={workbook.passThroughService || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
              <div className="field-label">
                <label>Total Base Payment</label>
              </div>
              <div className="field-box">
                <div>${sum(workbook.currentEquipmentPayment, workbook.currentServicePayment, workbook.passThroughService)}</div>
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
                <input name="companyUtk" value={workbook.companyUtk || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
              <div className="field-label">
                <label>Buyout to Keep</label>
              </div>
              <div className="field-box monetary">
                <input name="companyBtk" value={workbook.companyBtk || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Upgrade to Return</label>
              </div>
              <div className="field-box monetary">
                <input name="companyUtr" value={workbook.companyUtr || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
              <div className="field-label">
                <label>Buyout to Return</label>
              </div>
              <div className="field-box monetary">
                <input name="companyBtr" value={workbook.companyBtr || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Percentage</label>
              </div>
              <div className="field-box percentage">
                <input name="percentage" value={workbook.percentage || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="field-label">
                <label>Service Recovery Amount</label>
              </div>
              <div className="field-box">
                <div>${round(product(
                  workbook.remainingTerm,
                  workbook.currentServicePayment,
                  workbook.percentage / 100
                ))}</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="field-label">
                <label>Pass Through Service</label>
              </div>
              <div className="field-box">
                <div>${round(product(workbook.remainingTerm, workbook.passThroughService))}</div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="field-label">
                <label>MISC (SMUA)</label>
              </div>
              <div className="field-box monetary">
                <input name="smua" value={workbook.smua || ''} onChange={handleCalcs} autoComplete="new-password" />
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
                  workbook.companyUtk,
                  product(workbook.remainingTerm, workbook.currentServicePayment, workbook.percentage / 100),
                  product(workbook.remainingTerm, workbook.passThroughService),
                  workbook.smua
                ))}</div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Buyout to Keep</label>
              </div>
              <div className="field-box">
                <div>${round(sum(
                  workbook.companyBtk,
                  product(workbook.remainingTerm, workbook.currentServicePayment, workbook.percentage / 100),
                  product(workbook.remainingTerm, workbook.passThroughService),
                  workbook.smua
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
                  workbook.companyUtr,
                  product(workbook.remainingTerm, workbook.currentServicePayment, workbook.percentage / 100),
                  product(workbook.remainingTerm, workbook.passThroughService),
                  workbook.smua
                ))}</div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Buyout to Return</label>
              </div>
              <div className="field-box">
                <div>${round(sum(
                  workbook.companyBtr,
                  product(workbook.remainingTerm, workbook.currentServicePayment, workbook.percentage / 100),
                  product(workbook.remainingTerm, workbook.passThroughService),
                  workbook.smua
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
                <input name="customerBtk" value={workbook.customerBtk || ''} onChange={handleCalcs} autoComplete="new-password" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="field-label">
                <label>Buyout to Return</label>
              </div>
              <div className="field-box monetary">
                <input name="customerBtr" value={workbook.customerBtr || ''} onChange={handleCalcs} autoComplete="new-password" />
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
              <input className="sm-input rightput" name="taxRate" value={workbook.taxRate || ''} onChange={handleCalcs} autoComplete="new-password" />
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
              <div>${sum(workbook.currentEquipmentPayment)}</div>            
            </div>
            <div className="col-sm-2">
              $<input className="sm-input" name="upfrontTax" value={workbook.upfrontTax || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
            <div className="col-sm-2">
              <div>${round(sum(
                product(workbook.currentEquipmentPayment, workbook.taxRate / 100),
                product(workbook.upfrontTax, workbook.taxRate / 100)
              ))}</div>
            </div>
            <div className="col-sm-2">
              <div>${round(sum(
                workbook.currentEquipmentPayment,
                product(workbook.currentEquipmentPayment, workbook.taxRate / 100),
                workbook.upfrontTax,
                product(workbook.upfrontTax, workbook.taxRate / 100)
              ))}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div>Service/MA Payment</div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.currentServicePayment)}</div>
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.currentServicePayment)}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div>Fuel/Freight</div>
            </div>
            <div className="col-sm-2">
              $<input className="sm-input" name="fuelFreight" value={workbook.fuelFreight || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.fuelFreight)}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div>Late Charges</div>
            </div>
            <div className="col-sm-2">
              $<input className="sm-input" name="lateCharges" value={workbook.lateCharges || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.lateCharges)}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div>Misc. Items *See Notes</div>
            </div>
            <div className="col-sm-2">
              $<input className="sm-input" name="miscItems" value={workbook.miscItems || ''} onChange={handleCalcs} autoComplete="new-password" />
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div></div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.miscItems)}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-sm-offset-4">
              <div>${sum(
                workbook.currentEquipmentPayment,
                workbook.currentServicePayment,
                workbook.fuelFreight,
                workbook.lateCharges,
                workbook.miscItems
              )}</div>
            </div>
            <div className="col-sm-2">
              <div>${sum(workbook.upfrontTax)}</div>
            </div>
            <div className="col-sm-2">
              <div>${round(sum(
                product(workbook.currentEquipmentPayment, workbook.taxRate / 100),
                product(workbook.upfrontTax, workbook.taxRate / 100)
              ))}</div>
            </div>
            <div className="col-sm-2">
              <div>${round(sum(
                workbook.currentEquipmentPayment,
                product(workbook.currentEquipmentPayment, workbook.taxRate / 100),
                workbook.upfrontTax,
                product(workbook.upfrontTax, workbook.taxRate / 100),

                workbook.currentServicePayment,
                workbook.fuelFreight,
                workbook.lateCharges,
                workbook.miscItems
              ))}</div>
            </div>
          </div>
        </div>

        <div className="app-bg col-sm-12">
          <h3>Equipment</h3>
          <div className="row">
            <div className="col-sm-12 no-gutters">
              <div className="col-sm-12 no-gutters labels machine-label">
                <label className="col-sm-2 condense-gutters">Serial #</label>
                <label className="col-sm-2 condense-gutters">Make</label>
                <label className="col-sm-3 condense-gutters">Model</label>
                <label className="col-sm-2 condense-gutters">Location</label>
                <label className="col-sm-2 condense-gutters">Action</label>
              </div>
              {lease.machines.map((machine, index) => {
                return ((!machine.delete) ?
                  <div key={`lease-${index}-machine-${index}`} className="col-sm-12 no-gutters machine-input">
                    <div className="col-sm-2 condense-gutters">
                      <input
                        onChange={handleChangeInMachine}
                        id={`${values.calcTarget}-${index}-serial`}
                        value={machine.serial || ''}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-sm-2 condense-gutters">
                      <input
                        onChange={handleChangeInMachine}
                        id={`${values.calcTarget}-${index}-make`}
                        value={machine.make || ''}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-sm-3 condense-gutters">
                      <input
                        onChange={handleChangeInMachine}
                        id={`${values.calcTarget}-${index}-model`}
                        value={machine.model || ''}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-sm-2 condense-gutters">
                      <input
                        onChange={handleChangeInMachine}
                        id={`${values.calcTarget}-${index}-location`}
                        value={machine.location || ''}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-sm-2 condense-gutters">
                      <select
                      onChange={handleChangeInMachine}
                      id={`${values.calcTarget}-${index}-action`}
                      value={machine.action || ''}
                      autoComplete="new-password"
                      >
                        <option value="Release">Release</option>
                        <option value="Upgrade to Keep">Upgrade to Keep</option>
                        <option value="Upgrade to Return">Upgrade to Return</option>
                        <option value="Buyout to Keep">Buyout to Keep</option>
                        <option value="Buyout to Return">Buyout to Return</option>
                        <option value="Leave on Lease">Leave on Lease</option>
                      </select>
                    </div>
                    <div className="col-sm-1">
                      <button value={`${values.calcTarget}-${index}`} onClick={handleRemoveMachine} className="remove-button"></button>
                    </div>
                  </div>
                  : null
                )
              })}
              <div><button id={`${values.calcTarget}-newMachine`} onClick={handleNewMachine} className="machine add-button">Add Machine</button></div>
            </div>
          </div>
        </div>

        <div className="app-bg col-sm-12">
          <h3>Notes</h3>
          <div className="row">
            <div className="col-sm-12">
              <div className="field-desc">
                <textarea
                name="notes"
                value={workbook.notes || ''}
                onChange={handleCalcs} autoComplete="new-password"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}