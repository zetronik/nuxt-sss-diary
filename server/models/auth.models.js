const {model, Schema} = require('mongoose');

const authSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  session: {
    type: String
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'schools'
  }
});


module.exports = model('auth', authSchema);
