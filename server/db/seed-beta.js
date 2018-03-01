const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const {cert, mailTransporter} = require('../api/auth.js')
const {db, associations} = require('./index')
const {User, Dealer, Region, Branch, Application, Action, Guarantee, Customer, Buyout, Lease, Machine} = db.models

const generateUsers = () => {
  let arr = []

  const builder = (firstName, lastName, level, email, phone, password) => {
    arr.push(User.build({
      'firstName': firstName,
      'lastName': lastName,
      'level': level,
      'email': email,
      'phone': phone,
      'password': password
    }))
  }

  builder('James', 'Byrd', 'Admin', 'jbyrd@impactnetworking.com', '804-551-1212', 'bob')
  builder('Raven', 'Monnig', 'Admin', 'rmonnig@impactnetworking.com', '847-693-2316', 'bob')

  builder('Cory', 'Carnes', 'Region Manager', 'ccarnes@impactnetworking.com', '312-424-6110', 'bob')

  // sales team 3
  builder('Michael', 'Lepper', 'Sales Rep', 'mlepper@impactnetworking.com', '630-929-5034', 'bob')
  builder('Tony', 'Deszcz', 'Sales Rep', 'tdeszcz@impactnetworking.com', '630-929-5036', 'bob')
  builder('Patrick', 'Fay', 'Sales Rep', 'kfay@impactnetworking.com', '630-332-9635', 'bob')
  builder('Michael', 'Flores', 'Sales Rep', 'mflores@impactnetworking.com', '630-929-5063', 'bob')
  builder('Matthew', 'Harrigan', 'Sales Rep', 'mharrigan@impactnetworking.com', '630-332-9633', 'bob')
  builder('Eric', 'Janik', 'Sales Rep', 'ejanik@impactnetworking.com', '630-929-5059', 'bob')
  builder('Jack', 'Rante', 'Sales Rep', 'jrante@impactnetworking.com', '630-332-9634', 'bob')
  builder('Anthony', 'Sarlo', 'Sales Rep', 'asarlo@impactnetworking.com', '630-929-5012', 'bob')
  builder('Kevin', 'Tennenbaum', 'Sales Rep', 'ktennenbaum@impactnetworking.com', '630-929-5028', 'bob')
  
  // sales team 4
  builder('Jacob', 'Furgason', 'Sales Rep', 'jfurgason@impactnetworking.com', '630-929-5046', 'bob')
  builder('Caitlin', 'Cima', 'Sales Rep', 'ccima@impactnetworking.com', '630-929-5072', 'bob')
  builder('Cory', 'Conner', 'Sales Rep', 'cconner@impactnetworking.com', '630-929-5058', 'bob')
  builder('Max', 'McMahon', 'Sales Rep', 'mmcmahon@impactnetworking.com', '630-929-5006', 'bob')
  builder('Jennifer', 'Reardon', 'Sales Rep', 'jreardon@impactnetworking.com', '630-929-5048', 'bob')
  builder('Patrick', 'Scotkovsky', 'Sales Rep', 'pscotkovsky@impactnetworking.com', '630-929-5043', 'bob')
  builder('Richard', 'Treiber', 'Sales Rep', 'rtreiber@impactnetworking.com', '815-255-8384', 'bob')

  return arr
}

const generateBranches = () => {
  let arr = []
  
  const builder = (name) => {
    arr.push(Branch.build({
      'name': name
    }))
  }

  builder('Bolingbrook')
  builder('Lake Forest HQ')
  builder('Lake Forest Warehouse & Logistics')  
  builder('Peru')  
  builder('Chicago Clark')
  builder('Chicago Michigan')
  builder('Darien')
  builder('Rockford')  
  builder('LA')
  builder('Brookefield')
  builder('Madison')
  builder('Indianapolis')
  builder('Hammond')

  return arr
}

const generateRegions = () => {
  let arr = []
  
  const builder = (name) => {
    arr.push(Region.build({
      'name': name
    }))
  }

  builder('IL')
  builder('CA')
  builder('WI')
  builder('IN')

  return arr
}

