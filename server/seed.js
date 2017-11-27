const db = require('./db')
const {User, Company, Region, Branch, Application, Guarantee} = db.models

let userGuy, bbranch, rregion, manager, rival, impact

db.sync({force: true})
.then(() => {
  return Branch.create({
    name: 'da branch'
  })
})
.then((data) => {
  bbranch = data
})
.then(() => {
  return Region.create({
    name: 'da region'
  })
})
.then((data) => {
  rregion = data
  bbranch.setRegion(rregion)
})
.then(() => {
  return Company.create({
    name: 'Impact'
  })
})
.then((data) => {
  impact = data
  rregion.setCompany(impact)
})

.then(() => {
  return User.create({
    firstName: 'branch manager', lastName: 'ted', level: 'branchManager', email: 'bob@bob.bob'
  })
})
.then((data) => {
  manager = data
  manager.setCompany(impact)
})
.then(() => {
  manager.setBranch(bbranch)
})

.then(() => {
  return User.create({
    firstName: 'region manager', lastName: 'fred', level: 'regionManager', email: 'bob@bob.bob'
  })
})
.then((data) => {
  manager = data
  manager.setCompany(impact)
})
.then(() => {
  manager.setBranch(bbranch)
})

.then(() => {
  return User.create({
    firstName: 'rep', lastName: 'ned', level: 'rep', email: 'bob@bob.bob'
  })
})
.then((data) => {
  userGuy = data
  userGuy.setCompany(impact)
})
.then(() => {
  userGuy.setBranch(bbranch)
})

.then(() => {
  return User.create({
    firstName: 'test', lastName: 'testerson', phone: '1234567891', email: 'bob@bob.bob',
  })
})
.then((data) => {
  rival = data
  return Company.create({
    name: 'wahtever misspelled inc'
  })
})
.then((companyMan) => {
  rival.setCompany(companyMan)
})
.then(() => {
  return Application.create({
    customerName: 'some dude', amount: 20, term: 12, advanced_payments: '0', end_of_term: '9%', comments: 'NO'
  })
})
.then((app) => {
  app.setRep(userGuy)
})
.then(() => {
  return Application.create({
    customerName: 'some other dude', amount: 20, term: 12, advanced_payments: '0', end_of_term: '9%', comments: 'NO'
  })
})
.then((app) => {
  app.setRep(userGuy)
})
.then(() => {
  return Application.create({
    customerName: 'this other dude over here', amount: 20, term: 12, advanced_payments: '0', end_of_term: '9%', comments: 'NO'
  })
})
.then((app) => {
  app.setRep(manager)
})
.then(() => {
  console.log('Database seed complete')
})
.catch(err => console.error(err))