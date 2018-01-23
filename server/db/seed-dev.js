const fs = require('fs')
const path = require('path')
const {db, associations} = require('./index')
const {User, Dealer, Region, Branch, Application, Guarantee, Customer, Buyout, Lease, Machine} = db.models

let userGuy, bbranch, rregion, manager, rival, impact, cushtomer

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

  builder('ted', 'branch', 'Branch Manager', 'ted@bob.bob', '#123456789', 'bob')

  builder('fred', 'region', 'Region Manager', 'fred@bob.bob', '#123456789', 'bob')

  builder('ned', 'rep', 'Admin', 'ned@bob.bob', '#123456789', 'bob')

  builder('ed', 'boss', 'Senior Manager', 'ed@bob.bob', '#123456789', 'bob')

  builder('jed', 'rep', 'Sales Rep', 'jed@bob.bob', '#123456789', 'bob')

  builder('nate', 'rep', 'Sales Rep', 'nate@bob.bob', '#123456789', 'bob')

  return arr
}

const generateBranches = () => {
  let arr = []
  
  const builder = (name) => {
    arr.push(Branch.build({
      'name': name
    }))
  }

  builder('Downtown')

  builder('Uptown')

  builder('Midtown')

  return arr
}

const generateRegions = () => {
  let arr = []
  
  const builder = (name) => {
    arr.push(Region.build({
      'name': name
    }))
  }

  builder('The East')

  builder('The West')

  builder('The South')

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

  builder('Impact', '#123456789', '101 Real Street', 'Chicago', 'Illinois', '60610')

  builder('ATN', '#123456789', '420 Exists Plaza', 'Chicago', 'Illinois', '60610')

  return arr
}

const generateApplications = () => {
  let arr = []
  
  const builder = (status, date, amount, expiry, term, advancedPayments, endOfTerm, type, currentLeaseCompany, leaseNumber, approvalNumber, approvalDate, approvalFrom, funding, repRate, everBank, ge, cit, unifiFred, dll, usb, emr, comments) => {
    arr.push(Application.build({
      'status': status,
      'date': date,
      'amount': amount,
      'expiry': expiry,
      'term': term,
      'advancedPayments': advancedPayments,
      'endOfTerm': endOfTerm,
      'type': type,
      'currentLeaseCompany': currentLeaseCompany,
      'leaseNumber': leaseNumber,
      'approvalNumber': approvalNumber,
      'approvalDate': approvalDate,
      'approvalFrom': approvalFrom,
      'funding': funding,
      'repRate': repRate,
      'everBank': everBank,
      'ge': ge,
      'cit': cit,
      'unifiFred': unifiFred,
      'dll': dll,
      'usb': usb,
      'emr': emr,
      'comments': comments
    }))
  }

  builder('Draft', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'New Customer', 'EverBank', '12345', '2', '2017-12-25', 'bob', 30.45, '2%', '', '', '', '', '', '', '', 'no comment')

  builder('New', '1998-11-26', 20.20, '2018-02-04', 24, '1', 'FMV', 'Existing Customer Addition', 'EverBank', '12345', '2', '2017-12-25', 'bob', 30.45, '2%', '', '', '', '', '', '', '', 'no comment')

  builder('Hold', '2017-11-26', 20, '2024-02-04', 24, '1', 'FMV', 'New Customer', 'EverBank', '12345', '2', '2017-12-25', 'bob', 30.45, '2%', '', '', '', '', '', '', '', 'no comment')

  builder('Approved', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'New Customer', 'EverBank', '12345', '2', '2017-12-25', 'bob', 30.45, '2%', '', '', '', '', '', '', '', 'no comment')

  builder('Declined', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'New Customer', 'EverBank', '12345', '2', '2017-12-25', 'bob', 30.45, '2%', '', '', '', '', '', '', '', 'no comment')

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

  builder('dave', 'davey', '200 Davide Ave', 'daver', '1804-10-16')

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

  builder("roderick's construction", '#123456789', '201 Davide Ave', 'city', 'state', 'zip', 'arnold@palmer.net', '12')

  builder("steve's construction", '#123456789', '203 Davide Ave', 'city', 'state', 'zip', 'arnold@palmer.net', '12')

  return arr
}

const generateBuyouts = () => {
  let arr = []
  
  const builder = (status, date, expiry, quote, comments, pdf) => {
    arr.push(Buyout.build({
      'status': status,
      'date': date,
      'expiry': expiry,
      'quote': quote,
      'comments': comments,
      'pdf': pdf,
    }))
  }

  builder('Draft', '2017-12-15', '2018-09-23', 'Full', 'no comment', '')

  builder('Submitted', '2017-12-16', '2042-01-05', 'Partial', 'no comment', '')

  return arr
}

const generateLeases = () => {
  let arr = []
  
  const builder = (number, company, amount) => {
    arr.push(Lease.build({
      'number': number,
      'company': company,
      'amount': amount
    }))
  }

  builder(1234456789, 'Wells Fargo', 45345.12)

  builder(1234456789, 'Wells Fargo', 45345.12)

  builder(1234456789, 'Wells Fargo', 45345.12)

  return arr
}

