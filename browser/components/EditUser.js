import React from 'react'
import {Link} from 'react-router-dom'

export default ({
  values,
  users,
  dealers,
  regions,
  branches,
  handleChange,
  handleSave,
}) => (
  <div className="row edit-users-page">
    
    <div className="col-sm-12">
      {/* <div className="col-sm-6"><h2>User</h2></div> */}
      <div className="col-sm-6 top-buttons"><Link to='/users' id="cancel-button">Back</Link></div>
      <div className="col-sm-6 top-buttons" align="right">
        <Link to='/users' id="cancel-button">Cancel</Link>
        <button type="submit" id="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>

    <div className="col-sm-8 col-sm-offset-2">
      <form onSubmit={handleSave} autoComplete="off">
        <div className="user-bg col-sm-12">

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>First Name</label>
              </div>
              <div className="field-box">
                <input
                onChange={handleChange}
                name={'firstName'}
                value={values.firstName || ''}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Last Name</label>
              </div>
              <div className="field-box">
                <input
                  onChange={handleChange}
                  name={'lastName'}
                  value={values.lastName || ''}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Email</label>
              </div>
              <div className="field-box">
                <input
                onChange={handleChange}
                name={'email'}
                value={values.email || ''}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Phone</label>
              </div>
              <div className="field-box">
                <input
                  onChange={handleChange}
                  name={'phone'}
                  value={values.phone || ''}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Level</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="level"
                value={values.level}
                >
                  <option value="Sales Rep">Sales Rep</option>
                  <option value="Branch Manager">Branch Manager</option>
                  <option value="Region Manager">Region Manager</option>
                  <option value="Senior Manager">Senior Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Manager</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="managerId"
                value={values.managerId || 0}
                >
                  <option value={0}></option>
                  {users.map(usr => (
                    <option key={`usr=${usr.id}`} value={usr.id}>{usr.fullName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Dealer</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="dealerId"
                value={values.dealerId || 0}
                >
                  <option value={0}></option>
                  {dealers.map(dlr => (
                    <option key={`dlr-${dlr.id}`} value={dlr.id}>{dlr.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Region</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="regionId"
                value={values.regionId || 0}
                >
                  <option value={0}></option>
                  {regions.map(reg => (
                    <option key={`reg-${reg.id}`} value={reg.id}>{reg.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Branch</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="branchId"
                value={values.branchId || 0}
                >
                  <option value={0}></option>
                  {branches.map(bran => (
                    <option key={`bran-${bran.id}`} value={bran.id}>{bran.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="field-label">
                <label>Set New Password</label>
              </div>
              <div className="field-box">
                <input
                onChange={handleChange}
                name={'password'}
                value={values.password || ''}
                type="password"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="field-label">
                <label>Active</label>
              </div>
              <div className="field-dropd-full">
                <select
                onChange={handleChange}
                name="active"
                value={values.active}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

        </div>
        <div className="col-sm-12 buttons" align="right">
          <Link to='/users' id="cancel-button">Cancel</Link>
          <button type="submit" id="save-button">Save</button>
        </div>
      </form>
    </div>
  </div>
)