const {db, associations} = require('./index')
const {User} = db.models

db.sync({force: true})
.then(() => {
  return User.create({
    firstName: 'Raven',
    lastName: 'Monnig',
    level: 'Admin',
    email: 'RMonnig@impactnetworking.com',
    phone: '',
    password: 'pleaseChangeMe'
  })
})
.then((res) => {
  console.log(res)
  console.log('Database seed complete')
  process.exit()
})
.catch(err => console.error(err))