const generateMachines = () => {
  let arr = []
  
  const builder = (serial, make, model, location) => {
    arr.push(Machine.build({
      'serial': serial,
      'make': make,
      'model': model,
      'location': location
    }))
  }

  builder('LVK4Z23006', 'KYOCERA ECOSYS', 'FS P21235DN COPIER', "Under Ted's Desk")

  builder('LVK4Z23006', 'KYOCERA ECOSYS', 'FS P21235DN COPIER', "Under Ted's Other Desk")

  builder('LVK4Z23006', 'KYOCERA ECOSYS', 'FS P21235DN COPIER', 'In the street')

  builder('LVK4Z23006', 'KYOCERA ECOSYS', 'FS P21235DN COPIER', 'Under the Black Sun')

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

  return Promise.all([
    seedData.users[0].setDealer(seedData.dealers[1]),
    seedData.users[1].setDealer(seedData.dealers[1]),
    seedData.users[2].setDealer(seedData.dealers[1]),
    seedData.users[3].setDealer(seedData.dealers[1]),
    seedData.users[4].setDealer(seedData.dealers[1]),
    seedData.users[5].setDealer(seedData.dealers[2]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.users[0].setBranch(seedData.branches[0]),
    seedData.users[1].setBranch(seedData.branches[0]),
    seedData.users[2].setBranch(seedData.branches[0]),
    seedData.users[3].setBranch(seedData.branches[0]),
    seedData.users[4].setBranch(seedData.branches[1]),
    seedData.users[5].setBranch(seedData.branches[2]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.users[0].setRegion(seedData.regions[0]),
    seedData.users[1].setRegion(seedData.regions[0]),
    seedData.users[2].setRegion(seedData.regions[0]),
    seedData.users[3].setRegion(seedData.regions[0]),
    seedData.users[4].setRegion(seedData.regions[1]),
    seedData.users[5].setRegion(seedData.regions[2]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.branches[0].setRegion(seedData.regions[0]),
    seedData.branches[1].setRegion(seedData.regions[1]),
    seedData.branches[2].setRegion(seedData.regions[2]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.regions[0].setDealer(seedData.dealers[1]),
    seedData.regions[1].setDealer(seedData.dealers[1]),
    seedData.regions[2].setDealer(seedData.dealers[2]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.applications[0].setRep(seedData.users[2]),
    seedData.applications[1].setRep(seedData.users[2]),
    seedData.applications[2].setRep(seedData.users[0]),
    seedData.applications[3].setRep(seedData.users[4]),
    seedData.applications[4].setRep(seedData.users[5]),
  ])
})
.then(() => {
  return Promise.all([
    seedData.applications[0].setGuarantee(seedData.guarantees[0])
  ])
})
.then(() => {
  return Promise.all([
    seedData.applications[0].setCustomer(seedData.customers[0]),
    seedData.applications[4].setCustomer(seedData.customers[1])
  ])
})
.then(() => {
  return Promise.all([
    seedData.customers[0].setRep(seedData.users[2]),
    seedData.customers[1].setRep(seedData.users[1])
  ])
})
.then(() => {
  return Promise.all([
    seedData.buyouts[0].setRep(seedData.users[2]),
    seedData.buyouts[1].setRep(seedData.users[2])
  ])
})
.then(() => {
  return Promise.all([
    seedData.leases[0].setBuyout(seedData.buyouts[0]),
    seedData.leases[1].setBuyout(seedData.buyouts[1]),
    seedData.leases[2].setBuyout(seedData.buyouts[1])
  ])
})
.then(() => {
  return Promise.all([
    seedData.leases[0].setMachines(seedData.machines[2]),
    seedData.leases[1].setMachines([seedData.machines[0], seedData.machines[1]]),
    seedData.leases[2].setMachines(seedData.machines[3])
  ])
})
.then(() => {
  console.log('Dummy seeding complete, reading csv...')
  let rows
  let regs = []
  let brans = []
  let bob = fs.createReadStream(path.resolve(__dirname, './seed-dev-data.csv'), 'utf8')
    // .pipe()
    .on('data', (chunk) => {
      let raw = chunk.split('\r').map(row => {
        return row.split(',')
      })
      let key = raw.shift()
      function Person(arr) {
        this.firstName = arr[1]
        this.lastName = arr[2]
        this.title = arr[3]
        this.email = arr[4]
        this.region = arr[5].slice(0, 2)
        this.branch = arr[5]
        this.department = arr[6]
        this.phone = arr[7]
      }
      rows = raw.map(row => {
        return new Person(row)
      })
      rows = rows.filter(row => {
        return row.department === 'Sales'
      })
      rows.forEach(row => {
        if (row.title === 'Sales Manager' || row.title === 'Account Manager') {
          row.level = 'Sales Rep'
        } else if (row.title === 'Senior Account Manager') {
          row.level = 'Branch Manager'
        }
      })
      rows = rows.filter(row => {
        return row.level
      })
      rows.forEach(row => {
        if (!regs.includes(row.region)) regs.push(row.region)
        if (!brans.includes(row.branch)) brans.push(row.branch)
      })
    })
    .on('end', () => {
      console.log('csv parsed...')
      regs = regs.map(reg => {
        return Region.build({
          name: reg,
          dealerId: 1
        })
      })
      Promise.all(regs.map(reg => reg.save()))
      .then((data) => {
        regs = {}
        data.forEach(reg => {
          regs[reg.name] = reg.id
        })
        brans = brans.map(bran => {
          return Branch.build({
            name: bran.slice(3),
            dealerId: 1,
            regionId: regs[bran.slice(0, 2)]
          })
        })
        return Promise.all(brans.map(bran => bran.save()))
      })
      .then((data) => {
        brans = {}
        data.forEach(bran => {
          brans[bran.name] = bran.id
        })
        let builds = rows.map(ppl => {
          return User.build({
            firstName: ppl.firstName,
            lastName: ppl.lastName,
            level: ppl.level,
            email: ppl.email,
            phone: ppl.phone,
            password: 'bob',
            dealerId: 1,
            regionId: regs[ppl.region.slice(0, 2)],
            branchId: brans[ppl.branch.slice(3)]
          })
        })
        return Promise.all(builds.map(build => build.save()))
      })
      .then(() => {
        console.log('Database seed complete')
        console.log(regs)
        console.log(brans)
        process.exit()
      })
    })
})
.catch(err => console.error(err))