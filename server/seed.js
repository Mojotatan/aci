const {db, associations} = require('./db')
const {User, Company, Region, Branch, Application, Guarantee, Customer} = db.models

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

  builder('ted', 'branch', 'branchManager', 'ted@bob.bob', '#123456789', 'bob')

  builder('fred', 'region', 'regionManager', 'fred@bob.bob', '#123456789', 'bob')

  builder('ned', 'rep', 'rep', 'ned@bob.bob', '#123456789', 'bob')

  builder('ed', 'boss', 'boss', 'ed@bob.bob', '#123456789', 'bob')

  builder('jed', 'rep', 'rep', 'jed@bob.bob', '#123456789', 'bob')

  builder('nate', 'rep', 'rep', 'nate@bob.bob', '#123456789', 'bob')

  return arr
}

const generateBranches = () => {
  let arr = []
  
  const builder = (name, address) => {
    arr.push(Branch.build({
      'name': name,
      'address': JSON.stringify(address)
    }))
  }

  builder('Downtown', {street: '104 E Funky Town'})

  builder('Uptown', {street: '104 W Funky Town'})

  builder('Midtown', {city: 'Lamesburg'})

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

const generateCompanies = () => {
  let arr = []
  
  const builder = (name) => {
    arr.push(Company.build({
      'name': name
    }))
  }

  builder('ACI')

  builder('Impact')

  builder('ATN')

  return arr
}

const generateApplications = () => {
  let arr = []
  
  const builder = (status, date, amount, expiry, term, advancedPayments, endOfTerm, comments) => {
    arr.push(Application.build({
      'status': status,
      'date': date,
      'amount': amount,
      'expiry': expiry,
      'term': term,
      'advancedPayments': advancedPayments,
      'endOfTerm': endOfTerm,
      'comments': comments
    }))
  }

  builder('pending', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'no comment')

  builder('new', '1998-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'no comment')

  builder('pending', '2017-11-26', 20, '2024-02-04', 24, '1', 'FMV', 'no comment')

  builder('pending', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'no comment')

  builder('pending', '2017-11-26', 20, '2018-02-04', 24, '1', 'FMV', 'no comment')

  return arr
}

const generateGuarantees = () => {
  let arr = []
  
  const builder = (firstName, lastName, address, title, dateOfBirth) => {
    arr.push(Guarantee.build({
      'firstName': firstName,
      'lastName': lastName,
      'address': JSON.stringify(address),
      'title': title,
      'dateOfBirth': dateOfBirth
    }))
  }

  builder('dave', 'davey', {street: '200 Davide Ave'}, 'daver', '1804-10-16')

  return arr
}

const generateCustomers = () => {
  let arr = []
  
  const builder = (name, phone, address, taxID) => {
    arr.push(Customer.build({
      'name': name,
      'phone': phone,
      'address': JSON.stringify(address),
      'taxID': taxID
    }))
  }

  builder('roderick"s construction', '#123456789', {street: '201 Davide Ave'}, 12)

  builder('steve"s construction', '#123456789', {street: '203 Davide Ave'}, 12)

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

const createCompanies = () => {
  return Promise.all(generateCompanies().map(company => { return company.save() }))
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
  return createCompanies()
})
.then((companies) => {
  seedData.companies = companies
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

  return Promise.all([
    seedData.users[0].setCompany(seedData.companies[1]),
    seedData.users[1].setCompany(seedData.companies[1]),
    seedData.users[2].setCompany(seedData.companies[1]),
    seedData.users[3].setCompany(seedData.companies[1]),
    seedData.users[4].setCompany(seedData.companies[1]),
    seedData.users[5].setCompany(seedData.companies[2]),
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
    seedData.regions[0].setCompany(seedData.companies[1]),
    seedData.regions[1].setCompany(seedData.companies[1]),
    seedData.regions[2].setCompany(seedData.companies[2]),
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
    seedData.customers[0].setRep(seedData.users[0]),
    seedData.customers[1].setRep(seedData.users[1])
  ])
})
.then(() => {
  console.log('Database seed complete')
})
.catch(err => console.error(err))