const generateDealers = () => {
  let arr = []
  
  const builder = (name, phone, street, city, state, zip) => {
    arr.push(Dealer.build({
      'name': name,
      'phone': phone,
      'street': street,
      'city': city,
      'state': state,
      'zip': zip
    }))
  }

  builder('Impact Networking, LLC', '847-785-2250', '13875 West Boulton Boulevard', 'Lake Forest', 'Illinois', '60045')

  return arr
}

const generateApplications = () => {
  let arr = []
  
  const builder = (status, date, amount, expiry, term, advancedPayments, endOfTerm, type, existingType, existingCustomer, funding, repRate, comments) => {
    arr.push(Application.build({
      'status': status,
      'date': date,
      'amount': amount,
      'expiry': expiry,
      'term': term,
      'advancedPayments': advancedPayments,
      'endOfTerm': endOfTerm,
      'type': type,
      'existingType': existingType,
      'existingCustomer': existingCustomer,
      'funding': funding,
      'repRate': repRate,
      'comments': comments
    }))
  }

  return arr
}

const generateActions = () => {
  let arr = []

  const builder = (activity, date, leasingCompany, appNumber, status, notes) => {
    arr.push(Action.build({
      'activity': activity,
      'date': date,
      'leasingCompany': leasingCompany,
      'appNumber': appNumber,
      'status': status,
      'notes': notes
    }))
  }

  return arr
}

const generateGuarantees = () => {
  let arr = []
  
  const builder = (firstName, lastName, street, city, state, zip, title, dateOfBirth) => {
    arr.push(Guarantee.build({
      'firstName': firstName,
      'lastName': lastName,
      'street': street,
      'city': city,
      'state': state,
      'zip': zip,
      'title': title,
      'dateOfBirth': dateOfBirth
    }))
  }

  return arr
}

const generateCustomers = () => {
  let arr = []
  
  const builder = (name, phone, street, city, state, zip, email, taxID) => {
    arr.push(Customer.build({
      'name': name,
      'phone': phone,
      'street': street,
      'city': city,
      'state': state,
      'zip': zip,
      'email': email,
      'taxID': taxID
    }))
  }

  return arr
}

const generateBuyouts = () => {
  let arr = []
  
  const builder = (status, date, expiry, comments, pdf) => {
    arr.push(Buyout.build({
      'status': status,
      'date': date,
      'expiry': expiry,
      'comments': comments,
      'pdf': pdf,
    }))
  }

  return arr
}

const generateLeases = () => {
  let arr = []
  
  const builder = (number, company, quote) => {
    arr.push(Lease.build({
      'number': number,
      'company': company,
      'quote': quote
    }))
  }

  return arr
}

const generateMachines = () => {
  let arr = []
  
  const builder = (serial, make, model, location, action) => {
    arr.push(Machine.build({
      'serial': serial,
      'make': make,
      'model': model,
      'location': location,
      'action': action
    }))
  }

  return arr
}

const createUsers = () => {
  return Promise.all(generateUsers().map(user => { return user.save() }))
}

const createBranches = () => {
  return Promise.all(generateBranches().map(branch => { return branch.save() }))
}

const createRegions = () => {
  return Promise.all(generateRegions().map(region => { return region.save() }))
}

const createDealers = () => {
  return Promise.all(generateDealers().map(dealer => { return dealer.save() }))
}

const createApplications = () => {
  return Promise.all(generateApplications().map(application => { return application.save() }))
}

const createActions = () => {
  return Promise.all(generateActions().map(action => { return action.save() }))
}

const createGuarantees = () => {
  return Promise.all(generateGuarantees().map(guarantee => { return guarantee.save() }))
}

const createCustomers = () => {
  return Promise.all(generateCustomers().map(customer => { return customer.save() }))
}

