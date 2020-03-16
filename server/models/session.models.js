const {model, Schema} = require('mongoose');

const sessionSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'auths'
  }
});

module.exports = model('session', sessionSchema);