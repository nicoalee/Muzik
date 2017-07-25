const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input a name']
  },
  email: {
    type: String,
    required: [true, 'Please input an email']
  },
  password: {
    type: String,
    required: [true, 'Please input a password']
  }
})

// // bcrypt stuff to encrypt password
// userSchema.pre('save', function (next) {
//   var user = this // this keyword ==> the newUser obj instance
//
//    // Only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next()
//
//    // hash the password ASYNCHRONOUSLY
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) return next(err)
//
//     // Override the cleartext password with the hashed one
//     user.password = hash
//     next() // call the save fn
//   })
// })

// bcrypt method to compare submitted password with password stored in database
// userSchema.methods.validPassword = function (givenPassword) {
//   // t/f based on the user.hashed compared with form.password
//
//   return bcrypt.compareSync(givenPassword, this.password)
// }

const User = mongoose.model('User', userSchema)

module.exports = User