const createBuyouts = () => {
  return Promise.all(generateBuyouts().map(buyout => { return buyout.save() }))
}

const createLeases = () => {
  return Promise.all(generateLeases().map(lease => { return lease.save() }))
}

const createMachines = () => {
  return Promise.all(generateMachines().map(machine => { return machine.save() }))
}

let seedData = {}

db.sync({force: true})
.then(() => {
  console.log('Creating instances...')
  return createUsers()
})
.then((users) => {
  seedData.users = users
  return createBranches()
})
.then((branches) => {
  seedData.branches = branches
  return createRegions()
})
.then((regions) => {
  seedData.regions = regions
  return createDealers()
})
.then((dealers) => {
  seedData.dealers = dealers
  return createApplications()
})
.then((applications) => {
  seedData.applications = applications
  return createActions()
})
.then((actions) => {
  seedData.actions = actions
  return createGuarantees()
})
.then((guarantees) => {
  seedData.guarantees = guarantees
  return createCustomers()
})
.then((customers) => {
  seedData.customers = customers
  return createBuyouts()
})
.then((buyouts) => {
  seedData.buyouts = buyouts
  return createLeases()
})
.then((leases) => {
  seedData.leases = leases
  return createMachines()
})
.then((machines) => {
  seedData.machines = machines


  console.log('Setting associations...')
  // return Promise.all([
  //   // seedData.users[0].setDealer(seedData.dealers[0]),
  // ])
  return Promise.all(seedData.regions.map(reg => {
    return reg.setDealer(seedData.dealers[0])
  }))
  .then(() => {
    return Promise.all(seedData.branches.map(bran => {
      return bran.setDealer(seedData.dealers[0])
    }))
  })
  .then(() => {
    return Promise.all(seedData.branches.slice(0, 8).map(bran => {
      return bran.setRegion(seedData.regions[0])
    }))
  })
  .then(() => {
    return Promise.all([seedData.branches[8].setRegion(seedData.regions[1])])
  })
  .then(() => {
    return Promise.all(seedData.branches.slice(9, 11).map(bran => {
      return bran.setRegion(seedData.regions[2])
    }))
  })
  .then(() => {
    return Promise.all(seedData.branches.slice(11).map(bran => {
      return bran.setRegion(seedData.regions[3])
    }))
  })
  .then(() => {
    return Promise.all(seedData.users.slice(2).map(usr => {
      return usr.setDealer(seedData.dealers[0])
    }))
  })
  .then(() => {
    return Promise.all(seedData.users.slice(2).map(usr => {
      return usr.setRegion(seedData.regions[0])
    }))
  })
  .then(() => {
    return Promise.all(seedData.users.slice(2).map(usr => {
      return usr.setBranch(seedData.branches[0])
    }))
  })
  .then(() => {
    return Promise.all([
      seedData.users[2].setUnderlings([seedData.users[3], seedData.users[12]]),
      seedData.users[3].setUnderlings(seedData.users.slice(4, 12)),
      seedData.users[12].setUnderlings(seedData.users.slice(13))
    ])
  })
})
.then(() => {
  console.log('Sending emails to new users...')
  return Promise.all(seedData.users.slice(3).map(usr => {
    let url = 'localhost:1337/api/login/reset?access_token=' + jwt.sign({user: usr.email}, cert, {expiresIn: '24h'})
    let contents = `<!DOCTYPE html><html><p>A new account has been created for you at MyAdminCentral</p><p>To set the password on this account, click <a href="${url}">${url}</a></p><p>If this link does not work, please visit <a>MyAdminCentral</a> and click "I forgot my password".</html>`
    let message = {
      from: 'team@myadmindev.xyz',
      // to: usr.email,
      to: 'tatan42@gmail.com',
      subject: 'Account Created at MyAdminCentral',
      // text: usr.email,
      html: contents
    }
    return mailTransporter.sendMail(message)
  }))
})
.then(() => {
  console.log('Database seed complete')
  process.exit()
})
.catch(err => console.error(err))