import React from 'React'

export default ({
  values,
  toggleCalcView
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
              <label>Lessee Name</label>
            </div>
            <div className="field-box">
              <div></div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Lessee Name</label>
            </div>
            <div className="field-box">
              <div></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label></label>
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
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Lease Plane End Date</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Original Term</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Remaining Term</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Current Equipment Payment</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Current Service/MA Payment</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Total Base Payment</label>
            </div>
            <div className="field-box">
              <div></div>
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
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="field-label">
              <label>Service Recovery Amount</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>Pass Through Service</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="field-label">
              <label>MISC (SMUA)</label>
            </div>
            <div className="field-box">
              <input />
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
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Upgrade to Return</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Keep</label>
            </div>
            <div className="field-box">
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <input />
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
              <input />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="field-label">
              <label>Buyout to Return</label>
            </div>
            <div className="field-box">
              <input />
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
            9% Tax
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