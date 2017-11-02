const mongoose = require('../config/database')
const { Schema } = mongoose

const shoppingListsSchema = new Schema({
  title: { type: String, default: 'Shopping List' },
  items: [{ String }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('shoppingLists', shoppingListsSchema)
