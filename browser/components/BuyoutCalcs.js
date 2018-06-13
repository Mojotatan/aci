import React from 'react'

export default ({
  values,
  toggleCalcView,
  handleCalcs
}) => (
  <div className="col-sm-9">
    <form>
      <button onClick={toggleCalcView}>
        nah jk tho
      </button>
      <div className="app-bg col-sm-12">
        <h3>Lease Details</h3>
        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Lessee Name</label>
            </div>
            <div className="field-box">
              <div></div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Lease Company</label>
            </div>
            <div className="field-box">
              <input name="leaseCompany" value={values.calcs.leaseCompany || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Lease Number</label>
            </div>
            <div className="field-box">
              <input name="leaseNumber" value={values.calcs.leaseNumber || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Address</label>
            </div>
            <div className="field-box">
              <div></div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>City, State, Zip</label>
            </div>
            <div className="field-box">
              <div></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Lease Start Date</label>
            </div>
            <div className="field-box">
              <input name="startDate" value={values.calcs.startDate || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Lease Plan End Date</label>
            </div>
            <div className="field-box">
              <input name="endDate" value={values.calcs.endDate || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Original Term</label>
            </div>
            <div className="field-box">
              <input name="originalTerm" value={values.calcs.originalTerm || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Remaining Term</label>
            </div>
            <div className="field-box">
              <input name="remainingTerm" value={values.calcs.remainingTerm || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Current Equipment Payment</label>
            </div>
            <div className="field-box">
              <input name="currentEquipmentPayment" value={values.calcs.currentEquipmentPayment || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Current Service/MA Payment</label>
            </div>
            <div className="field-box">
              <input name="currentServicePayment" value={values.calcs.currentServicePayment || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box">
              <input name="passThroughService" value={values.calcs.passThroughService || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Total Base Payment</label>
            </div>
            <div className="field-box">
              <div>{Number(values.calcs.currentEquipmentPayment || 0) + Number(values.calcs.currentServicePayment || 0) + Number(values.calcs.passThroughService || 0)}</div>
            </div>
          </div>
        </div>
      </div>


      <div className="app-bg col-sm-12">
        <h3>Company Numbers</h3>
        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Keep</label>
            </div>
            <div className="field-box">
              <input name="companyUtk" value={values.calcs.companyUtk || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box">
              <input name="companyUtr" value={values.calcs.companyUtr || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              <input name="companyBtk" value={values.calcs.companyBtk || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <input name="companyBtr" value={values.calcs.companyBtr || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <div className="field-label">
              <label>%</label>
            </div>
            <div className="field-box">
              <input name="percentage" value={values.calcs.percentage || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>Service Recovery Amount</label>
            </div>
            <div className="field-box">
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box">
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="field-label">
              <label>MISC (SMUA)</label>
            </div>
            <div className="field-box">
              <input name="smua" value={values.calcs.smua || ''} onChange={handleCalcs} />
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
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box">
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              {/* <input name="" value={values.calcs || ''} onChange={handleCalcs} /> */}
              <div></div>
            </div>
          </div>
        </div>

        <strong>Customer Numbers</strong>
        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              <input name="customerBtk" value={values.calcs.customerBtk || ''} onChange={handleCalcs} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <input name="customerBtr" value={values.calcs.customerBtr || ''} onChange={handleCalcs} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-bg col-sm-12">
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
            <input className="sm-input" name="taxRate" value={values.calcs.taxRate || ''} onChange={handleCalcs} />
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
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Service/MA Payment</div>
          </div>
          <div className="col-sm-2">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Fuel/Freight</div>
          </div>
          <div className="col-sm-2">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Late Charges</div>
          </div>
          <div className="col-sm-2">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div>Misc. Items *See Notes</div>
          </div>
          <div className="col-sm-2">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-sm-offset-4">
            Total
          </div>
          <div className="col-sm-2">
            Upfront Tax
          </div>
          <div className="col-sm-2">
            9% Tax
          </div>
          <div className="col-sm-2">
            Total
          </div>
        </div>
      </div>

      <div className="app-bg col-sm-12">
        <h3>Equipment</h3>

      </div>

      <div className="app-bg col-sm-12">
        <h3>Notes</h3>
        <div className="row">
          <div className="col-sm-12">
            <div className="field-desc">
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
)

{/* <div className="col-sm-4">
  <div className="field-label">
    <label></label>
  </div>
  <div className="field-box">
    <input />
  </div>
</div> */}